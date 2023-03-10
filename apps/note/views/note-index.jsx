const { useState, useEffect } = React
// const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteHeader } from '../cmps/note-filter.jsx';
import { NoteList } from "../cmps/note-list.jsx";
import { NoteAdd } from "../cmps/note-add.jsx";
import { NoteTxt } from "../cmps/note-txt.jsx";
import { NoteImg } from "../cmps/note-img.jsx";
import { NoteTodos } from "../cmps/note-todes.jsx";
import { NoteVideo } from "../cmps/note-video.jsx";
import { NoteListPinned } from "../cmps/note-list-pinned.jsx";

export function NoteIndex() {
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])
    let [addNote, setaddNote] = useState(false)
    let [pinNote, setPinNote] = useState(false)
    let [removeTodo, setremoveTodo] = useState(false)
    let [toggleTodo, setToggleTodo] = useState(false)
    let [type, settype] = useState('')

    useEffect(() => {
        loadNotes()

        return setPinNote(false)
    }, [filterBy, addNote, pinNote, type, removeTodo, toggleTodo])

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

    function onPinnedNote(noteId) {
        let noteToPin = notes.find(note => note.id === noteId)
        noteToPin.isPinned = !noteToPin.isPinned
        noteService.save(noteToPin).then(() => setPinNote(true))
    }

    function onRenderComp(type) {
        settype(type)
    }

    function onDeletTodo(todoId, noteId) {
        noteService.removeTodo(noteId, todoId)
            .then(() => setremoveTodo(true))
    }

    function onToggleDone(todoId, noteId) {
        noteService.todoToggleDone(todoId, noteId)
            .then(setToggleTodo)
    }

    console.log(notes)
    return <section className="note-index">
        <NoteHeader onSetFilter={onSetFilter} />
        <hr></hr>
        <div className="main-layout">
            {type === '' && <NoteAdd
                onRenderComp={onRenderComp} />}

            {type === 'txt' && < NoteTxt
                onAddNote={onAddNote}
                onRenderComp={onRenderComp}
            />}

            {type === 'img' && <NoteImg
                onAddNote={onAddNote}
                onRenderComp={onRenderComp}
            />}

            {type === 'todos' && <NoteTodos
                onAddNote={onAddNote}
                onRenderComp={onRenderComp}
            />}

            {type === 'video' && <NoteVideo
                onAddNote={onAddNote}
                onRenderComp={onRenderComp}
            />}

            {/* {getCmpByType()} */}
            <h3 className="pinned-title">PINNED</h3>
            <NoteListPinned notes={notes}
                onRemoveNote={onRemoveNote}
                onPinnedNote={onPinnedNote}
                onDeletTodo={onDeletTodo}
                onToggleDone={onToggleDone}
            />
            <h3 className="others-title">OTHERS</h3>
            <NoteList notes={notes}
                onRemoveNote={onRemoveNote}
                onPinnedNote={onPinnedNote}
                onDeletTodo={onDeletTodo}
                onToggleDone={onToggleDone}
            />
        </div>
    </section>

}
