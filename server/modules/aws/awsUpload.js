var AWS = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");
var { v4: uuidv4 } = require("uuid");
var { awsCredentials } = require("../../config.js");

AWS.config.update({
  accessKeyId: awsCredentials.AWS_ACCESS_KEY_ID,
  secretAccessKey: awsCredentials.AWS_SECRET_KEY,
  signatureVersion: "v4",
});

const S3 = new AWS.S3();

const isAllowedMimetype = (mime) =>
  [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/x-ms-bmp",
    "image/webp",
  ].includes(mime.toString());

const fileFilter = (req, file, callback) => {
  const fileMime = file.mimetype;
  if (isAllowedMimetype(fileMime)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const getUniqFileName = (originalname) => {
  const name = uuidv4();
  const ext = originalname.split(".").pop();
  return `${name}.${ext}`;
};

const handleUploadMiddleware = multer({
  fileFilter,
  storage: multerS3({
    s3: S3,
    bucket: awsCredentials.AWS_BUCKET_NAME,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const fileName = getUniqFileName(file.originalname);
      const s3_inner_directory = "flowadsfiles";
      const finalPath = `${s3_inner_directory}/${fileName}`;

      file.newName = fileName;

      cb(null, finalPath);
    },
  }),
});

// const api_uploadFiles = (req, res) => {
//   console.log(req);
//   res.status(200);
//   return {
//     msg: "Uploaded!",
//     files: req.files,
//   };
// };

exports.S3 = S3;

exports.handleUploadMiddleware = handleUploadMiddleware;
