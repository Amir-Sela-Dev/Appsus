const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes, onRemoveNote }) {

    return <ul className="note-list">
        {
            notes.map(note => <li className="note" key={note.id}>
                <NotePreview note={note} onRemoveNote={onRemoveNote} />
            </li>)
        }
    </ul>
}
