import { MailPreview } from "./mail-preview.jsx";

export function MailList({ mails, onRemoveMail }) {



    return <table className="mails-list" width="100%">
        <thead>

        </thead>
        <tbody>
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} onRemoveMail={onRemoveMail} />)}
        </tbody>
    </table>

}
