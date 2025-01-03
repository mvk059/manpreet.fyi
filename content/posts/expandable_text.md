---
title: "Expandable Text in Jetpack Compose"
date: 2025-01-03
draft: false
description: "Creating a Show More/Show Less text component in Jetpack Compose"
summary: "Creating a Show More/Show Less text component in Jetpack Compose"
tags: [ "UI" ]
categories: [ "KMP" ]
series: [ "KMP" ]
author: "Manpreet Kunnath"
showAuthor: true
showDate: true
showReadingTime: true
showWordCount: true
showToc: true
---

Text truncation with "Show More/Show Less" functionality is a common UI pattern that improves readability while giving
users control over their reading experience.
Let's break down how to build this component in Jetpack Compose, starting with the basics and gradually adding more
sophisticated features.

## Step 1: Setting Up the Basic Text Component

Let's start with a simple text component that displays our content.

```kotlin
@Composable
fun ExpandableText(
    modifier: Modifier = Modifier,
    text: String,
    style: TextStyle = MaterialTheme.typography.body1,
    textColor: Color = Color.Black,
) {

    Text(
        text = text,
        modifier = modifier,
        style = style,
        color = textColor
    )
}
```

We will pass a long text to this components.

```kotlin
val sampleText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
ExpandableText(
    text = sampleText,
    modifier = Modifier.fillMaxWidth().padding(8.dp)
)
```

{{< figure src="/post-expandable-text/ep1.png" alt="Basic Text Component" class="center" height="700">}}

## Step 2: Adding Text Truncation

Now we will implement the core truncation functionality by adding a maximum line count and state management for expansion.
We will keep the max line count to 3.

```kotlin {hl_lines=[5, 10, 17]}
@Composable
fun ExpandableText(
    modifier: Modifier = Modifier,
    text: String,
    collapsedMaxLine: Int = 3,
    style: TextStyle = MaterialTheme.typography.body1,
    textColor: Color = Color.Black,
) {

    var isExpanded by remember { mutableStateOf(false) }

    Text(
        text = text,
        modifier = modifier,
        style = style,
        color = textColor,
        maxLines = if (isExpanded) Int.MAX_VALUE else collapsedMaxLine,
    )
}
```

{{< figure src="/post-expandable-text/ep2.png" alt="Text with max lines" class="center" >}}

## Step 3: Adding the Show More

To show the "Show More" text, we will use the more powerful AnnotatedString instead of the regular String.
We will also pass a custom style for the "Show more" text.

```kotlin {hl_lines=[6,9,14,15,16,17,18,19,20,21,24]}
@Composable
fun ExpandableText(
    modifier: Modifier = Modifier,
    text: String,
    collapsedMaxLine: Int = 3,
    showMoreText: String = "Show More",
    style: TextStyle = MaterialTheme.typography.body1,
    textColor: Color = Color.Black,
    showMoreStyle: SpanStyle = SpanStyle(color = Color.Blue, fontWeight = FontWeight.W500)
) {

    var isExpanded by remember { mutableStateOf(false) }

    val annotatedText = buildAnnotatedString {
        append(text)
        if (!isExpanded) {
            withStyle(style = showMoreStyle) {
                append(showMoreText)
            }
        }
    }

    Text(
        text = annotatedText,
        modifier = modifier,
        style = style,
        color = textColor,
        maxLines = if (isExpanded) Int.MAX_VALUE else collapsedMaxLine,
    )
}
```

{{< figure src="/post-expandable-text/ep2.png" alt="Text with max lines" class="center" >}}
So making this change did not actually show the "Show more" text on screen. This is because we have appended the "Show more" text to the end of the original text instead of appending it to the end of the third line.
We need to append it at the end of the third (max) line.

## Step 4: Positioning the Show More Text Correctly

One of the trickier aspects is ensuring the "Show More" text appears at the right position.
We need to calculate where to truncate the text and insert our "Show more" text.

