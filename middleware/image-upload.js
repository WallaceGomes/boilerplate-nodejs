
const imageUpload = async (base64, awskey) => {
    try {
        const AWS = require('aws-sdk');

        const { AWS_KEY_ID, AWS_SECRET_KEY, AWS_BUCKET_NAME } = process.env;

        AWS.config.setPromisesDependency(require('bluebird'));
        AWS.config.update({ accessKeyId: AWS_KEY_ID, secretAccessKey: AWS_SECRET_KEY });

        const s3 = new AWS.S3();

        const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

        const type = base64.split(';')[0].split('/')[1];

        const params = {
            Bucket: AWS_BUCKET_NAME,
            Key: `${awskey}.${type}`,
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: `image/${type}`
        }

        let location = '';
        let key = '';

        const { Location, Key } = await s3.upload(params).promise();
        location = Location;
        key = Key;

        console.log(location, key);
        return location;
    } catch (error) {
        console.log(error)
    }
}

module.exports = imageUpload;