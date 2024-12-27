---
title: "Capture composables in Jetpack Compose"
date: 2024-12-27
draft: false
description: "An easy way to capture any composable into an ImageBitmap"
summary: "An easy way to capture any composable into an ImageBitmap"
tags: ["graphics"]
categories: ["KMP"]
series: ["KMP"]
author: "Manpreet Kunnath"
showAuthor: true
showDate: true
showReadingTime: true
showWordCount: true
showToc: true
---
Here is how you can capture any composable into an ImageBitmap. 

## Demo
<video width="100%" controls>
  <source src="/videos/capture-composable.webm">
</video>

To start of, the compose multiplatform version needs to be at least `1.7.0-alpha07+`

## Basic Setup

We will be capturing a TextField into an Image. So let's create a simple TextField and a button to save the composable.

```kotlin
@Composable
@Preview
fun App() {
    MaterialTheme {

        var text by remember { mutableStateOf("") }
        
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            
            TextField(
                value = text,
                onValueChange = { text = it },
                modifier = Modifier.fillMaxWidth(),
                label = { Text("Enter text") }
            )

            Spacer(modifier = Modifier.height(16.dp))

            Button(
                onClick = {},
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Save")
            }
        }
    }
}
```

## Graphics Layer

To copy the contents of our composable to a Bitmap, we would need to create a `GraphicsLayer` using `rememberGraphicsLayer()`.

```kotlin
val graphicsLayer = rememberGraphicsLayer()
```

To actually capture the contents of the composable, we need to wrap the capturing composable within this code.
```kotlin
Box(
    modifier = Modifier
        .drawWithContent {
            // capture the content in the graphics layer
            graphicsLayer.record {
                // draw the contents of the composable into the graphics layer
                this@drawWithContent.drawContent()
            }
            // draw the graphics layer on the visible canvas
            drawLayer(graphicsLayer)
        }
) {
    TextField(
        value = text,
        onValueChange = { text = it },
        modifier = Modifier.fillMaxWidth(),
        label = { Text("Enter text") }
    )
}
```

* `drawWithContent` is a custom drawing modifier that allows intercepting and customizing the drawing process. It allows us to draw before or after the layout's contents.

* `graphicsLayer.record` starts recording the drawing operations.

* `drawContent()` draws the original content (the TextField in our case) into the graphics layer. This effectively creates an off-screen buffer of the content.

* `drawLayer(graphicsLayer)` takes the recorded content from the graphics layer and draws it onto the actual visible canvas.

Let's break down this into more detail. Think of this like drawing on a tracing paper.

When `graphicsLayer.record` is called, it's starts drawing on a separate layer, like the tracing paper. `drawContent()` executes all the actual drawing commands (in this case, the TextField component). This is stored in the memory and not on the screen. It is stored in the graphics layer buffer.

When `drawLayer(graphicsLayer)` is called, it's like placing the tracing paper onto the final canvas. The `drawLayer` takes the recorded content from memory and transfers this content to the actual screen buffer. The system then renders this to the physical display.

We have two canvases:
* The "work" canvas (graphics layer)
* The "display" canvas (screen)

We do all your painting on the work canvas. When finished, we "flip" the canvases to show the work.

## Capture

Let's capture our composable now on click of the save button.
```kotlin
val coroutineScope = rememberCoroutineScope()
var capturedBitmap: ImageBitmap? by remember { mutableStateOf(null) }

Button(
    onClick = {
        // Capture the graphics layer
        coroutineScope.launch {
            capturedBitmap = graphicsLayer.toImageBitmap()
        }
    },
    modifier = Modifier.fillMaxWidth()
) {
    Text("Save")
}

val bitmap = capturedBitmap
if (bitmap != null) {
    Image(
        bitmap = bitmap,
        contentDescription = "Captured Image",
        modifier = Modifier
            .size(200.dp)
            .padding(16.dp),
        contentScale = ContentScale.Fit
    )
}
```
We try to capture the composable in a background thread to prevent the blocking of the UI thread. 

Under the hood, `graphicsLayer.toImageBitmap()` converts the graphics layer into an ImageBitmap. This is function in the `GraphicsLayer` class:
```kotlin
actual suspend fun toImageBitmap(): ImageBitmap = ImageBitmap(size.width, size.height).apply { draw(canvas = Canvas(this), parentLayer = null) }
```

The process requires temporary allocation of memory to hold the pixel data. Memory is allocated both for the pixel buffer and the final bitmap. The pixel data is reformatted if necessary (color space conversion) and data is copied into the destination bitmap.

One thing to note here is the performance consideration. While this example is quite small, the conversion process can be expensive, especially for large areas. The operation should be cancelled if the composable is disposed and memory should be released properly after use.

The key here is to handle the capture process asynchronously and manage resources properly to ensure smooth performance and prevent memory leaks.

## Summary
This is how you can capture any composable into an ImageBitmap in Compose. This works in all platforms that compose supports. I have tested this on android, iOS and WASM target.

Here is the [repo]() for reference. 

## Reference
[Android Documentation](https://developer.android.com/develop/ui/compose/graphics/draw/modifiers#composable-to-bitmap)
