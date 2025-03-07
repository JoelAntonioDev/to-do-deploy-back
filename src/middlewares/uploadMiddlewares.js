const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Tipos de arquivos permitidos
const extensoes = ["pdf", "png", "jpg","docx"];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
        cb(null, filename);
    },
});

// Filtro de tipos de arquivo
const filtradorArquivo = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
    if (extensoes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error(`Tipo de arquivo não permitido: ${ext}`), false);
    }
};

const upload = multer({
    storage,
    filtradorArquivo,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
});

module.exports = upload;
