const axios = require('axios');
const Cosmetic = require('../models/Cosmetic');

const API_BASE_URL = 'https://fortnite-api.com';
const API_LANG = 'pt-BR';

const syncCosmetics = async ( ) => {
  console.log('Iniciando sincronização de cosméticos...');

  try {
    // ... (nenhuma mudança nos Passos 1, 2 e 3)
    console.log('Buscando todos os cosméticos da API...');
    const allCosmeticsResponse = await axios.get(`${API_BASE_URL}/v2/cosmetics/br`, { params: { language: API_LANG } });
    const allCosmetics = allCosmeticsResponse.data.data;

    console.log('Determinando quais cosméticos são novos...');
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newCosmeticsIds = new Set(allCosmetics.filter(item => new Date(item.added) > sevenDaysAgo).map(item => item.id));

    console.log('Buscando cosméticos da loja...');
    const shopResponse = await axios.get(`${API_BASE_URL}/v2/shop`, { params: { language: API_LANG } });
    const shopEntries = shopResponse.data.data.featured?.entries || [];
    const shopItems = shopEntries.flatMap(entry => (entry.items || []).map(item => ({ id: item.id, price: entry.finalPrice })));
    const shopItemsMap = new Map(shopItems.map(item => [item.id, item.price]));

    console.log(`Encontrados: ${allCosmetics.length} cosméticos no total, ${newCosmeticsIds.size} são considerados novos, ${shopItemsMap.size} na loja.`);

    const operations = allCosmetics.map(item => {
      // ... (nenhuma mudança na criação do objeto 'operations')
      const cosmeticData = {
        apiId: item.id, name: item.name, description: item.description,
        type: { value: item.type?.value || 'unknown', displayValue: item.type?.displayValue || 'Desconhecido' },
        rarity: { value: item.rarity?.value || 'common', displayValue: item.rarity?.displayValue || 'Comum' },
        added: item.added, images: { smallIcon: item.images?.smallIcon, icon: item.images?.icon, featured: item.images?.featured },
        isNew: newCosmeticsIds.has(item.id), isInShop: shopItemsMap.has(item.id), price: shopItemsMap.get(item.id) || 0,
      };
      return { updateOne: { filter: { apiId: item.id }, update: { $set: cosmeticData }, upsert: true } };
    });

    if (operations.length > 0) {
      console.log('Executando operações em massa no banco de dados...');
      const result = await Cosmetic.bulkWrite(operations);
      
      // --- INÍCIO DA CORREÇÃO DO LOG ---
      console.log('Sincronização concluída com sucesso!');
      console.log(`- ${result.upsertedCount} cosméticos criados.`);
      console.log(`- ${result.modifiedCount} cosméticos atualizados.`);
      // --- FIM DA CORREÇÃO DO LOG ---

    } else {
      console.log('Nenhum cosmético para sincronizar.');
    }

  } catch (error) {
    console.error('Erro fatal durante a sincronização de cosméticos:', error.message);
    if (error.response) {
      console.error(`A API respondeu com status ${error.response.status}:`, error.response.data);
    }
  }
};

module.exports = syncCosmetics;
