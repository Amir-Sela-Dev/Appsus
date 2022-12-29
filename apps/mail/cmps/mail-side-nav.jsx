const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';


export function SideNav({ onSetFilter, onToogleComposeMail, filterBy }) {
    const [sideNavFilterByToEdit, setSideNavFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        console.log(sideNavFilterByToEdit)
        onSetFilter(sideNavFilterByToEdit)
    }, [sideNavFilterByToEdit])

    function onHandleChange(field, value) {

        console.log(field, value)
        setSideNavFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }




    return <section className="mail-side-nav">

        <button className="compose" onClick={() => { onToogleComposeMail() }}>Compose</button>
        <div className="nav-list" >
            <div className="inbox" onClick={() => { onHandleChange('status', 'inbox') }}> <div className='fa-solid fa-inbox'></div>Inbox</div>
            <div className="nav-Starred" onClick={() => { onHandleChange('isStarred', true) }}> <div className='unStarred icon'></div> Starred</div>
            <div className="sent" onClick={() => { onHandleChange('status', 'sent') }}> <div className="fa-light fa-paper-plane-top"></div> Sent</div>
            <div className="nav-trash">Trash</div>
            <div className="Drafts" onClick={() => { onHandleChange('status', 'draft') }}>Drafts</div>
        </div>

    </section>
}