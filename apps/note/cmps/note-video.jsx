import { noteService } from "../services/note.service.js"
const { useEffect, useRef } = React

export function NoteVideo({ onRenderComp, onAddNote }) {

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

    function addVideo(url) {
        const newNote = noteService.getEmptyNote()
        newNote.info.videoUrl = url
        newNote.type = 'note-video'
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
            const urlId = getVideoId(valueToAdd)
            addVideo(urlId)
            valueToAdd = ''
            inputEl.current.value = ''
        }
        isClicked = false
    }

    function onCloseTxtNote() {
        onRenderComp('')
    }


    function getVideoId(url) {
        let splitUrl = url.split('v=')
        console.log('qqqqqqqqqqqqqq', splitUrl[1])
        return splitUrl[1]
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
                placeholder="Video URL"
                onChange={getValue}
                onKeyDown={handleKeyDown}
                ref={inputEl}
            />
            <button type='button' className="img-close-btn" onClick={onCloseTxtNote}>Close</button>
        </form>
    </section>
}