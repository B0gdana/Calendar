let container = document.getElementById('container');
let tableContainer = document.createElement('div');
const previos = document.createElement('button');
const next = document.createElement('button');
const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
previos.appendChild(document.createTextNode('<'));
next.appendChild(document.createTextNode('>'));
container.appendChild(previos);
container.appendChild(next);
container.appendChild(tableContainer);
previos.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);
container.setAttribute('class', 'container');
previos.setAttribute('class', 'controls previos');
next.setAttribute('class', 'controls next');

function prevMonth() {
  tableContainer.innerHTML = "";
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(createCalendar(), currentMonth, currentYear);
}

function nextMonth() {
  tableContainer.innerHTML = "";
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(createCalendar(), currentMonth, currentYear);
}

function createCalendar() {
  const table = document.createElement('table');
  table.setAttribute('class', 'table');

  function createTableCaption() {
    let caption = document.createElement('caption');
    caption.setAttribute('class', 'heading');
    return caption;
  }

  function createTableHead() {
    const tableHead = document.createElement('thead');
    let week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const row = document.createElement('tr');
    for(let i = 0; i < week.length; i++) {
      let cell = document.createElement('th');
      let day = document.createTextNode(week[i]);
      cell.appendChild(day);
      row.appendChild(cell);
      cell.setAttribute('class', 'cell table-head');
    }
    tableHead.appendChild(row);
    return tableHead;
  }

  function createTableBody() {
    const tableBody = document.createElement('tbody');
    for(let i = 0; i < 5; i++) {
      const row = document.createElement('tr');
      for(let j = 0; j < 7; j++) {
        let cell = document.createElement('td');
        row.appendChild(cell);
        cell.setAttribute('class', 'cell table-data');
      }
      tableBody.appendChild(row);
    }
    return tableBody;
  }
  table.appendChild(createTableCaption());
  table.appendChild(createTableHead());
  table.appendChild(createTableBody());
  tableContainer.appendChild(table);
  return table;
}

function daysInMonth(month, year) {
  return 32 - new Date(year, month, 32).getDate();
}

function showCalendar(table, month, year) {
  const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let day = 1;
  let isNextMonth = false;
  let firstDay = new Date(currentYear, currentMonth, 1).getDay();
  table.caption.innerHTML = `${monthsArr[month]} ${year}`;
  for(let i = 1; i < 6; i++) {
    table.rows[i].cells[0].setAttribute('class', 'cell weekend');
    for(let j = firstDay; j < 7; j++) {
      if(firstDay !== 0) {
        let lastPrevious = daysInMonth(currentMonth - 1, currentYear);
        for(let l = firstDay - 1; l >= 0; l--) {
          table.rows[i].cells[l].innerHTML = lastPrevious;
          table.rows[i].cells[l].setAttribute('class', 'cell shaded');
          lastPrevious--;
        }
      }
      if(day <= daysInMonth(currentMonth, currentYear)) {
        if(day === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear()) {
          table.rows[i].cells[j].innerHTML = `${day} <span class="today-text">today</span>`;
          table.rows[i].cells[j].setAttribute('class', 'cell today');
        } else {
          table.rows[i].cells[j].innerHTML = day;
          if(isNextMonth) {
            table.rows[i].cells[j].setAttribute('class', 'cell shaded');
          }
        }
        firstDay = 0;
        day++;
      } else {
        day = 1;
        isNextMonth = true;
        j--;
      }
    }
  }
}
showCalendar(createCalendar(), currentMonth, currentYear);