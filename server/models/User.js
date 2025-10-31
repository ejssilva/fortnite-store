const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório'],
    unique: true,
    match: [/.+\@.+\..+/, 'Por favor, insira um e-mail válido']
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória'],
    select: false // Não retorna a senha em queries por padrão
  },
  vbucks: {
    type: Number,
    default: 10000
  },
  ownedCosmetics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cosmetic'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware (hook) para criptografar a senha antes de salvar o usuário
UserSchema.pre('save', async function(next) {
  // Só criptografa a senha se ela foi modificada (ou é nova)
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar a senha informada com a senha do banco
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
