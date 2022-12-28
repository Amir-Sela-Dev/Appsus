const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { MailList } from '../cmps/mail-list.jsx';

import { mailService } from '../services/mail.service.js';



export function MailIndex() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        // loadMails()
    }, [])

    function loadBooks() {
        mailService.query(filterBy).then(booksToUpdate => {
            setBooks(booksToUpdate)
        })
    }


    return <section className="mail-index">

        <MailList />
    </section>
}

