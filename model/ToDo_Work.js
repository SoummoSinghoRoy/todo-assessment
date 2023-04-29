const {Schema, model} = require('mongoose');
const moment = require('moment');

const ToDo_WorkSchema = new Schema({
  work_description: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
    set: (value) => moment(value).format('DD-MM-YYYY'),
    get: (value) => moment(value).format('DD-MM-YYYY')
  },
  status: {
    type: String,
    default: 'Pending'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true
})

ToDo_WorkSchema.index({
  status: 'text'
}, {
  weights: {
    status: 5
  }
})

const ToDo_Work = model('ToDo_Work', ToDo_WorkSchema);

module.exports = ToDo_Work;