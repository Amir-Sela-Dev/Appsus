const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { MailList } from '../cmps/mail-list.jsx';

import { mailService } from '../services/mail.service.js';
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';
import { MailFilter } from '../cmps/mail-filter.jsx';
import { SideNav } from '../cmps/mail-side-nav.jsx';
import { MailCompose } from '../cmps/mail-compose.jsx';



export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [navFilterBy, setNavFilterBy] = useState(null)
    const [txtFilterBy, setTxtFilterBy] = useState(null)
    const [isCompose, setIsCompose] = useState(false)

    useEffect(() => {
        loadMails()
    }, [filterBy, isCompose])

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

    // function onSetNavFilter(filterByFromNavFilter) {
    //     setNavFilterBy(filterByFromNavFilter)
    //     console.log('from nav', filterByFromNavFilter)
    //     const { isRead, isStarred, status } = filterByFromNavFilter
    //     const newFilter = { ...filterBy, isRead, isStarred, status, txt }
    //     console.log('newfilter', newFilter)
    //     // setFilterBy(newFilter)
    //     console.log('filterBy', filterBy)
    // }

    // function onSetTxtFilter(filterByFromTxtFilter) {
    //     setTxtFilterBy(filterByFromTxtFilter)
    //     console.log('from txt', filterByFromTxtFilter)


    //     // setFilterBy(filterByFromFilter)
    // }

    function onToogleComposeMail() {
        setIsCompose(!isCompose)
    }


    return <section className="mail-index">

        <SideNav onSetFilter={onSetFilter} onToogleComposeMail={onToogleComposeMail} filterBy={filterBy} />
        <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />

        <MailList mails={mails} onRemoveMail={onRemoveMail} />
        {(isCompose) && <MailCompose onToogleComposeMail={onToogleComposeMail} />
        }
    </section>
}

