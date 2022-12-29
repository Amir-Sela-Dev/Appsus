import { NoteFilter } from '../cmps/note-filter.jsx';


export function NoteHeader({ onSetFilter }) {
    return <section className='note-header'>
        <div className="header-img-wrap">
            <img className="header-img" src="./assets/img/google-keep.png"></img>
        </div>
        <NoteFilter onSetFilter={onSetFilter} />
    </section>
}
