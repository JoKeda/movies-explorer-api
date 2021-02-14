const { model, Schema } = require('mongoose');
const { emailValidator } = require('../validation/index');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: emailValidator,
      message: 'Некоректный email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = model('user', userSchema);
