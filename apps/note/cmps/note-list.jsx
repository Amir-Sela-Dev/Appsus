const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes, onRemoveNote, onPinnedNote }) {

    return <section className="note-list">
        {
            notes.map(note => {

                return <div className={`note`} key={note.id}>
                    <NotePreview note={note} onRemoveNote={onRemoveNote} onPinnedNote={onPinnedNote} />
                </div>
            })
        }
    </section>
}
