require(["memphis"], function(memphis) {
    "use strict";

    buster.testCase("PubSub", {
        "test Subscribe": function() {
            memphis.mediator.subscribe('test', function() {});
            memphis.mediator.subscribe('test2', function() {});

            assert.isTrue(memphis.mediator.channels.hasOwnProperty('test'), "1st channel exists");
            assert.isTrue(memphis.mediator.channels.hasOwnProperty('test2'), "channel exists");

            assert.same(1, memphis.mediator.channels.test.length, "1st channel length");
            assert.same(1, memphis.mediator.channels.test2.length, "2nd channel length");

            memphis.mediator.clear('test');

            assert.isTrue(!memphis.mediator.channels.hasOwnProperty('test'), "1st channel cleared");
            assert.isTrue(memphis.mediator.channels.hasOwnProperty('test2'), "2nd channel exists");

            memphis.mediator.clear('test2');
            assert.isTrue(!memphis.mediator.channels.hasOwnProperty('test2'), "2nd channel cleared");
        },

        "Publish and Subscribe": function() {
            var idx = 0;
            var f = function() {
                idx += 1;
            };

            memphis.mediator.subscribe('test', f);

            memphis.mediator.publish('test');

            assert.same(idx, 1, "Publish 1");

            memphis.mediator.publish('test');

            assert.same(idx, 2, "Publish 2");

            memphis.mediator.clear('test');
        },

        "Unsubscribe": function() {
            var idx = 0;
            var f = function() {
                idx += 1;
            };

            memphis.mediator.subscribe('test', f);

            memphis.mediator.publish('test');

            assert.same(idx, 1, "Publish 1");

            memphis.mediator.unsubscribe('test', f);
            memphis.mediator.publish('test');

            assert.same(idx, 1, "Publish 2");

            memphis.mediator.clear('test');
        },

        "Install to": function() {
            expect(3);

            var obj = {};

            memphis.mediator.installTo(obj);

            assert.isTrue(obj.hasOwnProperty('subscribe'), "has subscribe");
            assert.isTrue(obj.hasOwnProperty('unsubscribe'), "has unsubscribe");
            assert.isTrue(obj.hasOwnProperty('publish'), "has publish");
        }
    });
});