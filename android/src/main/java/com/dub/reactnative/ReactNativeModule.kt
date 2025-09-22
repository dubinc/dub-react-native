package com.dub.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = ReactNativeModule.NAME)
class ReactNativeModule(reactContext: ReactApplicationContext) :
  NativeReactNativeSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "ReactNative"
  }
}
