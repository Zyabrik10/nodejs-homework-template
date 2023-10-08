module.exports = (error, _, res, next) => {
  res.status(error.status).json({ message: error.message });
};
