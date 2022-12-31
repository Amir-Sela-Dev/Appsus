const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';

export function MailFilter({ onTxtSetFilterBy, filterBy, toogleMenu }) {


    function handleChange({ target }) {
        let { value, name: field } = target

        onTxtSetFilterBy(field, value)
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
    }


    return <section className="mail-filter">
        <div className="search icon"></div>
        <div className="menu-toogle-btn" onClick={toogleMenu}>☰</div>
        <form onSubmit={onSubmitFilter}>
            <input type="text" className="search-filter"
                id="txt"
                name="txt"
                placeholder="Search mail"
                value={filterBy.txt}
                onChange={handleChange}
            />
        </form>
    </section>
}