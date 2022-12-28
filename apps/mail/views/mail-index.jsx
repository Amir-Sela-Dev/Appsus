const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { MailList } from '../cmps/mail-list.jsx';

import { mailService } from '../services/mail.service.js';
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';
import { MailFilter } from '../cmps/mail-filter.jsx';



export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
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

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }




    return <section className="mail-index">
        <MailFilter onSetFilter={onSetFilter} />

        <MailList mails={mails} onRemoveMail={onRemoveMail} />
    </section>
}

