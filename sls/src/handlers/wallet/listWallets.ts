import {WalletService} from "../../services/wallet.service";
import {CoinService} from "../../services/coin.service";

export const handler = async ({ info: {selectionSetList}}) => {
    const wallets = await WalletService.list();

    for (const wallet of wallets) {
        await WalletService.enrich(wallet, selectionSetList);
    }

    return wallets;
};
