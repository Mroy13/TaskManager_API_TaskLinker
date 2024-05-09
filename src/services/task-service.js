const StatusCode=require('http-status-codes');
const {taskRepository}=require('../repositories');
const Apperror=require('../utils/error/App-error');

const TaskRepository=new taskRepository();

async function createTask(data){
    try{
        const res=await TaskRepository.create(data);
        return res;
    }
    catch(error){
         if(error.name=="SequelizeValidationError" || error.name=="SequelizeUniqueConstraintError"){     
                const errorArray=[];
                error.errors.forEach(err => {
                    errorArray.push(err.message);
                });
             throw new Apperror(errorArray,StatusCode.BAD_REQUEST);
         }
         else{
         throw new Apperror("server side probelem",StatusCode.INTERNAL_SERVER_ERROR);
         }
    }
}


module.exports={
    createTask,

}