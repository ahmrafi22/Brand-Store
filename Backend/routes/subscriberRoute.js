const express = require("express");
const Subscriber = require("../Models/Subscriber");
const router = express.Router();


router.post("/subscribe", async(req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(404).json({ message: "No Email found" });
    }

    try {
        let subscriber = await Subscriber.findOne({email})
        if (subscriber) {
            return res.status(400).json({ message: "Already a subscriber" });
        }

        subscriber = new Subscriber({email})
        await subscriber.save()
        res.status(201).json({ message: "Successfully added as a subscriber"});

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message});
    }
})

module.exports = router