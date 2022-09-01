import {CoinService} from "../../services/coin.service";

export const handler = async ({arguments: {coinId}, info: {selectionSetList}}) => {
    const coin = await CoinService.get(coinId);

    await CoinService.enrich(coin, selectionSetList);

    return coin;
};
