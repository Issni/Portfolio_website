(function () {
    const bigBall   = document.querySelector('.cursor__ball--big');
    const smallBall = document.querySelector('.cursor__ball--small');
    if (!bigBall) return;
    document.body.addEventListener('mousemove', (e) => {
        gsap.to(bigBall,   { duration: 0.4, x: e.clientX - 15, y: e.clientY - 15 });
        gsap.to(smallBall, { duration: 0.1, x: e.clientX - 5,  y: e.clientY - 5  });
    });
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(bigBall, { duration: 0.3, scale: 3 }));
        el.addEventListener('mouseleave', () => gsap.to(bigBall, { duration: 0.3, scale: 1 }));
    });
})();
