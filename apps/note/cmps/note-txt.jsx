import { noteService } from "../services/note.service.js"
const { useEffect, useRef } = React


export function NoteTxt({ onRenderComp, onAddNote }) {
    const inputEl = useRef()
    let valueToAdd
    addBodyEv()

    useEffect(() => {
        addNoteByClick()

        return removeBodyEv()
    }, [])

    function getValue({ target }) {
        let { value } = target
        if (!value) return
        valueToAdd = value
    }

    function addNote(txt) {
        const newNote = noteService.getEmptyNote()
        newNote.info.txt = txt
        noteService.save(newNote).then(onAddNote)
    }

    function addBodyEv() {
        document.body.style.minHeight = '100vh'
        document.body.addEventListener('click', addNoteByClick)
    }

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

    function onCloseTxtNote() {
        onRenderComp('')
    }

    console.log(valueToAdd)
    return <section className="note-add">
        <form className="add-wrap" >

            <input type="text"
                id="note-txt"
                className="add-input txt-input"
                name="note-txt"
                placeholder="Take a note.."
                onChange={getValue}
                ref={inputEl}
            />
            <button type='button' className="note-close-btn" onClick={onCloseTxtNote}>Close</button>
        </form>
    </section>
}
