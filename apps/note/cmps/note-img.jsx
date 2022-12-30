import { noteService } from "../services/note.service.js"
const { useEffect, useRef } = React
export function NoteImg({ onAddNote }) {

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
        console.log(valueToAdd)
    }

    function addNote(txt) {
        const newNote = noteService.getEmptyNote()
        newNote.info.txt = txt
        newNote.type = 'note-txt'
        noteService.save(newNote).then(onAddNote)
    }

    function addImg(url) {
        const newNote = noteService.getEmptyNote()
        newNote.info.url = url
        newNote.type = 'note-img'
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
            // addNote(valueToAdd)
            // https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)
            addImg(valueToAdd)
            valueToAdd = ''
            inputEl.current.value = ''
        }
        isClicked = false
    }

    console.log(valueToAdd)
    return <section className="note-add">
        <form className="add-wrap" >

            <input type="text"
                id="note-img"
                className="add-input"
                name="note-img"
                placeholder="Image URL"
                onChange={getValue}
                ref={inputEl}
            />
        </form>
    </section>
}