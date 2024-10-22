import { useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { NotesProvider } from "../context/NotesContext";
import useLogout from "../hooks/useLogout";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import Notes from "./Notes";
import Search from "./Search";
import User from "./User";
import useRefreshToken from "../hooks/useRefreshToken";


const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const refresh = useRefreshToken();
    const signOut = async () => {
        await logout();
        setIsOpen(false);
        navigate('/linkpage');
    };
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    // Toggle the dropdown menu
    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    // Close the dropdown menu when clicking outside
    const handleClickOutside = (event) => {
        if (
            buttonRef.current &&
            !buttonRef.current.contains(event.target) &&
            menuRef.current &&
            !menuRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [buttonRef, menuRef]);

    return (
        <NotesProvider>
            <div>
                <div className="flex justify-between items-baseline">
                    <h2 className="m-4 font-bold text-2xl">Notes</h2>
                    <Search />
                    <div className="relative inline-block text-left mx-4" ref={buttonRef}>
                        <SlOptionsVertical
                            role="button"
                            className="border-none rounded-none text-lg"
                            aria-expanded={isOpen}
                            aria-label="Toggle menu"
                            onClick={toggleMenu}
                        />
                        {isOpen && (
                            <div
                                ref={menuRef}
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md overflow-hidden border-2 bg-gray-200 break-before-auto masonry shadow-lg ring-1 ring-black ring-opacity-5"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex="-1"
                            >
                                <div className="py-1" role="none">
                                    <User />
                                    <button
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                                        role="menuitem"
                                        tabIndex="-1"
                                        onClick={signOut}
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <section>
                    <Notes />
                    <AddNote />
                    <EditNote />
                </section>
            </div>
        </NotesProvider>
    );
}

export default Home;
