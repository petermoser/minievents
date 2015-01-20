function MiniEvents() {
  this._events = {};
}

MiniEvents.prototype.on = function(ev, cb) {
  // make sure _events is available in case this points to mixin object
  if(!this._events) this._events = {};
  // Push the callback to the existing array or create a new array. 
  // This allows multiple listeners for the same event. 
 (this._events[ev] || (this._events[ev]=[])).push(cb);
};

MiniEvents.prototype.emit = function(ev) {
  if(!this._events) this._events = {};
  // allow an arbitrary number of event arguments
  var args = Array.prototype.slice.call(arguments, 1);
  for(i = 0; i < this._events[ev].length; i++) {
    this._events[ev][i].apply(this, args);
  }
};

MiniEvents.prototype.mixin = function(destObj) {
  // transfer MiniEvents properties to the destination object
  var eeProto = MiniEvents.prototype;
  for (var p in eeProto) {
    if(eeProto.hasOwnProperty(p)) {
      destObj.prototype[p] = eeProto[p];
    }
  }
};

// the module object is not available in a browser environment
if(typeof module !== 'undefined')
  module.exports = MiniEvents;
