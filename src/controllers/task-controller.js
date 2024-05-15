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

async function findTask(req,res){
     try{
        const taskDetails=await taskService.findTask(req.params.id);
        SuccessResponse.data=taskDetails;
        res.status(StatusCodes.OK).json(SuccessResponse);
     }
     catch(error){
        ErrorResponse.error=error;
        res.status(error.statusCode).json(ErrorResponse);
     }
}
async function updateTask(req,res){
    try{
       const updateres=await taskService.updateTask(req.params.id,req.body);
       SuccessResponse.data=updateres;
       res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
       ErrorResponse.error=error;
       res.status(error.statusCode).json(ErrorResponse);
    }
}
async function removeTask(req,res){
    try{
       const removeRes=await taskService.removeTask(req.params.id);
       SuccessResponse.data=removeRes;
       res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
       ErrorResponse.error=error;
       res.status(error.statusCode).json(ErrorResponse);
    }
}

async function markTask(req,res){
   try{
      const markResponse=await taskService.markTask(req.params.id,req.body.status);
      SuccessResponse.data=markResponse;
      res.status(StatusCodes.OK).json(SuccessResponse);
   }
   catch(error){
      ErrorResponse.error=error;
      res.status(error.statusCode).json(ErrorResponse);
   }
}
async function addTaskResponse(req,res){

   try{
      const response=await taskService.addTaskResponse(req.params.id,req.body.response);
      SuccessResponse.data=response;
      res.status(StatusCodes.OK).json(SuccessResponse);
   }
   catch(error){
      ErrorResponse.error=error;
      res.status(error.statusCode).json(ErrorResponse);
   }
}

module.exports={
    createTask,
    findTask,
    updateTask,
    removeTask,
    markTask,
    addTaskResponse
}