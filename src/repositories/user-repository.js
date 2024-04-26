const {User}=require('../models');
const crudRepository=require('./crud-repository');
class userRepository extends crudRepository{
    constructor(){
        super(User);
    }
}

module.exports=userRepository;