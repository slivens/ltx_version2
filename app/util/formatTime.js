/*
 * @Author: Sliven
 * @Date: 2020-04-29 15:56:35
 * @LastEditors: Sliven
 * @LastEditTime: 2020-04-29 16:05:52
 * @Description: the code is written by Sliven
 * 
 */
const formatDate = (obj, key) => {
    let time=obj && obj[key] ? new Date(obj[key]) : ""
    console.log('@@@@time',time)
    return time
};

export {
    formatDate
}