const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const {userService}=require('../services');

async function createUser(req,res){
   try{
       const userdata=await userService.createUser({
        UserName:req.body.UserName,
        Name:req.body.Name,
        email:req.body.email,
        password:req.body.password
       });
       SuccessResponse.data=userdata;
       res.status(StatusCodes.OK).json(SuccessResponse);
   }
   catch(error){
        ErrorResponse.error=error;
        res.status(error.statusCode).json(ErrorResponse);
   }
}
async function getUserSpecificTask(req,res){
    try{
        const allTasks=await userService.getUserSpecificTask(req.params.id);
        SuccessResponse.data=allTasks;
        res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
         ErrorResponse.error=error;
         res.status(error.statusCode).json(ErrorResponse);
    }
 }

module.exports={
    createUser,
    getUserSpecificTask

}
