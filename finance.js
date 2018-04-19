const FinancialAdvisor = Object.create(null, {
    company: {
        writable: true,
        enumerable: true,
        value: "Stratton Oakmont"
    },
    specialty: {
        writable: true,
        enumerable: true,
        value: "Commodities"
    },
    name: {
        enumerable: true,
        value: "Chaz Vanderbilt"
    },
    portfolio: {
        value: []
    },
    worth: {
        // This function should look at every transaction, and if
        // it is a purchase, should increase the portfolio's worth
        // and if it is a sale, reduce its worth
        value: function () {
            let totalPortfolioWorth = 0

            this.portfolio.forEach(
                transaction => {
                    if (transaction.purchase) {
                        totalPortfolioWorth += transaction.price * transaction.quantity
                    } else {
                        totalPortfolioWorth -= transaction.price * transaction.quantity
                    }
                }
            )

            return totalPortfolioWorth
        }
    },
    purchase: {
        // Modify portfolio by adding a purchase transaction
        value: function (ticker, quantity, price) {
            this.portfolio.push(
                {
                    ticker,
                    quantity,
                    price,
                    purchase: true
                }
            )
        }
    },
    sell: {
        // Modify portfolio by adding a sale transaction
        value: function (ticker, quantity, price) {
            this.portfolio.push(
                {
                    ticker,
                    quantity,
                    price,
                    purchase: false
                }
            )
        }
    }
})

