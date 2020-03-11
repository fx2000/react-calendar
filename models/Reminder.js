const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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
    validate: /^((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$/,
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
