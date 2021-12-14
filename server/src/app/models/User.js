const mongoose = require('mongoose'),
  { nanoid } = require('nanoid'),
  Schema = mongoose.Schema,
  User = new Schema(
    {
      _id: { type: String, default: nanoid() },
      uuid: { type: String },
      email: { type: String, maxLength: 100, unique: true, email: true },
      image: { type: String },
      password: { type: String, maxLength: 100 },
      id_company: { type: String },
    },
    { timestamps: true },
  );

module.exports = mongoose.model('User', User);
