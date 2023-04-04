export function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

export function convertDateToReadableString(dateString) {
    const date = new Date(dateString);
    return capitalize(date.toLocaleDateString('es-ES', { weekday:"long", year:"numeric", month:"short", day:"numeric", timeZone:"UTC"}));
}