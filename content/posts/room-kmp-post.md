---
title: "Setup Room in Kotlin Multiplatform"
date: 2024-12-23
draft: false
description: "Setting up Room in version 2.7.0-alpha12"
summary: "Setting up Room in version 2.7.0-alpha12"
tags: ["database"]
categories: ["KMP"]
series: ["KMP"]
author: "Manpreet Kunnath"
showAuthor: true
showDate: true
showReadingTime: true
showWordCount: true
showToc: true
---

Room supports Kotlin Multiplatform. But I think you already knew that. Setting up Room for Android is simple enough. But setting up Room for iOS in newer versions of Room (after alpha05) was trickier than expected.

You can refer [this](https://www.youtube.com/watch?v=IHs0yPa2Nv4&pp=ygUIcm9vbSBrbXA%3D) or [this](https://johnoreilly.dev/posts/jetpack_room_kmp/) article to setup Room with version `2.7.0-alpha01`. But for newer versions of Room, the setup has changed.

With the newer versions of Room, we no longer have to deal with `instantiateImpl` anymore.

# Dependencies
We will setup Room for Android & iOS with compose multiplatform version of **1.7.1** and kotlin version of **2.1.0**.

Add the dependencies of Room & KSP in your `libs.versions.toml` file

```toml
[versions]
compose-multiplatform = "1.7.1" 
kotlin = "2.1.0"                # For reference

room = "2.7.0-alpha12"
ksp = "2.1.0-1.0.29"
sqlite = "2.5.0-alpha12"

[libraries]
room-runtime = { module = "androidx.room:room-runtime", version.ref = "room" }
room-runtime-android = { module = "androidx.room:room-runtime-android", version.ref = "room" }
room-compiler = { module = "androidx.room:room-compiler", version.ref = "room" }
sqlite-bundled = { module = "androidx.sqlite:sqlite-bundled", version.ref = "sqlite" }

[plugins]
ksp = { id = "com.google.devtools.ksp", version.ref = "ksp" }
```

Update your `build.gradle.kts` with these dependencies
```kotlin
plugins {
    // ...
    alias(libs.plugins.ksp)
}

kotlin {
    // ...
    sourceSets {
        commonMain.dependencies {
            // ...
            implementation(libs.room.runtime)
            implementation(libs.sqlite.bundled)
        }
    }
}

dependencies {
    debugImplementation(compose.uiTooling)
    add("kspAndroid", libs.room.compiler)
    add("kspIosSimulatorArm64", libs.room.compiler)
    add("kspIosX64", libs.room.compiler)
    add("kspIosArm64", libs.room.compiler)
}

ksp {
    arg("room.schemaLocation", "$projectDir/schemas")
}
```
The key difference here from earlier versions of room is that instead of adding the `room` block & `ksp compiler` as dependency shown below, were are adding the `ksp` block and adding the Room compiler for multiple targets.
```kotlin
room {
    schemaDirectory("$projectDir/schemas")
}

dependencies {
    ksp(libs.room.compiler)
}
```
Using `ksp(libs.room.compiler)` adds the Room compiler for a single target. But for Room to properly work in multiple targets, we've to add the Room compiler explicitly for each platform. It's more verbose, and it explicitly defines the Room compiler dependency for each target platform we want to support.

Here are the full list of target which room supports as of writing this article.
```kotlin
dependencies {
    // Android
    add("kspAndroid", libs.androidx.room.compiler)
    // JVM (Desktop)
    add("kspJvm", libs.androidx.room.compiler)
    // Linux
    add("kspLinuxX64", libs.androidx.room.compiler)
    add("kspLinuxArm64", libs.androidx.room.compiler)
    // Mac
    add("kspMacosX64", libs.androidx.room.compiler)
    add("kspMacosArm64", libs.androidx.room.compiler)
    // iOS
    add("kspIosSimulatorArm64", libs.androidx.room.compiler)
    add("kspIosX64", libs.androidx.room.compiler)
    add("kspIosArm64", libs.androidx.room.compiler)
}
```
If you are migrating from Room version **2.7.0-alpha01**, you can refer [this post](https://issuetracker.google.com/issues/342905180?pli=1#comment21) to remove all the code that is unnecessary now.

# Database Setup
Add the entities required for the app.
```kotlin
@Entity(tableName = "meme_table")
data class Meme(
    @PrimaryKey(autoGenerate = true) val id: Long = 0L,
    @ColumnInfo(name = "imageUrl") val imageUrl: String,
)
```

Add the DAO for the entities.
```kotlin
@Dao
interface MemeDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMeme(meme: Meme)

    @Query("SELECT * FROM meme_table")
    fun getAllMemes(): Flow<List<Meme>>

    @Delete
    suspend fun deleteMeme(meme: Meme)

}
```

Add the database class. Here is one of the major change required in the newer versions of Room.
```kotlin
@Database(
    entities = [Meme::class],
    version = 1,
    exportSchema = true
)
@ConstructedBy(MemeDatabaseCtor::class)
abstract class MemeDatabase : RoomDatabase() {
    abstract fun memeDao(): MemeDao
}

expect object MemeDatabaseCtor : RoomDatabaseConstructor<MemeDatabase> {
    override fun initialize(): MemeDatabase
}
```
The main difference here is the `RoomDatabaseConstructor`. You don't have to create the `actual` declaration of `MemeDatabaseCtor`.  You just have to annotate the Database class with it using the `@ConstructedBy` annotation.
Room will automatically generate the `actual` implementation of MemeDatabaseCtor with the help of `@ConstructedBy` annotation.

When you build the project at this stage and look into the build directory of the `composeApp`, you will find the generated `actual` implementation.
```kotlin
import androidx.room.RoomDatabaseConstructor

public actual object MemeDatabaseCtor : RoomDatabaseConstructor<MemeDatabase> {
  actual override fun initialize(): MemeDatabase = fyi.manpreet.roomkmp.db.MemeDatabase_Impl()
}
```
This is located in `composeApp/build/generated/ksp/android/androidDebug/kotlin/{package_name}/MemeDatabaseCtor)` for android and `/composeApp/build/generated/ksp/iosSimulatorArm64/iosSimulatorArm64Main/kotlin/{package_name}/MemeDatabaseCtor)`

Create the platform specific database.

Android
```kotlin
fun getMemeDatabase(context: Context): MemeDatabase {
    val dbFile = context.getDatabasePath("meme_table")
    return Room.databaseBuilder<MemeDatabase>(
        context = context,
        name = dbFile.absolutePath
    )
        .setDriver(BundledSQLiteDriver())
        .setQueryCoroutineContext(Dispatchers.IO)
        .build()
}
```
iOS
```kotlin
fun geMemeDatabase(): MemeDatabase {
    val dbFile = documentDirectory() + "/meme_table"
    return Room.databaseBuilder<MemeDatabase>(
        name = dbFile,
    )
        .setDriver(BundledSQLiteDriver())
        .setQueryCoroutineContext(Dispatchers.IO)
        .build()
}

@OptIn(ExperimentalForeignApi::class)
private fun documentDirectory(): String {
    val documentDirectory = NSFileManager.defaultManager.URLForDirectory(
        directory = NSDocumentDirectory,
        inDomain = NSUserDomainMask,
        appropriateForURL = null,
        create = false,
        error = null,
    )
    return requireNotNull(documentDirectory?.path)
}
```

# UI Setup
For demonstration, we'll keep the setup pretty simple. Create a DAO from each platform and pass it to the `App` composable. The `App` composable will display the list of memes and on click of it, delete it.
```kotlin
@Composable
@Preview
fun App(dao: MemeDao) {
    MaterialTheme {
        val memes by dao.getAllMemes().collectAsState(initial = emptyList())
        val scope = rememberCoroutineScope()

        LaunchedEffect(true) {
            listOf(
                Meme(imageUrl = "Meme URL 1"),
                Meme(imageUrl = "Meme URL 2"),
                Meme(imageUrl = "Meme URL 3"),
            ).map {
                dao.insertMeme(it)
            }
        }

        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
        ) {
            items(memes) { meme ->
                Text(
                    text = meme.imageUrl,
                    modifier = Modifier.fillMaxWidth().padding(16.dp)
                        .clickable { scope.launch { dao.deleteMeme(meme) } }
                )
            }
        }
    }
}
```

Run & test it in both android & iOS, and it should be working correctly.

There you have it. Room setup in Android & iOS in Kotlin Multiplatform. The complete repo can be found [here](https://github.com/mvk059/RoomKMP)

### Reference
[Using Jetpack Room in Kotlin Multiplatform shared code](https://johnoreilly.dev/posts/jetpack_room_kmp/)

[Google IssueTracker](https://issuetracker.google.com/issues/342905180?pli=1#comment21)

[Sample with version alpha06](https://github.com/danysantiago/RoomKmpLibraryExample)

[Sample with version alpha01](https://github.com/philipplackner/Room-CMP/tree/master)