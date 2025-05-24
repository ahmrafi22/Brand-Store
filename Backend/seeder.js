const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Products = require("./Models/Products");
const User = require("./Models/User");
const Cart = require("./Models/Cart");
const products1 = require("./data/products");

dotenv.config()
mongoose.connect(process.env.MONGO_URI)

const seedData = async () => {
    try{
        await Products.deleteMany()
        await User.deleteMany()
        await Cart.deleteMany()

        const createdUser = await User.create({
            name: "Admin User",
            email:"admin@example.com",
            password:"123456",
            role:"Admin"
        })

        const userID = createdUser._id;

        const sampleProducts = products1.map((product) => {
            return {...product , user : userID}
        })

        await Products.insertMany(sampleProducts)
        console.log("Products inserted");
        process.exit()
    } catch (error){
        console.log("error in inserting", error.message);
        process.exit(1)
    }
}

seedData()