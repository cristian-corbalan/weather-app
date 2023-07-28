'use strict'

const API_KEY = "1bff7579067727b7399aa930fbeb7b4c";

const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${API_KEY}`;

const form = document.querySelector('form');
const content = document.getElementById('content');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    content.innerHTML = ''

    let value = document.querySelector('#searchInput').value;

    /**
     * @type {Array | null | Promise};
     */
    let locations = await getLatAndLon(value);

    if (locations.cod === "400") {
        // console.info("Write a location in the input");
        let p = createTag(
            'p',
            {class: 'p-6 text-center text-lg font-bold text-red-500'},
            'Write a location in the input'
        )
        content.appendChild(p);
    } else if (!locations.length) {
        // console.info("Location not found");
        let p = createTag(
            'p',
            {class: 'p-6 text-center text-lg font-bold'},
            'Location not found'
        )
        content.appendChild(p);
    } else {
        // console.info("The location is :", locations[0])
        let location = locations[0];
    }
})

/**
 * Search a location and return its info
 * @param {string} location
 * @return {Promise}
 */
const getLatAndLon = function (location) {
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`)
        .then(res => res.json());
}

/**
 * Create a HTMLElement
 *
 * @param {string} name Tag's name.
 * @param {object | null} attributes The object's properties are the attribute name.
 * @param {string | null} content Tag's innerText.
 */
const createTag = function (name = '', attributes = null, content = null) {
    if (!name) {
        console.error("The name is obligatory");
    }

    let tag = document.createElement(name);

    if (attributes) {
        for (const i in attributes) {
            tag.setAttribute(i, attributes[i]);
        }
    }

    if (content) {
        tag.innerText = content;
    }

    return tag;
}