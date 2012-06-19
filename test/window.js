require(["memphis"], function(memphis) {
    "use strict";

    buster.testCase("Window", {
        "Breakpoint setup": function() {
            var breakpoints = [];
            memphis.window.init();

            assert.same(0, memphis.window.getBreakpoints().length);

            var exc = false;
            try {
                memphis.window.setBreakpoints(200);
            } catch (e) {
                exc = true;
            }

            memphis.window.setBreakpoints([0, 200]);
            assert.same(2, memphis.window.getBreakpoints().length);
        }

        /*"Resize handler": function() {
            var spy1 = this.spy();

            memphis.mediator.subscribe('window.resize', spy1);

            assert.isTrue(spy1.calledOnce);
        }*/
    });
});