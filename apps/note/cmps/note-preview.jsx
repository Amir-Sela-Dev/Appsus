export function NotePreview({ note }) {
    const { info } = note
    const { isPinned } = note
    let pinned = 'No'

    if (isPinned) pinned = "Yes"
    return <article className="note-preview">
        <h2>Note title {info.txt}</h2>
        <h3>Pinned {pinned}</h3>
        <h3>Type {note.type}</h3>
    </article>
}