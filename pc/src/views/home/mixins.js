// import { Currency, CurrencyAmount, ETHER, JSBI, Token, TokenAmount, Trade } from '@pancakeswap-libs/sdk'
import { JSBI } from '@pancakeswap-libs/sdk'
// import { parseUnits } from '@ethersproject/units'
import { ChainId, Token, TokenAmount, Pair, TradeType, Route, Trade, CurrencyAmount, Fetcher, WETH } from '@uniswap/sdk'
import BigNumber from 'bignumber.js'
export default {
    methods: {
        tryParseAmount (value, currency) {
            if (!value || !currency) {
                return undefined
            }
            console.log(value, currency)
            try {
                const typedValueParsed = parseUnits(value, currency.decimals).toString()
                console.log(typedValueParsed);

                if (typedValueParsed !== '0') {
                    return currency instanceof Token
                        ? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
                        : CurrencyAmount.ether(JSBI.BigInt(typedValueParsed));
                }
            } catch (error) {
                // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
                console.info(`Failed to parse input amount: "${value}"`, error)
            }
            // necessary for all paths to return a value
            return undefined
        },
        getDependentAmount (independentAmount) {
            const [pairState, pair] = this.usePair(this.currencyA, this.currencyB)
            // we wrap the currencies just to get the price in terms of the other token
            const wrappedIndependentAmount = this.wrappedCurrencyAmount(independentAmount, 56)
            const [tokenA, tokenB] = [this.wrappedCurrency(this.currencyA, 56), this.wrappedCurrency(this.currencyB, 56)]
            if (tokenA && tokenB && wrappedIndependentAmount && pair) {
                const dependentCurrency = this.currencyB
                const dependentTokenAmount =
                    dependentField === Field.CURRENCY_B
                        ? pair.priceOf(tokenA).quote(wrappedIndependentAmount)
                        : pair.priceOf(tokenB).quote(wrappedIndependentAmount)
                return dependentCurrency === ETHER ? CurrencyAmount.ether(dependentTokenAmount.raw) : dependentTokenAmount
            }
            return undefined
        },
        wrappedCurrency (currency, chainId) {
            // eslint-disable-next-line no-nested-ternary
            return chainId && currency === ETHER ? WETH[chainId] : currency instanceof Token ? currency : undefined
        },

        wrappedCurrencyAmount (
            currencyAmount,
            chainId
        ) {
            const token = currencyAmount && chainId ? this.wrappedCurrency(currencyAmount.currency, chainId) : undefined
            return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined
        },
        usePairs (currencies) {
            const chainId = 56
            const tokens = currencies.map(([currencyA, currencyB]) => [
                this.wrappedCurrency(currencyA, chainId),
                this.wrappedCurrency(currencyB, chainId)
            ])

            const pairAddresses = () =>
                tokens.map(([tokenA, tokenB]) => {
                    return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
                })

            const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')

            return results.map((result, i) => {
                const { result: reserves, loading } = result
                const tokenA = tokens[i][0]
                const tokenB = tokens[i][1]

                if (loading) return [PairState.LOADING, null]
                if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
                if (!reserves) return [PairState.NOT_EXISTS, null]
                const { reserve0, reserve1 } = reserves
                const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
                return [
                    PairState.EXISTS,
                    new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString()))
                ]
            })
        },

        usePair (tokenA, tokenB) {
            return this.usePairs([[tokenA, tokenB]])[0]
        }
    },
    async mounted () {
        // const USDT = new Token(56, '0x6b175474e89094c44da98b954eedeac495271d0f', 18)
        // || new Token(56, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD')

        const USDT = new Token(56, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD')
        const VAC = new Token(56, "0xe2c46ebd8F802Ec28a43F94Cee492fD132D5FCA6", 18, "VAC", "Vane")
        console.log(USDT, VAC);
        // const USDT_VAC = await new Fetcher.fetchPairData(VAC, USDT);
        const USDT_VAC = new Pair(new TokenAmount(USDT, '2040550167706'), new TokenAmount(VAC, '980906524786'));
        const VAC_TO_USDT = new Route([USDT_VAC], VAC)

        // const trade1 = new Trade(VAC_TO_USDT, new TokenAmount(VAC, '1000000000000000'), TradeType.EXACT_INPUT)
        console.log(USDT_VAC, new TokenAmount(USDT, '2000000000000000000'), new TokenAmount(VAC, '1000000000000000000'))
        console.log(VAC_TO_USDT);
        console.log(VAC_TO_USDT.midPrice.toSignificant(6), VAC_TO_USDT.midPrice.invert().toSignificant(6));
        // console.log(trade1);
        // this.currencyB = USDT;
        // this.currencyA = VAC;
        // console.log(USDT, VAC)

        // let VACAmount = this.tryParseAmount('10', VAC)
        // console.log(VACAmount);
        // const res = this.getDependentAmount(VACAmount)
        // console.log(res)


        const HOT = new Token(ChainId.MAINNET, '0xc0FFee0000000000000000000000000000000000', 18, 'HOT', 'Caffeine')
        const NOT = new Token(ChainId.MAINNET, '0xDeCAf00000000000000000000000000000000000', 18, 'NOT', 'Caffeine')
        const HOT_NOT = new Pair(new TokenAmount(HOT, '2000000000000000000'), new TokenAmount(NOT, '1000000000000000000'))
        const NOT_TO_HOT = new Route([HOT_NOT], NOT)

        const trade = new Trade(NOT_TO_HOT, new TokenAmount(NOT, '1000000000000000'), TradeType.EXACT_INPUT)
        console.log(trade);
        // console.log(DAI.chainId, USDT, WETH)
        // const pair = await Fetcher.fetchPairData(VAC, USDT)
        // const route = new Route([pair], USDT)
        // console.log(route.midPrice.toSignificant(6)) // 201.306
        // console.log(route.midPrice.invert().toSignificant(6)) // 0.00496756
        // console.log(1)


        // const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

        // // note that you may want/need to handle this async code differently,
        // // for example if top-level await is not an option
        // console.log(DAI, WETH[DAI.chainId]);
        // const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])

        // const route = new Route([pair], WETH[DAI.chainId])

        // console.log(route.midPrice.toSignificant(6)) // 201.306
        // console.log(route.midPrice.invert().toSignificant(6)) // 0.00496756
    }
}