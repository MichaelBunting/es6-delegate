# ES6 Delegate

Simple, flexible function used for delegating events in JavaScript.

## Installation
Install with npm/yarn:

```
yarn add es6-delegate
```

Then import into a javascript file you want to use it in:

```js
import delegate from 'es6-delegate';
```

## Preface
This plugin is built using ES6, transpiled into es6 export, and doesnt include any polyfills out of the box. If you plan to support legacy browsers, you'll need to add the appropriate polyfills.

## Usage
ES6 delegate has 4 parameters that work around what you pass to it. The 4 parameters are:

* `elements {String|Node|NodeList}` - String, Node, or NodeList to bind the actual event to
    * e.g. `'.container'`, `document`, `document.querySelectorAll('.form')`
* `eventListeners {String}` - Space separated list of events
    * e.g. `'click'`, `'click focus'`
* `selector {String|Node|NodeList}` - String, Node, or NodeList used to determine if the event should be triggered
    * e.g. `'.btn'`, `document.getElementById('btn1')`, `document.querySelectorAll('.btn')`
* `callback {Function}` - Function called when event is triggered
    * e.g `(event, element) => { console.log(event, element) }`

### Defaulting element to `document`
```js
delegate('click', '.btn', (e, ele) => {
    // Event object
    const eventObj = e;
    // Element that triggered event - '.btn'
    const targetElement = ele;
    // Array of Elements that event is bound to - [document]
    const boundElement = e.relatedElements;
});
```

### Passing string as element
```js
delegate('.container', 'click', '.btn', (e, ele) => {
    // ele is NodeList of '.btn'
    // e.relatedElements is Array of '.container' elements
});
```

### Passing node as element
```js
const body = document.body;
delegate(body, 'click', '.btn', (e, ele) => {
    // e.relatedElements is Array of 'body' elements
});
```

### Passing nodelist as element
```js
const forms = document.querySelectorAll('.form');
delegate(forms, 'click', '.btn', (e, ele) => {
    // e.relatedElements is array of forms
});
```

### Passing multiple events
```js
delegate('click focus', '.btn', () => {
    // Function will fire when a '.btn' is clicked or focused
});
```

### Passing string as selector
```js
delegate('click', '.btn', (e, ele) => {
    // ele will be the '.btn' that was clicked
});
```

### Passing node as selector
```js
const btn1 = document.getElementById('btn1');
delegate('click', btn1, (e, ele) => {
    // ele is btn1
});
```

### Passing nodelist as selector
```js
const allBtns = document.querySelectorAll('.btn');
delegate('click', allBtns, (e, ele) => {
    // ele is button clicked from allBtns
});
```

## Unbinding Events
The delegate function returns the method it bound the event with for ease of use when unbinding events.

```js
// Bind method
const method = delegate('click', '.btn', (e, ele) => {});

// Unbind method
document.removeEventListener('click', method, true);
```