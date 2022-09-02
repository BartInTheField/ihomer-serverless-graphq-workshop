import {getDynamoClient} from "../util/dynamo";
import {Wallet} from "../models/wallet.model";
import {CoinService} from "./coin.service";
import {Coin} from "../models/coin.model";

export class WalletService {
    static async get(walletId: string): Promise<Wallet> {
        try {
            const result = await getDynamoClient()
            .get({
                TableName: 'wallets',
                Key: {
                    pk: walletId,
                },
            })
            .promise();
            return result.Item as Wallet;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async list(): Promise<Wallet[]> {
        try {
            const result = await getDynamoClient()
                .scan({
                    TableName: 'wallets'
                })
                .promise();
            return result.Items as Wallet[];
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async enrich(wallet: Wallet, selectionSetList: string[]): Promise<void> {
        console.log('WALLET SELECTION SET LIST', selectionSetList);
        if (selectionSetList.includes('portfolio/coin')) {
            try {
                for (let i = 0; i < wallet.portfolio.length; i++) {
                    const coinId = wallet.portfolio[i].coinId;
                    wallet.portfolio[i] = { ...wallet.portfolio[i], coin: await CoinService.get(coinId) }
                }

                // Get all coin  selectionSets and remove `portfolio/coin/` from it.
                // Result is for example: ['market', 'market/eur', 'market/usd']
                const coinSelectionSetList = selectionSetList
                    .filter((selectionSet) => selectionSet.startsWith('portfolio/coin'))
                    .map((selectionSet) => selectionSet.replace('portfolio/coin/', '')
                );
                for (const portfolioElement of wallet.portfolio) {
                    await CoinService.enrich(portfolioElement.coin as Coin, coinSelectionSetList);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}
