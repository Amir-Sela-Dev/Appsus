
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'


export const noteService = {
    query,
    getDefaultFilter,
    remove,
    save,
    get,
    getEmptyNote
}

const NOTE_KEY = 'notesDB'
createNotes()

function query(filterBy = getDefaultFilter()) {

    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.info) {
                const regex = new RegExp(filterBy.info.txt, 'i')
                notes = notes.filter(note => regex.test(note.info.txt))
            }
            if (filterBy.type) {
                const regex = new RegExp(filterBy.type, 'i')
                notes = notes.filter(note => regex.test(note.type))
            }
            if (filterBy.isPinned) {
                const regex = new RegExp(filterBy.isPinned, 'i')
                notes = notes.filter(note => regex.test(note.isPinned))
            }
            return notes
        })
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function save(note) {
    console.log(note);
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote() {
    return {
        id: "",
        type: "note-txt",
        isPinned: false,
        info: {
            txt: ""
        },
        style: {
            backgroundColor: "#fbbc04"
        }
    }
}

function getDefaultFilter() {

    return { "info.txt": '', type: '', isPinned: '' }
}

function createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {

        notes = [
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Amirs team"
                },
                style: {
                    backgroundColor: "#fbbc04"
                }

            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Amirs team"
                },
                style: {
                    backgroundColor: "#fbbc04"
                }

            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Amirs team"
                },
                style: {
                    backgroundColor: "#fbbc04"
                }

            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Amirs team"
                },
                style: {
                    backgroundColor: "#fbbc04"
                }

            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Amirs team"
                },
                style: {
                    backgroundColor: "#fbbc04"
                }

            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Sprint 3!"
                },
                style: {
                    backgroundColor: "#fbbc04"
                }

            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}
