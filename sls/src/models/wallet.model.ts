import {Coin} from "./coin.model";

export interface Wallet {
    pk: string;
    portfolio: {
        amount: number;
        coinId: string;
        coin: WalletDatabaseCoin | Coin
    }[];
}

export interface WalletDatabaseCoin {
    coinId: string;
    amount: string;
}
