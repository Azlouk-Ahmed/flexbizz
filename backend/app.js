const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const app = express();
const passport = require('passport');
const cors = require("cors");
require("dotenv").config();
const googleAuthRouter = require("./routes/googleAuth");
const passportSetup  = require("./config/passport-setup");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes"); // Renamed to match convention
const userRouter = require("./routes/userRoutes");
const multer = require('multer');

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true // Allow cookies to be sent along with the request
}));
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["somestrongsecretkey"]
}));
app.use(passport.session());

app.use(passport.initialize());
app.use(express.json());

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads'); // Destination folder for file uploads
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});
const upload = multer({ storage: storage });

// Route for handling file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ filename: req.file.filename });
});
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/auth', googleAuthRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT,() => console.log("listening to "+ process.env.PORT))
}).catch((err) => {
    console.log(err); 
});
