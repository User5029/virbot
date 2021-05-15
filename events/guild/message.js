require('dotenv').config
const db = require('quick.db')
const fs = require('fs')
const mongo = require('../../mongo')
const punishmentSchema = require('../../schemas/punishmentlog')




module.exports = async (Discord, client, message) => {
    let prefix = process.env.PREFIX
    const member = message.member
    if(message.author.bot) return;    

    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const BannedWords = ["alligatorbait", "amateur", "anal", "analannie", "analsex", "angie", "anus", "arab", "arabs", "areola", "argie", "aroused", "arse", "arsehole", "asian", "ass", "assassin", "assassinate", "assassination", "assault", "assbagger", "assblaster", "assclown", "asscowboy", "asses", "assfuck", "assfucker", "asshat", "asshole", "assholes", "asshore", "assjockey", "asskiss", "asskisser", "assklown", "asslick", "asslicker", "asslover", "assman", "assmonkey", "assmunch", "assmuncher", "asspacker", "asspirate", "asspuppies", "assranger", "asswhore", "asswipe", "badfuck", "balllicker", "ballsack", "banging", "barelylegal", "barf", "barface", "barfface", "bast", "bazongas", "bazooms", "beaner", "beast", "beastality", "beastial", "beastiality", "beatoff", "beat-off", "beatyourmeat", "bestial", "bestiality", "biatch", "bicurious", "bigass", "bigbastard", "bigbutt", "bitch", "bitcher", "bitches", "bitchez", "bitchin", "bitching", "bitchslap", "bitchy", "biteme", "blackout", "blacks", "blind", "blow", "blowjob", "boang", "bogan", "bohunk", "bollick", "bollock", "bomb", "bombers", "bombing", "bombs", "bomd", "bondage", "boner", "bong", "boob", "boobies", "boobs", "booby", "boody", "boong", "boonga", "boonie", "booty", "bootycall", "bountybar", "bra", "brea5t", "breast", "breastjob", "breastlover", "breastman", "brothel", "buggered", "buggery", "bullcrap", "bulldike", "bulldyke", "bullshit", "bumblefuck", "bumfuck", "bunga", "bunghole", "butchbabes", "butchdike", "butchdyke", "butt", "buttbang", "butt-bang", "buttface", "buttfuck", "butt-fuck", "buttfucker", "butt-fucker", "buttfuckers", "butt-fuckers", "butthead", "buttman", "buttmunch", "buttmuncher", "buttpirate", "buttplug", "buttstain", "byatch", "cacker", "cameljockey", "cameltoe", "canadian", "cancer", "carpetmuncher", "carruth", "catholic", "catholics", "cemetery", "chav", "cherrypopper", "chickslick", "chin", "chinaman", "chinamen", "chink", "chinky", "choad", "chode", "clamdigger", "clamdiver", "clit", "clitoris", "clogwog", "cock", "cockblock", "cockblocker", "cockcowboy", "cockfight", "cockhead", "cockknob", "cocklicker", "cocklover", "cocknob", "cockqueen", "cockrider", "cocksman", "cocksmith", "cocksmoker", "cocksucer", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocktail", "cocktease", "cocky", "cohee", "coitus", "commie", "communist", "condom", "conservative", "conspiracy", "coolie", "cooly", "coon", "coondog", "copulate", "cornhole", "cra5h", "crabs", "crack", "crackpipe", "crackwhore", "crack-whore", "crapola", "crotch", "crotchjockey", "crotchmonkey", "crotchrot", "cum", "cumbubble", "cumfest", "cumjockey", "cumm", "cummer", "cumming", "cumquat", "cumqueen", "cumshot", "cunilingus", "cunillingus", "cunn", "cunnilingus", "cunntt", "cunt", "cunteyed", "cuntfuck", "cuntfucker", "cuntlick", "cuntlicker", "cuntlicking", "cuntsucker", "cybersex", "cyberslimer", "dago", "dahmer", "damnation", "darkie", "darky", "datnigga", "deapthroat", "deepthroat", "defecate", "dego", "demon", "deposit", "deth", "devilworshipper", "dick", "dickbrain", "dickforbrains", "dickhead", "dickless", "dicklick", "dicklicker", "dickman", "dickwad", "dickweed", "diddle", "dike", "dildo", "dingleberry", "dink", "dipshit", "dipstick", "dive", "dix", "dixiedike", "dixiedyke", "doggiestyle", "doggystyle", "doom", "dope", "dripdick", "drunk", "drunken", "dumbass", "dumbbitch", "dumbfuck", "dyefly", "dyke", "easyslut", "eatballs", "eatpussy", "ecstacy", "ejaculate", "ejaculated", "ejaculating", "ejaculation", "ero", "facefucker", "faeces", "fag", "fagging", "faggot", "fagot", "fannyfucker", "fastfuck", "fatah", "fatass", "fatfuck", "fatfucker", "fatso", "fckcum", "feces", "felatio", "felch", "felcher", "felching", "fellatio", "feltch", "feltcher", "feltching", "fetish", "filipina", "filipino", "fingerfood", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fister", "fistfuck", "fistfucked", "fistfucker", "fistfucking", "fisting", "flange", "flasher", "flatulence", "floo", "flydie", "flydye", "fok", "fondle", "footaction", "footfuck", "footfucker", "footlicker", "footstar", "fore", "foreskin", "forni", "fornicate", "foursome", "fourtwenty", "freakfuck", "freakyfucker", "freefuck", "fu", "fubar", "fuc", "fucck", "fuck", "fucka", "fuckable", "fuckbag", "fuckbuddy", "fucked", "fuckedup", "fucker", "fuckers", "fuckface", "fuckfest", "fuckfreak", "fuckfriend", "fuckhead", "fuckher", "fuckin", "fuckina", "fucking", "fuckingbitch", "fuckinnuts", "fuckinright", "fuckit", "fuckknob", "fuckme", "fuckmehard", "fuckmonkey", "fuckoff", "fuckpig", "fucks", "fucktard", "fuckwhore", "fuckyou", "fudgepacker", "fugly", "fuk", "fuks", "funeral", "funfuck", "fungus", "fuuck", "gangbang", "gangbanged", "gangbanger", "gangsta", "gatorbait", "gay", "gaymuthafuckinwhore", "gaysex", "geez", "geezer", "geni", "genital", "german", "getiton", "gin", "ginzo", "gipp", "givehead", "glazeddonut", "goddamnmuthafucker", "goldenshower", "gonorrehea", "gonzagas", "gook", "gotohell", "goy", "goyim", "greaseball", "gringo", "groe", "gross", "grostulation", "gubba", "gummer", "gun", "gyp", "gypo", "gypp", "gyppie", "gyppo", "gyppy", "hamas", "handjob", "hapa", "harder", "hardon", "harem", "headfuck", "headlights", "hebe", "heeb", "hell", "henhouse", "herpes", "heterosexual", "hijack", "hijacker", "hijacking", "hillbillies", "hindoo", "hiscock", "hiv", "ho", "hobo", "hodgie", "hoes", "holestuffer", "homicide", "homo", "homobangers", "homosexual", "honger", "honk", "honkers", "honkey", "honky", "hook", "hooker", "hookers", "hooters", "hore", "hork", "horn", "horney", "horniest", "horny", "horseshit", "hosejob", "hoser", "hotdamn", "hotpussy", "hottotrot", "hummer", "husky", "hussy", "hustler", "hymen", "hymie", "iblowu", "idiot", "ikey", "incest", "insest", "intercourse", "intheass", "inthebuff", "jackass", "jackoff", "jackshit", "jacktheripper", "jade", "jebus", "jeez", "jerkoff", "jiga", "jigaboo", "jigg", "jigga", "jiggabo", "jigger", "jiggy", "jihad", "jijjiboo", "jimfish", "jism", "jiz", "jizim", "jizjuice", "jizm", "jizz", "jizzim", "jizzum", "joint", "juggalo", "junglebunny", "kaffer", "kaffir", "kaffre", "kafir", "kanake", "kigger", "kike", "kill", "killed", "killer", "kink", "kinky", "kissass", "knife", "knockers", "kock", "kondum", "koon", "kotex", "kraut", "kum", "kumbubble", "kumbullbe", "kummer", "kumming", "kumquat", "kums", "kunilingus", "kunnilingus", "kunt", "ky", "kyke", "lactate", "laid", "lapdance", "latin", "lesbain", "lesbayn", "lesbian", "lesbin", "lesbo", "lez", "lezbe", "lezbefriends", "lezbo", "lezz", "lezzo", "liberal", "libido", "licker", "lickme", "lies", "limey", "limpdick", "limy", "lingerie", "livesex", "loadedgun", "lolita", "lotion", "lovebone", "lovegoo", "lovegun", "lovejuice", "lovemuscle", "lovepistol", "loverocket", "lowlife", "lsd", "lubejob", "luckycammeltoe", "lugan", "lynch", "macaca", "magicwand", "manhater", "manpaste", "marijuana", "mastabate", "mastabater", "masterbate", "masterblaster", "mastrabator", "masturbate", "masturbating", "mattressprincess", "meatbeatter", "meatrack", "meth", "mgger", "mggor", "mickeyfinn", "mideast", "milf", "minority", "mockey", "mockie", "mocky", "mofo", "moky", "moles", "molest", "molestation", "molester", "molestor", "moneyshot", "mooncricket", "mothafuck", "mothafucka", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckin", "mothafucking", "mothafuckings", "motherfuck", "motherfucked", "motherfucker", "motherfuckin", "motherfucking", "motherfuckings", "motherlovebone", "muff", "muffdive", "muffdiver", "muffindiver", "mufflikcer", "mulatto", "muncher", "munt", "murder", "murderer", "nasty", "nastybitch", "nastyho", "nastyslut", "nastywhore", "nazi", "necro", "negro", "negroes", "negroid", "negro's", "nig", "niger", "nigerian", "nigerians", "nigg", "nigga", "niggah", "niggaracci", "niggard", "niggarded", "niggarding", "niggardliness", "niggardliness's", "niggardly", "niggards", "niggard's", "niggaz", "nigger", "niggerhead", "niggerhole", "niggers", "nigger's", "niggle", "niggled", "niggles", "niggling", "nigglings", "niggor", "niggur", "niglet", "nignog", "nigr", "nigra", "nigre", "nip", "nipple", "nipplering", "nittit", "nlgger", "nlggor", "nofuckingway", "nook", "nookey", "nookie", "noonan", "nooner", "nude", "nudger", "nuke", "nutfucker", "nymph", "ontherag", "oral", "orga", "orgasim", "orgasm", "orgies", "orgy", "paki", "palesimian", "palestinian", "pansies", "pansy", "panti", "panties", "payo", "pearlnecklace", "peck", "pecker", "peckerwood", "peepshow", "peepshpw", "pendy", "penetration", "peni5", "penile", "penis", "penises", "penthouse", "period", "perv", "phonesex", "phuk", "phuked", "phuking", "phukked", "phukking", "phungky", "phuq", "pi55", "picaninny", "piccaninny", "pickaninny", "piker", "pikey", "piky", "pimp", "pimped", "pimper", "pimpjuic", "pimpjuice", "pimpsimp", "pindick", "piss", "pissed", "pisser", "pisses", "pisshead", "pissoff", "pocha", "pocho", "pohm", "polack", "pom", "pommie", "pommy", "poon", "poontang", "pooperscooper", "pooping", "poorwhitetrash", "popimp", "porchmonkey", "porn", "pornflick", "pornking", "porno", "pornography", "pornprincess", "pot", "premature", "pric", "prick", "prickhead", "primetime", "propaganda", "protestant", "pu55i", "pu55y", "pubic", "pubiclice", "puke", "puntang", "puss", "pussie", "pussies", "pussy", "pussyeater", "pussyfucker", "pussylicker", "pussylips", "pussylover", "pussypounder", "pusy", "quashie", "queef", "queer", "quickie", "quim", "ra8s", "rabbi", "racial", "racist", "radical", "radicals", "raghead", "randy", "rape", "raped", "raper", "rapist", "rearend", "rearentry", "rectum", "redlight", "rentafuck", "republican", "rere", "ribbed", "rigger", "roundeye", "rump", "russki", "russkie", "sadis", "sadom", "samckdaddy", "sandm", "sandnigger", "satan", "scag", "scallywag", "scat", "schlong", "screw", "screwyou", "scrotum", "scum", "semen", "seggs", "servant", "sex", "sexed", "sexfarm", "sexhound", "sexhouse", "sexing", "sexkitten", "sexpot", "sexslave", "sextogo", "sextoy", "sextoys", "sexwhore", "sexy", "sexymoma", "sexy-slim", "shaggin", "shagging", "shat", "shav", "shawtypimp", "sheeney", "shhit", "shinola", "shit", "shitcan", "shitdick", "shite", "shiteater", "shited", "shitface", "shitfaced", "shitfit", "shitforbrains", "shitfuck", "shitfucker", "shitfull", "shithapens", "shithappens", "shithead", "shithouse", "shiting", "shitlist", "shitola", "shitoutofluck", "shits", "shitstain", "shitted", "shitter", "shitting", "shitty", "shoot", "shooting", "shortfuck", "showtime", "sick", "sissy", "sixsixsix", "sixtynine", "sixtyniner", "skank", "skankbitch", "skankfuck", "skankwhore", "skanky", "slut", "sluts", "slutt", "slutting", "slutty", "slutwear", "slutwhore", "smack", "smackthemonkey", "snatch", "snatchpatch", "snigger", "sniggered", "sniggering", "sniggers", "snigger's", "snowback", "snownigger", "sodomy", "sonofabitch", "sonofbitch", "sooty", "soviet", "spaghettibender", "spaghettinigger", "spank", "spankthemonkey", "sperm", "spermacide", "spermbag", "spermhearder", "spermherder", "spic", "spick", "spig", "spigotty", "spik", "spit", "spitter", "splittail", "spooge", "spreadeagle", "spunk", "spunky", "squaw", "stagg", "stiffy", "strapon", "stringer", "stripclub", "stupidfuck", "stupidfucker", "suck", "suckdick", "sucker", "suckme", "suckmyass", "suckmydick", "suckmytit", "suckoff", "suicide", "swallow", "swallower", "swalow", "swastika", "syphilis", "taboo", "taff", "tampon", "tang", "tantra", "tarbaby", "tard", "teat", "terrorist", "teste", "testicle", "testicles", "thicklips", "thirdeye", "thirdleg", "threesome", "timbernigger", "tinkle", "tit", "titbitnipply", "titfuck", "titfucker", "titfuckin", "titjob", "titlicker", "titlover", "tits", "tittie", "titties", "titty", "tongethruster", "tongue", "tonguethrust", "tonguetramp", "tortur", "torture", "tosser", "trailertrash", "tramp", "trannie", "tranny", "transexual", "transsexual", "transvestite", "triplex", "trisexual", "tuckahoe", "tunneloflove", "turd", "turnon", "twat", "twink", "twinkie", "twobitwhore", "uck", "unfuckable", "upskirt", "uptheass", "upthebutt", "urinary", "urinate", "urine", "usama", "uterus", "vagina", "vaginal", "vatican", "vibrater", "vibrator", "virgin", "virginbreaker", "wab", "wank", "wanker", "wanking", "waysted", "weapon", "weenie", "welcher", "welfare", "wetb", "wetback", "wetspot", "whacker", "whash", "whigger", "whiskey", "whiskeydick", "whiskydick", "whit", "whitenigger", "whitey", "whiz", "whop", "whore", "whorefucker"]
        if (BannedWords.some(word => message.toString().toLowerCase().includes(word))) {
            message.delete().catch(e => console.error("Couldn't delete message."))
            message.reply(`Please do not use a word in that sensence, if you felt there was a problem please message one of the bot devs (bot is still being developed)`)
            if(!db.get(`user_${member.id}`)){
                db.set(`user_${member.id}`, {warns: 0, kicks: 0, bans: 0, mutes: 0, automod: 0})
            }
            db.add(`user_${member.id}.automod`, 1)

            if(!db.get(`user_${member.id}`)){
                db.set(`user_${member.id}`, {warns: 0, kicks: 0, bans: 0, mutes: 0, automod: 0})
            }
            if(db.get(`user_${member.id}.automod` === 5)){
                db.add(`user_${member.id}.warns`, 1)
                db.remove(`user_${member.id}.automod`, 5)
            }
        
            if(db.get(`user_${member.id}.warns`) === 3){
                //Mute the person
                var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
                var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
                var userLog = new Discord.MessageEmbed()
                .setColor('0x05ff4c')
                .setTitle(`You have been muted for 30 minutes hour in ${msg.guild.name}!\nReason: Auto mute for 3 warns`)
                user.roles.add(muteRole)
                user.roles.remove(main)
                user.send(userLog)
                db.add(`user_${member.id}.mutes`, 1);
        
                await mongo().then(async (mongoose) => {
                    try {
                        await new punishmentSchema({
                            userID: member.id,
                            type: 'MUTE',
                            reason: 'Auto mute (30 minutes) for 3 warns',
                            by: 'AutoMod'
                        }).save()
                    } finally {
                        mongoose.connection.close()
                    }
                })
                
                setTimeout(function () {
                    user.roles.remove(muteRole)
                    user.roles.add(main)
                } , 1800000);    
            }
            if(db.get(`user_${member.id}.warns`) === 4){
                //Mute the person
                var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
                var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
                var userLog = new Discord.MessageEmbed()
                .setColor('0x05ff4c')
                .setTitle(`You have been muted for 1 hour in ${msg.guild.name}!\nReason: Auto mute for 4 warns`)
                user.roles.add(muteRole)
                user.roles.remove(main)
                user.send(userLog)
                db.add(`user_${member.id}.mutes`, 1);
        
                await mongo().then(async (mongoose) => {
                    try {
                        await new punishmentSchema({
                            userID: member.id,
                            type: 'MUTE',
                            reason: 'Auto mute (1 hour) for 4 warns',
                            by: 'AutoMod'
                        }).save()
                    } finally {
                        mongoose.connection.close()
                    }
                })
                
                setTimeout(function () {
                    user.roles.remove(muteRole)
                    user.roles.add(main)
                } , 3600000);    
            }
            if(db.get(`user_${member.id}.warns`) === 5){
                //Mute the person
                var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
                var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
                var userLog = new Discord.MessageEmbed()
                .setColor('0x05ff4c')
                .setTitle(`You have been kicked from ${msg.guild.name}!\nReason: Auto kick for 5 warns`)
                await user.send(userLog)
                db.add(`user_${member.id}.kicks`, 1);
                await member.kick("Auto kick for 5 warns") 
                await mongo().then(async (mongoose) => {
                    try {
                        await new punishmentSchema({
                            userID: member.id,
                            type: 'KICK',
                            reason: 'Auto kick for 5 warns',
                            by: 'AutoMod'
                        }).save()
                    } finally {
                        mongoose.connection.close()
                    }
                })
                
                
         
            }
            if(db.get(`user_${member.id}.warns`) === 6){
                //Mute the person
                var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
                var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
                var userLog = new Discord.MessageEmbed()
                .setColor('0x05ff4c')
                .setTitle(`You have been banned from ${msg.guild.name}!\nReason: Auto temp-ban (2 days) for 6 warns`)
                await user.send(userLog)
                db.add(`user_${member.id}.bans`, 1);
                await member.ban() 
        
                await mongo().then(async (mongoose) => {
                    try {
                        await new punishmentSchema({
                            userID: member.id,
                            type: 'BAN',
                            reason: 'Auto ban (2 bans) for 6 warns',
                            by: 'AutoMod'
                        }).save()
                    } finally {
                        mongoose.connection.close()
                    }
                })
        
                setTimeout(function () {
                    user.unban()
                } , 172800000);     
         
            }
            if(db.get(`user_${member.id}.warns`) === 7){
                //Mute the person
                var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
                var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
                var userLog = new Discord.MessageEmbed()
                .setColor('0x05ff4c')
                .setTitle(`You have been banned from ${msg.guild.name}!\nReason: Auto perm-ban for 7 warns`)
                user.send(userLog)
                db.add(`user_${member.id}.bans`, 1);
                member.ban()  
                
                await mongo().then(async (mongoose) => {
                    try {
                        await new punishmentSchema({
                            userID: member.id,
                            type: 'BAN',
                            reason: 'Auto ban (cemi-perm) for 7 warns',
                            by: 'AutoMod'
                        }).save()
                    } finally {
                        mongoose.connection.close()
                    }
                })
         
            }
            if(db.get(`user_${member.id}.warns`) === 8){
                //Mute the person
                var main = msg.guild.roles.cache.find(role => role.name === '✔️VERIFIED✔️');
                var muteRole = msg.guild.roles.cache.find(role => role.name === '❌MUTED ❌');
                var userLog = new Discord.MessageEmbed()
                .setColor('0x05ff4c')
                .setTitle(`You have been kicked from ${msg.guild.name}!\nReason: Auto perm-ban for 8 warns`)
                user.send(userLog)
                db.add(`user_${member.id}.bans`, 1);
                member.ban()    
        
                await mongo().then(async (mongoose) => {
                    try {
                        await new punishmentSchema({
                            userID: member.id,
                            type: 'BAN',
                            reason: 'Auto perm ban for 8 warns',
                            by: 'AutoMod'
                        }).save()
                    } finally {
                        mongoose.connection.close()
                    }
                })
         
            }


        }            
    }
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) {
        //modmail?
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));


    if(command) command.execute(client, message, args, Discord, db);
}
