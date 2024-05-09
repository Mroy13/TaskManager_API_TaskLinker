const StatusCode=require('http-status-codes');
const {userRepository}=require('../repositories');
const Apperror=require('../utils/error/App-error');

const UserRepository=new userRepository();

async function createUser(data){
    try{
        const res=await UserRepository.create(data);
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
    createUser,

}