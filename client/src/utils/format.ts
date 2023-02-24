export const formatDate = (dateInput: string, length: 'short' | 'long') => {
    const date = new Intl.DateTimeFormat('en-GB', {
        year: length === 'short' ? '2-digit' : 'numeric',
        month: length,
        day: 'numeric',
    })
    return date.format(new Date(dateInput))
}

// export const formatDateShort = (dateInput: string) => {
//     const date = new Intl.DateTimeFormat('en-GB', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//     })
//     return date.format(new Date(dateInput))
// }
