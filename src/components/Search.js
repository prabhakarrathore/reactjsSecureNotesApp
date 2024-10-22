import React, { useContext } from 'react'
import NotesContext from '../context/NotesContext'

const Search = () => {
    const { search, setSearch } = useContext(NotesContext)
    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search" className="sr-only">Search</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    className="
                        overflow-hidden shadow-lg p-4 placeholder:text-black border-2
                        bg-[#e5e7eb] px-4 py-2 rounded-lg 
                        w-[10em] sm:w-[20em] md:w-[30em] lg:w-[50em] 
                        mx-auto
                    "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </div>
    )
}

export default Search
