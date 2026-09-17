# SC Editor Web — Android App

Android WebView wrapper around the SC Editor Web interface.

## Build
Open this folder in Android Studio and run the `app` configuration, or use Gradle:

    ./gradlew assembleDebug

The generated APK is under `app/build/outputs/apk/debug/`.

## What it does
- Runs the web UI offline inside the Android app.
- Lets the user choose `.sc`, `.sc2`, `.sctx` and other files using Android's file picker.
- Provides Objects / Textures / Info and transform inspector UI.

## Limitation
This is the web version packaged as an Android app. It does not yet port the original Java Supercell parser/OpenGL renderer to JavaScript/WebAssembly, so it does not provide full native `.sc` rendering yet.
