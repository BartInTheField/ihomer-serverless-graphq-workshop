import {Coin} from '../models/coin.model';
import {getDynamoClient} from "../util/dynamo";
import {getCoinbasePrice} from "../util/coinbase";


export class CoinService {
    static async list(): Promise<Coin[]> {
        try {
            const result = await getDynamoClient()
                .scan({
                    TableName: 'coins',
                })
                .promise();

            return result.Items as Coin[];
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async get(coinId: string): Promise<Coin> {
        try {
            const result = await getDynamoClient()
            .get({
                TableName: 'coins',
                Key: {
                    pk: coinId,
                },
            })
            .promise();
            return result.Item as Coin;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }


    static async enrich(coin: Coin, selectionSetList: string[]): Promise<void> {
        console.log('COIN SELECTION SET LIST', selectionSetList);
        if (selectionSetList.includes('market')) {
            if(selectionSetList.includes('market/eur')) {
                    const eur = await getCoinbasePrice(coin.pk, 'EUR');
                    if(eur) {
                        coin.market = {
                            ...coin.market,
                            eur: eur
                        };
                    }
            }

            if(selectionSetList.includes('market/usd')) {
                const usd = await getCoinbasePrice(coin.pk, 'USD');
                if(usd) {
                    coin.market = {
                        ...coin.market,
                        usd: usd
                    };
                }
            }
        }
    }
}
