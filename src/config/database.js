const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
});

connection.connect(err => {
    if (err) {
        console.error("❌ Erro ao conectar ao MySQL:", err);
        return;
    }
    console.log("✅ Conectado ao MySQL do InfinityFree!");
});

module.exports = connection;
