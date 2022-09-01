import {Wallet} from './wallet.model';

export interface Profile {
    pk: string;
    firstName: string;
    lastName: string;
    walletId: string;
    wallet?: Wallet;
}

