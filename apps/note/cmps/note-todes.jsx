
import { noteService } from "../services/note.service.js"
const { useEffect, useRef } = React


export function NoteTodos({ onRenderComp, onAddNote }) {
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

    function addNoteTodos(todos) {
        console.log(todos)
        const newNote = noteService.getEmptyNote()
        if (!newNote.info.todos) newNote.info.todos = []
        console.log('AAAAAAAA', newNote.info.todos)
        newNote.info.todos = todos
        console.log('todos', todos)
        console.log('newNote', newNote)
        noteService.save(newNote).then(onAddNote)
    }

    function addBodyEv() {
        document.body.style.minHeight = '100vh'
        document.body.addEventListener('click', addNoteByClick)
    }

    function removeBodyEv() {
        document.body.removeEventListener('click', addNoteByClick)
    }

    function handleKeyDown(ev) {

        if (ev.key === 'Enter') {
            // if (!titleToAdd) return
            addNoteByClick()
        }
    }

    function addNoteByClick() {
        if (!valueToAdd) return
        let isClicked = true
        if (isClicked) {
            console.log(valueToAdd)
            const newTodos = noteService.textToTodos(valueToAdd)
            addNoteTodos(newTodos)
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
    return <section className="note-add-todos">
        <form className="todos-wrap"
            onSubmit={handleSubmit}>

            <input type="text"
                id="note-txt"
                className="note-add-todos-input"
                name="note-txt"
                placeholder="Enter todos spread by ,"
                onChange={getValue}
                onKeyDown={handleKeyDown}
                ref={inputEl}
            />
            <button type='button' className="img-close-btn" onClick={onCloseTxtNote}>Close</button>
        </form>
    </section>
}
