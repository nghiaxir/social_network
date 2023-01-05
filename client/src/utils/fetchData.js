import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const getDataAPI = async (url, token) => {
    const res = await api.get(`/api/${url}`, {
        headers: { Authorization: token }
    })
    return res
}

export const postDataAPI = async (url, post, token) => {
    const res = await api.post(`/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res
}

export const putDataAPI = async (url, post, token) => {
    const res = await api.put(`/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res
}

export const patchDataAPI = async (url, post, token) => {
    const res = await api.patch(`/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`/api/${url}`, {
        headers: { Authorization: token }
    })
    return res
}