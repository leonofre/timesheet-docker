const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organization',
  },
  income: {
    type: Number,
    required: true
  }
});

UserSchema.pre('save', async function(next) {
  // only hash the password if it has been modified (or is new)

  try {
    const user = await User.find({ email: this.email});

    if ( user.length !== 0 ) {
      var error = {
        message: 'E-mail already exists',
        status: 422
      };
      
      throw error;
    }

    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.pre('save', async function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.pre(['updateOne', 'findOneAndUpdate'], async function(next) {
  var user = this;

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    user._update.password = await bcrypt.hash(user.get('password'), salt);

    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const User = mongoose.model('user', UserSchema);
module.exports = User;
