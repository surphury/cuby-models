/* All HTMLElements have a "$" at the beginning */
(() => {
    const path = '/admin';
    'use strict';
    const $form = document.getElementById('form');

    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const login = {
            username,
            password
        }

        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        }).then(res => {
            if(res.status === 401)
                alert('Datos no válido')
            else
                location.reload();
        })
    });
})();