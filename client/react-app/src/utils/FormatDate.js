const monthNames = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
};

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

export function formatDuration(startDateTimeString, endDateTimeString) {
    // Parse start date-time
    const startDate = new Date(startDateTimeString);
    const startYear = startDate.getFullYear();
    const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
    const startDay = String(startDate.getDate()).padStart(2, '0');
    const startHours = String(startDate.getHours()).padStart(2, '0');
    const startMinutes = String(startDate.getMinutes()).padStart(2, '0');

    // Parse end date-time
    const endDate = new Date(endDateTimeString);
    const endHours = String(endDate.getHours()).padStart(2, '0');
    const endMinutes = String(endDate.getMinutes()).padStart(2, '0');

    // Get timezone offset in minutes
    const timezoneOffset = startDate.getTimezoneOffset();

    // Determine the sign of the timezone offset
    const timezoneSign = timezoneOffset > 0 ? '-' : '+';

    // Convert the timezone offset to positive value
    const timezoneOffsetPositive = Math.abs(timezoneOffset);

    // Convert timezone offset to hours and minutes
    const timezoneHours = String(Math.floor(timezoneOffsetPositive / 60)).padStart(2, '0');
    const timezoneMinutes = String(timezoneOffsetPositive % 60).padStart(2, '0');

    // Get the month name for the start date
    const startMonthName = monthNames[startMonth];

    // Return the formatted string
    return `${startDay} ${startMonthName} ${startYear} ${startHours}:${startMinutes} -
     ${endHours}:${endMinutes}`;
}