import { noteService } from "../services/note.service.js"
const { useEffect, useState, useRef } = React


export function NoteTxt({ onRenderComp, onAddNote }) {
    const inputEl = useRef()
    const [isHoverToolBar, setIsHoverToolBar] = useState(false)
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

    function handleKeyDown(ev) {
        console.log(ev.key)
        if (ev.key === 'Enter') {
            addNoteByClick()
        }
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

    function handleSubmit(event) {
        event.preventDefault()
    }

    function onCloseTxtNote() {
        onRenderComp('')
    }

    console.log(valueToAdd)
    return <section className="note-add"
        onMouseEnter={() => setIsHoverToolBar(true)}
        onMouseLeave={() => setIsHoverToolBar(false)}
    >
        <form className="add-wrap"
            onSubmit={handleSubmit}
        >

            <input type="text"
                id="note-txt"
                className="add-input txt-input"
                name="note-txt"
                placeholder="Take a note.."
                onChange={getValue}
                onKeyDown={handleKeyDown}
                ref={inputEl}
            />
            <button type='button' className="note-close-btn" onClick={onCloseTxtNote}>Close</button>


            {isHoverToolBar && <div className="tool-bar-note-txt" role="toolbar">
                <button className={`note-txt-btn pin pin-btn-txt`} onClick={() => { }}></button>

                <button className="note-txt-btn palet palet-btn-txt"><input
                    type="color"
                    name='myColor'
                    onChange={(event) => console.log(event)}
                />
                </button>
                <button className="note-txt-btn image image-btn-txt"><input
                    className="invisable-input"
                    type="file"
                    name="myImage"
                    onChange={(event) => console.log(event.target.files[0])}
                /></button>
                <button className="note-txt-btn delete delete-btn-txt" onClick={() => { }}></button>

            </div>}

        </form>
    </section>
}
