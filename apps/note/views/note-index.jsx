const { useState, useEffect } = React
// const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteFilter } from '../cmps/note-filter.jsx';
import { NoteList } from "../cmps/note-list.jsx";

export function NoteIndex() {
    // const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then((notes) => {
                setNotes(notes)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }


    console.log(notes)
    return <section className="note-index">
        <div className="main-layout">
            <NoteFilter onSetFilter={onSetFilter} />
            <NoteList notes={notes} />
        </div>
    </section>

}

