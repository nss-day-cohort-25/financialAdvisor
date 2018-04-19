const componentFactory = (type, contents, classes) => {
    const component = document.createElement(type)
    component.textContent = contents
    component.classList = classes

    return component
}

const h1 = (...params) => componentFactory("h1", ...params)
const section = (...params) => componentFactory("section", ...params)
const div = (...params) => componentFactory("div", ...params)
const p = (...params) => componentFactory("p", ...params)
const article = (...params) => componentFactory("article", ...params)

const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`




const fragment = document.createDocumentFragment()

for (let key in FinancialAdvisor) {
    fragment.appendChild(section(
        `${capitalize(key)}: ${FinancialAdvisor[key]}`, ""
    ))
}



/*
    Example final data structure:

    tickers = {
        "GE": 7589576895,
        "AAPL": 495484539,
        "MSFT": 49578340
    }
*/
const tickers = {
}

/*
    Iterate over each transaction and either create, or update, the
    key/value pair in `tickers` (see above) to hold the total valuation
    of each stock in my portfolio
*/
FinancialAdvisor.portfolio.forEach(
    transaction => {
        if (!(transaction.ticker in tickers)) {
            tickers[transaction.ticker] = transaction.price * transaction.quantity
        } else {
            if (transaction.purchase) {
                tickers[transaction.ticker] += transaction.price * transaction.quantity
            } else {
                tickers[transaction.ticker] -= transaction.price * transaction.quantity
            }
        }
    }
)

/*
    Using the `tickers` data structure, build a DOM component
    representing each stock I own and its total valuation

    "I own {stock} and it is currently worth {value}"
*/
for (const stock in tickers) {
    const currStock = tickers[stock]

    fragment.appendChild(div(
        `I own ${stock} and it is currently worth $${currStock.toFixed(2)}`,
        "card"
    ))
}


document.querySelector("#output").appendChild(fragment)