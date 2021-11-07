(() => {
'use strict';
const $carousel = document.getElementById('carousel');
const $carouselImages = $carousel.querySelector('.carousel__images');
const imagesLength = $carouselImages.childElementCount;
let counter = 0;

const slide = (next = true) => {
    if (next && counter < imagesLength - 1)
        counter++;
    else if (!next && counter > 0)
        counter--;

    $carouselImages.style.setProperty('--counter', counter);
}

$carousel.addEventListener('click', (e) => {
    const $E = e.target;
    if ($E.classList.contains('carousel__btn--right'))
        slide()
    else if ($E.classList.contains('carousel__btn--left'))
        slide(false);
})
})();