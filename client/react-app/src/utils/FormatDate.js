

// Function to pad numbers with leading zeros
function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

// Function to format date-time into ISO-8601 format with timezone
function formatDateTime(dateTime) {
    const year = dateTime.getFullYear();
    const month = pad(dateTime.getMonth() + 1);
    const day = pad(dateTime.getDate());
    const hours = pad(dateTime.getHours());
    const minutes = pad(dateTime.getMinutes());
    const seconds = pad(dateTime.getSeconds());
    const milliseconds = pad(dateTime.getMilliseconds());
    const offsetMinutes = dateTime.getTimezoneOffset();

    const offsetHours = Math.abs(Math.trunc(offsetMinutes / 60));
    const offsetMinutesAbs = Math.abs(offsetMinutes % 60);
    const offsetSign = offsetMinutes <= 0 ? '+' : '-';

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${offsetSign}${pad(offsetHours)}:${pad(offsetMinutesAbs)}`;
}