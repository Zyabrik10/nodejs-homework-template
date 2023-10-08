const jwt = require("jsonwebtoken");

const User = require("../service/schemas/user");

const signup = async (req, res) => {
  const { email, password } = req.body;

  // create new user
  const newUser = new User({ email });
  const token = jwt.sign({ _id: newUser._id }, process.env.SECRET, {
    expiresIn: "1h",
  });

  newUser.setPassword(password);
  newUser.token = token;

  await newUser.save();

  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { password: bodyPassword, email: bodyEmail } = req.body;

  const user = await User.findOne({ email: bodyEmail });

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

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
};
