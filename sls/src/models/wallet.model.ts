import {Coin} from "./coin.model";
import {Profile} from './profile.model';

export interface Wallet {
    pk: string;
    portfolio: {
        amount: number;
        coinId: string;
        coin?: WalletDatabaseCoin | Coin
    }[];
    profile?: Profile;
}

export interface WalletDatabaseCoin {
    coinId: string;
    amount: string;
}
