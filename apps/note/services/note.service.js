
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
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote() {
    return {
        id: "",
        type: "",
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
                    title: "I have a sub",
                    txt: "Amirs team"
                },
                style: {
                    backgroundColor: "#fbbc04"
                }

            },
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'note-txt',
                isPinned: true,
                style: {
                    backgroundColor: '#fff475'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                type: 'note-img',
                isPinned: false,
                info: {
                    url: 'https://www.google.com/images/icons/product/keep-512.png',
                    title: 'Bobi and Me'
                },
            },
            {
                id: 'n103',
                type: 'note-todos',
                isPinned: false,
                info: {
                    title: 'Todo\'s',
                    todos: [
                        { txt: 'Driving liscence', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    title: "Coding Academy",
                    txt: "Amirs team"
                },
                style: {
                    backgroundColor: "#cbf0f8"
                }

            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    title: "Bank Acount",
                    txt: "Bank: Zahav acount:232654"
                },
                style: {
                    backgroundColor: ""
                }

            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    title: "Movies to watch",
                    txt: "The Shawshank Redemption, Scubidoo"
                },
                style: {
                    backgroundColor: "#fdcfe8"
                }

            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    title: "Gmail Password",
                    txt: "Asdlk@rsldk"
                },
                style: {
                    backgroundColor: ""
                }

            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}
