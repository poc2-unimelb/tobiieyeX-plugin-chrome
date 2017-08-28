var port = chrome.runtime.connect({ name: "tobiichannel" });

port.postMessage({ msg: "trace" });

port.onMessage.addListener(function(response) {
  console.log(response);
    if(response.location !=null){
        console.log(response.location);
        renderXLocation(response.location.x)
        renderYLocation(response.location.y)
      }
    if(response.disconnected!=null){
      console.log(response.disconnected);
      document.getElementById("connectBtn").disabled = false;
    }
    if(response.trace!=null){
      console.log(response.trace);
      document.getElementById("traceBtn").disabled = response.trace;
    }
});

window.addEventListener("load", function() {
  document.getElementById("connectBtn").addEventListener("click", function() {
        port.postMessage({ msg: "connect" });
        document.getElementById("connectBtn").disabled = true;
  })

  document.getElementById("traceBtn").addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { msg: "open_trace"  }, function(response) {
                console.log(response);
            });
        });
  })

})


function renderStatus(statusText) {
  console.log(statusText)
  document.getElementById('response').innerText = statusText
}
function renderXLocation(location) {
  document.getElementById('xlocation').innerText = location
}
function renderYLocation(location) {
  document.getElementById('ylocation').innerText = location
}
