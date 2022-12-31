const { Link } = ReactRouterDOM
export function Home() {

    return <section className="home">

        {/* <h1>Welcome to home page!</h1> */}

        <div className="home-nav-container">
            <Link to="/mail">
                <div className="mail"></div>
            </Link>
            <Link to="/note">
                <div className="notes"></div>
            </Link>
            {/* <div className="book-shop"></div> */}
        </div>
    </section>
}