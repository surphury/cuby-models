/* All HTMLElements have a "$" at the beginning */
(() => {
    const path = '/data';
    'use strict';
    const $form = document.getElementById('form');

    const getData = async () => {
        const data = await (await fetch(path)).json();
        fillInputs(data);
    }

    const fillInputs = (data) => {
        const { headerAnchors, YTlinks } = data;
        headerAnchors.links.forEach((link, index) => {
            $form.querySelectorAll('.form__links > .form__input')[index].value = link;
        });

        headerAnchors.texts.forEach((text, index) => {
            $form.querySelectorAll('.form__texts > .form__input')[index].value = text;
        });

        YTlinks.forEach((link, index) => {
            $form.querySelectorAll('.form__yt-links > .form__input')[index].value = link;
        });
    }

    $form.addEventListener('submit', (event) => {
        event.preventDefault();

        let links = []
        $form.querySelectorAll('.form__links > .form__input').forEach(($input) => {
            if (!!$input.value.trim())
                links.push($input.value.trim());
        });

        let texts = []
        $form.querySelectorAll('.form__texts > .form__input').forEach(($input) => {
            if (!!$input.value.trim())
                texts.push($input.value.trim());
        });

        let YTlinks = [];
        $form.querySelectorAll('.form__yt-links > .form__input').forEach(($input) => {
            if (!!$input.value.trim())
                YTlinks.push($input.value.trim());
        });

        const datatoPost = {
            headerAnchors: {
                links,
                texts
            },
            YTlinks
        }
        const $submitButton = document.getElementById('submitButton');

        const buttonText = $submitButton.textContent;

        $submitButton.textContent = 'Subiendo...';
        $submitButton.setAttribute('disabled', '');

        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datatoPost)
        }).then(res => {
            alert((res.status === 201) ? '¡Subido!' : 'Algo salió mal');
            $submitButton.textContent = buttonText;
            $submitButton.removeAttribute('disabled');
        })
    });
    getData();
})();