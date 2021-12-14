const mongoose = require('mongoose'),
  aggregatePaginate = require('mongoose-aggregate-paginate-v2'),
  Schema = mongoose.Schema,
  Relationship = new Schema(
    {
      inviter: { type: String, maxLength: 100 },
      invited: { type: String, maxLength: 100 },
      emailSupplier: { type: String },
      status: { type: String, default: 'pending' },
    },
    { timestamps: true },
  );
Relationship.plugin(aggregatePaginate);

module.exports = mongoose.model('Relationship', Relationship);
