# MiniEvents

MiniEvents is an abbreviated and small implementation of a Node-like EventEmmitter class.

## Usage

```
var ee = new MiniEvents();

ee.on('say', function(arg1, arg2, arg3) {
  console.log(arg1, arg2, arg3);
});

ee.emit('say', 'how', 'are', 'you?');
```

