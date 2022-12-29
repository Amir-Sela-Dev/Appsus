const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from './../services/mail.service.js';


export function MailDetails() {
    const [mail, setMail] = useState(null)
    // const [nextBookId, setNextBookId] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])



    function loadMail() {
        mailService.get(mailId)
            .then((mail) => setMail(mail))
            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/mail')
            })
    }

    function onGoBack() {
        navigate('/mail')
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId).then(() => {
            navigate('/mail')
            showSuccessMsg('mail removed!')
        })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not remove mail, try again please!')
            })

    }






    if (!mail) return <div>Loading...</div>
    return <section className="mail-details flex">
        <div className="mail-main-content">
            <div className="btns">
                <button className="go-back" onClick={() => { onGoBack() }} >Back</button>
                <button className="remove trash icon" onClick={() => { onRemoveMail(mailId) }}></button>
            </div>
            <div className="title"><h2>{mail.subject}</h2></div>
            <div className="user-icon"> {mail.status}</div>
            <div className="sent-from">{mail.from}</div>
            <div className="sent-to">{(mail.to === 'user@appsus.com') ? 'To me' : mail.to}</div>
            <div className="mail-body"> <p>{mail.body}</p></div>
        </div>



    </section>
}