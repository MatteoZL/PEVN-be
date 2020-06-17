import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: "mattezl",
    api_key: "243842342754734",
    api_secret: "s7xSV5BGEp1honbjGCqCKuw_tq0",
  });

const helpers = {}

helpers.uploadToCloudnry = async (file) => {
    try {
        const res = await cloudinary.uploader.upload(file);        
        return res.secure_url;
    } catch (error) {
        return error
    }
};

module.exports = helpers;
