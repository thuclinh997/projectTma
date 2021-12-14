const { cloudinary } = require('../../../util/cloudinary');

module.exports = {
  async uploadAndSetUrlImage(image = null, imageDefault) {
    try {
      if (image) {
        const fileStr = image;
        const uploaded = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'dev_upload',
        });
        console.log(uploaded.url);
        return uploaded.url;
      }
      return imageDefault;
    } catch (error) {
      return error.message;
    }
  },
};
