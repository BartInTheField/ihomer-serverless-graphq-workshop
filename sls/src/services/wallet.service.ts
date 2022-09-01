import {getDynamoClient} from "../util/dynamo";
import {Wallet} from "../models/wallet.model";
import {CoinService} from "./coin.service";
import {Coin} from "../models/coin.model";

export class WalletService {
    static async get(walletId: string): Promise<Wallet> {
        try {
            const result = await getDynamoClient()
            .get({
                TableName: 'wallet',
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
                    TableName: 'wallet'
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
                const portfolioCoinRequests = wallet.portfolio.map(
                    async (portfolio) => ({ ...portfolio, coin: await CoinService.get(portfolio.coinId) })
                );
                wallet.portfolio = await Promise.all(portfolioCoinRequests);

                // We also want to enrich the coin

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
