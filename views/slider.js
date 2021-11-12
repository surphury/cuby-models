/* All HTMLElements have a "$" at the beginning */
(() => {
    'use strict';
    const path = '/data';
    const $carousel = document.getElementById('carousel'),
        $carouselImages = $carousel.querySelector('.carousel__images'),
        $rightButton = $carousel.querySelector('.carousel__btn--right'),
        $leftButton = $carousel.querySelector('.carousel__btn--left');

    const getData = async () => {
        const data = await (await fetch(path)).json();
        renderSlider(data.YTlinks);
        renderButtons(data.headerAnchors);
    }

    const renderSlider = (links) => {
        let elements = '';

        for (const videoLink of links) {
            const iframeLink = videoLink.substring(videoLink.indexOf('watch?v=') + 8);
            elements += `<iframe class="carousel__content" src="https://www.youtube.com/embed/${iframeLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
        $carouselImages.innerHTML += elements;
        $carousel.slide = slide();
    }

    const renderButtons = ({ links, texts }) => {
        document.querySelectorAll('.header__link:not(.header__link--icon)').forEach(($anchor, index) => {
            $anchor.textContent = texts[index];
            $anchor.setAttribute('href',links[index]);
        })
    }

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

    $rightButton.addEventListener('click', () => $carousel.slide(true));
    $leftButton.addEventListener('click', () => $carousel.slide());

    getData();


})();