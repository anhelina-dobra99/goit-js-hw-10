import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
    if (userSelectedDate && userSelectedDate < new Date()) {
       iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
      });
      document.querySelector(".start-btn").disabled = true;
    } else {
      document.querySelector(".start-btn").disabled = false;
    }  
  },
};

flatpickr("#datetime-picker", options);

document.querySelector(".start-btn").addEventListener("click", function() {
  if (userSelectedDate && userSelectedDate > new Date()) {
      startTimer(userSelectedDate);
      document.querySelector(".start-btn").disabled = true;
      document.querySelector("#datetime-picker").disabled = true;
  }
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimer(targetDate) {
  const timerInterval = setInterval(() => {
    const currentTime = new Date();
    const remainingTime = targetDate - currentTime;

    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        document.querySelector("[data-days]").textContent = "00";
        document.querySelector("[data-hours]").textContent = "00";
        document.querySelector("[data-minutes]").textContent = "00";
        document.querySelector("[data-seconds]").textContent = "00";
        iziToast.success({
            title: "Finished",
            message: "The countdown has finished!",
            position: "topRight",
      });
        document.querySelector("#datetime-picker").disabled = false;

    } else {
      const { days, hours, minutes, seconds } = convertMs(remainingTime);

      document.querySelector("[data-days]").textContent = addLeadingZero(days);
      document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
      document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
      document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
    }
  }, 1000); 
}
