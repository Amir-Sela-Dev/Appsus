const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx";

export function NoteList({ notes }) {

    return <ul className="note-list">
        {
            notes.map(note => <li className="note" key={note.id}>
                <NotePreview note={note} />
                <div>
                    {/* <button onClick={() => { console.log('Clicked remove') }}>Remove</button> */}
                </div>
            </li>)
        }
    </ul>
}
