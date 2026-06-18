// For each spread (pages[i-1].back = left, pages[i].front = right), load both SVGs,
// compute the largest cover-scale between the two, then apply it to both so they
// always share the same scale. Overflow is clipped at the outer edge by CSS.
async function normalizeSpreadSizes(panelW, panelH) {
    const pages = [...document.querySelectorAll('.right')];

    function getBgUrl(fig) {
        const val = window.getComputedStyle(fig).backgroundImage;
        if (!val || val === 'none') return null;
        const m = val.match(/url\(["']?(.*?)["']?\)/);
        return m ? m[1] : null;
    }

    function loadDims(url) {
        return new Promise(res => {
            const img = new Image();
            img.onload = () => res(img.naturalWidth > 0 ? { w: img.naturalWidth, h: img.naturalHeight } : null);
            img.onerror = () => res(null);
            img.src = url;
        });
    }

    function coverScale(imgW, imgH) {
        return Math.max(panelW / imgW, panelH / imgH);
    }

    for (let i = 1; i < pages.length; i++) {
        const rightFig = pages[i].querySelector('figure.front');
        const leftFig  = pages[i - 1].querySelector('figure.back');
        if (!rightFig || !leftFig) continue;

        const rUrl = getBgUrl(rightFig);
        const lUrl = getBgUrl(leftFig);
        if (!rUrl || !lUrl) continue;

        const [rDims, lDims] = await Promise.all([loadDims(rUrl), loadDims(lUrl)]);
        if (!rDims || !lDims) continue;

        const scale = Math.max(coverScale(rDims.w, rDims.h), coverScale(lDims.w, lDims.h));

        rightFig.style.backgroundSize = `${Math.round(rDims.w * scale)}px ${Math.round(rDims.h * scale)}px`;
        leftFig.style.backgroundSize  = `${Math.round(lDims.w * scale)}px ${Math.round(lDims.h * scale)}px`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".right");
    const book = document.querySelector(".book-section .container");

    let currentPage = 0;
    let isFlipping = false;

    // Initialize z-index: last page at the bottom
    pages.forEach((page, i) => {
        page.style.zIndex = pages.length - i;
    });

    const panelW = book.clientWidth / 2;
    const panelH = book.clientHeight;
    normalizeSpreadSizes(panelW, panelH);

    function flipNext() {
        if (currentPage >= pages.length || isFlipping) return;

        isFlipping = true;
        const page = pages[currentPage];

        // Move the flipping page to the top
        page.style.zIndex = pages.length + 10;
        page.classList.add("flip");

        currentPage++;

        page.addEventListener('transitionend', function handler(e) {
            if (e.propertyName !== 'transform') return;

            // Reorder all pages so the flipped ones are below the next page
            pages.forEach((p, idx) => {
                if (idx < currentPage) {
                    p.style.zIndex = pages.length - currentPage + idx; // flipped pages go below
                } else {
                    p.style.zIndex = pages.length - idx; // remaining pages
                }
            });

            isFlipping = false;
            page.removeEventListener('transitionend', handler);
        });
    }

    function flipPrev() {
        if (currentPage <= 0 || isFlipping) return;

        isFlipping = true;
        currentPage--;
        const page = pages[currentPage];

        // Move the page temporarily on top to flip back
        page.style.zIndex = pages.length + 10;
        page.classList.remove("flip");

        page.addEventListener('transitionend', function handler(e) {
            if (e.propertyName !== 'transform') return;

            // Reorder pages z-index after flipping back
            pages.forEach((p, idx) => {
                if (idx < currentPage) {
                    p.style.zIndex = pages.length - currentPage + idx;
                } else {
                    p.style.zIndex = pages.length - idx;
                }
            });

            isFlipping = false;
            page.removeEventListener('transitionend', handler);
        });
    }

    // Optional: start with first page flipped
    // pages[0].classList.add("flip");
    // currentPage = 1;

    // Flip on scroll
    book.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            flipNext();
        } else {
            flipPrev();
        }
    }, { passive: false });
});