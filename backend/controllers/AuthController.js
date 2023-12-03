const User = require("../models/UserModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const validator = require('validator');

//REGISTER
const register = async (req, res) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({ error: 'Correo electrónico no válido' });
  }
  const newUser = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    birthday:req.body.birthday,
    phone:req.body.phone,
    country: req.body.country,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    cp: req.body.cp,
    isAdmin:req.body.isAdmin,
    img: req.body.img,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//LOGIN

const login =  async (req, res) => {
  try {
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({ error: 'Correo electrónico no válido' });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong credentials!");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== req.body.password) {
      return res.status(401).json("Wrong credentials!");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        //permissions:["user:read","user:write"]
      },

      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    const { password, ...others } = user._doc;

    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {register,login};
