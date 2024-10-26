// DayTime.js
import moment from "moment";

export function getDays(dayNumber = 7) {
    const dayOfWeek = [];
    for (let i = 1; i <= dayNumber; i++) {
        const date = moment().add(i, 'days');
        dayOfWeek.push({
            date: date,
            day: date.format('ddd'), // Ngày trong tuần (ví dụ: Mon, Tue)
            formattedDate: date.format('Do MMM') // Định dạng ngày (ví dụ: 1st Jan)
        });
    }
    return dayOfWeek;
};

export function getTimes(startTime = 7, endTime = 18) {
    const hourOfDay = [];
    for (let i = startTime; i <= endTime; i++) {
        hourOfDay.push({
            time: `${i}:00 ${i < 12 ? 'A.M' : 'P.M'}`
        });
        hourOfDay.push({
            time: `${i}:30 ${i < 12 ? 'A.M' : 'P.M'}`
        });
    }
    return hourOfDay;
}


export function formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    // Kiểm tra xem có đủ 2 phần không
    if (hours && minutes) {
        return `${hours}:${minutes}`;
    }
    return 'Invalid time'; // Xử lý trường hợp không hợp lệ
}