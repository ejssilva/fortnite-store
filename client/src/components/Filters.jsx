import React, { useState } from 'react';
import './Filters.css';

// Opções para os filtros de raridade e tipo
const rarityOptions = [
  { value: 'legendary', label: 'Lendário' },
  { value: 'epic', label: 'Épico' },
  { value: 'rare', label: 'Raro' },
  { value: 'uncommon', label: 'Incomum' },
  { value: 'common', label: 'Comum' },
];

const typeOptions = [
  { value: 'outfit', label: 'Traje' },
  { value: 'backpack', label: 'Acessório para as Costas' },
  { value: 'pickaxe', label: 'Ferramenta de Coleta' },
  { value: 'glider', label: 'Asa-delta' },
  { value: 'emote', label: 'Gesto' },
];

const Filters = ({ onFilterChange }) => {
  // Estado para cada campo de filtro
  const [name, setName] = useState('');
  const [rarity, setRarity] = useState('');
  const [type, setType] = useState('');
  const [isInShop, setIsInShop] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const handleApplyFilters = () => {
    // Monta um objeto apenas com os filtros que têm valor
    const activeFilters = {};
    if (name) activeFilters.name = name;
    if (rarity) activeFilters.rarity = rarity;
    if (type) activeFilters.type = type;
    if (isInShop) activeFilters.isInShop = 'true';
    if (isNew) activeFilters.isNew = 'true';
    
    // Chama a função do componente pai com os filtros
    onFilterChange(activeFilters);
  };

  const handleClearFilters = () => {
    // Limpa o estado local
    setName('');
    setRarity('');
    setType('');
    setIsInShop(false);
    setIsNew(false);
    // Chama a função do pai com um objeto vazio para limpar
    onFilterChange({});
  };

  return (
    <div className="filters-container">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="filter-input"
        />
        <select value={rarity} onChange={(e) => setRarity(e.target.value)} className="filter-select">
          <option value="">Todas as Raridades</option>
          {rarityOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className="filter-select">
          <option value="">Todos os Tipos</option>
          {typeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label className="filter-checkbox">
          <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
          Apenas Novos
        </label>
        <label className="filter-checkbox">
          <input type="checkbox" checked={isInShop} onChange={(e) => setIsInShop(e.target.checked)} />
          Apenas na Loja
        </label>
      </div>
      <div className="filter-buttons">
        <button onClick={handleApplyFilters} className="btn-apply">Aplicar Filtros</button>
        <button onClick={handleClearFilters} className="btn-clear">Limpar</button>
      </div>
    </div>
  );
};

export default Filters;
