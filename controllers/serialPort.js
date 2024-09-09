const {SerialPort} =require("../models")


const getSerialPorts=async(req,res)=>{
    try{
    
        const obj = await SerialPort.findAll();
       
        res.status(200).json({data:obj[0]})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

module.exports=getSerialPorts;