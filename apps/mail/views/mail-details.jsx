const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { SideNav } from '../cmps/mail-side-nav.jsx';
import { mailService } from './../services/mail.service.js';


export function MailDetails({ onCloseMail, onRemoveMail }) {
    const [mail, setMail] = useState(null)
    const [isStarred, setIsStarred] = useState(null)
    const [isRead, setIsRead] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])



    function loadMail() {
        mailService.get(mailId)
            .then(mail => {
                setMail(mail)
                mail.isRead = true
                mailService.save(mail)
            })
            .catch((err) => {
                console.log('Had issues in book details', err)
                onCloseMail()
            })
    }

    function onGoBack() {
        onCloseMail()
    }

    function onStarMail() {
        mail.isStarred = !mail.isStarred
        mailService.save(mail)
            .then(mail => {
                setIsStarred(mail.isStarred)
            })
    }

    function onToogleRead() {
        mail.isRead = !mail.isRead
        mailService.save(mail)
            .then(mail => {
                setIsRead(mail.isRead)
            })
    }





    function getTime() {
        let date = new Date(mail.sentAt)
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = date.toLocaleString('en-US', { month: 'short' }) + ' ' + date.getDate() + ' ' + hours + ':' + minutes + ' ' + ampm
        return strTime;
    }







    if (!mail) return <div>Loading...</div>
    return <section className="mail-details">
        <div className="user-icon icon"></div>
        <div className="go-back icon" onClick={() => { onGoBack() }} ></div>
        <div className="mail-btns flex">
            <div className="remove trash icon" onClick={() => { onRemoveMail(mailId) }}></div>
            <div onClick={() => { onStarMail() }}>{(mail.isStarred) ? <div className='starred icon'></div> : <div className='unStarred icon'></div>}</div>
            <div className="mail-read-unread" onClick={() => { onToogleRead() }}>{(mail.isRead) ? <div className='open-envelop icon'></div> : <div className='close-envelop icon'></div>}</div>
        </div>
        <div className="first-row flex">
            <div className="title"><h2>{mail.subject}</h2></div>
            <div className="mail-status">{mail.status}</div>
        </div>
        <div className="seocend-row flex">
            <div className="info flex">
                <div className="sent-from">{mail.from}</div>
                <div className="full-date">{getTime()}</div>
            </div>
            <div className="sent-to">{(mail.to === 'user@appsus.com') ? 'To me' : mail.to}</div>
        </div>
        <div className="mail-body"> <textarea name="" id="" cols="50" rows="20" disabled>{mail.body}</textarea> </div>



    </section>
}