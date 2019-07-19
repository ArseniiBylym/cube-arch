import axios from 'axios';

export const notifications = {
    send: async(message) => {
        return axios(`${process.env.REACT_APP_SLACK_URL}${process.env.REACT_APP_SLACK_AUTH_TOKEN}`, {
            method: 'post',
            data: JSON.stringify({text: message}),
        })
    }
}