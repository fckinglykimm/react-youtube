import React, { useState } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import menu from '../assets/menu.png'
import search from '../assets/search.png'
import bell from '../assets/bell.png'
import user from '../assets/user.jpg'

const Header = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchValue.trim()) {
            if (onSearch) {
                onSearch(searchValue)
            }
            navigate('/')
            setSearchValue('')
            console.log('Searching for:', searchValue);
        }
    }

    return (
        <div className='header'>
            <div className='left-comp'>
                <button className='menu-button'>
                    <img className='menu-icon' src={menu} alt="menu" />
                </button>
                <h1 className='logo'>1<span>4</span>1Tube</h1>
            </div>
            <div className='middle-comp'>
                <form className='input-div' onSubmit={handleSearch}>
                    <input
                        className='search-input'
                        type="text"
                        placeholder='Search'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button type='submit' className='search-button'>
                        <img className='search-icon' src={search} alt="search" />
                    </button>
                </form>
            </div>
            <div className='right-comp'>
                <button className='bell-button'><img className='bell-icon' src={bell} alt="bell" /></button>
                <button className='user-button'><img className='user-icon' src={user} alt="user" /></button>
            </div>
        </div>
    )
}

export default Header