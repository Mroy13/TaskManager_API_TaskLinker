const StatusCode = require('http-status-codes');
const { taskRepository, taskFilesRepository } = require('../repositories');
const Apperror = require('../utils/error/App-error');

const TaskRepository = new taskRepository();
const TaskFilesRepository = new taskFilesRepository();

async function createTask(data, fileDetails) {
   try {
      const res = await TaskRepository.create(data);
      fileDetails.taskId = res.id;

      //add fileDetails to DB if preseent
      if (fileDetails.fileName != undefined) {
         const taskfileDetails = await TaskFilesRepository.create(fileDetails);
         res.dataValues.taskFileName = taskfileDetails.fileName;
      }
      return res;
   }
   catch (error) {
      if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
         const errorArray = [];
         error.errors.forEach(err => {
            errorArray.push(err.message);
         });
         throw new Apperror(errorArray, StatusCode.BAD_REQUEST);
      }
      else {
         throw new Apperror("server side probelem", StatusCode.INTERNAL_SERVER_ERROR);
      }
   }
}



async function findTask(data) {
   try {
      const res = await TaskRepository.get(data);
      return res;
   }
   catch (error) {
      if (error instanceof Apperror) {
         throw error;
      }
      else {
         throw new Apperror("server side problem", StatusCode.INTERNAL_SERVER_ERROR);
      }
   }
}



async function updateTask(id, data) {
   try {
      const res = await TaskRepository.update(id, data);
      return res;
   }
   catch (error) {
      if (error instanceof Apperror) {
         throw error;
      }
      else {
         if (error.name == 'SequelizeDatabaseError') {
            const msg = error.message;
            throw new Apperror(msg, StatusCode.BAD_REQUEST);
         }
         throw new Apperror("server side problem", StatusCode.INTERNAL_SERVER_ERROR);
      }
   }
}



async function removeTask(data) {
   try {
      const res = await TaskRepository.destroy(data);
      return res;
   }
   catch (error) {
      if (error instanceof Apperror) {
         throw error;
      }
      else {
         throw new Apperror("server side problem", StatusCode.INTERNAL_SERVER_ERROR);
      }
   }
}


async function markTask(taskId, stat) {
   try {
      const res = await TaskRepository.markTask(taskId, stat);
      if (!res) {
         throw new Apperror("task not found", StatusCode.NOT_FOUND);
      }
      return 1;
   }
   catch (error) {
      if (error instanceof Apperror) {
         throw error;
      }
      else {
         if (error.name == 'SequelizeDatabaseError') {
            const msg = error.message;
            throw new Apperror(msg, StatusCode.BAD_REQUEST);
         }
         throw new Apperror("server side problem", StatusCode.INTERNAL_SERVER_ERROR);
      }
   }
}


async function addTaskResponse(taskResp, respFileDetails) {
   try {
      const res = await TaskRepository.addTaskResponse(taskResp.taskId, taskResp.response);
      if (!res) {
         throw new Apperror("task not found", StatusCode.NOT_FOUND);
      }

      //add fileDetails to DB if preseent
      if (respFileDetails.fileName != undefined) {
         respFileDetails.taskId=res.id;
         respFileDetails.fileType = "RESPFILE";
         const taskRespFile = await TaskFilesRepository.create(respFileDetails);
         res.dataValues.respFileName = taskRespFile.fileName;
      }
      return {
         "TaskName": res.dataValues.TaskName,
         "TaskResp": res.dataValues.TaskResponse,
         "respFileName":res.dataValues.respFileName,
      };
   }
   catch (error) {

      if (error instanceof Apperror) {
         throw error;
      }

      else {
   
         //validation & uniqueConstraint error handling
         if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
            const errorArray = [];
            error.errors.forEach(err => {
               errorArray.push(err.message);
            });
            throw new Apperror(errorArray, StatusCode.BAD_REQUEST);
         }
         //db error handling
         if (error.name == 'SequelizeDatabaseError') {
            const msg = error.message;
            throw new Apperror(msg, StatusCode.BAD_REQUEST);
         }
         throw new Apperror("server side problem", StatusCode.INTERNAL_SERVER_ERROR);
      }

   }
}





module.exports = {
   createTask,
   findTask,
   updateTask,
   removeTask,
   markTask,
   addTaskResponse
}