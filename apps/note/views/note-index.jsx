const { useState, useEffect } = React
// const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteFilter } from '../cmps/note-filter.jsx';
import { NoteList } from "../cmps/note-list.jsx";
import { NoteAdd } from "../cmps/note-add.jsx";

export function NoteIndex() {
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])
    let [addNote, setaddNote] = useState(false)

    useEffect(() => {
        loadNotes()
    }, [filterBy, addNote])

    function loadNotes() {
        noteService.query(filterBy)
            .then((notes) => {
                setNotes(notes)
            })
    }

    function onAddNote() {
        addNote = !addNote
        setaddNote(addNote)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
        })
            .catch((err) => {
                console.log('Could not remove note', err)
            })
    }

    console.log(notes)
    return <section className="note-index">
        <div className="main-layout">
            <NoteFilter onSetFilter={onSetFilter} />
            <NoteAdd onAddNote={onAddNote} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </div>
    </section>

}

