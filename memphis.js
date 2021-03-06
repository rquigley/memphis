define([
    'jquery'
], function($) {
    "use strict";

    var memphis = {};

    memphis.mediator = (function() {
        var channels = {};

        function subscribe(channel, fn) {
            if (!channels[channel]) {
                channels[channel] = [];
            }

            channels[channel].push({
                context: this,
                callback: fn
            });
        }

        function unsubscribe(channel, fn) {
            var i, l,
                ch;

            if (!channels[channel]) {
                return;
            }
            ch = channels[channel];

            for (i = 0, l = ch.length; i < l; i++) {
                if (fn === ch[i].callback) {
                    channels[channel] = ch.slice(0,i).concat(ch.slice(i+1));
                    return;
                }
            }
        }

        function publish(channel) {
            var args,
                i, l,
                subscription;

            if (!channels[channel]) {
                return;
            }

            args = Array.prototype.slice.call(arguments, 1);

            for (i = 0, l = channels[channel].length; i < l; i++) {
                subscription = channels[channel][i];
                subscription.callback.apply(subscription.context, args);
            }
        }
        
        function clear(channel) {
            if (!channels[channel]) {
                return;
            }

            delete channels[channel];
        }

        return {
            channels: channels,
            publish: publish,
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            clear: clear,
            installTo: function(obj) {
                obj.subscribe = subscribe;
                obj.unsubscribe = unsubscribe;
                obj.publish = publish;
            }
        };
    }());

    memphis.mediator.installTo(memphis);

    memphis.window = (function() {
        var win = $(window),
            viewport = {
                currBreakpoint: null,
                lastBreakpoint: null,
                width: 0,
                height: 0
            },
            breakpoints = [];

        function init(breakpoints) {
            if (breakpoints) {
                setBreakpoints(breakpoints);
            }

            viewport.width = win.width();
            viewport.height = win.height();

            win.on('resize', debounce(onResizeHandler, 300));

            breakpointHandler();
        }

        function getViewport() {
            return viewport;
        }

        function getBreakpoints() {
            return breakpoints;
        }

        function setBreakpoints(bps) {
            breakpoints = bps;
        }

        function onResizeHandler() {
            var w = win.width(),
                h = win.height();

            if (w === viewport.width && h === viewport.height) {
                return;
            }
            viewport.width = w;
            viewport.height = h;

            memphis.publish('window.resize', viewport);

            breakpointHandler();
        }

        function breakpointHandler() {
            var bp,
                selBp = 1;

            if (!breakpoints.length) {
                return;
            }

            for (var n in breakpoints) {
                if (breakpoints[n] < viewport.width) {
                    selBp = breakpoints[n];
                }
            }

            if (selBp === viewport.currBreakpoint) {
                return;
            }

            if (viewport.currBreakpoint) {
                viewport.lastBreakpoint = viewport.currBreakpoint;
            }
            viewport.currBreakpoint = selBp;

            memphis.publish('window.breakpoint', viewport);

            if (viewport.lastBreakpoint) {
                memphis.publish('window.breakpoint.out'+viewport.lastBreakpoint, viewport);
            }
            memphis.publish('window.breakpoint.in'+viewport.currBreakpoint, viewport);
        }

        return {
            init: init,
            getViewport: getViewport,
            getBreakpoints: getBreakpoints,
            setBreakpoints: setBreakpoints
        };
    }());

    memphis.getViewport = memphis.window.getViewport;

    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    function debounce(func, threshold, execAsap) {
        var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap) {
                    func.apply(obj, args);
                }
                timeout = null; 
            }

            if (timeout) {
                clearTimeout(timeout);
            } else if (execAsap) {
                func.apply(obj, args);
            }

            timeout = setTimeout(delayed, threshold || 100); 
        };
    }

    memphis.utils = {
        debounce: debounce
    };


    window.memphis = memphis;

    return memphis;
});
