

var TobiiConnect = false;
var sendResponsehost = null;
var popport = null;

var contentport = null;

function ConnectToTobii(){
  port = chrome.runtime.connectNative("com.tobiieyex.chromeextension.v4")
  console.log("Port OPEN")
  console.log(port)
 
  port.onMessage.addListener(function(msg) {
    console.log("Got Message:")
    console.log(msg)
    if(popport!=null)
      popport.postMessage({ location: msg });

    if(contentport!=null)
      contentport.postMessage({ location: msg });
    //sendResponse({content: msg});
  })
  port.onDisconnect.addListener(function() {
    renderStatus("Disconnected")
    if(popport!=null)
      popport.postMessage({ disconnected: "true" });

    TobiiConnect=false;
  })
  renderStatus("Waiting")
}

chrome.runtime.onConnect.addListener(function(port){
  if(port.name == "tobiichannel"){
      port.onMessage.addListener(function(response) {
          console.log(response);

          switch(response.msg){

            case "connect":
              popport = port;

              if(TobiiConnect==false){
                ConnectToTobii();
                TobiiConnect=true; 
              }
              break;

            case "trace":
              if(contentport==null)
                port.postMessage({ trace: false });
              else
                port.postMessage({ trace: true });
              break;

          }
      });
      port.onDisconnect.addListener(function() {
        popport = null;
      }); 
  }
  if(port.name == "contentChannel"){
      port.onMessage.addListener(function(response) {
          console.log(response);
          if(response.msg=='connect'){
            contentport = port;
          }
      });
      port.onDisconnect.addListener(function() {
        contentport = null;
      }); 
  }

});


function renderStatus(statusText) {
  console.log(statusText)
}