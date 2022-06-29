// We're appending the word Schema to the module so that we know it only exports a schema, not a compiled model.

const Schema = require('mongoose').Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  emoji: String,
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  price: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
});

module.exports = itemSchema;


// Because the data for the catalog is only created by the seeding process, we don't have to be overly concerned with validation.