const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },

    step:{
        type:String,
        required:true,
        default: '0'
    },

    lang:{
        type:String
    },

})

const Users = mongoose.model('user', userSchema)
module.exports = Users