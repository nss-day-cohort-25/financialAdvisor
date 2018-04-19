const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

const fragment = document.createDocumentFragment()

for (let key in FinancialAdvisor) {
    const sectionComponent = document.createElement("section")
    sectionComponent.textContent = `${capitalize(key)}: ${FinancialAdvisor[key]}`

    fragment.appendChild(sectionComponent)
}

document.querySelector("#output").appendChild(fragment)

const tickers = {
}

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

console.log(tickers)
