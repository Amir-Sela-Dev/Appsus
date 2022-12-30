import { noteService } from "../services/note.service.js"

const { useState } = React

export function NotePreview({ note, onRemoveNote, onPinnedNote, onDeletTodo, onToggleDone }) {
    const { info } = note
    const { isPinned } = note
    const [updateNoteDisplay, setUpdateNoteDisplay] = useState()
    const [isHoverNote, setIsHoverNote] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    let pinIcon = ''


    function getTitleFromBlur(e) {
        const newTxt = e.target.innerText
        if (!newTxt) return console.log("unvalid txt")
        const noteId = e.target.id
        noteService.get(noteId)
            .then(note => {
                note.info.title = newTxt
                noteService.save(note).then(setUpdateNoteDisplay)
            })
    }

    function getTextFromBlur(e) {
        const newTxt = e.target.innerText
        if (!newTxt) return console.log("unvalid txt")
        const noteId = e.target.id
        noteService.get(noteId)
            .then(note => {
                const { info } = note
                info.txt = newTxt
                note.pinned = ''
                noteService.save(note).then(setUpdateNoteDisplay)
            })

    }

    function getTodoFromBlur(e, todoId, noteId) {
        const newTodo = e.target.innerText
        noteService.get(noteId)
            .then(note => {
                const { info } = note
                const { todos } = info
                let todoToEdit = todos.find(todo => todo.id === todoId)
                todoToEdit.txt = newTodo

                noteService.save(note).then(setUpdateNoteDisplay)
            })

    }

    function onChangeNoteColor({ target }) {
        const { value } = target
        if (!value) return
        note.style.backgroundColor = value
        noteService.save(note).then(setSelectedColor)
    }

    function getTodos() {
        const todos = note.info.todos.map(todo =>
            <li className="todo-item"
                key={todo.id}>

                <div className={`${todo.doneAt ? 'todos-full' : 'todos'}`}
                    onClick={() => onToggleDone(todo.id, note.id)}>
                </div>

                <span
                    contentEditable
                    suppressContentEditableWarning={true}
                    className={`${todo.doneAt ? 'todo-done' : ''}`}
                    onBlur={(e) => getTodoFromBlur(e, todo.id, note.id)}>
                    {todo.txt}</span>

                <div onClick={() => onDeletTodo(todo.id, note.id)} className="delete-todo"></div>

            </li>)
        return todos
    }

    pinIcon = isPinned ? 'pin-full' : 'pin'
    const style = note.style ? note.style : ''
    let color = style.backgroundColor ? style.backgroundColor : ''

    return <article className="note-preview"
        onMouseEnter={() => setIsHoverNote(true)}
        onMouseLeave={() => setIsHoverNote(false)}
        style={{ backgroundColor: color }}
    >

        <p contentEditable className="note-title" id={note.id} key={note.id}
            onBlur={getTitleFromBlur}
            suppressContentEditableWarning={true}>{info.title}</p>

        {!info.todos && <p contentEditable id={note.id}
            onBlur={getTextFromBlur}
            suppressContentEditableWarning={true}
            className="note-txt">
            {info.txt}
        </p>}

        {info.todos && <ul className="todos-list">{getTodos()}</ul>}

        <img className="note-img" src={info.url}></img>
        {info.videoUrl && <section className="note-video" contentEditable>
            <iframe width="250" height="200"
                src={`//www.youtube.com/embed/${info.videoUrl}`}
            ></iframe>

        </section>}
        {selectedImage && <img alt="not found" width={"240px"} src={URL.createObjectURL(selectedImage)} />}
        {!isHoverNote && <div className="tol-bar-space"></div>}
        {isHoverNote && <div className="tool-bar" role="toolbar">
            <button className={`note-btn ${pinIcon}`} onClick={() => onPinnedNote(note.id)}></button>
            <button className="note-btn palet"><input
                type="color"
                name='myColor'
                onChange={(event) => onChangeNoteColor(event)}
            />
            </button>
            <button className="note-btn image"><input
                className="invisable-input"
                type="file"
                name="myImage"
                onChange={(event) => setSelectedImage(event.target.files[0])}
            /></button>
            <button className="note-btn delete" onClick={() => onRemoveNote(note.id)}></button>
        </div>}

    </article>

}
