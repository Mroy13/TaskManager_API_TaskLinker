const {User,Task}=require('../models');
const crudRepository=require('./crud-repository');
class userRepository extends crudRepository{
    constructor(){
        super(User);
    }

    async getUserSpecificTask(userid){
        try{
            const userDetails=await User.findByPk(userid);
            const taskDetails=await userDetails.getTasksAssignedTo();
            return taskDetails;     
        }
        catch(error){
            throw error;
        }
    }
}

module.exports=userRepository;