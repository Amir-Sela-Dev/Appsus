import { noteService } from "../services/note.service.js"

const { useState } = React

export function NotePreview({ note, onRemoveNote, onPinnedNote }) {
    const { info } = note
    const { isPinned } = note
    const [updateNoteDisplay, setUpdateNoteDisplay] = useState()
    const [isHoverNote, setIsHoverNote] = useState(false)
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
                note.type = newTxt
                note.pinned = ''
                noteService.save(note).then(setUpdateNoteDisplay)
            })

    }

    pinIcon = isPinned ? "pin-full" : 'pin'

    return <article className="note-preview"
        onMouseEnter={() => setIsHoverNote(true)}
        onMouseLeave={() => setIsHoverNote(false)}>

        <p contentEditable className="note-title" id={note.id} key={note.id}
            onBlur={getTitleFromBlur}
            suppressContentEditableWarning={true}>{info.txt}</p>

        <p contentEditable id={note.id}
            onBlur={getTextFromBlur}
            suppressContentEditableWarning={true}
            className="note-txt">
            {note.type}
        </p>
        {!isHoverNote && <div className="tol-bar-space"></div>}
        {isHoverNote && <div className="tool-bar" role="toolbar">
            <button className={`note-btn ${pinIcon}`} onClick={() => onPinnedNote(note.id)}></button>
            <button className="note-btn palet" ></button>
            <button className="note-btn image"></button>
            <button className="note-btn delete" onClick={() => onRemoveNote(note.id)}></button>
        </div>}

    </article>

}
