const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function AppHeader() {
    const [isMainNavOpen, setIsMainNavOpen] = useState(false)


    return <header className="app-header">
        <Link to="/">
            <img className="logo" src="assets/img/logo.svg" />
        </Link>
        <nav>
            <div className="main-menu-btn" onClick={() => { setIsMainNavOpen(!isMainNavOpen) }}></div>
            <div className={`main-menu-bar ${(isMainNavOpen) ? 'open' : ''}`} onClick={() => { setIsMainNavOpen(!isMainNavOpen) }}>
                <NavLink className="main-menu-home-icon" to="/"></NavLink>
                <NavLink className="main-menu-mail-icon" to="/mail"></NavLink>
                <NavLink className="main-menu-note-icon" to="/note"></NavLink>
                <NavLink className="main-menu-about-icon" to="/about"></NavLink>
            </div>
        </nav>
    </header>
}
