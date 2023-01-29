export const formatDate = (dateInput: string) => {
    const date = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    return date.format(new Date(dateInput))
}
