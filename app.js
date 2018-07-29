// Global variables 
const getQuote = document.getElementById('request-quote');



// Display the year options on select field
document.addEventListener('DOMContentLoaded', showYearList);

function showYearList() {
    const year = new Date().getFullYear();
    const yearList = year - 20;
    for (let i = year; i >= yearList; i--) {
        const year = document.getElementById('selectyear');
        const selectOption = document.createElement('option');
        selectOption.value = i;
        selectOption.textContent = i;
        year.appendChild(selectOption);
    }
}

// on Form submit
getQuote.addEventListener('submit', getQuotation);

function getQuotation(e) {
    e.preventDefault();

    //we need to read the values from the inputs, 
    // so, the inputs are must in form of an object

    const make = document.getElementById('selectcountry').value;
    const year = document.getElementById('selectyear').value;
    const level = document.querySelector('input[name="level-of-the-car"]:checked').value;

    // clearing the previous quote

    const prevQuote = document.querySelector('#result div');
    if(prevQuote != null) {
        prevQuote.remove();
    }

    // here we are instantiating the object "Inputs"
    const inputs = new Inputs(make, year, level);
    inputs.calcQuotation(inputs);




}


//   use Object Constructor
class Inputs {
    constructor(make, year, level) {
        this.make = make;
        this.year = year;
        this.level = level;
    }
    calcQuotation(inputs) {
       
        let price;
        const base = 20000;
        const make = inputs.make;

        // 1. India increase the insurance by 10%
        // 2. Norway increase the insurance by 15%
        // 3. London increase the insurance by 18%
        // 4. Germany increase the insurance by 20%

        switch (make) {
            case 'India':
                price = base * 1.10;
                break;
            case 'Norway':
                price = base * 1.15;
                break;
            case 'London':
                price = base * 1.18;
                break;
            case 'Germany':
                price = base * 1.20;
                break;
        }

        const year = inputs.year;

        const yearDifference = this.getYearDifference(year);
        // for every year the price reduces by 3%
        price = price - ((yearDifference * 3) * price) / 100;



        // checking the level of protection
        const level = inputs.level;
        price = this.calculateLevel(price, level);
        inputs.showResult(price, inputs);
    }

    getYearDifference(year) {
        return new Date().getFullYear() - year;
    }

    calculateLevel(price, level) {
        // the basic is going to increase by 30%
        // the complete is going to increase the value by 50%
        if (level === 'Basic') {
            price = price * 1.30;
        } else {
            price = price * 1.50;
        }
        return price;
    }


    showResult(price, inputs) {

        const result = document.getElementById('result');
        // get the values of make, year, level

        const make = inputs.make;
        const year = inputs.year;
        const level = inputs.level;

        // create a div elememt here
        const div = document.createElement('div');
        div.classList= 'result';
        div.innerHTML = `
      <h4 class="header" > Summary:</h4>
      <p> Make: ${make}</p>
      <p>Year : ${year}</p><p> Level: ${level}</p>
        <p class="result1">Price: $ ${price}</p>
    
      `;
        //   adding spinner

        const spinner = document.getElementById('spinner');
        spinner.style.display = "block";

        setTimeout(function () {
            spinner.style.display = "none";
            result.appendChild(div);
        }, 3000);


    }

}