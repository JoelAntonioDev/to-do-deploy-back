const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();

app.use(express.json());
app.use(cors({ origin: "https://to-do-deploy-two.vercel.app/",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
 }));

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
module.exports = app;
