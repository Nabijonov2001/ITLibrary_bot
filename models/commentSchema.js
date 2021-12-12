const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },

    comment:{
        type:String
    },

    name:{
        type:String
    }

})

const Comments = mongoose.model('comment', commentSchema)
module.exports = Comments