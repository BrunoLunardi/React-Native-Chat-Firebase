# React-Native-Chat-Firebase
Chat mobile utilizando React e Firebase



//Inicia projeto
react-native init firebasechat


//////////////////////////React Navigation//////////////////////////
npm install --save react-navigation
npm install --save react-native-gesture-handler
react-native link react-native-gesture-handler

MainActivity.java:

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



















//auxilia na navegação com javascript
# npm install --save react-native-gesture-handler
npm install --save react-native-gesture-handler
react-native link react-native-gesture-handler

Authentication flows
https://reactnavigation.org/docs/en/auth-flow.html
	Set up our navigators	
	Implement our authentication loading screen

////////////////////////////////////////////////////////////////
Erro: error React Native CLI uses autolinking for native dependencies, but the following modules are linked manually:  - react-native-gesture-handler (to unlink run: "react-native unlink react-native-gesture-handler")
Solução: https://github.com/kmagiera/react-native-gesture-handler/issues/671
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
Erro:
Task :react-native-gesture-handler:compileDebugJavaWithJavac FAILED
Solução:
npm install react-native-gesture-handler@1.0.5
npm i jetifier
npx jetify
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
Erro:
Unable to resolve module `react-navigation'
Solução:
npm install react-navigation --save
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
Erro:
null is not an object ( evaluating 'RNGestureHandlerModule.Direction') 
Solução:


Isso acontece por conta de um problema com a versão 3.0. Eu recomendo a utilização da versão 2.18.2

Passos para o downgrade:

> npm uninstall react-navigation

> npm install react-navigation@2.18.2 --save

Iniciar pacote:

react-native start --reset-cache

Rodar o app:

react-native run-android

////////////////////////////////////////////////////////////////
Baixar ícones:

www.flaticon.com/packs/stylish-icons
