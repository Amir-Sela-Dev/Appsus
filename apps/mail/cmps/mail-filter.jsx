const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';

export function MailFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }


    return <section className="mail-filter">
        <form onSubmit={onSubmitFilter}>
            <input type="text" className="search-filter"
                id="txt"
                name="txt"
                placeholder="Search mail"
                value={filterByToEdit.txt}
                onChange={handleChange}

            />
        </form>
    </section>
}