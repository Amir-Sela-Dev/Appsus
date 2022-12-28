import { utilService } from './util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


export const noteService = {
    query,
    createNote,
    removeNote,
    changeNoteBgColor,
    updateNoteContent,
    togglePinnedNote,
    toggleDone,
    addTodo,
    removeTodo,
    updateTodoContent
}

const STORAGE_KEY = 'notesDB'
createNotes()

function toggleDone(todoId, noteId) {
    let notes = _loadNotesFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)
    let todoIdx = notes[noteIdx].info.todos.findIndex(todo => todo.id === todoId)
    let isDoneStatus = notes[noteIdx].info.todos[todoIdx].isDone
    notes[noteIdx].info.todos[todoIdx].isDone = !isDoneStatus
    _saveNotesToStorage(notes)
    return Promise.resolve()

}

function query(filterChar) {

    let notes = _loadNotesFromStorage()
    if (filterChar) {
        notes = notes.filter(note => {
            switch (note.type) {
                case 'note-txt':
                    return note.info.txt.split(' ')[0].toLowerCase().includes(filterChar)
                case 'note-todos':
                    return [...notes, note.info.title.split(' ')[0].toLowerCase().includes(filterChar)]
            }
        })
    }


    const pinnedNotes = notes.filter(note => note.isPinned)
    const unPinnedNotes = notes.filter(note => !note.isPinned)
    return Promise.resolve({ pinnedNotes, unPinnedNotes })
}

function updateTodoContent(todoId, noteId, value) {
    let notes = _loadNotesFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)
    const todoIdx = notes[noteIdx].info.todos.findIndex(todo => todo.id === todoId)
    notes[noteIdx].info.todos[todoIdx].txt = value
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function removeTodo(todoId, noteId) {
    let notes = _loadNotesFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)

    notes[noteIdx].info.todos = notes[noteIdx].info.todos.filter(todo => todo.id !== todoId)
    _saveNotesToStorage(notes)
    return Promise.resolve()
}


function addTodo(value, noteId) {
    let notes = _loadNotesFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)
    notes[noteIdx].info.todos.unshift(_createTodo(value))
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function _createTodo(txt) {
    return {
        id: utilService.makeId(),
        txt,
        isDone: false,
    }
}


function removeNote(noteId) {
    let notes = _loadNotesFromStorage()

    notes = notes.filter(note => note.id !== noteId)
    _saveNotesToStorage(notes)
    return Promise.resolve()

}


function togglePinnedNote(noteId, isPinned) {
    const notes = _loadNotesFromStorage()
    const noteIdx = notes.findIndex(note => note.id === noteId)
    notes[noteIdx].isPinned = isPinned
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function changeNoteBgColor(color, noteId) {
    const notes = _loadNotesFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)
    notes[noteIdx].style.backgroundColor = color
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function createNote(value, type) {
    let notes = _loadNotesFromStorage()
    const infoKey = getInfoKeyByType(type)


    let note = {
        id: utilService.makeId(),
        type,
        isPinned: true,
        info: {
            [infoKey]: (infoKey === 'urlId') ? utilService.getYoutubeId(value) : value,
        },
        style: {
            backgroundColor: utilService.getRandomColor(),
        }

    }
    if (type === 'note-todos') note.info.todos = []
    notes.unshift(note)
    _saveNotesToStorage(notes)
    return Promise.resolve()

}



function updateNoteContent(noteId, noteType, value) {
    const notes = _loadNotesFromStorage()
    const noteIdx = notes.findIndex(note => note.id === noteId)
    switch (noteType) {
        case 'note-txt':
            notes[noteIdx].info.txt = value
    }

    _saveNotesToStorage(notes)
    return Promise.resolve(notes[noteIdx])
}

function getInfoKeyByType(type) {
    switch (type) {
        case 'note-img':
            return 'url'
        case 'note-txt':
            return 'txt'
        case 'note-todos':
            return 'title'
        case 'note-video':
            return 'urlId'
    }
}

function createNotes() {
    let notes = _loadNotesFromStorage()
    if (!notes || !notes.length) {

        notes = [
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Fullstack Dev Baby!"
                },
                style: {
                    backgroundColor: "#fbbc04"
                }

            },
            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                info: {
                    url: "https://www.coding-academy.org/images/ca-logo-dark@2x.png",
                    title: "Amirs team"
                },
                style: {
                    backgroundColor: "#d7aefb"
                }

            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: true,
                info: {
                    title: "Get my to Portogal",
                    todos: [
                        { id: utilService.makeId(), txt: "Driving liscence", isDone: true },
                        { id: utilService.makeId(), txt: "Coding power", isDone: false }
                    ]
                },
                style: {
                    backgroundColor: "#ccff90"
                }

            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Go Sleep!"
                },
                style: {
                    backgroundColor: "#a7ffeb"
                }

            },
        ]

    }
    _saveNotesToStorage(notes)
}

// Locals Functions
function _saveNotesToStorage(data) {
    storageService.saveToStorage(STORAGE_KEY, data)
}

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}