```kotlin {hl_lines=[2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,25,26,27,28,29,30]}
var isExpanded by remember { mutableStateOf(false) }
var isClickable by remember { mutableStateOf(false) }
var lastCharacterIndex by remember { mutableStateOf(0) }

val annotatedText = buildAnnotatedString {
    if (isClickable) {
        val adjustedText = text.substring(startIndex = 0, endIndex = lastCharacterIndex)
            .dropLast(showMoreText.length)
            .dropLastWhile { it.isWhitespace() || it == '.' }
        append(adjustedText)
        withStyle(style = showMoreStyle) {
            append(showMoreText)
        }
    } else {
        append(text)
    }
}

Text(
    text = annotatedText,
    modifier = modifier,
    style = style,
    color = textColor,
    maxLines = if (isExpanded) Int.MAX_VALUE else collapsedMaxLine,
    onTextLayout = { textLayoutResult ->
        if (!isExpanded && textLayoutResult.hasVisualOverflow) {
            isClickable = true
            lastCharacterIndex = textLayoutResult.getLineEnd(collapsedMaxLine - 1)
        }
    },
)
```
We made two key changes here. One, we added `onTextLayout` and second, we modified the condition of `annotatedText`

The `onTextLayout` callback helps us determine if the text overflows and where to place our "Show More" text by getting the `lastCharacterIndex`.
We then substring the original text until the `lastCharacterIndex` minus the length of the "Show more" text, whitespaces and periods to place the "Show more" text at the end of the third (max) line.

This will give us the text which is three lines long with the "Show more" text.

{{< figure src="/post-expandable-text/ep3.png" alt="Text with max lines along with show more" class="center" >}}

## Step 5: Adding the Expanded State with Show Less
Let's add the logic to handle the expanded state and show the "Show Less" text.
```kotlin {hl_lines=[2,3,4,5,6,7,17,18,19,24]}
    val annotatedText = buildAnnotatedString {
    if (isClickable) {
        if (isExpanded) {
            append(text)
            withStyle(style = showLessStyle) {
                append(showLessText)
            }
        } else {
            val adjustText = text.substring(startIndex = 0, endIndex = lastCharacterIndex)
                .dropLast(showMoreText.length)
                .dropLastWhile { it.isWhitespace() || it == '.' }
            append(adjustText)
            withStyle(style = showMoreStyle) {
                append(showMoreText)
            }
        }
    } else {
        append(text)
    }
}

Text(
    text = annotatedText,
    modifier = modifier.clickable { isExpanded = !isExpanded },
    style = style,
    color = textColor,
    maxLines = if (isExpanded) Int.MAX_VALUE else collapsedMaxLine,
    onTextLayout = { textLayoutResult ->
        if (!isExpanded && textLayoutResult.hasVisualOverflow) {
            isClickable = true
            lastCharacterIndex = textLayoutResult.getLineEnd(collapsedMaxLine - 1)
        }
    },
)
```
We check if the text is clickable and expanded to display the "Show Less" text. We also add a `clickable` modifier to our text. If we now click anywhere on the text, it will expand and collapse.

{{< figure src="/post-expandable-text/ep4.gif" alt="Text with max lines along with show more" class="center" >}}

We now have our expandable text. The only problem here is that you can click anywhere on the text to expand and collapse the text. What if we need to trigger this only on clicking the "Show more/Show less" text.

## Step 6: Adding Link Annotation for Show More
Now let's make the "Show More" text clickable using [`LinkAnnotation`](https://developer.android.com/develop/ui/compose/text/user-interactions#create-clickable-text). 
```kotlin {hl_lines=[13,14,15,16,17,18,19,20,21,22]}
val annotatedText = buildAnnotatedString {
    if (isClickable) {
        if (isExpanded) {
            append(text)
            withStyle(style = showLessStyle) {
                append(showLessText)
            }
        } else {
            val adjustText = text.substring(startIndex = 0, endIndex = lastCharacterIndex)
                .dropLast(showMoreText.length)
                .dropLastWhile { it.isWhitespace() || it == '.' }
            append(adjustText)
            withLink(
                link = LinkAnnotation.Clickable(
                    tag = "Show More",
                    linkInteractionListener = { isExpanded = isExpanded.not() }
                )
            ) {
                withStyle(style = showMoreStyle) {
                    append(showMoreText)
                }
            }
        }
    } else {
        append(text)
    }
}
```
We wrap `withStyle` with `withLink` which provides us the click functionality. We will also add the click functionality to "Show Less" as well.
```kotlin {hl_lines=[5,6,7,8,9,10,11,12,13,14]}
val annotatedText = buildAnnotatedString {
    if (isClickable) {
        if (isExpanded) {
            append(text)
            withLink(
                link = LinkAnnotation.Clickable(
                    tag = "Show Less",
                    linkInteractionListener = { isExpanded = isExpanded.not() }
                )
            ) {
                withStyle(style = showLessStyle) {
                    append(showLessText)
                }
            }
        } else {
            val adjustText = text.substring(startIndex = 0, endIndex = lastCharacterIndex)
                .dropLast(showMoreText.length)
                .dropLastWhile { it.isWhitespace() || it == '.' }
            append(adjustText)
            withLink(
                link = LinkAnnotation.Clickable(
                    tag = "Show More",
                    linkInteractionListener = { isExpanded = isExpanded.not() }
                )
            ) {
                withStyle(style = showMoreStyle) {
                    append(showMoreText)
                }
            }
        }
    } else {
        append(text)
    }
}
```
The final thing to do here is to remove the `clickable` modifier from the Text. 

