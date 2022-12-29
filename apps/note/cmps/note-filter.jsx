const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js"

export function NoteHeader({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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

    return <section className="note-filter">
        <div className="header-img-wrap menu-icon-wrap">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAANUlEQVR4nO3VsQkAMAwDwd9/rGiwZIIUAYs0f6DaIBAGSQUBdjn5dXg1GpOunJM0Jn4nSTw4Ff6YkoE1i0QAAAAASUVORK5CYII=" />
        </div>
        <div className="header-img-wrap">
            <img className="header-img" src="./assets/img/google-keep.png"></img>
        </div>
        <h2 className="header-title">Keep</h2>
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
        <hr></hr>

    </section>
}