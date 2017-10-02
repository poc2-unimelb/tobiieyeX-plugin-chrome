# jquery.tobiieyeX.js

Download the [Sample Website](#)

## Example jQuery plugin Usage

### eyeIn

```js
$( obj ).eyeIn(function,threshold);
```
### eyeOut

```js
$( obj ).eyeOut(function,threshold);
```
### eyeFix

```js
$( obj ).eyeFix(function,fixation);
```

### currentGazeElement

```js
var curObj = $.currentGazeElement(elementTag);
```

### eyeSuspend

```js
$.eyeSuspend(function);
```

### eyeOutWindow

```js
$.eyeOutWindow(function,threshold);
```

### topGazeElement

```js
var topGazeElements = $.topGazeElement(number,elementTag);
```

## Example Event Usage

###gazePointMove

```js
$(document).unbind('gazePointMove',gazePointMoveFunction);
function gazePointMoveFunction(evt, point) {
        var x = point.x;
        var y = point.y;
    };
```


###gazeObject

```js
$(document).bind('gazeObject',getGazeObjectFunction);
function getGazeObjectFunction(evt, element) {
         var getGazeObjec = element;
         if(getGazeObjec.tagName=='SPAN'){
         ...... 
         }
    };
```

