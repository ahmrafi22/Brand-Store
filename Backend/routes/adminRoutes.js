const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { protect, admin } = require("../middleware/authMiddleware");



router.get("/", protect , admin , async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message});
    }
})

router.post("/" ,protect, admin, async (req, res) =>{
    const { name, email, password, role} = req.body;
    try {
        let user = await User.findOne({email})
        if (user) {
            res.status(400).json({ message:"user exist"});
        }

        user = new User({
            name, email, password, role: role || "Customer"
        })

        await user.save()
        res.status(201).json({ message:"user added", user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message});
    }
})
//update user
router.put("/:id",protect, admin, async (req, res) =>{
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name =req.body.name || user.name;
            user.email =req.body.email || user.email;
            user.role =req.body.role || user.role;
        }
        const updatedUser = await user.save()
        res.json({ message:"user updated", updatedUser});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message});
    }
})

router.delete("/:id",protect, admin, async (req, res) =>{
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne()
            res.json({ message:"user deleted"});
        } else {
            res.status(404).json({ message:"user deleted"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message});
    }
})


module.exports = router