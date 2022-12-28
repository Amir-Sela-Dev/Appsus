import { noteService } from "../services/note.service.js"

export function NoteAdd({ onAddNote }) {

    function handleChange({ target }) {
        let { value } = target
        if (!value) return
        const processChange = debounce(() => addNote(value))
        processChange()
    }

    function debounce(func) {
        let timer;
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => { func.apply(this, args) }, 3000)
        }
    }
    function saveInput() {
        console.log('Saving data')
    }


    function addNote(txt) {
        const newNote = noteService.getEmptyNote()
        newNote.info.txt = txt
        noteService.save(newNote).then(onAddNote)
    }

    return <section className="note-add">
        <form className="search-wrap" >

            <label className=".search-input-label"
                htmlFor="note-txt"></label>
            <input type="text"
                id="note-txt"
                className="search-input"
                name="note-txt"
                placeholder="Take a note.."
                onChange={handleChange}
            />

        </form>
    </section>
}