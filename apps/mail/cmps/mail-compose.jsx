const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


import { mailService } from '../services/mail.service.js';
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';


export function MailCompose({ onToogleComposeMail }) {
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyComposeMail())
    const navigate = useNavigate()

    function handleChange({ target }) {
        let { value, name: field } = target

        setMailToEdit((prevMail) => ({ ...prevMail, [field]: value }))
        setMailToEdit((prevMail) => ({ ...prevMail, ['sentAt']: Date.now() }))

    }

    function onSendMail(ev) {
        ev.preventDefault()
        mailService.save(mailToEdit).then((mail) => {
            showSuccessMsg('Book saved!')
            onToogleComposeMail()
        })
    }

    function onReturnCompose() {
        if (mailToEdit.subject || mailToEdit.body || mailToEdit.to) {
            mailToEdit.status = 'draft'
            mailService.save(mailToEdit).then((mail) => {
                showSuccessMsg('Mail is in draft!')
                onToogleComposeMail()
            })
        } else onToogleComposeMail()
    }


    return <section className="mail-compose">
        <div className="title"><h4>New message</h4><button className="return" onClick={() => { onReturnCompose() }}>X</button></div>
        <div className="form-container">
            <form onSubmit={onSendMail} >
                <div className="to"><input type="text"
                    id="to"
                    name="to"
                    placeholder="to:"
                    // value={mailToEdit.to}
                    onChange={handleChange}
                /></div>
                <div className="to"><input type="text"
                    id="subject"
                    name="subject"
                    placeholder="subject:"
                    // value={mailToEdit.subject}
                    onChange={handleChange}
                /></div>
                <div className="body">
                    <textarea
                        name="body"
                        id="body"
                        cols="30"
                        rows="10"
                        placeholder="body:"
                        value={mailToEdit.body}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="compuse-btns">
                    <button className="send">Send</button>
                </div>
            </form>
        </div>
    </section>
}