{{< figure src="/post-expandable-text/ep5.gif" alt="Text with max lines along with show more proper clickable" class="center" >}}

There you have it. The complete implementation of Expandable Text in Jetpack Compose.

One thing to note here is that in older versions of Compose, we had `ClickableText` which is now deprecated. Hence, we are using `LinkAnnotation`.

Here is the complete code. You can find the code in [this repo](https://github.com/mvk059/Portfolio/blob/main/composeApp/src/commonMain/kotlin/fyi/manpreet/portfolio/ui/apps/expandable_text/ExpandableText.kt) as well.
```kotlin
@Composable
fun ExpandableText(
    modifier: Modifier = Modifier,
    text: String,
    collapsedMaxLine: Int = 3,
    showMoreText: String = "Show More",
    showLessText: String = "Show Less",
    style: TextStyle = MaterialTheme.typography.body1,
    textColor: Color = Color.Black,
    showMoreStyle: SpanStyle = SpanStyle(color = Color.Blue, fontWeight = FontWeight.W500),
    showLessStyle: SpanStyle = SpanStyle(color = Color.Blue, fontWeight = FontWeight.W500),
) {

    var isExpanded by remember { mutableStateOf(false) }
    var isClickable by remember { mutableStateOf(false) }
    var lastCharacterIndex by remember { mutableStateOf(0) }

    val annotatedText = buildAnnotatedString {
        if (isClickable) {
            if (isExpanded) {
                append(text)
                withLink(
                    link = LinkAnnotation.Clickable(
                        tag = "Show Less",
                        linkInteractionListener = { isExpanded = !isExpanded }
                    )
                ) {
                    withStyle(style = showLessStyle) {
                        append(showLessText)
                    }
                }
            } else {
                val adjustText = text.substring(startIndex = 0, endIndex = lastCharacterIndex)
                    .dropLast(showMoreText.length)
                    .dropLastWhile { it.isWhitespace() || it == '.' }
                append(adjustText)
                withLink(
                    link = LinkAnnotation.Clickable(
                        tag = "Show More",
                        linkInteractionListener = { isExpanded = !isExpanded }
                    )
                ) {
                    withStyle(style = showMoreStyle) {
                        append(showMoreText)
                    }
                }
            }
        } else {
            append(text)
        }
    }

    Text(
        text = annotatedText,
        modifier = modifier,
        style = style,
        color = textColor,
        maxLines = if (isExpanded) Int.MAX_VALUE else collapsedMaxLine,
        onTextLayout = { textLayoutResult ->
            if (!isExpanded && textLayoutResult.hasVisualOverflow) {
                isClickable = true
                lastCharacterIndex = textLayoutResult.getLineEnd(collapsedMaxLine - 1)
            }
        },
    )
}
```

#### References
* [How to implement Expandable Text in Jetpack Compose](https://medium.com/@munbonecci/how-to-implement-expandable-text-in-jetpack-compose-ca9ba35b645c)
* [Jetpack Compose Text hyperlink some section of the text](https://stackoverflow.com/questions/65567412/jetpack-compose-text-hyperlink-some-section-of-the-text)