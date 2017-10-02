# jquery.tobiieyeX.js

Download the [Sample Website](#)

## Example jQuery plugin Usage

### eyeIn

_Action_ function will be triggered as long as the number of gaze on the _obj_ is over _threshold_

```js
$( obj ).eyeIn(action,threshold);
function action(){};
```

### eyeOut

Gaze point needs to be in the _obj_ area first.

_Action_ function will be triggered as long as the number of gaze outside of _obj_ area is over _threshold_.

```js
$( obj ).eyeOut(action,threshold);
function action(){};
```
### eyeFix

_Action_ function will be triggered as long as the number of gaze on the _obj_ is over _fixation_ millisecond.

```js
$( obj ).eyeFix(action,fixation);
function action(){};
```

### currentGazeElement

Specify the _elementTag_ first and _curObj_ is the most recently gaze object. 

```js
var curObj = $.currentGazeElement(elementTag);
```

### eyeSuspend

_Action_ function will be triggered when detecting the suspend event.

```js
$.eyeSuspend(action);
function action(){};
```

### eyeOutWindow

Gaze point needs to be in the window first.

_Action_ function will be triggered as long as the number of gaze outside of the window is over _threshold_.

```js
$.eyeOutWindow(action,threshold);
function action(){};
```

### topGazeElement

Specify the _elementTag_ first and number of elements you want to retrieve.

_topGazeElements_ are the most popular gaze elements.

```js
var topGazeElements = $.topGazeElement(number,elementTag);
for (var i = 0; i < topGazeElements.length; i++){
          topGazeElements[i].css('color','red');    
        }
```

## Example Event Usage

### gazePointMove

Event _gazePointMove_ will be triggered as long as the gaze point updates.

```js
$(document).unbind('gazePointMove',gazePointMoveFunction);
function gazePointMoveFunction(evt, point) {
        var x = point.x;
        var y = point.y;
    };
```



### gazeObject

Event _gazeObject_ will be triggered as long as the gaze point moves into predefined element area.

```js
$(document).bind('gazeObject',getGazeObjectFunction);
function getGazeObjectFunction(evt, element) {
         var getGazeObjec = element;
         if(getGazeObjec.tagName=='SPAN'){
         ...... 
         }
    };
```

