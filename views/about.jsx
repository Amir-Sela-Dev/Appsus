
export function About() {
    return <section className="about">
        <h1 className="about-main-title">Our team</h1>
        {/* 
        <div className="amir-sela flex">
            <div className="profile-img"><img src="/assets/img/amir-sela.jpg" alt="" /></div>
            <div className="body flex">
                <div className="title">Amir sela</div>
                <p> My name is Amir Sela, I'm 23 years old and I'm a junior web
                    developer.
                    I live in Israel in moshav Sdei Hemed. I served 3 years of active service as a warrior in Special Forces of
                    IDF,
                    and a commanding role as a sergeant in Nahal Brigade. After my army service I opened a gardening and
                    landscaping business.
                    After a year of working I went solo traveling in Asia for 7 months.
                    When I came back I decided to start learning web developing with Coding-Academy.</p>
                <div className="links flex">
                    <div className="facebook"><img src="/assets/img/facebook.png" alt="" /></div>
                    <div className="linkdin"><img src="/assets/img/linkedin.png" alt="" /></div>
                    <div className="github"><img src="/assets/img/github.png" alt="" /></div>
                </div>

            </div>
        </div> */}
        <div className="profiles-wrap">
            <div className="card-amir-yakubov">
                <img className="profile-img-yakubov" src="./assets/img/amir-sela.jpg" />
                <h2 className="card-full-name">Amir sela</h2>
                <p className="card-text"> My name is Amir Sela, I'm 23 years old and I'm a junior web
                    developer.
                    I live in Israel in moshav Sdei Hemed. I served 3 years of active service as a warrior in Special Forces of
                    IDF,
                    and a commanding role as a sergeant in Nahal Brigade. After my army service I opened a gardening and
                    landscaping business.
                    After a year of working I went solo traveling in Asia for 7 months.
                    When I came back I decided to start learning web developing with Coding-Academy.</p>

                <div className="card-links">
                    <img className="card-link facebook-link" src="./assets/img/facebook.png" />
                    <img className="card-link linkdin-link" src="./assets/img/linkedin.png" />
                    <img className="card-link github-link" src="./assets/img/github.png" />
                </div>
            </div>

            <div className="card-amir-yakubov">
                <img className="profile-img-yakubov" src="./assets/img/amir-yakubov.jpg" />
                <h2 className="card-full-name">Amir Yakubov</h2>
                <p className="card-text"> Amir yakubov, 29 years old from Ahkelon, married to Alina and father of Adel. Insurance agent in the past 3 years
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure laboriosam consequuntur vero, temporibus, sit voluptatum delectus accusantium nostrum ipsum modi impedit. Aliquam provident et excepturi, fuga odit sint nemo, in eos nisi laboriosam mollitia a voluptatem nostrum quibusdam dolorum consequuntur.</p>

                <div className="card-links">
                    <img className="card-link facebook-link" src="./assets/img/facebook.png" />
                    <img className="card-link linkdin-link" src="./assets/img/linkedin.png" />
                    <img className="card-link github-link" src="./assets/img/github.png" />
                </div>
            </div>
        </div>

    </section>
}
