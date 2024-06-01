const cookieSession = require('cookie-session');
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const passportSetup  = require("./config/passport-setup");
const passport = require('passport');
const googleAuthRouter = require("./routes/googleAuth");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");
const userRouter = require("./routes/userRoutes");
const portfolioRouter = require("./routes/portfolioRoutes");
const announcementRouter = require("./routes/announcementRoutes");
const commentRouter = require("./routes/commentsRoutes");
const reportRouter = require("./routes/reportRoutes");
const notificationsRouter = require("./routes/notificationRoutes");
const propositionRouter = require("./routes/PropositionRoutes");
const paymentRouter = require("./routes/payment");
const achievementsRouter = require("./routes/achievementRoutes");
const CurrentProjectrouter = require("./routes/currentProjectRoutes");
const activitiesRoutes = require("./routes/activityRoutes");

app.use(cookieSession({
    name : "session",
    maxAge: 24 * 60 * 60 * 100,
    keys: ["lama"]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));

app.use(express.json());

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/auth', googleAuthRouter);
app.use('/report', reportRouter);
app.use('/proposition', propositionRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);
app.use('/portfolio', portfolioRouter);
app.use('/announcement', announcementRouter);
app.use('/comment', commentRouter);
app.use('/notification', notificationsRouter);
app.use("/api",paymentRouter);
app.use("/achievements",achievementsRouter);
app.use("/projects",CurrentProjectrouter);
app.use("/activities",activitiesRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT,() => console.log("listening to "+ process.env.PORT))
}).catch((err) => {
    console.log(err); 
});
