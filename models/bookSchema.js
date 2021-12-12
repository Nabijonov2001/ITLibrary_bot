const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
    book_id:{
        type:String,
        required:true
    },

    book_topic:{
        type:String,
        required:true
    },

    book_name:{
        type:String,
        required:true
    },

    book_size:{
        type:Number,
        required:true
    }

})

const Books = mongoose.model('book', bookSchema)
module.exports = Books