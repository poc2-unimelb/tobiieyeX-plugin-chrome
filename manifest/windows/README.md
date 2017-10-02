## Windows Manifest Instructions

* Download [examplemanifest.json](./examplemanifest.json) and [add-to-registry.reg](./add-to-registry.reg)
* Open add-to-registry.reg file  
* Replace `C:\\Users\\SocialNUI\\Documents\\GitHub\\tobiieyeX\\manifest\\windows\\examplemanifest.json` with the path where your examplemanifest.json is located
* Double click add-to-registry.reg to add the manifest to your registry
* Open examplemanifest.json file 
* Replace `C:/Users/SocialNUI/Documents/GitHub/tobiieyeX/NativeMessagingExample/NativeMessagingExample/bin/Debug/NativeMessagingExample.exe ` with the path where your NativeMessagingExample.exe is located 
* Replace `chrome-extension://nhfcokbgfnleobmdcanighoempgcmeki/` with `chrome-extension://{extension ID}/`
* Click the chrome extension icon at the top right of Google Chrome and click _Connect_
* If setup correctly, the window of NativeMessageTest will launch
