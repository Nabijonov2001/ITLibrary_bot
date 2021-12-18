const TelegramBot = require('node-telegram-bot-api')
const { token, adminId } = require('./config')
const mongo = require('./db')
const books = require('./helpers/books')
const { hello_text, last_text, menu_text, front_text, back_text, graph_text, topics_text, all_topics, comment_text, statistic_text } = require('./helpers/lang')
const Books = require('./models/bookSchema')
const Comments = require('./models/commentSchema')
const Users = require('./models/userSchema')
const bot = new TelegramBot(token, { polling: true })

// Database connection
mongo()

// Bot scripts
bot.on('message', async (message) => {
    const userId = message.chat.id
    const messageId = message.message_id
    try {
        const user = await Users.findOne({ user_id: userId })
        if (!user || message.text =='/start'|| message.text == '/language') {
            const text = hello_text(message.from.first_name)
            await bot.sendMessage(userId, `${text.uz}\n\n${text.ru}\n\n${text.en}`, {
                reply_to_message_id: messageId,
                parse_mode: 'HTML',
                reply_markup: {
                    resize_keyboard: true,
                    keyboard: [
                        [{ text: "🇺🇿 O'zbek" }, { text: "🇷🇺 Русский" }, { text: "🇬🇧 English" }]
                    ]
                }
            })
            if(user){
                await Users.findOneAndUpdate({user_id:userId}, {step:'1'})
                return
            }
            await Users.create({
                user_id: userId,
                step: '1'
            })
            
        }
        if (message.reply_to_message && userId == adminId) {
             if(message.reply_to_message.document && message.text != 'reklama'){
                const topics = all_topics()
                const topic = topics.find(topic=> topic.toLowerCase() == message.text.toLowerCase())
                if(topic){
                    const check = await Books.findOne({book_id:message.reply_to_message.document.file_id})
                    if(!check){
                        const book = await Books.create({
                            book_id: message.reply_to_message.document.file_id,
                            book_topic: topic.toLowerCase(),
                            book_name: message.reply_to_message.document.file_name,
                            book_size: message.reply_to_message.document.file_size
                        })
                        if(book)  await bot.sendMessage(userId, 'Kitob muvaffaqqiyatli yuklandi!')
                        else await bot.sendMessage(userId, 'Kitob yuklashda xatolik yuz berdi!')
                    } else{ await bot.sendMessage(userId, 'Bu nomdagi kitob oldin qo`shilgan!')}
                }else{
                    await bot.sendMessage(userId, 'Bu nomdagi kategoriya mavjud emas!')
                }
            }else if(message.text.toLowerCase() == 'reklama'){
                const users = await Users.find()
                let interval = 20/1000
                users.forEach(user =>{
                    try {
                        setTimeout(async()=>{
                            await bot.copyMessage(user.user_id, message.from.id, message.reply_to_message.message_id, {
                                reply_markup:message.reply_to_message.reply_markup
                            })
                        }, interval)
                    } catch (error) {
                        console.log(error)
                    }
                })
            }
            
        }
        if (user.step == '1' && (message.text == "🇺🇿 O'zbek" || message.text == "🇷🇺 Русский" || message.text == '🇬🇧 English')) {
            const text1 = last_text(message.text)
            const text2 = menu_text(message.text)
            console.log(message.text)
            await bot.sendMessage(userId, text1, {
                reply_markup: {
                    resize_keyboard: true,
                    keyboard: [
                        [{ text: text2.front }, { text: text2.back }],
                        [{ text: text2.graphic }],
                        [{ text: text2.stc }, { text: text2.comment }]
                    ]
                }
            })
            await Users.findOneAndUpdate({ user_id: userId }, {
                lang: message.text,
                step: '2'
            })
        }
        if (user.step == '2') {
            if (message.text == '📂 FrontEnd') {
                const text = front_text(user.lang)
                await bot.sendMessage(userId, message.text, {
                    reply_markup: {
                        resize_keyboard: true,
                        keyboard: [
                            [{ text: text.categories[0] }, { text: text.categories[1] }],
                            [{ text: text.categories[2] }, { text: text.categories[3] }],
                            [{ text: text.categories[4] }, { text: text.categories[5] }],
                            [{ text: text.back }]
                        ]
                    }
                })
                await Users.findOneAndUpdate({ user_id: userId }, {
                    step: '3#front'
                })
            } else if (message.text == '📂 BackEnd') {
                const text = back_text(user.lang)
                await bot.sendMessage(userId, message.text, {
                    reply_markup: {
                        resize_keyboard: true,
                        keyboard: [
                            [{ text: text.categories[0] }, { text: text.categories[1] }],
                            [{ text: text.categories[2] }, { text: text.categories[3] }],
                            [{ text: text.categories[4] }, { text: text.categories[5] }],
                            [{ text: text.back }]
                        ]
                    }
                })
                await Users.findOneAndUpdate({ user_id: userId }, {
                    step: '3#back'
                })
            } else if (message.text == '📂 Graphic design' || message.text == '📂 Графический дизайн' || message.text == '📂 Grafik dizayn') {
                const text = graph_text(user.lang)
                await bot.sendMessage(userId, message.text, {
                    reply_markup: {
                        resize_keyboard: true,
                        keyboard: [
                            [{ text: text.categories[0] }, { text: text.categories[1] }],
                            [{ text: text.categories[2] }, { text: text.categories[3] }],
                            [{ text: text.back }]
                        ]
                    }
                })
                await Users.findOneAndUpdate({ user_id: userId }, {
                    step: '3#grafik'
                })
            } else if (message.text == '💬 Fikr bildirish' || message.text =='💬 Comment'||message.text =='💬 Комментарий'){
                const text = comment_text(user.lang)
                await bot.sendMessage(userId, text.start, {
                    reply_markup:{
                        resize_keyboard:true,
                        keyboard:[
                            [{text:text.btn}]
                        ]
                    }
                })
                await Users.findOneAndUpdate({ user_id: userId }, {
                    step: 'comment'
                })
            } else if (message.text == '📊 Statistics' || message.text =='📊 Статистика'||message.text =='📊 Statistika'){
                const users = await Users.find()
                const text = statistic_text(user.lang)
                console.log(text)
                await bot.sendMessage(userId, `<b>#${text.footer}\n\n 👥 ${text.user_number} : ${users.length} </b>\n\n📊 @ITlibrary_bot - ${text.footer}`, {
                    parse_mode:'HTML',
                })
            }
        }
        if(user.step =='comment'){
            if(message.text == '❌ Bekor qilish' || message.text =='❌ Отмена'|| message.text =='❌ Cancel'){
                const text1 = last_text(user.lang)
                const text2 = menu_text(user.lang)
                console.log(message.text)
                await bot.sendMessage(userId, text1, {
                    reply_markup: {
                        resize_keyboard: true,
                        keyboard: [
                            [{ text: text2.front }, { text: text2.back }],
                            [{ text: text2.graphic }],
                            [{ text: text2.stc }, { text: text2.comment }]
                        ]
                    }
                })
                await Users.findOneAndUpdate({user_id:userId}, {step:'2'})
            } else {
                const text = comment_text(user.lang)
                const text2 = menu_text(user.lang)
                const feedback = await Comments.create({
                    user_id:userId,
                    comment:message.text,
                    name:message.from.first_name
                })
                console.log(feedback)
                await bot.sendMessage(userId, text.end, {
                    reply_markup: {
                        resize_keyboard: true,
                        keyboard: [
                            [{ text: text2.front }, { text: text2.back }],
                            [{ text: text2.graphic }],
                            [{ text: text2.stc }, { text: text2.comment }]
                        ]
                    }
                })
                await Users.findOneAndUpdate({user_id:userId}, {step:'2'})
            }
        }
        if (user.step.split('#')[0] == '3') {
            const part = user.step.split('#')[1]
            const topics = topics_text(part)
            const topic = topics.find(topic => topic == message.text)
            if (topic) {
                const keyboard = await books(topic.toLowerCase(), user.lang)
                await bot.sendMessage(userId, message.text, {
                    reply_markup: {
                        resize_keyboard: true,
                        keyboard
                    }
                })
            }
            await Users.findOneAndUpdate({user_id:userId}, {step:`4#${part}`})
            if (message.text == '🔙 Ortga' || message.text == '🔙 Back' || message.text == '🔙 Назад') {
                const text1 = last_text(user.lang)
                const text2 = menu_text(user.lang)
                await bot.sendMessage(userId, text1, {
                    reply_markup: {
                        resize_keyboard: true,
                        keyboard: [
                            [{ text: text2.front }, { text: text2.back }],
                            [{ text: text2.graphic }],
                            [{ text: text2.stc }, { text: text2.comment }]
                        ]
                    }
                })
                await Users.findOneAndUpdate({ user_id: userId }, {
                    step: '2'
                })
            }
        }
        if(user.step.split('#')[0]=='4'){
            if(message.text == '🔙 Ortga' || message.text == '🔙 Back' || message.text == '🔙 Назад'){
                if (user.step.split('#')[1] == 'front') {
                    const text = front_text(user.lang)
                    await bot.sendMessage(userId, message.text, {
                        reply_markup: {
                            resize_keyboard: true,
                            keyboard: [
                                [{ text: text.categories[0] }, { text: text.categories[1] }],
                                [{ text: text.categories[2] }, { text: text.categories[3] }],
                                [{ text: text.categories[4] }, { text: text.categories[5] }],
                                [{ text: text.back }]
                            ]
                        }
                    })
                    await Users.findOneAndUpdate({ user_id: userId }, {
                        step: '3#front'
                    })
                } else if (user.step.split('#')[1] == 'back') {
                    const text = back_text(user.lang)
                    await bot.sendMessage(userId, message.text, {
                        reply_markup: {
                            resize_keyboard: true,
                            keyboard: [
                                [{ text: text.categories[0] }, { text: text.categories[1] }],
                                [{ text: text.categories[2] }, { text: text.categories[3] }],
                                [{ text: text.categories[4] }, { text: text.categories[5] }],
                                [{ text: text.back }]
                            ]
                        }
                    })
                    await Users.findOneAndUpdate({ user_id: userId }, {
                        step: '3#back'
                    })
                } else if (user.step.split('#')[1] == 'grafik') {
                    const text = graph_text(user.lang)  
                    await bot.sendMessage(userId, message.text, {
                        reply_markup: {
                            resize_keyboard: true,
                            keyboard: [
                                [{ text: text.categories[0] }, { text: text.categories[1] }],
                                [{ text: text.categories[2] }, { text: text.categories[3] }],
                                [{ text: text.back }]
                            ]
                        }
                    })
                    await Users.findOneAndUpdate({ user_id: userId }, {
                        step: '3#grafik'
                    })
                } 
            } else if(message.text == '🔝 Главное Меню'|| message.text == '🔝 Asosiy Menyu' || message.text == '🔝 Main Menu'){
                const text1 = last_text(user.lang)
                const text2 = menu_text(user.lang)
                await bot.sendMessage(userId, text1, {
                    reply_markup: {
                        resize_keyboard: true,
                        keyboard: [
                            [{ text: text2.front }, { text: text2.back }],
                            [{ text: text2.graphic }],
                            [{ text: text2.stc }, { text: text2.comment }]
                        ]
                    }
                })
                await Users.findOneAndUpdate({ user_id: userId }, {
                    step: '2'
                })
            } else{
                const book = await Books.findOne({book_name:message.text})
                if(book){
                    await bot.sendDocument(userId, book.book_id,{
                        caption: `\n\n<b>${book.book_name}</b><b>\n\n💾 ${(book.book_size/(1024*1024)).toFixed(1)} MB</b>\n<b>\n👉 IT books - @ITlibrary_bot</b>`,
                        parse_mode: 'HTML'
                    })
                }
            }            
        }
    } catch (error) {
        console.log(error)
    }
})

