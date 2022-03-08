'use strict';

const d = document;

const inputEl = d.querySelector("#text");
const formEl = d.forms[0];

d.addEventListener("DOMContentLoaded", function () {
    if (inputEl) {
        // En la entrada de datos, quitamos espacios de izquierda y derecha del string
        inputEl.oninput = function (e) { return this.value.trim(); }
    }
    if (formEl) {
        formEl.onsubmit = function (e) { return init(this, e); }
    }
    if (formEl) {
        formEl.onreset = function (e) {
            d.querySelector('#output').innerText = '';
            inputEl.focus();
        }
    }
});

function escape(el) {
    return entitiesHtml(el.value.trim());
}

function entitiesHtml(string) {
    return String(string).replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function init(el, event) {
    event.preventDefault();
    let error = null;
    let text = null;
    if (inputEl) {
        text = escape(inputEl);
    }
    if (!text.length) {
        error = 'Completa el campo caracteres.'; // carácter
    }
    else if (!/^[a-zA-Z0-9]{1,5}$/.test(text)) {
        error = 'Solo cinco caracteres alfanuméricos son permitidos.';
    }

    if (!error) {
        let result = "";
        const n = text.length;
        for (let i = 0; i < n; i++) {
            const decimal = text[i].charCodeAt(0);
            result += decToBin(decimal);
            if (i < n - 1) {
                result += " ";
            }
        }
        d.querySelector("#output").innerText = result;
    } else {
        alert(error);
    }
}

function decToBin(n) {
    let power = 1;

    n = parseInt(n);

    while (power <= n / 2) {
        power = power * 2;
    }

    let bin = "";

    // check for presence of powers of 2 in n, from largest to smallest
    while (power > 0) {
        // power is not present in n
        if (n < power) {
            bin += "0";
        }

        // power is present in n, so subtract power from n
        else {
            bin += "1";
            n = n - power;
        }

        // next smallest power of 2
        power = Math.trunc(power / 2);
    }

    return bin.padStart(8, '0');
}
