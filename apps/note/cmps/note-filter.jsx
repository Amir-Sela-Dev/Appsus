const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js"

export function NoteFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    // function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     value = (type === 'number') ? +value : value
    //     setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    // }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        if (field === 'info') {
            value = {
                ...filterByToEdit.info,
                txt: value
            }
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    console.log(filterByToEdit)
    const fieldVal = filterByToEdit.info
    return <section className="note-filter">
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="info">Search </label>
            <input type="text"
                id="info"
                name="info"
                placeholder="search.."
                // value={fieldVal.txt}
                onChange={handleChange}
            />

            <button>Filter notes</button>
        </form>

    </section>
}