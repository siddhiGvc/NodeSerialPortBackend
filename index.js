const SerialPort = require('serialport');

// List serial ports
SerialPort.list().then(ports => {
  console.log('Available serial ports:');
  ports.forEach(port => {
    console.log(port.path);
  });
}).catch(err => {
  console.error('Error listing serial ports:', err);
});
