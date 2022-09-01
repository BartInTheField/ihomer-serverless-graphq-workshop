import {getDynamoClient} from "../util/dynamo";
import {Wallet} from "../models/wallet.model";
import {CoinService} from "./coin.service";
import {Coin} from "../models/coin.model";
import {Profile} from '../models/profile.model';

export class ProfileService {
    static async list(): Promise<Profile[]> {
        try {
            const result = await getDynamoClient()
                .scan({
                    TableName: 'profiles'
                })
                .promise();
            return result.Items as Profile[];
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async getByWalletId(walletId: string): Promise<Profile> {
        try {
            // We are using scan here, a better approach would be to add a index for wallet id, and query on that index
            const result = await getDynamoClient()
                .scan({
                    TableName: 'profiles',
                })
                .promise();
            return (result.Items as Profile[])
                .find((profile) => profile.walletId === walletId);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
