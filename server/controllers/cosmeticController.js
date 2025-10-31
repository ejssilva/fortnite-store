const Cosmetic = require('../models/Cosmetic');

// @desc    Buscar todos os cosméticos com filtros e paginação
// @route   GET /api/cosmetics
// @access  Público
const getCosmetics = async (req, res) => {
  try {
    // 1. FILTRAGEM
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Filtros de texto (nome) e booleanos (isNew, isInShop)
    let query = {};
    if (queryObj.name) {
      // Busca por nome "case-insensitive"
      query.name = { $regex: queryObj.name, $options: 'i' };
    }
    if (queryObj.type) {
      query['type.value'] = queryObj.type;
    }
    if (queryObj.rarity) {
      query['rarity.value'] = queryObj.rarity;
    }
    if (queryObj.isNew) {
      query.isNew = queryObj.isNew === 'true';
    }
    if (queryObj.isInShop) {
      query.isInShop = queryObj.isInShop === 'true';
    }

    // Filtro por intervalo de datas (data de inclusão)
    if (queryObj.startDate || queryObj.endDate) {
      query.added = {};
      if (queryObj.startDate) {
        query.added.$gte = new Date(queryObj.startDate);
      }
      if (queryObj.endDate) {
        query.added.$lte = new Date(queryObj.endDate);
      }
    }
    
    // 2. PAGINAÇÃO
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20; // Limite padrão de 20 itens por página
    const skip = (page - 1) * limit;

    // 3. EXECUÇÃO DA QUERY
    const cosmetics = await Cosmetic.find(query)
      .sort({ added: -1 }) // Ordena pelos mais recentes por padrão
      .skip(skip)
      .limit(limit);

    // 4. OBTENDO O TOTAL DE DOCUMENTOS PARA PAGINAÇÃO
    const totalCosmetics = await Cosmetic.countDocuments(query);
    const totalPages = Math.ceil(totalCosmetics / limit);

    res.status(200).json({
      status: 'success',
      results: cosmetics.length,
      totalCosmetics,
      totalPages,
      currentPage: page,
      data: cosmetics,
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao buscar cosméticos',
      error: error.message,
    });
  }
};

// @desc    Buscar um único cosmético pelo ID
// @route   GET /api/cosmetics/:id
// @access  Público
const getCosmeticById = async (req, res) => {
    try {
        const cosmetic = await Cosmetic.findById(req.params.id);

        if (!cosmetic) {
            return res.status(404).json({ message: 'Cosmético não encontrado' });
        }

        res.status(200).json(cosmetic);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
};


module.exports = { getCosmetics, getCosmeticById };
