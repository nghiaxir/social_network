import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Avatar from '../Avatar'

const Menu = () => {
    const navLinks = [
        { label: 'Home', icon: 'home', path: '/' },
        { label: 'Message', icon: 'near_me', path: '/Message' },
        { label: 'Discover', icon: 'explore', path: '/Discover' },
        { label: 'Notify', icon: 'local_fire_department', path: '/Notify' },

    ]
    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const isActive = (pn) => {
        if (pn === pathname) return 'active'
    }
    return (
        <div className="menu">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {
                    navLinks.map((link, index) => (
                        <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                            <Link className="nav-link" to={link.path}>
                                <span className="material-icons-outlined">
                                    {link.icon}
                                </span>
                            </Link>
                        </li>
                    ))
                }


                <div className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle"
                        id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <Avatar src={auth.user.avatar} size="small-avatar" />
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to={`/Profile/${auth.user._id}`}>Profile</Link>
                        <label htmlFor="theme" className="dropdown-item"
                            onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !theme })}>
                            {theme ? 'Light mode' : 'Dark mode'}
                        </label>
                        <hr className="dropdown-divider" />
                        <Link className="dropdown-item" to={`/`}
                            onClick={() => dispatch(logout())}
                        >Log out</Link>
                    </div>
                </div>
            </ul>

        </div>
    )
}

export default Menu