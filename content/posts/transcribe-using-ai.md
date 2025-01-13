---
title: "Transcribe Audio using AI in Compose Multiplatform"
date: 2025-01-13
draft: false
description: "Use Groq AI to transcribe data in Jetpack Compose"
summary: "Use Groq AI to transcribe data in Jetpack Compose"
tags: [ "UI" ]
categories: [ "CMP" ]
series: [ "CMP" ]
author: "Manpreet Kunnath"
showAuthor: true
showDate: true
showReadingTime: true
showWordCount: true
showToc: true
---
We will be using [Groq AI](https://groq.com/) to transcribe audio to text in Compose Multiplatform.

{{< figure src="/post-transcribe-audio/ep1.gif" alt="Transcribe Audio" class="center" >}}

# Getting the API Key
We need to get the API key from Groq. Create a free account from [this link](https://console.groq.com/). 
Then, go to the `API Keys` section and create a new API key.

{{< figure src="/post-transcribe-audio/ep2.png" alt="API Key" class="center" >}}

One thing to note here is that [Groq](https://groq.com/) is not related to Twitter/X [Grok](https://x.ai/).

<br/>

# Dependency setup
Groq provides REST APIs to transcribe the data among other things. While that is good, there is a Kotlin library that provides a wrapper around the Groq API.
[This library](https://github.com/vyfor/groq-kt) describes itself as an idiomatic Kotlin Multiplatform library for the Groq API.

You can check out the [repo](https://github.com/vyfor/groq-kt) for all the benefits it provides. 

Another thing to not here is that [grok-kt](https://github.com/vyfor/groq-kt) repository is not an official wrapper of [Groq](https://groq.com/).

Let us now add the required dependencies. Add the groq and ktor dependency in the `libs.versions.toml` file.
```kotlin
[versions]
groq = "0.1.1"
ktor = "3.0.2"

[libraries]
ktor-client-core = { group = "io.ktor", name = "ktor-client-core", version.ref = "ktor" }
ktor-client-android = { group = "io.ktor", name = "ktor-client-android", version.ref = "ktor" }
ktor-client-darwin = { group = "io.ktor", name = "ktor-client-darwin", version.ref = "ktor" }

groq = { module = "io.github.vyfor:groq-kt", version.ref = "groq"}
```

Add these dependencies in the `build.gradle.kts` file.
```kotlin
kotlin {
    sourceSets {
        androidMain.dependencies {
            implementation(libs.ktor.client.android)
        }
        commonMain.dependencies {
            implementation(libs.kotlinx.serialization)
            implementation(libs.ktor.client.core)
            implementation(libs.groq)
        }
        iosMain.dependencies {
            implementation(libs.ktor.client.darwin)
        }
    }
}
```

<br/>

# Storing API Key
There are various ways of storing and fetching the API keys securely. We will use the expect/actual pattern and fetch it from the `local.properties` file in Android and from `Config.plist` in iOS. You can use other more secure ways as well.

We will create a file called `Enviroment` containing the `expect` function. Implement this in Android & iOS.
```kotlin
expect fun getApiKey(): String
```

## Android
We will get the API key from the `local.properties` file in Android. Here is the setup for it.

Update the `Environment.android.kt` file.
```kotlin
actual fun getApiKey(): String = BuildConfig.GROQ
```

Update the `build.gradle.kts` file.
```kotlin
android {

    buildFeatures {
        buildConfig = true
    }

    defaultConfig {
        buildConfigField("String", "GROQ", "\"${getLocalProperty("groq")}\"")
    }
}

// Outside all the blocks
fun getLocalProperty(key: String): String {
    val localProperties = Properties().apply {
        val localPropertiesFile = rootProject.file("local.properties")
        if (localPropertiesFile.exists()) {
            load(FileInputStream(localPropertiesFile))
        }
    }
    return localProperties.getProperty(key) ?: ""
}
```
Add the API key in the `local.properties` file. Rebuild the project and `BuildConfig.GROQ` should have been generated. 

## iOS
There might be better ways that what I am about to do here as I am not as good in iOS as I am in android. So if there are any better ways to get the key securely in iOS, please implement that instead of the following.

We will create `Config.plist` file which will hold the API key and this plist file will be ignored from version control. 

To create the `Config.plist` file, in Xcode, 
* Right-click on your project navigator (left sidebar)
* Select "New File..."
* Choose "Property List" under Resource types
* Name it "Config.plist"
* Make sure it is added to your app target

Add the API key to the `Config.plist` file.
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>GROQ</key>
    <string>your_api_key_here</string>
</dict>
</plist>
```

Update the `Environment.ios.kt` file.
```kotlin
actual fun getApiKey(): String {
    val bundle = NSBundle.mainBundle
    val configPath = bundle.pathForResource("Config", "plist") ?: error("Config.plist not found")
    val config = NSDictionary.dictionaryWithContentsOfFile(configPath) ?: error("Could not read Config.plist")
    return config["GROQ"] as? String ?: error("GROQ not found in Config.plist")
}
```

<br/>

# Audio Files
We can either store the audio file locally or provide a URL. We will work with a remote audio file for simplicity. 

If you are using a local file, then fetch it from the internal or external folder of the app and provide the full path.  

<br/>

# Groq Client Setup
Let us create a `TranscribeAudioViewModel` class where we will initiate the Groq client.

We can initialise the client as follows.
```kotlin
private val client: GroqClient by lazy {
    GroqClient(apiKey = getApiKey())
}
```

To transcribe audio through the Groq client, we need the audio file, a filename and the model that will actually transcribe the audio.
```kotlin
val result: Result<GroqResponse<AudioTranscription>> = client.transcribeAudio {
    model = GroqModel.DISTIL_WHISPER_LARGE_V3_EN
    filename = "Audio"
    // Replace this with your audio of choice.
    url = "https://cdn.pixabay.com/download/audio/2024/08/04/audio_be9247e137.mp3?filename=girl-ix27ve-never-been-out-of-the-village-before-229855.mp3"
    // file("path/to/audio.mp3") // For local files
}
```

We will also create a `TranscribeAudioState` class.
```kotlin
data class TranscribeAudioState(
    val isLoading: Boolean = false,
    val transcribeAudio: String? = null,
    val error: String? = null
)
```

Putting it all together, we have the following code.
```kotlin
data class TranscribeAudioState(
    val isLoading: Boolean = false,
    val transcribeAudio: String? = null,
    val error: String? = null
)

class TranscribeAudioViewModel : ViewModel() {

    private val _state = MutableStateFlow(TranscribeAudioState())
    val state = _state.asStateFlow()

    private val client: GroqClient by lazy {
        GroqClient(apiKey = getApiKey())
    }

    fun transcribe() {
        _state.update { it.copy(isLoading = true) }

        viewModelScope.launch {

            val result: Result<GroqResponse<AudioTranscription>> = client.transcribeAudio {
                model = GroqModel.DISTIL_WHISPER_LARGE_V3_EN
                filename = "Audio"
                url =
                    "https://cdn.pixabay.com/download/audio/2024/08/04/audio_be9247e137.mp3?filename=girl-ix27ve-never-been-out-of-the-village-before-229855.mp3"
            }
            if (result.isFailure) {
                _state.update {
                    it.copy(
                        isLoading = false,
                        error = result.exceptionOrNull()?.message
                    )
                }
                return@launch
            }
            if (result.isSuccess) {
                _state.update {
                    it.copy(
                        isLoading = false,
                        transcribeAudio = result.getOrNull()?.data?.text
                    )
                }
            }
        }
    }
}

```
I've ignored the internet check here for simplicity. Also, add the internet permission in the android manifest file.

<br />

# UI Setup
Let's create a basic UI to display the transcribed audio.
```kotlin
@Composable
fun TranscribeAudio(
    modifier: Modifier = Modifier,
    viewModel: TranscribeAudioViewModel = TranscribeAudioViewModel()
) {

    val state = viewModel.state.collectAsStateWithLifecycle()

    TranscribeAudioContent(
        modifier = modifier,
        state  = state,
        onTranscribeClick = viewModel::transcribe
    )
}

@Composable
private fun TranscribeAudioContent(
    modifier: Modifier = Modifier,
    state: State<TranscribeAudioState>,
    onTranscribeClick: () -> Unit,
) {
    Box(
        modifier = modifier.fillMaxSize()
    ) {

        Column(
            modifier = Modifier.fillMaxSize()
        ) {

            Button(onClick = onTranscribeClick) {
                Text(text = "Transcribe Audio")
            }

            if (state.value.transcribeAudio != null) {
                Text(
                    text = state.value.transcribeAudio ?: "",
                    color = Color.Blue,
                    fontSize = 20.sp,
                )
            }

            if (state.value.error != null) {
                Text(
                    text = state.value.error ?: "",
                    color = Color.Red,
                    fontSize = 20.sp,
                )
            }
        }

        if (state.value.isLoading) {
            Box(modifier = Modifier.fillMaxSize()) {
                CircularProgressIndicator(
                    modifier = Modifier.width(64.dp).align(Alignment.Center),
                    color = Color.Red,
                )
            }
        }
    }
}
```

There you have it. Audio transcription using AI in Compose Multiplatform. The `grok-kt` library also supports chat completion and streaming. 

You can find the complete code in [this repository](https://github.com/mvk059/Portfolio/tree/main/composeApp/src/commonMain/kotlin/fyi/manpreet/portfolio/ui/apps/transcibe_audio). This repository contains other code as well which you can checkout. 

{{< figure src="/post-transcribe-audio/ep1.gif" alt="Transcribe Audio" class="center" >}}

## Reference
Sound Effect by <a href="https://pixabay.com/users/lucy_voice_character-45274742/">Lucy_voice_character</a> from <a href="https://pixabay.com/sound-effects/">Pixabay</a>