const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const CartRoutes = require("./routes/cartRoutes")
const checkoutRoutes = require("./routes/checkoutRoutes")
const OrderRoutes = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const subscribeRoutes = require("./routes/subscriberRoute")
const adminRoutes = require("./routes/adminRoutes")
const productadminRoutes = require("./routes/productAdminRoutes")
const adminOrderRoutes = require("./routes/adminOrderRoutes")




const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT;

connectDB()

app.get("/", (req, res) => {
    res.send("welcome to this ")
});

app.use("/api/user", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", CartRoutes)
app.use("/api/checkout", checkoutRoutes)
app.use("/api/orders", OrderRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api", subscribeRoutes)

app.use("/api/admin/users", adminRoutes)
app.use("/api/admin/products", productadminRoutes)
app.use("/api/admin/orders", adminOrderRoutes)

app.listen(PORT, () => {
    console.log(`server is running  on http://localhost:${PORT}`);
    
})