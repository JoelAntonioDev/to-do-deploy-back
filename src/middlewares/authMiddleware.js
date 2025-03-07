const jwt = require('jsonwebtoken');
require('dotenv').config();

const autenticarJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: "Acesso não autorizado" });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido" });
    }
};

module.exports = autenticarJWT;
