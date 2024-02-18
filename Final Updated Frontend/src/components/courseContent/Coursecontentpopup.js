import React, { useState, useEffect } from 'react';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleCloseModal = (e) => {
      if (isOpen && e.target.classList.contains('modal-overlay')) {
        // toggleModal();
    }
    setIsOpen(!isOpen);
    };

    window.addEventListener('click', handleCloseModal);

    return () => {
      window.removeEventListener('click', handleCloseModal);
    };
  }, [isOpen]);

  return (
    <div>
      {/* <button
        onClick={toggleModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Open Modal
      </button> */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
          <div className="modal-container bg-white w-96 p-4 rounded-lg shadow-lg">
            <span
              onClick={toggleModal}
              className="modal-close absolute top-0 right-0 m-4 cursor-pointer"
            >
              &times;
            </span>
            <p className="text-lg font-semibold">Modal Content Goes Here</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
