export function getDaysWeekForecast(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', ' Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];
    const now = new Date(date)
    const dayPerWeek = days[now.getDay()]
    const month = months[now.getMonth()]
    const day = now.getDate()
    return `${dayPerWeek}, ${day} ${month}`
}