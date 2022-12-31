const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx";

export function NoteListPinned({ notes, onRemoveNote, onPinnedNote, onDeletTodo, onToggleDone }) {

    return <section className="note-list pinned-list">
        {
            notes.map(note => {
                if (!note.isPinned) return
                return <div className={`note`} key={note.id}>
                    <NotePreview note={note}
                        onRemoveNote={onRemoveNote}
                        onPinnedNote={onPinnedNote}
                        onDeletTodo={onDeletTodo}
                        onToggleDone={onToggleDone}
                    />
                </div>
            })
        }
    </section>
}
