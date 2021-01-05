
const http = require("http");
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');

// Configure env vars in env file
require('dotenv').config();

// init app
const app = express();

app.use(cors());
app.use(express.json({ limit: '10kb' })); // Parse JSON

const port = process.env.PORT || 8000;
const server = http.createServer(app);

// Mongoose mongodb atlas connection
const uri = process.env.ATLAS_URI;
// Flags parses mongodb connection string
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB database connection established successfully")
})
.catch(err => {
    console.log("server not connecting")
})


// Require and use model route files
const authRouter = require('./routes/auth');


app.use('/auth', authRouter);


app.use(express.static('../frontend/build'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
})

// Serve static assets in production (client)
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
    })
}

server.listen(port, () => console.log(`server is running on port ${port}`));