const mongoose = require('mongoose')

const dbconnect = async()=>{
    try {
        const conn = mongoose.connect(process.env.DATABASE_URL)
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports = dbconnect;