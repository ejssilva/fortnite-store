const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Registrar um novo usuário
// @route   POST /api/users/register
// @access  Público
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'Usuário já cadastrado com este e-mail.' });
  }

  try {
    const user = await User.create({
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        vbucks: user.vbucks,
        token: generateToken(user._id), // Gera e envia o token no cadastro
      });
    } else {
      res.status(400).json({ message: 'Dados de usuário inválidos.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// @desc    Autenticar (login) um usuário
// @route   POST /api/users/login
// @access  Público
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  // Procura o usuário e inclui a senha na busca com .select('+password')
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      vbucks: user.vbucks,
      ownedCosmetics: user.ownedCosmetics,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'E-mail ou senha inválidos.' });
  }
};

module.exports = { registerUser, loginUser };
