const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  profession: {
    type: String,
    required: true,
    minLength: 6,
  },
  todo_work: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ToDo_Work'
    }
  ],
}, {
  timestamps: true
})

const User = model('User', UserSchema);

module.exports = User;