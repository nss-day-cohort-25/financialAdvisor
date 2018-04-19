const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

const fragment = document.createDocumentFragment()

for (let key in FinancialAdvisor) {
    const sectionComponent = document.createElement("section")
    sectionComponent.textContent = `${capitalize(key)}: ${FinancialAdvisor[key]}`

    fragment.appendChild(sectionComponent)
}

document.querySelector("#output").appendChild(fragment)

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
