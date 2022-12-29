import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

const EMAIL_KEY = 'emailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getEmptyComposeMail
}


const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query(filterBy) {
    return storageService.query(EMAIL_KEY)
        .then(mails => {
            if (filterBy.status === 'star') {
                mails = mails.filter(mail => mail.isStarred)
            }
            if (filterBy.status !== 'star') {
                const regex = new RegExp(filterBy.status, 'i')
                mails = mails.filter(mail => regex.test(mail.status))
            }
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.body) || regex.test(mail.subject) || regex.test(mail.to))
            }

            return mails
        })
}

function get(mailId) {
    return storageService.get(EMAIL_KEY, mailId)

}

function getNextCarId(mailId) {
    return storageService.query(EMAIL_KEY)
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            if (idx === mails.length - 1) idx = -1
            return mails[idx + 1].id
        })
}




function remove(mailId) {
    return storageService.remove(EMAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        console.log('save')
        return storageService.put(EMAIL_KEY, mail)
    } else {
        return storageService.post(EMAIL_KEY, mail)
    }
}

function getEmptyMail(subject = 'general', body = 'im an empty mail!') {
    const mail = {
        subject,
        body,
        isRead: (Math.random() > 0.5) ? false : true,
        isStarred: (Math.random() > 0.5) ? false : true,
        sentAt: Date.now(),
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        status: 'inbox'
    }
    return mail
}

function getEmptyComposeMail() {
    let mail = getEmptyMail('', '')
    mail.sentAt = ''
    mail.status = 'sent'
    mail.to = ''
    mail.to = ''
    return mail
}


function _createMails() {
    let mails = utilService.loadFromStorage(EMAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('test1', 'Amir sela,thank you for your order from Hazeltons USA. If you have questions about your order, you can email us at csgiftgp.com.   Your shipping confirmation is below. Thank you again for your business'))
        mails.push(_createMail('test2', 'hello how are you? im gonna talk and talk and talk blablalbalbaslbalbalalala'))
        mails.push(_createMail('test3', 'oh yeah!'))
        mails.push(_createMail('test4', 'lets go mail!'))
        mails.push(_createMail('test1', 'Amir sela,thank you for your order from Hazeltons USA. If you have questions about your order, you can email us at csgiftgp.com.   Your shipping confirmation is below. Thank you again for your business'))
        mails.push(_createMail('test2', 'hello how are you? im gonna talk and talk and talk blablalbalbaslbalbalalala'))
        mails.push(_createMail('test3', 'oh yeah!'))
        mails.push(_createMail('test4', 'lets go mail!'))
        mails.push(_createMail('test1', 'Amir sela,thank you for your order from Hazeltons USA. If you have questions about your order, you can email us at csgiftgp.com.   Your shipping confirmation is below. Thank you again for your business'))
        mails.push(_createMail('test2', 'hello how are you? im gonna talk and talk and talk blablalbalbaslbalbalalala'))

        console.log(mails)
        utilService.saveToStorage(EMAIL_KEY, mails)
    }
}

function _createMail(subject, body) {
    const mail = getEmptyMail(subject, body)
    mail.id = utilService.makeId()
    return mail
}


function getDefaultFilter() {
    console.log('hi')
    const criteria = {
        status: 'inbox',
        subject: '',
        txt: '', // no need to support complex text search
        isRead: '', // (optional property, if missing: show all)
        isStarred: '', // (optional property, if missing: show all)
        lables: [] // has any of the labels
    }

    return criteria
}


