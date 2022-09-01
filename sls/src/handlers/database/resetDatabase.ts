import {getDynamoClient} from '../../util/dynamo';
import {profileData} from '../../data/profile.data';
import {coinData} from '../../data/coin.data';
import {walletData} from '../../data/wallet.data';

export const handler = async () => {
    const coins = (await getDynamoClient()
        .scan({
            TableName: 'coins',
        })
        .promise()).Items

    const wallets = (await getDynamoClient()
        .scan({
            TableName: 'wallets',
        })
        .promise()).Items

    const profiles = (await getDynamoClient()
        .scan({
            TableName: 'profiles',
        })
        .promise()).Items

    for (const coin of coins) {
        await getDynamoClient()
            .delete({
                Key: {
                    pk: coin.pk,
                },
                TableName: 'coins',
            })
            .promise()
    }

    for (const wallet of wallets) {
        await getDynamoClient()
            .delete({
                Key: {
                    pk: wallet.pk,
                },
                TableName: 'wallets',
            })
            .promise()
    }

    for (const profile of profiles) {
        await getDynamoClient()
            .delete({
                Key: {
                    pk: profile.pk,
                },
                TableName: 'profiles',
            })
            .promise()
    }

    for (const newProfile of profileData) {
        await getDynamoClient()
            .put({
                Item: newProfile,
                TableName: 'profiles',
            })
            .promise()
    }

    for (const newCoin of coinData) {
        await getDynamoClient()
            .put({
                Item: newCoin,
                TableName: 'coins',
            })
            .promise()
    }

    for (const newWallet of walletData) {
        await getDynamoClient()
            .put({
                Item: newWallet,
                TableName: 'wallets',
            })
            .promise()
    }

    return true;
};
