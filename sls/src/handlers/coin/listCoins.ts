import {CoinService} from "../../services/coin.service";

export const handler = async ({ info: {selectionSetList}}) => {
    const coins = await CoinService.list();

    for (const coin of coins) {
        await CoinService.enrich(coin, selectionSetList);
    }

    return coins;
};
