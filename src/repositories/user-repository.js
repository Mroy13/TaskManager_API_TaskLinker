const {User,Task}=require('../models');
const crudRepository=require('./crud-repository');
class userRepository extends crudRepository{
    constructor(){
        super(User);
    }

    async getUserSpecificTask(userid){
        try{
            const userDetails=await User.findByPk(userid);
            console.log(userDetails);
            const taskDetails=await userDetails.getTasks();
            return taskDetails;
        }
        catch(error){
            throw error;
        }
    }
}

module.exports=userRepository;