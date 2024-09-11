const express=require("express");

const getSerialPorts =require('../index')
const router = express.Router();



router.get('/getSerialPorts',getSerialPorts);

module.exports=router;