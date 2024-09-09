const express=require("express");

const getSerialPorts =require('../controllers/serialPort')
const router = express.Router();



router.get('/getSerialPorts',getSerialPorts);

module.exports=router;