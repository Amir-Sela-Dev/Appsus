const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';


export function SideNav({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onHandleChange({ target }) {
        console.log(target)
        let { value, name: field } = target
        console.log(field)
        console.log(value)
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }




    return <section className="mail-side-nav">

        <button className="compose">Compose</button>
        <div className="nav-list" >
            <div className="inbox">Inbox</div>
            <div className="nav-Starred" onClick={() => { onHandleChange('isStared') }}>Starred</div>
            <div className="sent">Sent</div>
            <div className="nav-trash">Trash</div>
            <div className="Drafts">Drafts</div>
        </div>

    </section>
}