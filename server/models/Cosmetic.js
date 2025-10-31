const mongoose = require('mongoose');

const CosmeticSchema = new mongoose.Schema({
  apiId: { // ID original da API do Fortnite
    type: String,
    required: true,
    unique: true,
    index: true // Otimiza a busca por este campo
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: { // Ex: 'outfit', 'backpack'
    value: String,
    displayValue: String
  },
  rarity: { // Ex: 'epic', 'legendary'
    value: String,
    displayValue: String
  },
  price: { // Preço em v-bucks
    type: Number,
    default: 0
  },
  added: { // Data em que foi adicionado ao jogo
    type: Date
  },
  images: {
    smallIcon: String,
    icon: String,
    featured: String
  },
  // Campos para a nossa lógica de negócio
  isNew: {
    type: Boolean,
    default: false
  },
  isInShop: {
    type: Boolean,
    default: false
  }
}, {
  // Adiciona os campos createdAt e updatedAt automaticamente
  timestamps: true
});

const Cosmetic = mongoose.model('Cosmetic', CosmeticSchema);

module.exports = Cosmetic;
