import axios from 'axios';
import commonUrl from '../config';
import noAuth from './noAuth';
const requestByPost = (url, data,successCallback) => {
    axios.post(`${commonUrl}/${url}`, data)
        .then(res => {
           // noAuth.noAuthCode(res.data);
            if (typeof successCallback === "function") {
                successCallback(res);
            }
        })
};

export {
    requestByPost
}