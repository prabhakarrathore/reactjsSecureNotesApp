import React, { useContext, useState } from 'react';
import NotesContext, { NotesProvider } from '../context/NotesContext';
import Modal from './Modal';

const User = () => {
    const { user, handleDeleteUser } = useContext(NotesContext);
    const [deleteModal, setDeleteModal] = useState(false)
    const openModal = () => setDeleteModal(true);
    const closeModal = () => {
        setDeleteModal(false);
    };
    return (
        <>
            <NotesProvider >
                <div>
                    <div className="block w-full px-4 py-2 text-left text-sm text-gray-700 ">
                        {user}
                    </div>
                    <Modal isOpen={deleteModal} onClose={closeModal} >
                        <div>
                            <h1>Delete user</h1>
                            <p className='py-4'>Are you sure you want to delete this user?</p>
                            <button
                                className="float-right px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => handleDeleteUser()}
                            >
                                Delete user
                            </button>
                            <button
                                type="reset"
                                onClick={closeModal}
                                className="float-right mx-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </Modal >
                    <button
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                        tabIndex="0"
                        onClick={openModal}>
                        Delete user
                    </button>
                </div>
            </NotesProvider >
        </>
    )
}

export default User
