import React, { useState, KeyboardEventHandler } from 'react';

const Search = () => {

    const [query, setQuery] = useState<string>("");

    const HandleKeyDown = (e: any) => {
        if (e.key == "Enter") {
            if (query != "") {
                window.location.href = `https://www.google.com/search?q=${query}`;
            }
        }
    }

    const HandleChange = (e: any) => {
        setQuery(e.target.value);
    }

    return (
        <div className='search box-shadow'>
            <input
                autoFocus
                type='text'
                value={query}
                placeholder='Google Search...'
                onChange={HandleChange}
                onKeyDown={HandleKeyDown}
            />
        </div>
    )
}
export default Search;