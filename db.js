const mongoose = require('mongoose')
const { mongo_url } = require('./config')

async function mongo(){
    try {
        await mongoose.connect(mongo_url)
        console.log('Mongodbga ulanish bajarildi')
    } catch (error) {
        console.log('Mongodbga ulanishda xatolik', error)
    }
}

module.exports = mongo