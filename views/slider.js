/* All HTMLElements have a "$" at the beginning */
(() => {
    'use strict';
    const $carousel = document.getElementById('carousel'),
        $carouselImages = $carousel.querySelector('.carousel__images'),
        $rightButton = $carousel.querySelector('.carousel__btn--right'),
        $leftButton = $carousel.querySelector('.carousel__btn--left');

    const slide = () => {
        let counter = 0;
        const imagesLength = $carouselImages.childElementCount;

        return (next = false) => {
            if (next && counter < imagesLength - 1)
                counter++;
            else if (!next && counter > 0)
                counter--;

            $carouselImages.style.setProperty('--counter', counter);
        }
    }

    $carousel.slide = slide();
    $rightButton.addEventListener('click', () => $carousel.slide(true));
    $leftButton.addEventListener('click', () => $carousel.slide());
})();