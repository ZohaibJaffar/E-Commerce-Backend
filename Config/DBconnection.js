const mongoose = require('mongoose')


async function DBconnection(url){
    try {
        const connection = await mongoose.connect(url)
        return connection
    } catch (error) {
        console.log(`There is error error while connecting with Database ${error}`)
    }
}


module.exports = DBconnection