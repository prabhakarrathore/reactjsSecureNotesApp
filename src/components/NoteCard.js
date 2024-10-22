import { useContext } from 'react';
import ActionButtons from './ActionButtons';
import NotesContext from '../context/NotesContext';

const NoteCard = ({ note }) => {
    const { handleEditNote } = useContext(NotesContext);

    return (
        <div key={note.id} className='masonry-item overflow-hidden shadow-lg p-4 border-2 rounded-lg mb-3 bg-gray-200 break-before-auto'>
            <div role='button' tabIndex="0" onClick={() => handleEditNote(note.id)}>
                {note.title.length > 0 || note.note.length > 0 ? (
                    <div>
                        <div className='font-bold text-xl mb-2 break-words'>
                            {note.title.substring(0, 100)}
                        </div>
                        <p className='text-gray-700 text-base break-words'>
                            {note.note.substring(0, 200)}
                        </p>
                    </div>
                ) : (
                    <p className='text-gray-200 text-lg'>|       |</p>
                )}
            </div>
            <ActionButtons note={note} />
        </div>
    );
};

export default NoteCard;