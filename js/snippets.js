const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const overlay = document.getElementById('overlay');

const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible d-flex align-items-center" role="alert">`,
      `   <img src="https://static.wixstatic.com/media/128120_a9c1b9bff62243c0a23a4017091ea603~mv2.png/v1/fit/w_189,h_89,q_90/128120_a9c1b9bff62243c0a23a4017091ea603~mv2.webp" alt="Logo" class="img-fluid" style="">`,
      `   <img src="https://static.wixstatic.com/media/128120_47458d3941a04bad89f9ccd361903bc0~mv2.png/v1/fit/w_189,h_89,q_90/128120_47458d3941a04bad89f9ccd361903bc0~mv2.webp" alt="Logo" class="img-fluid" style="">`,
      `   <img src="https://static.wixstatic.com/media/128120_8183ffa8ae684ea58780b6499d755723~mv2.png/v1/fit/w_189,h_89,q_90/128120_8183ffa8ae684ea58780b6499d755723~mv2.webp" alt="Logo" class="img-fluid" style="">`,
      `   <img src="https://static.wixstatic.com/media/128120_a668d3764c35492898f4fbe32eebdfea~mv2.png/v1/fit/w_160,h_89,q_90/128120_a668d3764c35492898f4fbe32eebdfea~mv2.webp" alt="Logo" class="img-fluid" style="">`,
      `   <img src="https://static.wixstatic.com/media/128120_a45913d1fd394455b89476eb2e0044f9~mv2.png/v1/fit/w_189,h_89,q_90/128120_a45913d1fd394455b89476eb2e0044f9~mv2.webp" alt="Logo" class="img-fluid" style="">`,
      `   <img src="https://static.wixstatic.com/media/128120_aa565b1fd1b640639935688df772d441~mv2.png/v1/fit/w_189,h_89,q_90/128120_aa565b1fd1b640639935688df772d441~mv2.webp" alt="Logo" class="img-fluid" style="">`,
      `   <img src="https://static.wixstatic.com/media/128120_cf29e4c75f0b4b85a925aa33658edcb4~mv2.png/v1/fit/w_189,h_89,q_90/128120_cf29e4c75f0b4b85a925aa33658edcb4~mv2.webp" alt="Logo" class="img-fluid" style="">`,
      `   <img src="https://static.wixstatic.com/media/128120_f12f2ed88b1a479a85cad9885292f523~mv2.png/v1/fit/w_189,h_89,q_90/128120_f12f2ed88b1a479a85cad9885292f523~mv2.webp" alt="Logo" class="img-fluid" style="">`,
      `   <img src="https://static.wixstatic.com/media/128120_3b70bca7be784ef98e1b0fcb85014289~mv2.png/v1/fit/w_189,h_89,q_90/128120_3b70bca7be784ef98e1b0fcb85014289~mv2.webp" alt="Logo" class="img-fluid" style="">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');

  alertPlaceholder.append(wrapper);

  overlay.style.display = 'block';
};

const alertTrigger = document.getElementById('liveAlertBtn');
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert("");
  });
}

document.addEventListener('click', (e) => {
  if (e.target && e.target.matches('.btn-close')) {
    overlay.style.display = 'none';
  }
});

const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
});
hiddenElements.forEach(el => observer.observe(el));



const startCounters = () => {
  const counters = document.querySelectorAll('.contador');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let currentValue = 0;
    const increment = Math.ceil(target / 100);
    const updateCounter = () => {
      if (currentValue < target) {
        currentValue += increment;
        counter.textContent = currentValue > target ? target : currentValue;
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };
    updateCounter();
  });
};
document.addEventListener('DOMContentLoaded', startCounters);

const observerOptions = {
  threshold: 0.25,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.contador');
      counters.forEach((counter) => startCounters(counter));
      observer.unobserve(entry.target);
    }
  });
};

const observer2 = new IntersectionObserver(observerCallback, observerOptions);

const section = document.querySelector('.sectionCounters');
observer2.observe(section);
