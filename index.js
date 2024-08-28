const { SerialPort: serials } = require("./models");


// ver 1.3
// able to store commands of diffrent port on diffrent files
// ver 1.3
// able to capture data and display on string
// ver 1.2
// data being sent and received okay
// ver 1.1
// send *Qx# to *Qy# where x is Min and y is Max
// ver 1.0
// open port which has USB inside in name
// working

const fs=require('fs');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')
const Max = 5
const Min = 1;
var QueryString;
var ReceivedString;
var port;
var parser;
var temp;
var StartCapture;
const serialPorts=[];
// List serial ports

SerialPort.list().then(ports => {
  const sp=fs.readFileSync("serialport.txt");
  console.log(sp.toString());

  const data=sp.toString().split(',');
  serials.create({
    value1:data[0],
    value2:data[1],
    value3:data[2],
    value4:data[3],
    value5:data[4],
    value6:data[5]
  })
   
  ports.forEach(portInfo => {
    //console.log(portInfo);
    if (portInfo.manufacturer.includes("FTDI"))
    {
    console.log('Port path:', portInfo.path); // Log the path of each serial port
    port = new SerialPort({
      path:portInfo.path,
      baudRate:115200,
//      parser: SerialPort.parsers.readline('#'),
    }); // Create a new SerialPort instance for each port
   // console.log(port);
   // console.log(typeof(port));
    parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
    parser.on('data', data => {
    
   
        if (data.includes('*') && data.includes('#')) {

          const Data= data.toString();
          const dataArray= Data.split("main:");
          console.log(dataArray[1]);
          fs.appendFileSync(`serial_${portInfo.path}.txt`, dataArray[1]+ '\n');
        }
    });
  }

  // Listen for data
    
    // Handle errors
    // port.on('error', err => {
    //   console.error('Error:', err);
    // });
    
    // Close the port when done
    // port.close();
  });
}).catch(err => {
  console.error('Error listing serial ports:', err);
});



//   let count=Min;
//   setInterval(async()=>{
  
//   QueryString = '*Q'+count+'#'  
//   await console.log(QueryString);
//   await port.write(QueryString);
//   await count++;
//   if (count > Max)
//     count = Min
// },2000)