
const hoverBoxes = document.querySelectorAll('.hover');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show'); // slide in when visible
      } else {
        entry.target.classList.remove('show'); // slide out when not visible
      }
    });
  },
  {
    threshold: 0.5 // trigger when 50% element visible
  }
);

hoverBoxes.forEach(box => observer.observe(box));