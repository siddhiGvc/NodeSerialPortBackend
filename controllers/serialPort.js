const {SerialPort} =require("../models")


const getSerialPorts=async(req,res)=>{
    try{
    
        const obj = await SerialPort.findOne({where:{id:1}});
        if(obj)
        {
        res.status(200).json({data:obj})
        }
        const Data={
            value1:'99'
        }
        res.status(200).json({data:Data});
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

module.exports=getSerialPorts;