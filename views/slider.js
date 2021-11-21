/* All HTMLElements have a "$" at the beginning */
(() => {
    'use strict';
    const $carousel = document.getElementById('carousel'),
        $carouselImages = $carousel.querySelector('.carousel__images'),
        $rightButton = $carousel.querySelector('.carousel__btn--right'),
        $leftButton = $carousel.querySelector('.carousel__btn--left');

    const slide = () => {
        let counter = 1;
        const imagesLength = $carouselImages.childElementCount;

        return (next = false) => {
            if (next && counter < imagesLength)
                counter++;
            else if (!next && counter > 1)
                counter--;

            $carouselImages.style.setProperty('--counter', counter);
        }
    }

    $carousel.slide = slide();
    $rightButton.addEventListener('click', () => $carousel.slide(true));
    $leftButton.addEventListener('click', () => $carousel.slide());
})();