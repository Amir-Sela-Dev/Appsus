const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';


export function SideNav({ onSetFilterBy, onToogleComposeMail, onCloseMail }) {
    const [isClicked, setIsClicked] = useState('inbox')


    function onHandleChange(field, value) {
        onCloseMail()
        setIsClicked(value)
        onSetFilterBy(field, value)
    }




    return <section className="mail-side-nav">

        <div className="nav-compose" onClick={() => { onToogleComposeMail() }}> <div className="compose icon"></div> Compose</div>
        <div className="nav-list" >
            <div className={`nav-inbox ${(isClicked === 'inbox') ? 'is-clicked' : ''}`} onClick={() => { onHandleChange('status', 'inbox') }}> <div className='inbox icon'></div>Inbox</div>
            <div className={`nav-star ${(isClicked === 'star') ? 'is-clicked' : ''}`} onClick={() => { onHandleChange('status', 'star') }}> <div className='unStarred icon'></div> Starred</div>
            <div className={`nav-sent ${(isClicked === 'sent') ? 'is-clicked' : ''}`} onClick={() => { onHandleChange('status', 'sent') }}> <div className="sent icon"></div> Sent</div>
            <div className={`nav-trash ${(isClicked === 'trash') ? 'is-clicked' : ''}`} onClick={() => { onHandleChange('status', 'trash') }}><div className="black-trash icon"></div> Trash</div>
            <div className={`nav-draft ${(isClicked === 'draft') ? 'is-clicked' : ''}`} onClick={() => { onHandleChange('status', 'draft') }}><div className="draft icon"></div>Drafts</div>
        </div>

    </section>
}