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
    return <section className="note-filter">
        <form className="search-wrap" onSubmit={onSubmitFilter}>

            <label className=".search-input-label"
                htmlFor="info"></label>
            <input type="text"
                id="info"
                className="search-input"
                name="info"
                placeholder="search.."
                onChange={handleChange}
            />
            {/* <button>Filter notes</button> */}
        </form>


    </section>
}