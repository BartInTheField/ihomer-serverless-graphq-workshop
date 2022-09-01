import axios from "axios";

export const getCoinbasePrice  = async (coinId: string, currency: string): Promise<number | undefined> => {
    try {
        const currencyRequest = await axios.get(`https://api.coinbase.com/v2/prices/${coinId}-${currency}/spot`);
        return currencyRequest.data?.data?.amount;
    } catch {
        // No public listing for this coin
        return undefined;
    }
}
