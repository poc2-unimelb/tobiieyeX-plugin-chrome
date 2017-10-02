# TobiieyeX jQuery Plugin on Chrome


##Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* **Operating Systems** - Windows
* **Eye Tracking Device** - Tobii EyeX 


### Chrome Extension

* Download the [TobiiEyeX chromeExtension v4](chrome-extension)
* In Chrome go to _More tools -> Extensions_
* Enable _Developer Mode_ on the top right
* Click _Load unpacked extension_
* Load the folder where you put the [TobiiEyeX chromeExtension v4](chrome-extension)
* You should now see the extension at the top of your extension page
* copy the _extension ID_

### C# Native Messaging Application 

* Download the [Native Messaging Application](NativeMessagingExample)

### Windows Manifest

* Download the [Windows Manifest ](manifest/windows)
* Open add-to-registry.reg file  
* Replace `C:\\Users\\SocialNUI\\Documents\\GitHub\\tobiieyeX\\manifest\\windows\\examplemanifest.json` with the path where your examplemanifest.json is located
* Double click add-to-registry.reg to add the manifest to your registry
* Open examplemanifest.json file 
* Replace `C:/Users/SocialNUI/Documents/GitHub/tobiieyeX/NativeMessagingExample/NativeMessagingExample/bin/Debug/NativeMessagingExample.exe ` with the path where your NativeMessagingExample.exe  is located 
* Replace `chrome-extension://nhfcokbgfnleobmdcanighoempgcmeki/` with `chrome-extension://{extension ID}/`
* Click the chrome extension icon at the top right of Google Chrome and click _Connect_
* If setup correctly, the window of NativeMessageTest will launch

