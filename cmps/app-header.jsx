const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <img className="logo" src="/assets/img/logo.svg" />
        </Link>
        <nav>
            <div className="main-menu-btn"></div>
            <div className="main-menu-bar">
                <NavLink className="main-menu-home-icon" to="/"></NavLink>
                <NavLink className="main-menu-mail-icon" to="/mail"></NavLink>
                <NavLink className="main-menu-note-icon" to="/note"></NavLink>
                <NavLink className="main-menu-about-icon" to="/about"></NavLink>
            </div>
        </nav>
    </header>
}
