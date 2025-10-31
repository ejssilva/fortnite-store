import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, children }) => {
  // Se 'show' for falso, o modal não é renderizado
  if (!show) {
    return null;
  }

  return (
    // O 'modal-backdrop' é o fundo escuro que cobre a página
    <div className="modal-backdrop" onClick={onClose}>
      {/* O 'modal-content' é a caixa branca onde o conteúdo fica.
          Usamos e.stopPropagation() para evitar que um clique dentro
          do modal feche-o (já que o backdrop tem um onClick). */}
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* O botão de fechar (X) */}
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {/* 'children' é onde o conteúdo específico do modal será renderizado */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
