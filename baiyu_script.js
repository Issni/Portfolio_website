// is there a way to still trigger the hover animation while scrolling? 
// since right now it only triggers on hover and scrolling dosent count
// Select all hover elements
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
    threshold: 0.5 // trigger when 50% of the element is visible
  }
);

hoverBoxes.forEach(box => observer.observe(box));