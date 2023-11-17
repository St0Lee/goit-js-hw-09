import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', submitParameters)

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function submitParameters(event) {
  event.preventDefault();

  const delay = parseInt(form.elements.delay.value); // parsing it since everything in the form is a string
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  let delayValue = delay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayValue).then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delayValue += step;
  }
};



