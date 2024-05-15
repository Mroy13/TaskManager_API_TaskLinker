const {Task}=require('../models');
const crudRepository=require('./crud-repository');
 class taskRepository extends crudRepository{
    constructor(){
        super(Task);
    }
    async markTask(taskId,stat){
        try{
            const taskInstance=await Task.findByPk(taskId);
            if(!taskInstance) return 0;
            taskInstance.status=stat;
            await taskInstance.save();
            return 1;
        }
        catch(error){
           throw error;
        }
    }
    async addTaskResponse(taskId,resp){
        try{
           
                const [rowcount] = await Task.update({TaskResponse:resp}, {
        
                    where: {
                        id: taskId
                    }
                });
            if(rowcount==0)return 0;
            const taskInstance=await Task.findByPk(taskId);
            return taskInstance;
            
        }
        catch(error){
           throw error;
        }
    }
 }

 module.exports=taskRepository;