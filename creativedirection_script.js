document.addEventListener("DOMContentLoaded", () => {

                const swiper = new Swiper('.swiper', { //new swiper
                    loop: true, //adds the abillity to move forward to go to first img
                    centeredSlides: true,
                    slidesPerView: 'auto', //use slide css
                    spaceBetween: 0,
                    speed: 600,
                    watchSlidesProgress: true, 
                    centeredSlidesBounds: false, // sometimes centered slides dont reach box edge, this allows image to reach edge
                    slideToClickedSlide: true, //click on side navs it
                    navigation: { //allows nav with arrow buttons
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    pagination: { //the little cirlces defining which page you are on
                        el: '.swiper-pagination', //render the dots
                        clickable: true, //can click on the dots to nav the slides
                        // dynamicBullets: true,
                        renderBullet: function(index, className) { //makes sure the duped slides from loop true and my extra slidess dont show up as dots. 
                            //iff index is 5 and above then do nothing = no extra dots
                            if (index >= 5) return '';
                            return '<span class="' + className + '"></span>';
                        },
                    },
                });

        swiper.slideToLoop(0, 0); //makes sure the swiper loads on the right first img
          
});