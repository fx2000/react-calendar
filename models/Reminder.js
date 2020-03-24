const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
  description: {
    type: String,
    maxlength: 30,
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
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

reminderSchema.index({

});

const Reminder = mongoose.model('Reminder', reminderSchema);
module.exports = Reminder;
