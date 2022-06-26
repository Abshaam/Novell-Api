const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require("joi");

const novelSchema = new Schema({
    name: {
        type: String,
        min: 3,
        max: 255,
        required: true 
  },

    email_address: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true 
    },

    address: {
        type: String,
        min: 3,
        max: 50,
        required: true
    },

    title : {
        type: String,
        min: 3,
        max: 100,
        required:true 
    },

    novel: {
        type: String,
        min: 3,
        max: 2550,
        required: true 
  },

     category: {
        type: String,
        min: 3,
        max: 50,
        required: true
    },
    
    novelImage: {
     type: String,
     required: true
    },

  
    
},  {timestamps: true})

const Novel = mongoose.model("novel", novelSchema)

const validate = (user) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(255).required(),
      email_address: Joi.string().email().required(),
      address: Joi.string().min(3).max(50).required(),
      title: Joi.string().min(3).max(100).required(),
      novel: Joi.string().min(3).max(2550).required(),
      category: Joi.string().min(3).max(50).required(),
      novelImage: Joi.string().required(),
    });
    return schema.validate(user);
  };

module.exports = { Novel, validate}