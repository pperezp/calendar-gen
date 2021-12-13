let monthDiv = document.querySelector("#month");
let yearDiv = document.querySelector("#year");
let weekDaysTr = document.querySelector("#weekDays");
let tbody = document.querySelector("tbody");

function generateCalendar(month, year) {
    var now = new Date();

    var days_labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        months_labels = ['Enero', 'Febrero', 'Marzo',
            'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
            'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    this.month = (isNaN(month) || month == null) ? now.getMonth() + 1 : month;
    this.year = (isNaN(year) || year == null) ? now.getFullYear() : year;

    var logical_month = this.month - 1;

    var first_day = new Date(this.year, logical_month, 1),
        first_day_weekday = first_day.getDay() == 0 ? 7 : first_day.getDay();

    var month_length = new Date(this.year, this.month, 0).getDate(),
        previous_month_length = new Date(this.year, logical_month, 0).getDate();

    monthDiv.innerHTML = months_labels[logical_month];
    yearDiv.innerHTML = this.year;

    // Generating day titles
    for (var i = 0; i <= 6; i++) {
        let dayTh = document.createElement("th");
        dayTh.innerHTML = days_labels[i];
        weekDaysTr.appendChild(dayTh);
    }

    var day = 1, 
        prev = 1, 
        next = 1;

    
    for (var i = 0; i < 9; i++) {
        let weekTr = document.createElement("tr");
        weekTr.className = "week";

        for (var j = 1; j <= 7; j++) {
            if (day <= month_length && (i > 0 || j >= first_day_weekday)) {
                let dayTd = document.createElement("td");
                dayTd.className = "day";
                dayTd.innerHTML = day;
                weekTr.appendChild(dayTd);
                day++;
            } else if (day <= month_length) {
                let dayTd = document.createElement("td");
                dayTd.className = "day otherMonth";
                dayTd.innerHTML = previous_month_length - first_day_weekday + prev + 1;
                weekTr.appendChild(dayTd);
                prev++;
            } else {
                let dayTd = document.createElement("td");
                dayTd.className = "day otherMonth";
                dayTd.innerHTML = next;
                weekTr.appendChild(dayTd);
                next++;
            }
        }

        tbody.appendChild(weekTr);

        if (day > month_length) {
            break;
        } 
    }
}

generateCalendar(11, 2021);