import { LuPin, LuPinOff } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import NotesContext from '../context/NotesContext';
import { useContext } from "react";

const ActionButtons = ({ note }) => {
    const { handleDelete, checkedbox } = useContext(NotesContext);
    return (
        <div className='flex float-right'>
            <MdOutlineDeleteOutline
                role='button'
                tabIndex="0"
                className='text-2xl'
                onClick={() => handleDelete(note.id)}
            />
            {!note.fav ? (
                <LuPin
                    role='button'
                    tabIndex="0"
                    className='text-2xl p-1 font-bold'
                    onClick={() => checkedbox(note.id)}
                    aria-label="Unpin note"
                />
            ) : (
                <LuPinOff
                    role='button'
                    tabIndex="0"
                    className='text-2xl p-1 font-bold'
                    onClick={() => checkedbox(note.id)}
                    aria-label="Pin note"
                />
            )}
        </div>
    );
};
export default ActionButtons;