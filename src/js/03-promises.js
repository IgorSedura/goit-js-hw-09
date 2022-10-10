import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let totalDelay = Number(delay.value) - Number(step.value);
  for (let i = 0; i < amount.value; i += 1) {
    const position = i + 1;
    totalDelay = totalDelay + Number(step.value);
    createPromise(position, totalDelay);
  }
}

function createPromise(position, totalDelay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, totalDelay });
      } else {
        reject({ position, totalDelay });
      }
    }, totalDelay);
  });
  promise
    .then(({ position, totalDelay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${totalDelay}ms`, {
        timeout: 4000,
      });
    })
    .catch(({ position, totalDelay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${totalDelay}ms`, {
        timeout: 4000,
      });
    });
}
