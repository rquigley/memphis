##Memphis

Memphis is Javascript library to assist in the creation of websites. It currently has two components, a mediator implementation to force separation of concerns while maintaining communication within an app and a window resize and breakpoint manager built to deal with functionality changes brought on by CSS media-queries and browser resizing.

It comprises the following components:

* **Mediator based event system**
* **Window resize and breakpoint manager**
* **Utilities**

###Mediator based event system
For communication between components, we want to minimize coupled code. The mediator pattern provides the ability to decouple direction connections between components and instead allow them to listen for changes from the central Memphis core. 

```javascript
memphis.mediator.subscribe('test', function() {
	console.log("Test Fired");
});
memphis.mediator.publish('test');
```

###Window resize and breakpoint manager
The breakpoint manager is a compliment to CSS media queries. Unlike matchMedia(), the Memphis breakpoint manager doesn't require adding resize listeners for every component as the breakpoint events are only fired when entering or leaving a media query.


```javascript
memphis.mediator.subscribe('window.resize', function(viewport) {
	console.log(viewport);
});

memphis.window.init([0, 480, 680, 980]);

memphis.mediator.subscribe('window.breakpoint', function(viewport) {
	console.log(viewport);
});
memphis.mediator.subscribe('window.breakpoint.in480', function(viewport) {
	console.log(viewport);
});
memphis.mediator.subscribe('window.breakpoint.out480', function(viewport) {
	console.log(viewport);
});

```

###Dependencies

jQuery 1.6+ for window dimensions and events, require.js

###Tests

To run the automated tests, open test/runner.html in a web browser.
