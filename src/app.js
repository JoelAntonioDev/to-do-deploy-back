const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();

app.use(express.json());
app.use(cors({
    origin: "https://to-do-deploy-two.vercel.app", // URL correta do front-end
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
module.exports = app;
