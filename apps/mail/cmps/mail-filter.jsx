const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';

export function MailFilter({ onSetFilter, filterBy }) {

    const [txtFilterByToEdit, setTxtFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(txtFilterByToEdit)
    }, [txtFilterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target

        setTxtFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(txtFilterByToEdit)
    }

    console.log(txtFilterByToEdit)

    return <section className="mail-filter">
        <form onSubmit={onSubmitFilter}>
            <input type="text" className="search-filter"
                id="txt"
                name="txt"
                placeholder="Search mail"
                value={txtFilterByToEdit.txt}
                onChange={handleChange}

            />
        </form>
    </section>
}