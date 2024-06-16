const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.getUserById(decoded.id);
        if (!user) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    } catch (err) {
        res.sendStatus(403);
    }
};

module.exports = authenticateToken;
