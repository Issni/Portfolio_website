(function () {
    // ── Cursor ──
    const bigBall   = document.querySelector('.cursor__ball--big');
    const smallBall = document.querySelector('.cursor__ball--small');

    if (bigBall) {
        document.body.addEventListener('mousemove', (e) => {
            gsap.to(bigBall,   { duration: 0.4, x: e.clientX - 15, y: e.clientY - 15 });
            gsap.to(smallBall, { duration: 0.1, x: e.clientX - 5,  y: e.clientY - 5  });
        });
    }

    // ── Lightbox ──
    const lightbox  = document.getElementById('lightbox');
    const lbImg     = document.getElementById('lightbox-img');
    const lbCounter = document.getElementById('lightbox-counter');
    const lbClose   = document.getElementById('lightbox-close');

    const images = [...document.querySelectorAll('.art-item img')];
    let current       = 0;
    let transitioning = false;

    function openLightbox(index) {
        current = index;
        lbImg.src = images[current].src;
        lbImg.alt = images[current].alt;
        updateCounter();
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    function goTo(index, dir) {
        if (transitioning) return;
        transitioning = true;

        const exitClass  = dir >= 0 ? 'exit-left'   : 'exit-right';
        const enterClass = dir >= 0 ? 'enter-right'  : 'enter-left';

        lbImg.classList.add(exitClass);

        setTimeout(() => {
            lbImg.classList.remove(exitClass);
            current = ((index % images.length) + images.length) % images.length;
            lbImg.src = images[current].src;
            lbImg.alt = images[current].alt;
            updateCounter();
            lbImg.classList.add(enterClass);
            lbImg.addEventListener('animationend', () => {
                lbImg.classList.remove(enterClass);
                transitioning = false;
            }, { once: true });
        }, 150);
    }

    function updateCounter() {
        lbCounter.textContent = `${current + 1} / ${images.length}`;
    }

    // Open on image click
    images.forEach((img, i) => {
        img.closest('.art-item').addEventListener('click', () => openLightbox(i));
    });

    // Close on × button or backdrop click
    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    // Scroll wheel navigates images
    lightbox.addEventListener('wheel', (e) => {
        e.preventDefault();
        const dir = e.deltaY > 0 ? 1 : -1;
        goTo(current + dir, dir);
    }, { passive: false });

    // Keyboard: Escape closes, arrows navigate
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape')                               closeLightbox();
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  goTo(current + 1,  1);
        if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    goTo(current - 1, -1);
    });

    // Big ball scales up on art items
    if (bigBall) {
        images.forEach(img => {
            img.closest('.art-item').addEventListener('mouseenter', () => gsap.to(bigBall, { duration: 0.3, scale: 2.5 }));
            img.closest('.art-item').addEventListener('mouseleave', () => gsap.to(bigBall, { duration: 0.3, scale: 1   }));
        });
    }
})();
