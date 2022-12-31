const { Link } = ReactRouterDOM
export function Home() {

    return <section className="home">
        {/* <div className="title flex"><h1>Appsus</h1></div> */}
        <div className="google-img"> <div className="home-row1">  <h1>The app that help you orgenize your life.</h1> <img src="/assets/img/google-assistant.svg" alt="" /></div>
            <div className="hero-img"> </div> </div>

        <div className="home-nav-container">
            <Link to="/mail">
                <div className="mail"></div>
            </Link>
            <Link to="/note">
                <div className="notes"></div>
            </Link>
            <div className="book-shop"></div>
        </div>
    </section>
}