const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { MailList } from '../cmps/mail-list.jsx';

import { mailService } from '../services/mail.service.js';
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';
import { MailFilter } from '../cmps/mail-filter.jsx';
import { SideNav } from '../cmps/mail-side-nav.jsx';
import { MailCompose } from '../cmps/mail-compose.jsx';
import { MailDetails } from './mail-details.jsx';



export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isCompose, setIsCompose] = useState(false)
    const [isMailOpen, setIsMailOpen] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        loadMails()
    }, [filterBy, isCompose])

    function loadMails() {
        console.log('filterby from load', filterBy);
        mailService.query(filterBy).then(mailsToUpdate => {
            setMails(mailsToUpdate)
        })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            showSuccessMsg('mail removed!')
        })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not remove mail, try again please!')
            })

    }


    function onSetFilterBy(field, value) {
        console.log('hi filter');
        setFilterBy((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onTxtSetFilterBy(field, value) {
        console.log('hi txt filter');
        setFilterBy((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onToogleComposeMail() {
        setIsCompose(!isCompose)
    }
    function onCloseMail() {
        setIsMailOpen(false)
        navigate('/mail/mailList')
    }

    function onOpenMail(mailId) {
        setIsMailOpen(true)
        navigate(`/mail/${mailId}`)
    }

    return <section className="mail-index">

        <SideNav onSetFilterBy={onSetFilterBy} onToogleComposeMail={onToogleComposeMail} filterBy={filterBy} onCloseMail={onCloseMail} />
        <MailFilter onTxtSetFilterBy={onTxtSetFilterBy} filterBy={filterBy} />
        {(isCompose) && <MailCompose onToogleComposeMail={onToogleComposeMail} />}
        {(!isMailOpen) && <MailList mails={mails} onRemoveMail={onRemoveMail} onOpenMail={onOpenMail} />}
        {(isMailOpen) && <MailDetails onCloseMail={onCloseMail} />}

    </section>
}



