import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';
import CosmeticCard from '../components/CosmeticCard';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';
import Modal from '../components/Modal';
import './CosmeticsPage.css';

const CosmeticsPage = () => {
  const [cosmetics, setCosmetics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [activeFilters, setActiveFilters] = useState({});
  const [selectedCosmetic, setSelectedCosmetic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const handleCardClick = (cosmetic) => {
    setSelectedCosmetic(cosmetic);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCosmetic(null);
  };

  useEffect(() => {
    const fetchCosmetics = async () => {
      // Sempre começa uma nova busca setando o loading para true
      setLoading(true);
      setError(null); // Limpa erros antigos

      try {
        const params = {
          page: currentPage,
          limit: 20,
          ...activeFilters,
        };

        const response = await apiClient.get('/cosmetics', { params });
        
        setCosmetics(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError('Não foi possível carregar os cosméticos. Verifique se o servidor backend está rodando e acessível.');
        console.error("Erro ao buscar cosméticos:", err);
      } finally {
        // ESSA É A LINHA MAIS IMPORTANTE: garante que o loading termine
        setLoading(false);
      }
    };

    fetchCosmetics();
  }, [currentPage, activeFilters]);

  // --- INÍCIO DA CORREÇÃO NA LÓGICA DE RENDERIZAÇÃO ---
  // Vamos criar uma variável para o conteúdo principal para deixar o return mais limpo
  let content;
  if (loading) {
    content = <div className="page-status">Carregando...</div>;
  } else if (error) {
    content = <div className="page-status error">{error}</div>;
  } else if (cosmetics.length === 0) {
    content = <div className="page-status">Nenhum cosmético encontrado com esses filtros.</div>;
  } else {
    content = (
      <div className="cosmetics-grid">
        {cosmetics.map(cosmetic => (
          <CosmeticCard 
            key={cosmetic._id} 
            cosmetic={cosmetic} 
            onClick={() => handleCardClick(cosmetic)}
          />
        ))}
      </div>
    );
  }
  // --- FIM DA CORREÇÃO ---

  return (
    <div className="cosmetics-page">
      <h1>Itens do Fortnite</h1>
      
      <Filters onFilterChange={handleFilterChange} />
      
      {/* A paginação agora só aparece se não estiver carregando e houver mais de uma página */}
      {!loading && totalPages > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      
      {/* Renderiza a variável de conteúdo que preparamos */}
      {content}
      
      {/* Repete a paginação no final */}
      {!loading && totalPages > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <Modal show={isModalOpen} onClose={closeModal}>
        {selectedCosmetic && (
          <div className="cosmetic-details">
            <h2>{selectedCosmetic.name}</h2>
            <img src={selectedCosmetic.images.featured || selectedCosmetic.images.icon} alt={selectedCosmetic.name} style={{ maxWidth: '100%', borderRadius: '8px' }} />
            <p>{selectedCosmetic.description}</p>
            <p><strong>Raridade:</strong> {selectedCosmetic.rarity?.displayValue}</p>
            <p><strong>Tipo:</strong> {selectedCosmetic.type?.displayValue}</p>
            <p><strong>Adicionado em:</strong> {new Date(selectedCosmetic.added).toLocaleDateString('pt-BR')}</p>
            {selectedCosmetic.price > 0 && <p className="details-price"><strong>Preço:</strong> {selectedCosmetic.price} V-Bucks</p>}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CosmeticsPage;
