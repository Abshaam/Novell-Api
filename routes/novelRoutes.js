const express = require('express');
const multer = require('multer');
const {addNovel, fetchNovels, deleteNovel, fetchANovel}= require('../controller/novelController')
const router = express.Router();

// saving post-recipe to the database

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/upload')
    },


    filename: function (req, file, cb ) {
        const unique = file.originalname
        cb(null, file.fieldname + unique)  
    }  
})

// saving the image in a storage
const upload = multer({storage: storage})


// adding a todo
router.post('/add', upload.single('novelImage'), addNovel)

// fetching all todos
router.get('/fetch', fetchNovels)

// deletes a todo
router.delete('/delete/:id', deleteNovel)


// fetches a single todo
router.get('/:id', fetchANovel)


module.exports= router
   