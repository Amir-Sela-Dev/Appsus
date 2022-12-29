import { noteService } from "../services/note.service.js"

const { useState } = React

export function NotePreview({ note, onRemoveNote, onPinnedNote }) {
    const { info } = note
    const { isPinned } = note
    const [updateNoteDisplay, setUpdateNoteDisplay] = useState()
    const [isHoverNote, setIsHoverNote] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    let pinIcon = ''

    function getTitleFromBlur(e) {
        const newTxt = e.target.innerText
        if (!newTxt) return console.log("unvalid txt")
        const noteId = e.target.id
        noteService.get(noteId)
            .then(note => {
                note.info.txt = newTxt
                noteService.save(note).then(setUpdateNoteDisplay)
            })
    }

    function getTextFromBlur(e) {
        const newTxt = e.target.innerText
        if (!newTxt) return console.log("unvalid txt")
        const noteId = e.target.id
        noteService.get(noteId)
            .then(note => {
                const { info } = note
                info.txt = newTxt
                note.pinned = ''
                noteService.save(note).then(setUpdateNoteDisplay)
            })

    }

    function onChangeNoteColor({ target }) {
        const { value } = target
        if (!value) return
        note.style.backgroundColor = value
        noteService.save(note).then(setSelectedColor)
    }

    pinIcon = isPinned ? 'pin-full' : 'pin'
    const style = note.style ? note.style : ''
    let color = style.backgroundColor ? style.backgroundColor : ''

    return <article className="note-preview"
        onMouseEnter={() => setIsHoverNote(true)}
        onMouseLeave={() => setIsHoverNote(false)}
        style={{ backgroundColor: color }}
    >

        <p contentEditable className="note-title" id={note.id} key={note.id}
            onBlur={getTitleFromBlur}
            suppressContentEditableWarning={true}>{info.title}</p>

        <p contentEditable id={note.id}
            onBlur={getTextFromBlur}
            suppressContentEditableWarning={true}
            className="note-txt">
            {info.txt}
        </p>
        <img className="note-img" src={info.url}></img>
        {selectedImage && <img alt="not found" width={"240px"} src={URL.createObjectURL(selectedImage)} />}
        {!isHoverNote && <div className="tol-bar-space"></div>}
        {isHoverNote && <div className="tool-bar" role="toolbar">
            <button className={`note-btn ${pinIcon}`} onClick={() => onPinnedNote(note.id)}></button>
            <button className="note-btn palet"><input
                type="color"
                name='myColor'
                onChange={(event) => onChangeNoteColor(event)}
            />
            </button>
            <button className="note-btn image"><input
                className="invisable-input"
                type="file"
                name="myImage"
                onChange={(event) => setSelectedImage(event.target.files[0])}
            /></button>
            <button className="note-btn delete" onClick={() => onRemoveNote(note.id)}></button>
        </div>}

    </article>

}
