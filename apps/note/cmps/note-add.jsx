import { noteService } from "../services/note.service.js"
const { useEffect, useRef } = React

export function NoteAdd({ onRenderComp }) {
    const inputEl = useRef()
    let valueToAdd
    // addBodyEv()

    useEffect(() => {
        addNoteByClick()

        return removeBodyEv()
    }, [])

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

    function renderComponent() {
        console.log('Render Component')
        onRenderComp('txt')
    }

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

            <button className="new-note todo" onClick={() => onRenderComp('todos')}></button>
            <button className="new-note canvas" onClick={() => onRenderComp('video')}></button>
            {/* <button className="new-note video-btn" onClick={() => onRenderComp('video')}></button> */}
            <button className="new-note img" onClick={() => onRenderComp('img')}></button>
        </form>
    </section>
}