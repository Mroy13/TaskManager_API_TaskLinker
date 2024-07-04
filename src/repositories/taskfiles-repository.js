const {TaskFile}=require('../models');
const crudRepository=require('./crud-repository');
class taskFilesRepository extends crudRepository{
    constructor(){
        super(TaskFile);
    }
}

module.exports=taskFilesRepository;