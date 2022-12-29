const { useState, useEffect, Fragment } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js';


export function MailPreview({ mail, onRemoveMail }) {
    const [isStarred, setIsStarred] = useState(mail.isStarred)
    const [isRead, setIsRead] = useState(mail.isRead)
    const navigate = useNavigate()



    function onStarMail() {
        mailService.get(mail.id)
            .then(mail => {
                mail.isStarred = !mail.isStarred
                mailService.save(mail)
                    .then(mail => {
                        mailService.save(mail)
                        console.log(mail)
                        setIsStarred(mail.isStarred)
                    })
            })
    }

    function onToogleRead() {
        mailService.get(mail.id)
            .then(mail => {
                mail.isRead = !mail.isRead
                mailService.save(mail)
                setIsRead(mail.isRead)
            })

    }


    function getTime() {
        var date = new Date(mail.sentAt)
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    return <Fragment>
        <tr className={`mail-row flex ${(isRead) ? 'read' : 'unRead'}`} height="60px" >
            <td className="star" width="2%" onClick={() => onStarMail(mail.id)}>{(isStarred) ? <div className='starred icon'></div> : <div className='unStarred icon'></div>}</td>
            <td className="title " width="15%" onClick={() => { navigate(`/mail/${mail.id}`) }}>{mail.subject}</td>
            <td className="body " width="69%" onClick={() => { navigate(`/mail/${mail.id}`) }}>{(mail.body.length < 60) ? mail.body : `${mail.body.substring(0, 60)}...`}</td>
            <td className="delete" width="2%"><div className="trash icon" onClick={() => onRemoveMail(mail.id)}></div></td>
            <td className="read" width="2%" onClick={() => onToogleRead()}>{(isRead) ? <div className='open-envelop icon'></div> : <div className='close-envelop icon'></div>}</td>
            <td className="time " width="10%">{getTime()}</td>
        </tr>
    </Fragment>
}