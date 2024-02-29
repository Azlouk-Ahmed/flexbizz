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
const messageRouter = require("./routes/messageRoutes");
const userRouter = require("./routes/userRoutes");
const portfolioRouter = require("./routes/portfolioRoutes");
const announcementRouter = require("./routes/announcementRoutes");
const commentRouter = require("./routes/commentsRoutes");
const reportRouter = require("./routes/reportRoutes");

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["somestrongsecretkey"]
}));
app.use(passport.session());

app.use(passport.initialize());
app.use(express.json());

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/auth', googleAuthRouter);
app.use('/report', reportRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);
app.use('/portfolio', portfolioRouter);
app.use('/announcement', announcementRouter);
app.use('/comment', commentRouter);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT,() => console.log("listening to "+ process.env.PORT))
}).catch((err) => {
    console.log(err); 
});
