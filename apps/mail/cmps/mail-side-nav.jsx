const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';


export function SideNav({ onSetFilterBy, onToogleComposeMail, onCloseMail }) {


    function onHandleChange(field, value) {
        onCloseMail()
        console.log(field, value)
        onSetFilterBy(field, value)
    }




    return <section className="mail-side-nav">

        <div className="nav-compose" onClick={() => { onToogleComposeMail() }}> <div className="compose icon"></div> Compose</div>
        <div className="nav-list" >
            <div className="nav-inbox" onClick={() => { onHandleChange('status', 'inbox') }}> <div className='inbox icon'></div>Inbox</div>
            <div className="nav-Starred" onClick={() => { onHandleChange('status', 'star') }}> <div className='unStarred icon'></div> Starred</div>
            <div className="nav-sent" onClick={() => { onHandleChange('status', 'sent') }}> <div className="sent icon"></div> Sent</div>
            <div className="nav-trash" onClick={() => { onHandleChange('status', 'trash') }}><div className="black-trash icon"></div> Trash</div>
            <div className="Drafts" onClick={() => { onHandleChange('status', 'draft') }}><div className="draft icon"></div>Drafts</div>
        </div>

    </section>
}