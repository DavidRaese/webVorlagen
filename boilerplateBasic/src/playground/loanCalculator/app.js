import './styles/styles.scss'

const loanAmount = document.querySelector('#loanAmount')
const annualIntrest = document.querySelector('#annualIntrest')
const repaymentYears = document.querySelector('#repaymentYears')
const btnCalculate = document.querySelector('#btnCalculate')
const resultMonthlyPayment = document.querySelector('#resultMonthlyPayment')
const resultTotalPayment = document.querySelector('#resultTotalPayment')
const resulttotalIntrest = document.querySelector('#resultTotalIntrest')

//Functions
const clearError = () => {
    document.querySelector('#errorMessage').remove()
}

const showError = (error) => {
    //Create div
    const errorDiv = document.createElement('div')

    //Add class
    errorDiv.id = 'errorMessage'

    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error))

    //Insert before Heading 
    //1. get parent and next element
    const card = document.querySelector('.container')
    const heading = document.querySelector('.card__title')
    //2. Insert Error
    card.insertBefore(errorDiv, heading);

    //Clear error after 3 seconds
    setTimeout(clearError, 3000)
}


const calculateResult = (e) => {
    //UI vars
    const amount = loanAmount.value
    const intrest = annualIntrest.value
    const years = repaymentYears.value

    //calculation
    const principal = parseFloat(amount)
    const calculateIntrest = parseFloat(intrest) / 100 / 12
    const calculatePayments = parseFloat(years) * 12

    //compute monthly payment
    const x = Math.pow(1 + calculateIntrest, calculatePayments)
    const monthly = (principal * x * calculateIntrest) / (x - 1)

    if(isFinite(monthly)) {
        resultMonthlyPayment.value = monthly.toFixed(2)
        resultTotalPayment.value = (monthly * calculatePayments).toFixed(2)
        resulttotalIntrest.value = ((monthly * calculatePayments) - principal).toFixed(2)
    } else {
        showError('Please check your numbers')
    }

    document.querySelector('.results').style.display = 'block'
    e.preventDefault()
}


btnCalculate.addEventListener('click', calculateResult)

