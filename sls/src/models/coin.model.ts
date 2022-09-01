export interface Coin {
    pk: string
    name: string
    symbol: string
    amount: number
    market?: CoinMarket
}

export interface CoinMarket {
    eur?: number
    usd?: number
}
