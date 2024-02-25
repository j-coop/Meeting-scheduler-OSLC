

// Function to pad numbers with leading zeros
export function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

// Function to format date-time into ISO-8601 format with timezone
export function formatDateTime(dateTime) {
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

// Function to format ISO-8601 format with timezone to neat string to display
export function formatISO8601(dateTimeString) {
    // Split the date-time string into its components
    const [datePart, timePart] = dateTimeString.split('T');
    const [year, month, day] = datePart.split('-');
    const [time, timezone] = timePart.split(/([-+]\d+:\d+|Z)$/);

    // Format the date and time parts
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = time.slice(0, 5); // Extract hours and minutes only

    // Format the timezone
    let formattedTimezone = 'UTC';
    if (timezone !== 'Z') {
        const [_, sign, hoursOffset, minutesOffset] = timezone.match(/([-+])(\d+):?(\d+)?/);
        formattedTimezone = `${sign}${hoursOffset.padStart(2, '0')}:${(minutesOffset || '00').padStart(2, '0')}`;
    }

    // Construct the final formatted string
    return `${formattedDate} ${formattedTime} ${formattedTimezone}`;
}