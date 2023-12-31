export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
}

export const setAccessToken = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
}

export const deleteAccessToken = () => {
    localStorage.removeItem('accessToken');
}
