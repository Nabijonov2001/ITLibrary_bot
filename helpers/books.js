const Books = require("../models/bookSchema")


async function books(topic, lang){
    const books = await Books.find({book_topic:topic})
    const keyboard = []
    for(let i = 0; i<books.length; i++){
        keyboard.push([{text:`${books[i].book_name}`}])
    }
    if(lang =='🇬🇧 English'){
            keyboard.push([{text:'🔙 Back'}, {text:'🔝 Main Menu'}])
            return keyboard
    }else if(lang == '🇷🇺 Русский'){
            keyboard.push([{text:'🔙 Назад'}, {text:'🔝 Главное Меню'}])
            return keyboard
    }else if(lang ==`🇺🇿 O'zbek`){
            keyboard.push([{text:'🔙 Ortga'}, {text:'🔝 Asosiy Menyu'}])
            return keyboard
    }
}

module.exports = books
