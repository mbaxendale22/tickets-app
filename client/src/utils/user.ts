export const getTokenFromLocalStorage = () => {
    return window.localStorage.getItem('token') // get token from local storage
}

export const setTokenInLocalStorage = (token: string) => {
    window.localStorage.setItem('token', token) // set token in local storage
}

export const getPayload = (token: string) => {
    if (!token) {
        return undefined
    } // if no token exists just return here
    const splitToken = token.split('.') // split the token into an array of 3 strings
    if (splitToken.length < 3) {
        return undefined
    } // if the array of strings has a length less than 3 return here
    const payloadString = splitToken[1] // get just the payload string from the array
    return JSON.parse(atob(payloadString)) // decode the payload string, using json.parse to convert from JSON to JS object
}

export const userIsAuthenticated = (token: string) => {
    const payload = getPayload(token) // get payload part of the token by calling get payload function
    if (!payload) {
        return false
    } // if there is no payload returned function returns false
    const now = Math.round(Date.now() / 1000) // get the current time in milliseconds and convert to seconds as this is the format the expiry time on the token is in
    return now < payload.exp // check if the current time is less than the expiry time, returns a boolean
}
