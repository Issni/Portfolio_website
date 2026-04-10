document.addEventListener("DOMContentLoaded", () => {

    const pages = document.querySelectorAll(".right");
    const book = document.querySelector(".book-section .container");
    const bookSection = document.querySelector(".book-section");

    let currentPage = 0;

    //page 1 top rest under that
    pages.forEach((page, i) => {
        page.style.zIndex = pages.length - i;
    });

let isFlipping = false;

    function flipNext() {
    if (currentPage >= pages.length - 1 || isFlipping) return;

    isFlipping = true;

    const page = pages[currentPage];
    page.style.zIndex = pages.length + 10;
    page.classList.add("flip");

    currentPage++;

    page.addEventListener('transitionend', function handler() {
        page.style.zIndex = pages.length - currentPage;
        isFlipping = false;
        page.removeEventListener('transitionend', handler);
    });
}

    function flipPrev() {
    if (currentPage <= 0 || isFlipping) return;

    isFlipping = true;

    currentPage--;
    const page = pages[currentPage];

    page.style.zIndex = pages.length + 10;
    page.classList.remove("flip");

    if (currentPage === 0) {
        bookSection.classList.remove("page-open");
    }

    page.addEventListener('transitionend', function handler(e) { // listens to transition in css has transitioned - then continute otherwize wait for transition
        if (e.propertyName !== 'transform') return; // match your CSS

        page.style.zIndex = pages.length - currentPage;
        isFlipping = false;

        page.removeEventListener('transitionend', handler);
    });
}
    
    //setTimeout(() => {
     //   flipNext();
    //}, 100);

    book.addEventListener("wheel", (e) => {
        e.preventDefault();

        if (e.deltaY > 0) { //>0 p down <0 p up
            flipNext();
        } else {
            flipPrev();
        }

    }, { passive: false });

});
// i think either the front back are overlapping or theres something weird with the z index 
// x2 time heig page - after fisrt page inscrase eigh of section - css animation move the content above below up and down
// scrolling too fast causes the order to be messed up, add a slight delay to scroll event? 

/* note 
p1  z-index 4
p2  z-index 3
p3  z-index 2
p4  z-index 1  (Manor Grey)*/

// THE INCRASE ZINDEX BY 10 WILL BREAK IF YOU FLIP PAGE DURING ITS ANIMATION 
// THE INCRASE ZINDEX BY 10 WILL BREAK IF YOU FLIP PAGE DURING ITS ANIMATION 
// ONE POSSIBLE FIX - make the flip animation delay still remain but just make the page flip quicker 

