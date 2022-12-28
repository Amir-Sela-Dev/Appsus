import { noteService } from "../services/note.service.js"

const { useState } = React

export function NotePreview({ note, onRemoveNote }) {
    const { info } = note
    const { isPinned } = note
    const [updateNoteDisplay, setUpdateNoteDisplay] = useState()
    let pinned = 'No'

    function getTitleFromBlur(e) {
        console.log(e.target.id)
        console.log(e.target.innerText)
        const newTxt = e.target.innerText
        const noteId = e.target.id
        noteService.get(noteId)
            .then(note => {
                note.info.txt = newTxt
                save(note)
                setUpdateNoteDisplay(note)
            })
    }

    function getTextFromBlur(e) {
        console.log(e.target.id)
        console.log(e.target.innerText)
        const newTxt = e.target.innerText
        const noteId = e.target.id
    }

    if (isPinned) pinned = "Yes"
    return <article className="note-preview">
        <p className="note-title" id={note.id} onBlur={getTitleFromBlur} contentEditable>{info.txt}</p>
        <p contentEditable id={note.id} onBlur={getTextFromBlur}
            className="note-txt">
            Pinned {pinned}
            Type {note.type}
        </p>

        <div className="tool-bar" role="toolbar">
            <button className="note-btn color" >Color</button>
            <button className="note-btn image">Image</button>

            <button className="note-btn delete" onClick={() => onRemoveNote(note.id)}>x</button>
        </div>

    </article>
}