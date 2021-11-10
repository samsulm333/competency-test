const multer = require("multer");

module.exports = (imageFile) => {
  // set destination
  const storage = multer.diskStorage({
    destination: function (request, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (request, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  // filtering file upload
  const fileFilter = function (req, file, cb) {
    if (file.filename === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: "Only image file allowed",
        };
        return cb(new Error("Only image file allowed", false));
      }
    }
    cb(null, true);
  };

  // Sizing file upload
  const sizeInMB = 10;
  const maxSize = sizeInMB * 1000 * 1000;

  // Generate Setting
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(imageFile);

  // Middleware handler
  return (request, response, next) => {
    upload(request, response, function (err) {
      if (request.fileValidationError) {
        request.session.message = {
          type: "danger",
          message: "Please select files upload",
        };
        console.log(request.session.message);
        return response.redirect(request.originalUrl);
      }

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          request.session.message = {
            type: "danger",
            message: "Error, max file sized 10mb",
          };
          console.log(request.session.message);
          return response.redirect(request.originalUrl);
        }
        request.session.message = {
          type: "danger",
          message: err,
        };
        console.log(request.session.message);
        return response.redirect(request.originalUrl);
      }
      console.log(request.session.message);
      return next();
    });
  };
};
