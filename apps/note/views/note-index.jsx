const { useState, useEffect } = React
// const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteHeader } from '../cmps/note-filter.jsx';
import { NoteList } from "../cmps/note-list.jsx";
import { NoteAdd } from "../cmps/note-add.jsx";
import { NoteTxt } from "../cmps/note-txt.jsx";
import { NoteImg } from "../cmps/note-img.jsx";
// import { NoteHeader } from "../cmps/note-header.jsx";

export function NoteIndex() {
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [notes, setNotes] = useState([])
    let [addNote, setaddNote] = useState(false)
    let [pinNote, setPinNote] = useState(false)
    let [type, settype] = useState('')

    useEffect(() => {
        loadNotes()

        return setPinNote(false)
    }, [filterBy, addNote, pinNote, type])

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
        console.log(noteToPin)
        noteToPin.isPinned = !noteToPin.isPinned
        console.log('After', noteToPin)
        noteService.save(noteToPin).then(() => setPinNote(true))
    }

    function onRenderComp(type) {
        settype(type)
    }

    function onCreatTodo() {
        console.log('Creat Todo')
    }

    function onDeletTodo(todoId, noteId) {

        console.log('todoId', todoId)
        console.log('noteId', noteId)
    }

    function onCreatCanvas() {
        console.log('Creat Canvas')
    }

    function onCreatImg(type) {
        settype(type)
    }

    function getCmpByType(type) {
        switch (type) {
            case 'note-txt':
                return <NoteTxt dataProps={{ ...dataProps }} />
            case 'note-todos':
                return <NoteTodos dataProps={{ ...dataProps }} />
            case 'note-img':
                return <NoteImg dataProps={{ ...dataProps }} />
            case 'note-video':
                return <NoteVideo dataProps={{ ...dataProps }} />
        }
    }

    console.log(notes)
    return <section className="note-index">
        <NoteHeader onSetFilter={onSetFilter} />
        <hr></hr>
        <div className="main-layout">
            {type === '' && <NoteAdd
                onAddNote={onAddNote}
                onCreatTodo={onCreatTodo}
                onCreatCanvas={onCreatCanvas}
                onCreatImg={onCreatImg}
                onRenderComp={onRenderComp} />}

            {type === 'txt' && < NoteTxt
                onAddNote={onAddNote}
                onCreatTodo={onCreatTodo}
                onCreatCanvas={onCreatCanvas}
                onCreatImg={onCreatImg} />}

            {type === 'img' && <NoteImg
                onAddNote={onAddNote}
                onCreatTodo={onCreatTodo}
                onCreatCanvas={onCreatCanvas}
                onCreatImg={onCreatImg}
                onRenderComp={onRenderComp}
            />}

            {/* {getCmpByType()} */}

            <NoteList notes={notes}
                onRemoveNote={onRemoveNote}
                onPinnedNote={onPinnedNote}
                onDeletTodo={onDeletTodo}
            />
        </div>
    </section>

}
