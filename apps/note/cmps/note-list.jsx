const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes, onRemoveNote, onPinnedNote, onDeletTodo }) {

    return <section className="note-list">
        {
            notes.map(note => {

                return <div className={`note`} key={note.id}>
                    <NotePreview note={note} onRemoveNote={onRemoveNote} onPinnedNote={onPinnedNote} onDeletTodo={onDeletTodo}/>
                </div>
            })
        }
    </section>
}
