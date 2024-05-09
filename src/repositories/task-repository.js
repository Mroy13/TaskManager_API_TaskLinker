const {Task}=require('../models');
const crudRepository=require('./crud-repository')
 class taskRepository extends crudRepository{
    constructor(){
        super(Task);
    }
 }

 module.exports=taskRepository;