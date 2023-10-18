const jwt = require("jsonwebtoken");

const Jimp = require("jimp");
const fs = require("fs").promises;

const User = require("../service/schemas/user");

const signup = async (req, res) => {
  const { email, password } = req.body;

  // create new user
  const newUser = new User({ email });
  const token = jwt.sign({ _id: newUser._id }, process.env.SECRET, {
    expiresIn: "1h",
  });

  const verificationToken = jwt.sign({ _id: newUser._id }, process.env.SECRET, {
    expiresIn: "1h",
  });

  newUser.setPassword(password);
  newUser.token = token;

  newUser.generateAvatar();
  newUser.setVerificationToken(verificationToken, email);

  await newUser.save();

  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
    },
  });
};

const confirmEmailUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });

  user.verify = true;
  user.verificationToken = "";

  await user.save();

  res.status(200).json({
    message: "Verification successful",
  });
};

async function verifyEmail(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json();

  if (user.verify)
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });

  const verificationToken = jwt.sign({ _id: user._id }, process.env.SECRET, {
    expiresIn: "1h",
  });

  user.setVerificationToken(verificationToken, email);

  await user.save();

  res.status(200).json({ message: "Verification email sent" });
}

const login = async (req, res) => {
  const { password: bodyPassword, email: bodyEmail } = req.body;

  const user = await User.findOne({ email: bodyEmail });

  if (!user.verify)
    return res.status(400).json({ message: "Must verify email" });

  if (!user || !user.validPassword(bodyPassword)) {
    return res.status(400).json({ message: "Incorrect login or password" });
  }

  const { email, _id, subscription } = user;

  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });

  await User.findOneAndUpdate({ _id }, { token: token });

  res.status(200).json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

const logout = async (req, res) => {
  await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
  res.status(204).json();
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = await User.findOne({ _id: req.user._id });

  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { email } = await User.findOneAndUpdate(
    { _id: req.user._id },
    { subscription: req.body.subscription }
  );

  res.status(201).json({ email, subscription });
};

const updateAvatar = async (req, res) => {
  const { filename } = req.file;

  const files = await fs.readdir("public/avatars");

  files.forEach((file) => {
    if (file.split("-")[0] === filename.split("-")[0]) {
      fs.unlink(`public/avatars/${file}`);
    }
  });

  const temporaryURL = `public/tmp/${filename}`;
  const permanentURL = `public/avatars/${filename}`;

  const globalURL = `/avatars/${filename}`;

  Jimp.read(temporaryURL)
    .then((lenna) => {
      return lenna
        .resize(250, 250) // resize
        .write(permanentURL); // save
    })
    .catch((err) => {
      console.error(err);
    });

  await fs.unlink(temporaryURL);

  await User.findOneAndUpdate({ _id: req.user._id }, { avatarURL: globalURL });

  res.status(200).json({
    avatarURL: globalURL,
  });
};

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  confirmEmailUser,
  verifyEmail,
};
