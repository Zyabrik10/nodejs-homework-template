const multer = require("multer");
const uuid = require("uuid").v4;
const { createStatusError } = require("../help/createStatusError");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/tmp");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    cb(null, `${req.user._id}-${uuid()}.${extension}`);
  },
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image/")) {
    callback(null, true);
  } else {
    callback(createStatusError(400, "Can upload only images"), false);
  }
};

const updateAvatarMulter = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1048576,
  },
});

module.exports = updateAvatarMulter;
