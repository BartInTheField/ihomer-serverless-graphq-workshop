import {WalletService} from "../../services/wallet.service";

export const handler = async ({arguments: {walletId}, info: {selectionSetList}}) => {
    const wallet = await WalletService.get(walletId);
    await WalletService.enrich(wallet, selectionSetList);

    return wallet;
};
