const express = require("express");
const router = express.Router();

// LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("LOGIN DATA:", email, password);

    if (email === "admin@admin" && password === "admin1234") {
        return res.json({
            user: {
                email,
                role: "admin"
            },
            token: "fake-token"
        });
    }

    res.status(401).json({ message: "Credenciales invalidas" });
});

// SIGNUP
router.post("/signup", (req, res) => {
    const { email, password } = req.body;

    res.json({
        message: "Usuario creado",
        email
    });
});

module.exports = router;