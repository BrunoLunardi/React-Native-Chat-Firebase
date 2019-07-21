# React-Native-Chat-Firebase
Chat mobile utilizando React e Firebase

//Inicia projeto
react-native init firebasechat


//////////////////////////React Navigation//////////////////////////
npm install --save react-navigation

npm install --save react-native-gesture-handler

react-native link react-native-gesture-handler


Alterar MainActivity.java:

package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}

//////////////////////////Fim React Navigation//////////////////////////


Evita erro: Task :react-native-gesture-handler:compileDebugJavaWithJavac FAILED

npm i jetifier

npx jetify

//react-native-asyncstorage

npm install --save react-native-asyncstorage

//Firebase

npm install firebase --save

//link Firebase

react-native link

/////Inicia servidor

react-native start

//inicia app no android

react-native run-android

//console

react-native log-android
