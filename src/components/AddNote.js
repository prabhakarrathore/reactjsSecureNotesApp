import { useContext, useEffect, useRef } from "react";
import { IoAddSharp } from "react-icons/io5";
import NotesContext from "../context/NotesContext";
import Modal from "./Modal";

const AddNote = () => {
    const { title, note, handleNewNote, setTitle, setNote, isModalOpen, setIsModalOpen } = useContext(NotesContext);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNote('');
        setTitle('');
    };

    const IncreaseTextRows = useRef(null);
    useEffect(() => {
        if (IncreaseTextRows.current) {
            IncreaseTextRows.current.style.height = 'auto';
            IncreaseTextRows.current.style.height = `${IncreaseTextRows.current.scrollHeight}px`;
        }
    }, [note]);

    return (
        <article className="m-40">
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleNewNote}
                    className="grid grid-cols-2 gap-y-4 text-black"
                >
                    <h2 className="col-span-2">New Note</h2>
                    <label htmlFor="title">Title:</label>
                    <textarea
                        type="text"
                        id="title"
                        autoComplete="off"
                        className="col-span-2 resize-none"
                        placeholder="Title"
                        maxLength={300}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <label htmlFor="note">Note:</label>
                    <textarea
                        ref={IncreaseTextRows}
                        type="text"
                        id="note"
                        className="col-span-2 max-h-[50vh] resize-none"
                        placeholder="Take a note..."
                        onChange={(e) => setNote(e.target.value)}
                        value={note}
                    />
                    <button
                        type="Submit"
                        className="mx-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Add Note
                    </button>
                    <button
                        type="reset"
                        onClick={closeModal}
                        className="mx-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Close
                    </button>
                </form>
            </Modal>
            <IoAddSharp
                role="button"
                onClick={openModal}
                className="fixed bottom-6 overflow-hidden shadow-lg p-4 border-2 rounded-3xl right-6 px-2 py-2 bg-gray-400 text-black hover:bg-gray-600 text-5xl" />
        </article >
    );
};

export default AddNote;
