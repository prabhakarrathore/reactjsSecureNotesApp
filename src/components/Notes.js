import React, { useContext } from 'react';
import Masonry from 'react-masonry-css';
import NotesContext from '../context/NotesContext';

import NoteCard from "./NoteCard";
const Notes = () => {
    const { Notes, pinnedNotes, unpinnedNotes } = useContext(NotesContext);
    const breakpointColumnsObj = {
        default: 5,
        1200: 4,
        992: 3,
        768: 2,
        576: 1
    };

    return (
        <ul className="masonry-grid gap-1">
            {pinnedNotes.length > 0 && <p className='text-xl font-bold px-10'>Pinned</p>}
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className={!Notes.length > 0 ? "flex justify-center" : "my-masonry-grid gap-2 px-10"}
                columnClassName={!Notes.length > 0 ? "flex justify-center items-center min-h-[70vh]" : "my-masonry-grid_column"}
            >
                {pinnedNotes.length > 0 && (
                    pinnedNotes.map(note => (
                        <NoteCard key={note.id} note={note} />
                    ))
                )}
            </Masonry>
            {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && <p className='text-xl font-bold px-10'>Other</p>}
            {pinnedNotes.length === 0 && unpinnedNotes.length === 0 && <p className='text-xl flex justify-center items-center min-h-[60vh]'>No notes</p>}
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className={!Notes.length > 0 ? "flex justify-center" : "my-masonry-grid gap-2 px-10"}
                columnClassName={!Notes.length > 0 ? "flex justify-center items-center min-h-[70vh]" : "my-masonry-grid_column"}
            >
                {unpinnedNotes.length > 0 && (
                    unpinnedNotes.map(note => (
                        <NoteCard key={note.id} note={note} />
                    ))
                )}
            </Masonry>
        </ul>
    );
};

export default Notes;
