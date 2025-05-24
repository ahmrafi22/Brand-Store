const mongoose = require("mongoose");

const conndectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB coonected");
    } catch(err) {
        console.log("error", err);
        process.exit(1)
        
    }
}

module.exports = conndectDB