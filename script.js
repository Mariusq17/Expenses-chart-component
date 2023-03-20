const columns = document.getElementsByClassName('column');
const moneySpend = document.getElementsByClassName('money-spend');
const columnDay = document.getElementsByClassName('column-day');
const totalSpend = document.getElementById('totalSpend');

let totalSpendValue = 0;

//Show money spend for each day on hover 

//I made it with JS because my elements order in HTML is inverse
//I generaly make this with CSS sibling selector, but doesn't exist 
//  selector for previous sibling element 
for(let i = 0; i < columns.length; i++) {
    columns[i].addEventListener('mouseover', (e) => {
        let elem = e.target;
        elem.previousElementSibling.classList.add('active');
    });
    columns[i].addEventListener('mouseout', (e) => {
        let elem = e.target;
        elem.previousElementSibling.classList.remove('active');
    });
}

let data = [];
fetch('./data.json')
    .then(res => res.json())
    .then(x => {
        //Extract our data and store in a array
        x.forEach(elem => data.push(elem));

        //Set the total value of money spend this month
        data.forEach(item => totalSpendValue += item.amount);
        totalSpend.textContent = '$' + totalSpendValue;

        for(let i = 0; i < data.length; i++) {
            //View the bar chart and hover over the individual bars to see the correct amounts for each day
            moneySpend[i].textContent = data[i].amount;
            columnDay[i].textContent = data[i].day;
            
            //I put here 3 * procent value to make design to look better
            //  (otherwise the columns will be to small)
            columns[i].style.setProperty('--procent', 3 * getProcentValue(data[i].amount));
        }

        //See the current day's bar highlighted in a different colour to the other bars 
        let newDay = new Date().getDay();
        columns[newDay - 1].classList.add('active');
    });
function getProcentValue(x) {
    return (x / totalSpendValue).toFixed(2);
}
