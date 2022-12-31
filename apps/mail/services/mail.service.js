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
        return storageService.put(EMAIL_KEY, mail)
    } else {
        return storageService.post(EMAIL_KEY, mail)
    }
}

function getEmptyMail(subject = 'general', body = 'im an empty mail!') {
    const mail = {
        subject,
        body,
        isRead: false,
        isStarred: false,
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
        mails.push(_createMail('inbox', 'Ebay', 'thank you for your order from Hazeltons USA. If you have questions about your order, you can email us at csgiftgp.com.   Your shipping confirmation is below. Thank you again for your business'))
        mails.push(_createMail('inbox', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount! '))
        mails.push(_createMail('trash', 'Facebook', 'Your Posts 0 posts published in the last 28 days. Create a post with a photo or video to engage people who like your Page'))
        mails.push(_createMail('trash', 'Bird', 'lets go ride with Bird!'))
        mails.push(_createMail('inbox', 'Ebay', 'thank you for your order from Hazeltons USA. If you have questions about your order, you can email us at csgiftgp.com.   Your shipping confirmation is below. Thank you again for your business'))
        mails.push(_createMail('inbox', 'University of Michigan', ', are you ready to find your purpose? Finding purpose in your work and being a purposeful leader is possible, and you can learn the tools to identify that purpose. The new course Purpose at Work: A Course for Employees and Leaders shows you how through an exploration of the science of purpose, connecting to your purpose in your workplace and what it takes to create a purposeful culture.'))
        mails.push(_createMail('inbox', 'המוסד לביטוח לאומי', 'באנו לעשוק לך את הכסף'))
        mails.push(_createMail('inbox', 'Facebook', 'Your Posts 0 posts published in the last 28 days. Create a post with a photo or video to engage people who like your Page'))
        mails.push(_createMail('inbox', 'mom', 'thank you for your order from Hazeltons USA. If you have questions about your order, you can email us at csgiftgp.com.   Your shipping confirmation is below. Thank you again for your business'))
        mails.push(_createMail('sent', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount! '))
        mails.push(_createMail('inbox', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount! '))
        mails.push(_createMail('trash', 'Avocod', 'Verify your e-mail to finish signing up for Avocode Thank you for choosing Avocode.'))
        mails.push(_createMail('sent', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount! '))
        mails.push(_createMail('inbox', 'GitHub', 'A first-party GitHub OAuth application (Git Credential Manager) with gist, repo, and workflow scopes was recently authorized to access your account.Visit for more information.To see this and other security events for your account, visit If you run into problems, please contact support by visiting Thanks,The GitHub Team'))
        mails.push(_createMail('trash', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount!'))
        mails.push(_createMail('sent', 'גרינפיס ישראל', 'קיבלת קבלה על תרומ שלום אמיר סלע, בשם כל צוות גרינפיס ישראל, אנו מודים לך על תרומתך המבורכת.הינך חלק  בלתי נפרד מקהילה הולכת וגדלה של אנשים טובים ומסורים, ובזכותך אנחנו מביאים את השינוי למען כדור הארץ, בעלי החיים והדורות הבאים.'))
        mails.push(_createMail('draft', 'AliExpress', 'hello how are you? im gonna talk and talk and talk '))
        mails.push(_createMail('draft', 'AliExpress', 'hello how are you? im gonna talk and talk and talk '))
        mails.push(_createMail('sent', 'Lime Receipts', 'Thank you for riding with Lime'))
        mails.push(_createMail('inbox', 'Steam', 'Tom Clancys Rainbow Six Siege is the latest installment of the acclaimed first-person shooter franchise developed by the renowned Ubisoft Montreal studio'))
        mails.push(_createMail('inbox', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount!'))
        mails.push(_createMail('sent', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount!'))
        mails.push(_createMail('inbox', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount!'))
        mails.push(_createMail('draft', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount!'))
        mails.push(_createMail('inbox', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount!'))
        mails.push(_createMail('inbox', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount!'))
        mails.push(_createMail('inbox', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount!'))
        mails.push(_createMail('inbox', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount!'))
        mails.push(_createMail('inbox', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount!'))
        mails.push(_createMail('inbox', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount!'))
        mails.push(_createMail('inbox', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount!'))
        mails.push(_createMail('inbox', 'AliExpress', 'hello how are you? we want to offer you our new deels! come check it out with 5% discount!'))

        utilService.saveToStorage(EMAIL_KEY, mails)
    }
}

function _createMail(status, subject, body) {
    const mail = getEmptyMail(subject, body)
    mail.isRead = (Math.random() > 0.5) ? false : true
    mail.isStarred = (Math.random() > 0.5) ? false : true
    mail.status = status
    mail.id = utilService.makeId()
    return mail
}


function getDefaultFilter() {
    const criteria = {
        status: 'inbox',
        subject: '',
        txt: '',
        isRead: '',
        isStarred: '',
        lables: []
    }

    return criteria
}


