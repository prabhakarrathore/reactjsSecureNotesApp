import React, { useContext, useEffect } from 'react';
import NotesContext from '../context/NotesContext';
import Modal from './Modal';

const EditNote = () => {
    const {
        Notes,
        editTitle,
        setEditTitle,
        editContent,
        editingNoteId,
        isModalOpenEdit,
        setIsModalOpenEdit,
        setEditContent,
        handleUpdateNote,
    } = useContext(NotesContext);


    useEffect(() => {
        if (editingNoteId) {
            const noteToEdit = Notes.find(note => note.id === editingNoteId);
            if (noteToEdit) {
                setEditTitle(noteToEdit.title);
                setEditContent(noteToEdit.note);
            }
        } else {
            setEditTitle('');
            setEditContent('');
        }
    }, [editingNoteId, Notes, setEditTitle, setEditContent]);

    const isEditing = !!editingNoteId;

    const closeModalEdit = () => setIsModalOpenEdit(false);

    return (
        <div>
            <Modal isOpen={isModalOpenEdit} onClose={closeModalEdit}>
                <form onSubmit={handleUpdateNote} className="grid grid-cols-2 gap-y-4 text-black overflow-y-auto">
                    <h1 className="col-span-2">Edit Note </h1>
                    <label htmlFor="title">Title:</label>
                    <textarea
                        type="text"
                        id="title"
                        value={editTitle}
                        maxLength={300}
                        className="col-span-2 resize-none"
                        placeholder="Title"
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="note">Note:</label>
                    <textarea
                        id="note"
                        value={editContent}
                        className="col-span-2 max-h-[50vh] resize-none"
                        placeholder="Take a note..."
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button className="mx-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" type="submit" >Update</button>
                    {
                        isEditing && (
                            <button className="mx-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={closeModalEdit}>Cancel</button>
                        )
                    }
                </form>
            </Modal>
        </div >
    );
}

export default EditNote;
