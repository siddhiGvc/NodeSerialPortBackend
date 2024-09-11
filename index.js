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

const Value='99';
// List serial ports

SerialPort.list().then(ports => {
 

  // const data=sp.toString().split(',');
  // serials.create({
  //   value1:data[0],
  //   value2:data[1],
  //   value3:data[2],
  //   value4:data[3],
  //   value5:data[4],
  //   value6:data[5]
  // })
   
  ports.forEach(portInfo => {
    //console.log(portInfo);
  
      if ( (portInfo.path.includes("ttyUSB")) || (portInfo.path.includes("ttyUSB") ) )
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
    parser.on('data', async(data)=> {
    
        console.log("Data Received :",data);
        if (data.includes('*') && data.includes('#')) {


          const Data= data.toString();
          const data1=Data.replace('*','');
          const data2=data1.replace('#',',');

          
          
          const dataArray1= data2.split(",");
          console.log(dataArray1[0],dataArray1[4]);
          if(dataArray1[4] =="1")
          {
            console.log("Play Video 1");
            Value='1';

            setTimeout(async()=>{
              Value='99';
            },2000)
          


          }
          else  if(dataArray1[4] =='2')
          {
            console.log("Play Video 2");
            Value='2';

            setTimeout(async()=>{
              Value='99';
            },2000)
          
            
          }
          else  if(dataArray1[4] =='3')
          {
            console.log("Play Video 3");
            Value='3';

            setTimeout(async()=>{
              Value='99';
            },2000)
          
           
          }
          else  if(dataArray1[4] =='4')
          {
            console.log("Play Video 4");
            Value='4';

            setTimeout(async()=>{
              Value='99';
            },2000)
          
          }
          else  if(dataArray1[4] =='5')
          {
            console.log("Play Video 5");
           
            Value='5';

            setTimeout(async()=>{
              Value='99';
            },2000)
          
          }
          else  if(dataArray1[4] =='6')
          {
            console.log("Play Video 6");
            Value='6';

            setTimeout(async()=>{
              Value='99';
            },2000)
          
           
          
          }


          // fs.appendFileSync(`serial_${portInfo.path}.txt`, dataArray[1]+ '\n');
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



const getSerialPorts=async(req,res)=>{
  try{
  
    
          const Data={
              value1:Value
          }
      res.status(200).json({data:Data})
      

     

  }
  catch(err)
  {
      console.log(err);
      res.status(505).json({status:505})
  }

}

module.exports=getSerialPorts;



//   let count=Min;
//   setInterval(async()=>{
  
//   QueryString = '*Q'+count+'#'  
//   await console.log(QueryString);
//   await port.write(QueryString);
//   await count++;
//   if (count > Max)
//     count = Min
// },2000)