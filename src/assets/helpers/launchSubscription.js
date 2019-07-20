export const launchSubscription = () => {
    setTimeout(() => {
        const button = document.getElementById('subscribeButton');
        const event = new Event('click', {bubles: true});
        button.dispatchEvent(event);
    }, 5000)
}