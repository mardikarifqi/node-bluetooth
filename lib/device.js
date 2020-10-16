const EventEmitter = require('events');
const { DeviceINQ } = require('bindings')('BluetoothSerialPort.node');

class Device extends inherits(DeviceINQ, EventEmitter) {
  scan(){
    const list = [];
    return new Promise((resolve, reject) => {
      this.once('error', reject);
      const found = (address, name) => {
        list.push({ address, name });
        this.emit('found', address, name);
      }
      const finished = () => {
        resolve(list)
        this.emit('finished', list)
      }
      return this.inquire(devices => {
        for (const device of devices) {
          found(device.address, device.name)
        }
        finished()
      })
    });
  }
}

/**
 * [inherits description]
 * @param  {[type]} target [description]
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 */
function inherits(target, source) {
  var k;
  for (k in source.prototype) {
    target.prototype[k] = source.prototype[k];
  }
  return target;
}

module.exports = Device;
