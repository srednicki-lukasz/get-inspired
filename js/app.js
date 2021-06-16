const div_time = document.querySelector('.time');
const div_date = document.querySelector('.date');
const div_quote = document.querySelector('.quote');
const div_author = document.querySelector('.author');
const span_userName = document.querySelector('.user-name');
const div_backgroundImage = document.querySelector('.background-image');
const btn_RandomizeBackground = document.querySelector('.randomize-background');
const btn_RandomizeQuote = document.querySelector('.randomize-quote');

class GetInspired {
    constructor() { }

    /**
     * Cooldown.
     * @param {HTMLButtonElement} target
     * @memberof GetInspired
     */
    cooldown(target, cooldown) {
        target.disabled = true;
        setTimeout(() => target.disabled = false, cooldown);
    }

    /**
     * Show current date dd/mm/yyy.
     * @param {HTMLDivElement} container
     * @memberof GetInspired
     */
    showCurrentDate(container) {
        const date = new Date();
        const day = date.getDate() < 10
            ? `0${date.getDate()}`
            : date.getDate();
        let month = date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1;
        const year = date.getFullYear();
        container.innerHTML = `${day}/${month}/${year}`;
    }

    /**
     * Show current time hh:mm:ss.
     * @param {HTMLDivElement} container
     * @memberof GetInspired
     */
    showCurrentTime (container) {
        const date = new Date();
        const minutes = date.getMinutes() < 10
            ? `0${date.getMinutes()}`
            : date.getMinutes();
        const hours = date.getHours() < 10
            ? `0${date.getHours()}`
            : date.getHours();
        container.innerHTML = `${hours}:${minutes}`;
    }

    /**
     * Load random background image.
     * @param {HTMLDivElement} container
     * @memberof GetInspired
     */
     loadRandomBackgroundImage(container) {
        fetch(`https://source.unsplash.com/random/1920x1080?nature,water?sig=${Math.random()}`)
        .then(res => res.url)
        .then(url => container.style.backgroundImage = `url(${url})`)
        .catch(err => console.log(err));
    }

    /**
     * Load random quote.
     * @param {HTMLDivElement} quoteContainer
     * @param {HTMLDivElement} authorContainer
     * @memberof GetInspired
     */
    loadRandomQuote(quoteContainer, authorContainer) {
        fetch('https://type.fit/api/quotes')
        .then(res => res.json())
        .then(data => {
            const filtered = data.filter(quote => quote.text.length < 30 && quote.author);
            const random = Math.floor(Math.random() * filtered.length + 1);
            quoteContainer.innerHTML = filtered[random].text;
            authorContainer.innerHTML = `—${filtered[random].author}`;
        })
        .catch(err => console.log(err));
    }
}

const getInspired = new GetInspired();

(function() {
    const name = prompt("Please enter your name");
    name ? span_userName.innerHTML = `Welcome, <b>${name}</b>` : span_userName.innerHTML = `Welcome`;

    getInspired.showCurrentDate(div_date);
    getInspired.showCurrentTime(div_time);
    getInspired.loadRandomBackgroundImage(div_backgroundImage);
    getInspired.loadRandomQuote(div_quote, div_author);

    getInspired.cooldown(btn_RandomizeBackground, 2000);
    getInspired.cooldown(btn_RandomizeQuote, 2000);

    setInterval(() => {
        getInspired.showCurrentDate(div_date);
        getInspired.showCurrentTime(div_time);
    }, 1000);
}())

btn_RandomizeBackground.addEventListener('click', () => {
    getInspired.loadRandomBackgroundImage(div_backgroundImage);
    getInspired.cooldown(btn_RandomizeBackground, 2000);
})

btn_RandomizeQuote.addEventListener('click', () => {
    getInspired.loadRandomQuote(div_quote, div_author);
    getInspired.cooldown(btn_RandomizeQuote, 2000);
})