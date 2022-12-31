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
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
    const { mailId } = useParams()


    useEffect(() => {
        if (mailId) onOpenMail(mailId)
        else loadMails()
    }, [filterBy, isCompose, mailId, isMenuOpen])

    function loadMails() {
        mailService.query(filterBy).then(mailsToUpdate => {
            setMails(mailsToUpdate)
            setIsMailOpen(false)
        })
    }

    function onRemoveMail(mailId) {
        mailService.get(mailId)
            .then(mail => {
                if (mail.status === 'trash') {
                    mailService.remove(mailId).then(() => {
                        const updatedMails = mails.filter(mail => mail.id !== mailId)
                        setMails(updatedMails)
                        showSuccessMsg('mail removed!')
                        onCloseMail()
                    })
                } else {
                    mail.status = 'trash'
                    mailService.save(mail)
                        .then(mail => {
                            const updatedMails = mails.filter(mail => mail.id !== mailId)
                            setMails(updatedMails)
                            showSuccessMsg('mail removed!')
                            onCloseMail()
                        })
                }
            })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not remove mail, try again please!')
            })

    }


    function onSetFilterBy(field, value) {
        setFilterBy((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onTxtSetFilterBy(field, value) {
        setFilterBy((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onToogleComposeMail() {
        setIsCompose(!isCompose)
    }
    function onCloseMail() {
        navigate('/mail/mailList')
    }

    function onOpenMail(mailId) {
        setIsMailOpen(!isMenuOpen)
        navigate(`/mail/${mailId}`)
    }

    function toogleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    if (!mails) return <div>Loading...</div>
    return <section className="mail-index">
        {(isMenuOpen) && <div class="main-screen full" onClick={() => { toogleMenu() }}></div>}
        <SideNav onSetFilterBy={onSetFilterBy} onToogleComposeMail={onToogleComposeMail} filterBy={filterBy} onCloseMail={onCloseMail} isMenuOpen={isMenuOpen} toogleMenu={toogleMenu} />
        <MailFilter onTxtSetFilterBy={onTxtSetFilterBy} filterBy={filterBy} toogleMenu={toogleMenu} />
        {(isCompose) && <MailCompose onToogleComposeMail={onToogleComposeMail} />}
        {(!isMailOpen) && <MailList mails={mails} onRemoveMail={onRemoveMail} onOpenMail={onOpenMail} />}
        {(isMailOpen) && <MailDetails onCloseMail={onCloseMail} onRemoveMail={onRemoveMail} />}
        {(!mailId) && <div className="nav-compose index" onClick={() => { onToogleComposeMail() }}> <div className="compose icon"></div> Compose</div>}
    </section>
}



