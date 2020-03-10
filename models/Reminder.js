const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const reminderSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#3399FF'
  },
  datetime: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

reminderSchema.index({

});

const Reminder = mongoose.model('Reminder', reminderSchema);
module.exports = Reminder;
