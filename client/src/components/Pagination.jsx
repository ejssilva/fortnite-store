import React from 'react';
import './Pagination.css'; // Estilos para os botões

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Não renderiza nada se houver apenas uma página
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    // Chama a função do componente pai para mudar a página
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination-controls">
      <button 
        onClick={handlePrevious} 
        disabled={currentPage <= 1} // Desabilita o botão se estiver na primeira página
      >
        Anterior
      </button>
      <span className="page-info">
        Página {currentPage} de {totalPages}
      </span>
      <button 
        onClick={handleNext}
        disabled={currentPage >= totalPages} // Desabilita o botão se estiver na última página
      >
        Próxima
      </button>
    </div>
  );
};

export default Pagination;
