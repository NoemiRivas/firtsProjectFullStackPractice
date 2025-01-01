const mongoose =require("mongoose")
const dbConnect = ()=>{
    try {
        const con = mongoose.connect(process.env.MONGO_BD_URL)
        console.log("base de datos conectada");        
    } catch (error) {
        throw new Error("database error");    
    } 
}
module.exports = dbConnect