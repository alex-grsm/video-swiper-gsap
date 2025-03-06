import { gsap } from 'gsap';
import Swiper from 'swiper/bundle';

document.addEventListener('DOMContentLoaded', () => {
    const topLine = document.querySelector('.top-line')
    const video = document.querySelector('.video-background')

    // topLine.classList.add('visible')
    gsap.to(topLine, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.in"
    });

    const swiperSlider = new Swiper('.slider', {
        speed: 1700,
        mousewheel: {},
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
        },
    });

    swiperSlider.on('slideChange', function() {
        gsap.to(video, 1.6, {
            currentTime: (video.duration / (this.slides.length - 1)) * this.realIndex,
            ease: "power2.inOut"
        })
    })
    
    swiperSlider
        .on('slideChangeTransitionStart', function() {
            video.classList.add('change')
        })
        .on('slideChangeTransitionEnd', function() {
            video.classList.remove('change')
        })
});
