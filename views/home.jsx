const { Link, useNavigate } = ReactRouterDOM
export function Home() {
    const navigate = useNavigate()

    return <section className="home">
        {/* <div className="title flex"><h1>Appsus</h1></div> */}
        <div className="home-hero">

            <div className="home-row1">
                <h1>The app that help you orgenize your life.</h1>

                <div className="google-assistent animate__animated animate__fadeInRight">
                    <img src="/assets/img/google-assistant.svg" alt="" /></div>
            </div>

            <div className="home-nav-container animate__animated animate__bounceInUp">
                <div className="home-mail-container flex">
                    <Link to="/mail">
                        <div className="mail"></div>
                    </Link>
                    <button onClick={() => { navigate("/mail") }}>Appsus mail</button>
                </div>
                <div className="home-note-container flex">
                    <Link to="/note">
                        <div className="notes"></div>
                    </Link>
                    <button onClick={() => { navigate("/note") }}>Appsus notes</button>
                </div>
                <div className="home-book-container flex">
                    <div className="book-shop"></div>
                    <button>Appsus book-shop</button>
                </div>
            </div>
        </div>

    </section>
}