let pages = document.getElementsByClassName("right");
let currentPage = 0;
let isFlipping = false;
/* figure out which way scroll= page flip feels most natural */
/* maybe book always stays open - takes up the whole space without leaving weird gaps */
function flipNext() {
    if (currentPage < pages.length) {
        pages[currentPage].classList.add("flip");
        pages[currentPage].style.zIndex = pages.length + 1 - currentPage; /* think something wrong here with the page clipping */
        currentPage++;
    }
}

function flipPrev() {
    if (currentPage > 0) {
        currentPage--;
        pages[currentPage].classList.remove("flip");
        pages[currentPage].style.zIndex = pages.length + 1 - currentPage; /* same thing as above but only applys to the bottom layer of each page */
    }
}


window.addEventListener('wheel', (e) => {
    if (isFlipping) return;
    /* if currnet page is = to max page then scroll down and if current page is = to frist page then scroll up 
    (then allow scroll up scroll down)*/
    const delta = e.deltaY; /* y up x down */

    if (delta > 0) {
        isFlipping = true;
        flipNext();
    } else if (delta < 0) {
        isFlipping = true;
        flipPrev();
    }

    setTimeout(() => { isFlipping = false; }, 800);

    e.preventDefault(); /* gotta fix the scroll blocking */
}, { passive: false });

/* i think either the front back are overlapping or theres something weird with the z index */
/* x2 time heig page - after fisrt page inscrase eigh of section - css animation move the content above below up and down*/