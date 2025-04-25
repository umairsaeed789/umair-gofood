const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const jwtSecret = "MynameisUmair";

router.post(
    "/creatuser",
    [
        body("email", "This is not a valid email.").isEmail(),
        body("name", "Min Length 5 for name").isLength({ min: 5 }),
        body("password", "Min Length 5 for Password").isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location,
        });
        res.json({ success: true });
        } catch (error) {
        console.log(error);
        res.json({ success: false });
        }
    }
    );

    router.post(
    "/loginuser",
    [body("email", "This is not a valid email.").isEmail()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res
            .status(400)
            .json({ errors: "Try logging with correct credentials." });
        }

        const pwdCompare = await bcrypt.compare(
            req.body.password,
            userData.password
        );

        // Password check happens here
        if (!pwdCompare) {
            return res
            .status(400)
            .json({ errors: "Try logging with correct credentials." });
        }
        const data = {
            user: {
            id: userData.id,
            },
        };
        const authToken = jwt.sign(data, jwtSecret);

        return res.json({ success: true, authToken: authToken });
        } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false });
        }
    }
);

module.exports = router;
