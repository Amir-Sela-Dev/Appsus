import { noteService } from "../services/note.service.js"
const { useEffect, useRef } = React

export function NoteAdd({ onAddNote, onCreatTodo, onCreatCanvas, onCreatImg, onRenderComp }) {
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
        newNote.type = 'note-txt'
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

    function renderComponent() {
        console.log('Render Component')
        onRenderComp('txt')
    }

    console.log(valueToAdd)
    return <section className="note-add">
        <form className="add-wrap" >

            <input type="text"
                id="note-txt"
                className="add-input"
                name="note-txt"
                readOnly
                value="Take a note.."
                onClick={renderComponent}
                ref={inputEl}
            />

            <button className="new-note todo" onClick={onCreatTodo}></button>
            <button className="new-note canvas" onClick={onCreatCanvas}></button>
            <button className="new-note img" onClick={() => onCreatImg('img')}></button>
        </form>
    </section>
}