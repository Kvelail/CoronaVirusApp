/* DOM Selectors */

const countriesForm = document.querySelector('.countries-form'),
      countriesSearch = document.querySelector('#search'),
      output = document.querySelector('#output');

/* Variables */

let cases;

/* Event Handlers */

const updateCases = cases => {

    // DOM Selectors
    const newConfirmed = document.querySelector('#new-confirmed'),
          newDeaths = document.querySelector('#new-deaths'),
          newRecovered = document.querySelector('#new-recovered'),
          totalConfirmed = document.querySelector('#total-confirmed'),
          totalDeaths = document.querySelector('#total-deaths'),
          totalRecovered = document.querySelector('#total-recovered');

    // Destructure cases
    const { Global : global } = cases;
    
    // Update cases
    newConfirmed.textContent = numberWithCommas(global.NewConfirmed);
    newDeaths.textContent = numberWithCommas(global.NewDeaths);
    newRecovered.textContent = numberWithCommas(global.NewRecovered);
    totalConfirmed.textContent = numberWithCommas(global.TotalConfirmed);
    totalDeaths.textContent = numberWithCommas(global.TotalDeaths);
    totalRecovered.textContent = numberWithCommas(global.TotalRecovered);

};

const displayCountry = e => {  

    // Prevent from from submitting
    e.preventDefault();

    // Destructure cases
    const { Countries : countries } = cases;

    // Get input value
    const inputCountry = countriesSearch.value.toLowerCase().trim();

    // Clear input field
    countriesForm.reset();

    // Find country
    const country = countries.filter(country => {
        return country.Country.toLowerCase() === inputCountry;
    }).pop();

    // Update UI
    if (!country) { 
        
        // Update error message
        const html = `
                        <p class="output-error">
                            Wrong input, please try again.
                        </p>
                    `;

        output.innerHTML = html;
        output.style.display = 'block';
        output.classList.add('fade-in');

        // Remove message after 2 seconds
        setTimeout(() => {
            output.innerHTML = '';
            output.classList.remove('fade-in');
        }, 2000);

    } else {

        // Update UI
        const html = `
                        <div class="output-box">
                            <img src="https://www.countryflags.io/${country.CountryCode}/shiny/64.png">
                            <h2 class="output-state">${country.Country} - <span>(${country.CountryCode})</span></h2>
                            <div class="output-info">
                                <h3>total confirmed: <span>${numberWithCommas(country.TotalConfirmed)}</span></h3>
                                <h3>total recovered: <span>${numberWithCommas(country.TotalRecovered)}</span></h3>
                                <h3>total deaths: <span>${numberWithCommas(country.TotalDeaths)}</span></h3>
                            </div>
                        </div>
                    `;

        output.innerHTML = html;
        output.style.display = 'block';
        output.classList.add('fade-in');

        // Remove class after 1s
        setTimeout(() => output.classList.remove('fade-in'), 1000);

    }

};  

/* Helpers */

// Function adds commas where needed
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Change icons animation
const changeIcons = () => {

    // DOM Selectors
    const mask = document.querySelector('#mask');
    const hands = document.querySelector('#hands');

    // Init imgs src
    mask.src = 'img/instructions-imgs/mask-img.svg';
    hands.src = 'img/instructions-imgs/hands-img.svg'

    // Change every 1s
    setTimeout(() => {
         mask.setAttribute('src', 'img/instructions-imgs/mask-2-img.svg');
         hands.setAttribute('src', 'img/instructions-imgs/hands-2-img.svg');
    }, 1000);  

};

const setDate = () => {

    const footerDate = document.querySelector('#footer-date');
    const now = new Date();

    // Update UI
    footerDate.textContent = now.getFullYear();

};

/* Event Listeners */

// Display global cases on page load
window.addEventListener('load', async () => {
    
    // Get data
    cases = await getCases();

    // Update UI
    updateCases(cases);
    setDate();
    
});

// Search cases by country
countriesForm.addEventListener('submit', displayCountry);

/* Function calls */

// Call function every 2s
changeIcons();
setInterval(changeIcons, 2000);

