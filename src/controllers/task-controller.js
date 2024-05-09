const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const {taskService}=require('../services');

async function createTask(req,res){
   try{
       const taskdata=await taskService.createTask({
        TaskName:req.body.TaskName,
        Description:req.body.Description,
        Deadline:req.body.Deadline,
        status:req.body.status,
        AssignedBy:req.body.AssignedBy,
        AssignedTo:req.body.AssignedTo,
        TaskResponse:req.body.TaskResponse
       });
       SuccessResponse.data=taskdata;
       res.status(StatusCodes.OK).json(SuccessResponse);
   }
   catch(error){
        ErrorResponse.error=error;
        res.status(error.statusCode).json(ErrorResponse);
   }
}

module.exports={
    createTask,

}