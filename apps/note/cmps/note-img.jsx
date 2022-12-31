import { noteService } from "../services/note.service.js"
const { useEffect, useRef } = React
export function NoteImg({ onRenderComp, onAddNote }) {

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
        console.log(valueToAdd)
    }


    function handleKeyDown(ev) {

        if (ev.key === 'Enter') {
            // if (!titleToAdd) return
            addNoteByClick()
        }
    }

    function addImg(url) {
        const newNote = noteService.getEmptyNote()
        newNote.info.url = url
        newNote.type = 'note-img'
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
            // https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)         
            addImg(valueToAdd)
            valueToAdd = ''
            inputEl.current.value = ''
        }
        isClicked = false
    }

    function onCloseTxtNote() {
        onRenderComp('')
    }


    function handleSubmit(event) {
        event.preventDefault()
    }

    console.log(valueToAdd)
    return <section className="note-add">
        <form className="add-wrap"
            onSubmit={handleSubmit}
        >

            <input type="text"
                id="note-img"
                className="add-input"
                name="note-img"
                placeholder="Image URL"
                onChange={getValue}
                onKeyDown={handleKeyDown}
                ref={inputEl}
            />
            <button type='button' className="img-close-btn" onClick={onCloseTxtNote}>Close</button>
        </form>
    </section>
}