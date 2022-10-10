import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  timer: document.querySelector('.timer'),
  span: document.querySelectorAll('.value'),
  btnStartTimer: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const timerRef = document.querySelector('timer');
refs.btnStartTimer.addEventListener('click', onHandleClick);

const date = new Date();
refs.btnStartTimer.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateSelected = selectedDates[0].getTime();

    if (dateSelected > date) {
      refs.btnStartTimer.disabled = false;
    } else {
      refs.btnStartTimer.disabled = true;
      Notify.failure(
        'Вибраний час вже в минулому. Введіть дату з майбутнього!'
      );
    }
  },
};
const setData = flatpickr(refs.input, options);
const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const deltaTime = dateSelected - Date.now();
      const data = convertMs(deltaTime);
      Object.entries(data).forEach(([name, value]) => {
        refs[name].textContent = addLeadingZero(value);
      });
      if (deltaTime <= 1000) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
};

function onHandleClick() {
  timer.start();
  Notify.success('Відлік почався!');
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
