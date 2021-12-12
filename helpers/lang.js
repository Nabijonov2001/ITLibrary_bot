
module.exports = class Text {
    static hello_text(name){
        const text = {
            uz:`Xush kelibsiz, <b>${name}!</b>\nO'zingizga qulay bo'lgan tilni tanlang.`,
            en:`Welcome <b>${name}!</b>\nChoose the language that suits you.`,
            ru:`Добро пожаловать <b>${name}!</b>\nВыберите язык, который вам подходит.`
        }
        return text
    }

    static last_text(lang){
        if(lang =='🇬🇧 English'){
            const text =  `Here you can find books in your field of interest!👇`
            return text
        }else if(lang == '🇷🇺 Русский'){
            const text = `Здесь вы можете найти книги по интересующей вас сфере!👇`
            return text
        }else if(lang ==`🇺🇿 O'zbek`){
            const text = 'Bu yerda o`zingiz qiziqqan soha bo`yicha kitoblarni topishingiz mumkin!👇'
            return text
        }
    }
    
    static comment_text(lang){
        if(lang =='🇬🇧 English'){
            const text =  {
                start:'Please leave your comments',
                end:'Thanks for your feedback.',
                btn:'❌ Cancel'
            }
            return text
        }else if(lang == '🇷🇺 Русский'){
            const text =  {
                start:'Пожалуйста, оставьте свои комментарии',
                end:'Спасибо за ваш отзыв.',
                btn:'❌ Отмена'
        }
            return text
        }else if(lang ==`🇺🇿 O'zbek`){
            const text = {
                start:'Marhamat o`z fikrlaringizni qoldiring',
                end:'Fikralringiz uchun tashakkur.',
                btn:'❌ Bekor qilish'
            }
            return text
        }
    }

    static statistic_text(lang){
        if(lang =='🇬🇧 English'){
            const text =  {
                user_number:'Number of subscribers on the bot',
                footer:'Statistics'
            }
            return text
        }else if(lang == '🇷🇺 Русский'){
            const text =  {
                user_number:'Количество подписчиков на боте',
                footer:'Статистика'
            }
            return text
        }else if(lang ==`🇺🇿 O'zbek`){
            const text = {
                user_number:'Botdagi obunachilar soni',
                footer:'Statistika'
            }
            return text
        }
    }

    static menu_text(lang){
        if(lang =='🇬🇧 English'){
            const text =  {
                    front:'📂 FrontEnd',
                    back:'📂 BackEnd',
                    graphic:'📂 Graphic design',
                    stc:'📊 Statistics',
                    comment:'💬 Comment'
            }
            return text
        }else if(lang == '🇷🇺 Русский'){
            const text =  {
                front:'📂 FrontEnd',
                back:'📂 BackEnd',
                graphic:'📂 Графический дизайн',
                stc:'📊 Статистика',
                comment:'💬 Комментарий'
        }
            return text
        }else if(lang ==`🇺🇿 O'zbek`){
            const text = {
                front:'📂 FrontEnd',
                back:'📂 BackEnd',
                graphic:'📂 Grafik dizayn',
                stc:'📊 Statistika',
                comment:'💬 Fikr bildirish'
            }
            return text
        }
    }
    
    static front_text(lang){
        if(lang =='🇬🇧 English'){
            const text ={
                categories:['Html', 'Css', "JavaScript", 'React.js', 'Vue.js', 'Angular.js' ],
                back:'🔙 Back'
            } 
            return text
        }else if(lang == '🇷🇺 Русский'){
            const text ={
                categories:['Html', 'Css', "JavaScript", 'React.js', 'Vue.js', 'Angular.js' ],
                back:'🔙 Назад'
            }
            return text
        }else if(lang ==`🇺🇿 O'zbek`){
            const text ={
                categories:['Html', 'Css', "JavaScript", 'React.js', 'Vue.js', 'Angular.js' ],
                back:'🔙 Ortga'
            }
            return text
        }
    }

    static back_text(lang){
        if(lang =='🇬🇧 English'){
            const text ={
                categories:['Java', 'Php', "Node.js", 'Python', 'Go', 'Database' ],
                back:'🔙 Back'
            } 
            return text
        }else if(lang == '🇷🇺 Русский'){
            const text ={
                categories:['Java', 'Php', "Node.js", 'Python', 'Go', 'Database' ],
                back:'🔙 Назад'
            }
            return text
        }else if(lang ==`🇺🇿 O'zbek`){
            const text ={
                categories:['Java', 'Php', "Node.js", 'Python', 'Go', 'Database' ],
                back:'🔙 Ortga'
            }
            return text
        }
    }

    static graph_text(lang){
        if(lang =='🇬🇧 English'){
            const text ={
                categories:['Photoshop', 'Illustrator', "3d Max", 'Corel draw' ],
                back:'🔙 Back'
            } 
            return text
        }else if(lang == '🇷🇺 Русский'){
            const text ={
                categories:['Photoshop', 'Illustrator', "3d Max", 'Corel draw' ],
                back:'🔙 Назад'
            }
            return text
        }else if(lang ==`🇺🇿 O'zbek`){
            const text ={
                categories:['Photoshop', 'Illustrator', "3d Max", 'Corel draw' ],
                back:'🔙 Ortga'
            }
            return text
        }
    }

    static topics_text(topic){
        if(topic =='front'){
            return ['Html', 'Css', "JavaScript", 'React.js', 'Vue.js', 'Angular.js']
        }
        if(topic == 'back'){
            return ['Java', 'Php', "Node.js", 'Python', 'Go', 'Database']
        }
        else  return ['Photoshop', 'Illustrator', "3d Max", 'Corel draw']
    }

    static all_topics(){
        return ['Html', 'Css', "JavaScript", 'React.js', 'Vue.js', 'Angular.js',
        'Photoshop', 'Illustrator', "3d Max", 'Corel draw', 'Java', 'Php', "Node.js", 'Python', 'Go', 'Database' ]
    }
}