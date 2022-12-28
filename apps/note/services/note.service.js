import { utilService } from './util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


export const noteService = {
    query,
    createNote,
    removeNote,
}

const STORAGE_KEY = 'notesDB'
createNotes()

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

function removeNote(noteId) {
    let notes = _loadNotesFromStorage()

    notes = notes.filter(note => note.id !== noteId)
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
