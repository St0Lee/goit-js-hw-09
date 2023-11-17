import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePickr = document.getElementById("datetime-picker");
const startBtn = document.querySelector("[data-start]");
const dateDays = document.querySelector("[data-days]");
const dateHours = document.querySelector("[data-hours]");
const dateMinutes = document.querySelector("[data-minutes]");
const dateSeconds = document.querySelector("[data-seconds]");
startBtn.disabled = true;
let countdownInterval;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if(selectedDate < new Date()) {
        window.alert("Please choose a date in the future")
        startBtn.disabled = true;
        return;
      }
      startBtn.disabled = false;
    },
  };

  flatpickr(dateTimePickr, options)

  startBtn.addEventListener("click", startCountdown)

  function startCountdown() {
    const selectedDate = new Date(dateTimePickr.value);
    const currentDate = new Date();
    let timeLeft = selectedDate - currentDate;
    countdownInterval = setInterval(countdownTime, 1000);
    function countdownTime() {
      if (timeLeft <= 0) {
        clearInterval(countdownInterval)
      }
      else {
        updateCounter(timeLeft);
        timeLeft -= 1000;
      }
    };
  };

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

  function updateCounter (timeLeft) {
     const { days, hours, minutes, seconds } = convertMs(timeLeft);
     dateDays.textContent = addLeadingZero(days);
     dateHours.textContent = addLeadingZero(hours);
     dateMinutes.textContent = addLeadingZero(minutes);
     dateSeconds.textContent = addLeadingZero(seconds);
  };
