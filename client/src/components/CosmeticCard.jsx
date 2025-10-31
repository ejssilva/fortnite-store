import React from 'react';
import './CosmeticCard.css';

const CosmeticCard = ({ cosmetic, onClick }) => {
  // Se não houver cosmético ou imagem, não renderiza nada
  if (!cosmetic || !cosmetic.images.icon) {
    return null;
  }

  // --- INÍCIO DA CORREÇÃO ---
  // Esta é a linha que estava faltando. Ela define a variável 'rarityClass'.
  const rarityClass = cosmetic.rarity?.value || 'common';
  // --- FIM DA CORREÇÃO ---

  return (
    <div className={`cosmetic-card ${rarityClass}`} onClick={onClick}>
      <div className="card-image-container">
        <img src={cosmetic.images.icon} alt={cosmetic.name} className="card-image" />
      </div>
      <div className="card-info">
        <h3 className="card-name">{cosmetic.name}</h3>
        <p className="card-rarity">{cosmetic.rarity?.displayValue}</p>
      </div>
      <div className="card-icons">
        {cosmetic.isNew && <span className="icon-new" title="Novo">N</span>}
        {cosmetic.isInShop && <span className="icon-shop" title="Na Loja">$</span>}
      </div>
    </div>
  );
};

export default CosmeticCard;
