document.addEventListener("DOMContentLoaded", () => {

    const pages = document.querySelectorAll(".right");
    const book = document.querySelector(".book-section .container");
    const bookSection = document.querySelector(".book-section");

    let currentPage = 0;

   
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
       
        if (currentPage <= 1 || isFlipping) return;

        isFlipping = true;

        currentPage--;
        const page = pages[currentPage];

        page.style.zIndex = pages.length + 10;
        page.classList.remove("flip");

        page.addEventListener('transitionend', function handler(e) {
            if (e.propertyName !== 'transform') return;

            page.style.zIndex = pages.length - currentPage;
            isFlipping = false;

            page.removeEventListener('transitionend', handler);
        });
    }

  
    pages[0].classList.add("flip");
    currentPage = 1;

    book.addEventListener("wheel", (e) => {
        e.preventDefault();

        if (e.deltaY > 0) {
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

