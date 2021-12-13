let monthDiv = document.querySelector("#month");
let yearDiv = document.querySelector("#year");
let weekDaysTr = document.querySelector("#weekDays");
let tbody = document.querySelector("tbody");
let daysLables = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
let monthsLabels = ['Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function generateCalendar(month, year) {
    let now = new Date();

    this.month = (isNaN(month) || month == null) ? now.getMonth() + 1 : month;
    this.year = (isNaN(year) || year == null) ? now.getFullYear() : year;

    let logicalMonth = this.month - 1;

    let firstDay = new Date(this.year, logicalMonth, 1);
    let firstDayWeekday = firstDay.getDay() == 0 ? 7 : firstDay.getDay();

    let monthLength = new Date(this.year, this.month, 0).getDate();
    let previousMonthLength = new Date(this.year, logicalMonth, 0).getDate();

    monthDiv.innerHTML = monthsLabels[logicalMonth];
    yearDiv.innerHTML = this.year;

    generateDaysTitles();

    let day = 1
    let prev = 1
    let next = 1;

    for (let i = 0; i < 9; i++) {
        let weekTr = document.createElement("tr");
        weekTr.className = "week";

        let dayTd;

        for (let dayNumber = 1; dayNumber <= 7; dayNumber++) {
            if (day <= monthLength && (i > 0 || dayNumber >= firstDayWeekday)) {
                dayTd = generateDayTd(day, "day");
                day++;
            } else if (day <= monthLength) {
                let html = previousMonthLength - firstDayWeekday + prev + 1;
                dayTd = generateDayTd(html, "day otherMonth");
                prev++;
            } else {
                dayTd = generateDayTd(next, "day otherMonth");
                next++;
            }

            if (dayNumber == 7 && !dayTd.className.includes("otherMonth")){
                dayTd.classList.add("holiday");
            }

            weekTr.appendChild(dayTd);
        }

        tbody.appendChild(weekTr);

        if (day > monthLength) {
            break;
        }
    }
}

function generateDaysTitles() {
    for (let i = 0; i <= 6; i++) {
        let dayTh = document.createElement("th");
        dayTh.innerHTML = daysLables[i];
        weekDaysTr.appendChild(dayTh);
    }
}

function generateDayTd(html, className) {
    let dayTd = document.createElement("td");

    dayTd.className = className;
    dayTd.innerHTML = html;

    return dayTd;
}

generateCalendar(1, 2022);