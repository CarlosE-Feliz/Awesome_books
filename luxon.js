/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const { DateTime } = luxon;

setInterval(() => { document.getElementById('render-date').innerHTML = `${DateTime.now().toLocaleString(DateTime.DATETIME_MED)}`; }, 1000);
