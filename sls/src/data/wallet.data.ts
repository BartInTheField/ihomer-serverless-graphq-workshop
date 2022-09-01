import {Wallet} from '../models/wallet.model';

export const walletData: Wallet[] = [
    {
        pk: 'curios_viewer',
        portfolio: []
    },
    {
        pk: 'xoCryptoxo',
        portfolio: [
            {
                coinId: 'AVA',
                amount: 2.3
            },
            {
                coinId: 'BTC',
                amount: 0.0004
            }
        ]
    },
    {
        pk: 'memer',
        portfolio: [
            {
                coinId: 'MEM',
                amount: 666
            },
            {
                coinId: 'SNL',
                amount: 420
            }
        ]
    },
    {
        pk: 'crypto_lover',
        portfolio: [
            {
                coinId: 'ETH',
                amount: 102.4
            },
            {
                coinId: 'BTC',
                amount: 12.003
            }
        ]
    }
]
