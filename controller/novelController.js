// requiring all modules 
const { Novel, validate } = require('../model/novelModel');
const multer = require('multer');



// controller for adding a todo
const addNovel = async (req, res) =>{
   try{ 

     //destructuring the objects in the model
     console.log('file', req.file)
     const { name, email_address, address, title, novel, category,
        } = req.body;
    
         //declaring a variable to pass the object
     const data = {
         name,
         email_address,
         address,
         category,
         title,
         novel,
         novelImage: req.file.originalname,
     }

     
    const { error } = validate(data);
    if (error) 
       return res.status(400).send({message: error.details[0].message});

    //  creating an instance of the schema
    const dataStore = new Novel(data)

    const saveData = await dataStore.save();


    res.status(201).json(saveData);
         }catch(error) {
             res.status(500).json(error)
          console.log(error.message)
}  

 };


// controller for fetching all the novels
const fetchNovels = async (req, res) =>{
    try{
    const novels = await Novel.find();
    res.status(200).json(novels);

    }catch (error) {
        console.log(error.message)
    }
}

const fetchANovel = async (req, res) =>{
    try{
    const { id } = req.params
    const novel = await Novel.findById(id);
    
    res.status(200).json(novel);
    }catch(error){
        console.log(error.message)
    }
}

const deleteNovel = async (req, res) =>{

    try {
    const { id } = req.params
    const novel = await Novel.findByIdAndDelete(id)

    res.status(200).json(novel)
    }catch(error){
        console.log(error.message)
    }
}


module.exports = {
    addNovel,
    fetchNovels,
    fetchANovel,
    deleteNovel,
   
};