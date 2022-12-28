import { noteService } from "../services/note.service.js"
const { useEffect, useRef } = React

export function NoteAdd({ onAddNote }) {
    const inputEl = useRef()
    let valueToAdd

    useEffect(() => {
        addNoteByClick()

        return removeBodyEv()
    }, [])

    function getValue({ target }) {
        let { value } = target
        if (!value) return
        valueToAdd = value

        // addNote(value)
    }

    function addNote(txt) {
        const newNote = noteService.getEmptyNote()
        newNote.info.txt = txt
        noteService.save(newNote).then(onAddNote)
    }

    document.body.style.minHeight = '100vh'
    document.body.addEventListener('click', addNoteByClick)

    function removeBodyEv() {
        document.body.removeEventListener('click', addNoteByClick)
    }

    function addNoteByClick() {
        if (!valueToAdd) return
        let isClicked = true
        if (isClicked) {
            addNote(valueToAdd)
            valueToAdd = ''
            inputEl.current.value = ''
        }
        isClicked = false
    }

    console.log(valueToAdd)
    return <section className="note-add">
        <form className="search-wrap" >

            <label className=".search-input-label"
                htmlFor="note-txt"></label>
            <input type="text"
                id="note-txt"
                className="search-input"
                name="note-txt"
                placeholder="Take a note.."
                onChange={getValue}
                ref={inputEl}
            />

        </form>
    </section>
}