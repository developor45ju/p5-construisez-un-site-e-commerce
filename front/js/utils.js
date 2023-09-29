export const createNotification = (messageToDisplay, state) => {
    const status = state === true ? 'message-notification-succes' : 'message-notification-error';
    document.body.insertAdjacentHTML('afterbegin', `
            <div id="${status}">
                <p><b>${messageToDisplay}</b></p>
            </div>
        `)
    const notificationAddKanap = document.getElementById(status);
    setTimeout(() => notificationAddKanap.remove(), 3000);
}
