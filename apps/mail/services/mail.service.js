import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

const EMAIL_KEY = 'emailDB'
_createMails()

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

// filterBy = getDefaultFilter()
function query() {
    return storageService.query(EMAIL_KEY)
        .then(mails => {
            // if (filterBy.txt) {
            //     const regex = new RegExp(filterBy.txt, 'i')
            //     cars = cars.filter(car => regex.test(car.vendor))
            // }
            // if (filterBy.minSpeed) {
            //     cars = cars.filter(car => car.maxSpeed >= filterBy.minSpeed)
            // }
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
        return storageService.put(EMAIL_KEY, mail)
    } else {
        return storageService.post(EMAIL_KEY, mail)
    }
}


function _createMails() {
    let mails = utilService.loadFromStorage(EMAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('test1', 'go mail!'))
        mails.push(_createMail('test2', 'wowowow'))
        mails.push(_createMail('test3', 'oh yeah!'))
        mails.push(_createMail('test4', 'lets go mail!'))
        console.log(mails)
        utilService.saveToStorage(EMAIL_KEY, mails)
    }
}

function _createMail(subject, body) {
    const mail = getEmptyMail(subject, body)
    return mail
}

function getEmptyMail(subject = 'general', body = 'im an empty mail!') {
    const mail = {
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        to: 'momo@momo.com'
    }
    return mail
}