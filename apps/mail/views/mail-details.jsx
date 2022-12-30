const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { SideNav } from '../cmps/mail-side-nav.jsx';
import { mailService } from './../services/mail.service.js';


export function MailDetails({ onCloseMail }) {
    const [mail, setMail] = useState(null)
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
                onCloseMail()
            })
    }

    function onGoBack() {
        onCloseMail()
    }

    function onRemoveMail(mailId) {
        console.log(mailId);
        mailService.remove(mailId).then(() => {
            onCloseMail()
            showSuccessMsg('mail removed!')
        })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not remove mail, try again please!')
            })

    }






    if (!mail) return <div>Loading...</div>
    return <section className="mail-details">
        <div className="user-icon icon"></div>
        <div className="go-back icon" onClick={() => { onGoBack() }} ></div>
        <div className="mail-btns flex">
            <div className="remove trash icon" onClick={() => { onRemoveMail(mailId) }}></div>
        </div>
        <div className="first-row flex">
            <div className="title"><h2>{mail.subject}</h2></div>
            <div className="mail-status">{mail.status}</div>
        </div>
        <div className="seocend-row flex">
            <div className="info flex">
                <div className="sent-from">{mail.from}</div>
                <div className="full-date">{mail.sentAt}</div>
            </div>
            <div className="sent-to">{(mail.to === 'user@appsus.com') ? 'To me' : mail.to}</div>
        </div>
        <div className="mail-body"> <textarea name="" id="" cols="50" rows="20" disabled>{mail.body}</textarea> </div>



    </section>
}