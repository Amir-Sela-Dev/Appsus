const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';

export function MailFilter({ onTxtSetFilterBy, filterBy }) {


    function handleChange({ target }) {
        let { value, name: field } = target

        onTxtSetFilterBy(field, value)
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
    }


    return <section className="mail-filter">
        <div className="search icon"></div>
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