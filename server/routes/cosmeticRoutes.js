const express = require('express');
const router = express.Router();
const { getCosmetics, getCosmeticById } = require('../controllers/cosmeticController');

// Rota para buscar todos os cosméticos com filtros e paginação
// Ex: GET /api/cosmetics?page=2&limit=10&rarity=epic&name=renegade
router.get('/', getCosmetics);

// Rota para buscar um cosmético específico pelo seu ID do nosso banco
router.get('/:id', getCosmeticById);

module.exports = router;
