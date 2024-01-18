var { awsCredentials } = require("../../config.js");
var { v4: uuidv4 } = require("uuid");
var AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: awsCredentials.AWS_ACCESS_KEY_ID,
  secretAccessKey: awsCredentials.AWS_SECRET_KEY,
  signatureVersion: "v4",
});

const s3 = new AWS.S3();

module.exports = {
  generateXml: async (req, res, xml) => {
    return new Promise((resolve, reject) => {
      try {
        const params = {
          Bucket: awsCredentials.AWS_BUCKET_NAME, // pass your bucket name
          Key: `adfeed-${uuidv4()}.xml`, // file will be saved as testBucket/contacts.xml
          ACL: "public-read",
          Body: xml,
          ContentType: "text/xml",
        };

        s3.upload(params, function (s3Err, data) {
          if (s3Err) throw s3Err;
          else {
            resolve(data.Location);
          }
        });
      } catch (e) {
        console.log(e);
        reject(false);
      }
    });
  },
};
