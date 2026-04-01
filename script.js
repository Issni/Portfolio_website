let pages = document.getElementsByClassName("right");
let currentPage = 0;
let isFlipping = false;

// Lock scroll when book fits screen
function initBookLock() {
    const bookSection = document.querySelector(".book-section");
    const rect = bookSection.getBoundingClientRect();
    if (rect.height <= window.innerHeight) {
        document.body.style.overflow = 'hidden';
    }
}
window.addEventListener('load', initBookLock);
window.addEventListener('resize', initBookLock);

// Flip to next page
function flipNext() {
    if (currentPage < pages.length) {
        pages[currentPage].classList.add("flip");
        pages[currentPage].style.zIndex = pages.length + 1 - currentPage;
        currentPage++;
    }
}

// Flip to previous page
function flipPrev() {
    if (currentPage > 0) {
        currentPage--;
        pages[currentPage].classList.remove("flip");
        pages[currentPage].style.zIndex = pages.length + 1 - currentPage;
    }
}

// Snap-scroll handler
window.addEventListener('wheel', (e) => {
    if (isFlipping) return; // prevent rapid flips

    const delta = e.deltaY;

    if (delta > 0) { // scroll down -> next page
        isFlipping = true;
        flipNext();
    } else if (delta < 0) { // scroll up -> previous page
        isFlipping = true;
        flipPrev();
    }

    setTimeout(() => { isFlipping = false; }, 800); // duration matches CSS transition

    e.preventDefault();
}, { passive: false });

// Optional: allow arrow keys for flipping too
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowDown") flipNext();
    if (e.key === "ArrowUp") flipPrev();
});