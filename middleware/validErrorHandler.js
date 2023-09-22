module.exports = (error, req, res, next) => {
  res
    .status(404)
    .json({ messager: error.message.split("Error:").join(" ").trim() });
};
