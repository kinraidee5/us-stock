import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const [activeTab, setActiveTab] = useState('home');

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            setActiveTab('home');
        } else if (location.pathname === '/stock') {
            setActiveTab('stock');
        }
    }, [location])
    return (
        <>
            <div className="navbar">
                <div className='nav-left'>
                    <a href="/" className='logo'>Stock Sharing</a>
                </div>
                <div className='nav-right'>
                    <NavLink to='/'>
                        <div  className={`${activeTab} === "home" ? "active" : ""}`} onClick={() => setActiveTab('home')}>
                            Home
                        </div>
                    </NavLink>
                    <NavLink to='/market'>
                        <div  className={`${activeTab} === "market" ? "active" : ""}`} onClick={() => setActiveTab('market')}>
                            Market
                        </div>
                    </NavLink>
                    <NavLink to='/stock'>
                        <div className={`${activeTab} === "stock ? "active" : ""}`} onClick={() => setActiveTab('stock')}>
                            Stock
                        </div>
                    </NavLink>
                    <NavLink to='/news'>
                        <div className={`${activeTab} === "news ? "active" : ""}`} onClick={() => setActiveTab('news')}>
                            News
                        </div>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Header