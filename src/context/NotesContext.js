import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";
import AuthContext from "./AuthProvider";

const NotesContext = createContext({});

export const NotesProvider = ({ children }) => {
    const searchResults = [];
    const logout = useLogout();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useContext(AuthContext);
    const [note, setNote] = useState('');
    const [user, setUser] = useState([]);
    const [title, setTitle] = useState('');
    const [Notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editNoteId, setEditNoteId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pinnedNotes, setPinnedNotes] = useState([]);
    const [unpinnedNotes, setUnpinnedNotes] = useState([]);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const decoded = auth?.accessToken
        ? jwtDecode(auth.accessToken)
        : undefined;

    const userId = decoded?.UserInfo?.id || "";
    const [showPwd, setShowPwd] = useState('password');
    const handleShowPwd = () => {
        if (showPwd === "password") {
            setShowPwd("text");
        }
        else {
            setShowPwd("password");
        }
    }
    const divShowPwd = (
        <div className='relative -top-6 float-right px-2'>
            {showPwd !== "password" ? <FaEyeSlash role='button' tabIndex="0" onClick={handleShowPwd} /> :
                <FaEye role='button' tabIndex="0" onClick={handleShowPwd} />}
        </div>
    )

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getNotes = async () => {

            try {
                const response = await axiosPrivate.get(`/notes/${userId}`, {
                    signal: controller.signal
                });
                const notes = response.data;
                isMounted && setNotes(notes.reverse());

            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getNotes();
    
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();        

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(`/user/${userId}`, {
                    signal: controller.signal
                });
                isMounted && setUser(response.data.username);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const addItem = useCallback(async ({ note, title }) => {
        const id = uuidv4();
        const myNewNote = { id, note, title, fav: false };
        const listItems = [...Notes, myNewNote];
        setNotes(listItems);
        try {
            await axiosPrivate.post(`/notes/${userId}`, JSON.stringify(myNewNote), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseUpdate = await axiosPrivate.get(`/notes/${userId}`);
            const reverse = responseUpdate.data;
            setNotes(reverse);
        } catch (err) {
            console.error(err);
        }
    },[Notes,axiosPrivate,userId])

    const handleNewNote = (e) => {
        e.preventDefault();
        addItem({ note, title });
        setTitle('');
        setNote('');
        setIsModalOpen(false);
    }

    useEffect(() => {
        const pinned = [];
        const unpinned = [];

        Notes.forEach(note => {
            if (note.fav) {
                pinned.push(note);
            } else {
                unpinned.push(note);
            }
        });

        const filteredPinned = pinned.filter(note =>
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.note.toLowerCase().includes(search.toLowerCase())
        );

        const filteredUnpinned = unpinned.filter(note =>
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.note.toLowerCase().includes(search.toLowerCase())
        );

        setPinnedNotes(filteredPinned.reverse());
        setUnpinnedNotes(filteredUnpinned.reverse());
    }, [Notes, search]);

    const handleDelete = async (id) => {
        try {
            await axiosPrivate.delete(`/notes/${userId}/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            const listItems = Notes.filter((item) => item.id !== id);
            setNotes(listItems);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditNote = (id) => {
        setIsModalOpenEdit(true)
        const noteToEdit = Notes.find(note => note.id === id);
        if (noteToEdit) {
            setEditNoteId(id);
            setEditTitle(noteToEdit.title);
            setEditContent(noteToEdit.note);
        }
        setEditingNoteId(id);
    }

    const handleUpdateNote = useCallback(async (e) => {
        e.preventDefault();
        const updatedNote = { id: editNoteId, title: editTitle, note: editContent };
        try {
            await axiosPrivate.put(`/notes/${userId}`, JSON.stringify(updatedNote), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseUpdate = await axiosPrivate.get(`/notes/${userId}`);
            const updatedNotes = responseUpdate.data; // Use the data directly
            setNotes(updatedNotes); // Update notes with the fresh data
            setEditNoteId(null);
            setEditTitle('');
            setEditContent('');
            setIsModalOpenEdit(false);
        } catch (err) {
            console.error(err);
        }
    }, [editNoteId, editTitle, editContent, userId,axiosPrivate]);

    const checkedbox = async (id) => {
        const noteToToggle = Notes.find((item) => item.id === id);
        if (!noteToToggle) return;
        const updatedFavStatus = { fav: !noteToToggle.fav };
        try {
            await axiosPrivate.patch(`/notes/${userId}/${id}`, JSON.stringify(updatedFavStatus), {
                headers: { 'Content-Type': 'application/json' },
            });

            const updatedNotes = Notes.map((item) =>
                item.id === id ? { ...item, fav: !item.fav } : item
            );

            setNotes(updatedNotes);
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };
    const handleDeleteUser = async () => {
        try {
            await axiosPrivate.delete(`/user/${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <NotesContext.Provider value={{
            handleDelete, handleNewNote, Notes, title, setTitle, note, setNote,
            handleEditNote, editTitle, setEditTitle, editContent, setEditContent, handleUpdateNote, isModalOpen,
            setIsModalOpen, editingNoteId, setEditingNoteId, isModalOpenEdit, setIsModalOpenEdit, searchResults, search,
            setSearch, user, handleDeleteUser, divShowPwd, showPwd, setNotes, checkedbox, pinnedNotes,
            unpinnedNotes
        }}>
            {children}
        </NotesContext.Provider>
    )
}

export default NotesContext;