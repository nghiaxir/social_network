export const GLOBALTYPES = {
    AUTH: "AUTH",
    ALERT: "ALERT",
    THEME: "THEME",
    STATUS: "STATUS",
}

export const EditData = (data, id, post) => {
    const newData = data.map(item =>
        (item._id === id ? post : item))
    return newData;
}

export const DeleteData = (data, id, post) => {
    const newData = data.filter(item => item._id !== id)
    return newData;
}