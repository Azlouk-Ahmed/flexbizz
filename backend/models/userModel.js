const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  name: {
    type: String,
  },
  familyName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  img : {
      type: String,
      default: "/img/defaultuser.png"
  },
  connections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  role: {
      type: String,
      enum: ['Admin', 'Service', 'User'],
      default: 'User'
  },
  badges: [String]
}, { timestamps: true });

userSchema.statics.signUp = async function(email, password, img, name, familyName) {
  if (!email || !password) {
      throw Error("email or password connot be empty")
  }
  else if (!validator.isEmail(email)){
      throw Error("cannot accept invalid Emails")
  }
  const exist = await this.findOne({email});
  if(exist) {
      throw Error("this email is already signed up , try to login")
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({email: email, password : hash, img : img, name : name, familyName : familyName})
  return user;
}

userSchema.statics.logIn = async function(email, password) {
  const user = await this.findOne({email});
  if(!user) {
      throw Error("email not found ! ")
  }
  if(!email || !password) {
      throw Error("email or password cannot be empty !")
  }
  if(!validator.isEmail(email)){
      throw Error("cannot accept unvalid emails")
  }
  if(user.role === "admin") {
      return user;
  }
  const match = await bcrypt.compare(password, user.password);
  if(!match){
      throw Error("incorrect password")
  }

  return user;
}


module.exports = mongoose.model("User", userSchema);