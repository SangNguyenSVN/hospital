// DayTime.js
import moment from "moment";

export function getDays() {
    const dayNumber = 7;
    const dayOfWeek = [];
    for (let i = 1; i < dayNumber; i++) {
        const date = moment().add(i, 'days');
        dayOfWeek.push({
            date: date,
            day: date.format('ddd'),
            formattedDate: date.format('Do MMM')
        });
    }
    return dayOfWeek;
};

export function getTimes() {
    const startTime = 7;
    const endTime = 18;
    const hourOfDay = [];
    for (let i = startTime; i < endTime; i++) {
        if (i < 12) {
            hourOfDay.push({
                time: i + ":00 A.M"
            })
            hourOfDay.push({
                time: i + ":30 A.M"
            })
        } else {
            hourOfDay.push({
                time: i + ":00 P.M"
            })
            hourOfDay.push({
                time: i + ":30 P.M"
            })
        }
    }
    return hourOfDay;
}

export function formatTime(time: string): string {
    // Split the time string by the colon
    const [hours, minutes] = time.split(':');

    // Return the formatted time
    return `${hours}:${minutes}`;
}
