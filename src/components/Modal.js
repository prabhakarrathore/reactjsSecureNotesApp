import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 text-black" onClick={onClose}>X</div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-screen-sm">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
