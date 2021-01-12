import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  Select,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Tokens from '../constants/tokens';
import useCheapestPrice from '../hooks/useCheapestPrice';
import useGas from '../hooks/useGas';
import uniswapSwap from '../hooks/useUniswapSwap';

const coins = [
  {
    ticker: 'DAI',
  },
  {
    ticker: 'USDC',
  },
  {
    ticker: 'USDT',
  },
  {
    ticker: 'TUSD',
  },
  {
    ticker: 'KNC',
  },
  {
    ticker: 'WETH',
  },
  {
    ticker: 'CDAI',
  },
  {
    ticker: 'ADAI',
  },
];

export default function SwapForm({ web3 }) {
  const { register, handleSubmit, watch, setValue, errors } = useForm();
  const watchFromToken = watch('fromToken', '');
  const watchToToken = watch('toToken', '');
  const watchFromAmount = watch('fromAmount', 0);
  const gas = useGas();
  // eslint-disable-next-line prefer-const
  let { price, exchange } = useCheapestPrice(Tokens[watchFromToken], Tokens[watchToToken]);
  exchange = 'Uniswap'; // HARD CODE EXCHANGE TO USE UNISWAP
  const midprice = price; // HARD CODE MIDPRICE TO USE UNISWAP

  console.log('🚀 ~ file: SwapForm.jsx ~ line 56 ~ SwapForm ~ exchange', exchange);

  const onSubmit = (data) => {
    const { fromAmount, fromToken, toToken } = data;
    if (!exchange) {
      return;
    }
    // HARD CODE TO USE UNISWAP SWAP
    if (exchange === 'Uniswap') {
      uniswapSwap(Tokens[fromToken], Tokens[toToken], fromAmount, web3);
    } // else if (exchange === 'Kyber') {
    //   kyberSwap(Tokens[fromToken], Tokens[toToken], fromAmount, web3);
    // } else if (exchange === '0x') {
    //   zeroXSwap([fromToken], Tokens[toToken], fromAmount, web3);
    // }
    console.log('🚀 ~ file: SwapForm.jsx ~ line 46 ~ onSubmit ~ Tokens[toToken]', Tokens[toToken]);
    console.log(
      '🚀 ~ file: SwapForm.jsx ~ line 46 ~ onSubmit ~ Tokens[fromToken]',
      Tokens[fromToken]
    );
  };

  useEffect(() => {
    if (watchFromAmount && watchFromToken && watchToToken) {
      const n = watchFromAmount * midprice;
      setValue('toAmount', n.toFixed(Tokens[watchFromToken]?.decimals));
    }
    if (!watchFromAmount) {
      setValue('toAmount', '');
    }
  }, [midprice, watchFromAmount, watchFromToken, watchToToken]);

  return (
    <Center mt={6}>
      <Box py={12} px={12} pb={6} boxShadow="lg">
        <Heading mb={10}>Swap</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text opacity={0.7} mb={2} ml={0.5}>
            PAY
          </Text>
          <Box borderWidth="1px" borderRadius="lg" mb={6}>
            <Flex>
              <Select
                h="52px"
                placeholder="Select Token"
                name="fromToken"
                size="lg"
                variant="filled"
                ref={register}
              >
                {coins.map(({ ticker }) => (
                  <option key={ticker} value={ticker}>
                    {ticker}
                  </option>
                ))}
              </Select>
              <Input
                placeholder="Enter Amount"
                name="fromAmount"
                type="number"
                step="0.000000000000000001"
                size="lg"
                ref={register({ required: true })}
                textAlign="end"
                variant="unstyled"
                mr={6}
              />
            </Flex>
          </Box>
          <Text opacity={0.7} mb={2} ml={0.5}>
            RECEIVE
          </Text>
          <Box borderWidth="1px" borderRadius="lg" mb={6}>
            <Flex>
              <Select
                h="52px"
                placeholder="Select a token"
                name="toToken"
                size="lg"
                variant="filled"
                ref={register}
              >
                {coins.map(({ ticker }) => (
                  <option key={ticker} value={ticker}>
                    {ticker}
                  </option>
                ))}
              </Select>
              <Input
                isReadOnly
                placeholder="To"
                name="toAmount"
                type="number"
                step="0.000000000000000001"
                size="lg"
                ref={register}
                variant="unstyled"
                textAlign="end"
                mr={6}
              />
            </Flex>
          </Box>

          {watchFromToken && watchToToken ? (
            <>
              <Divider mb={3} />
              <Flex>
                <Text>Rate</Text>
                <Spacer />
                <Text>{`1 ${watchFromToken} = ${midprice} ${watchToToken}`}</Text>
              </Flex>
              <Flex>
                <Text>Gas price (gwei)</Text>
                <Spacer />
                <Text>{gas}</Text>
              </Flex>

              <Divider mt={3} />
            </>
          ) : null}
          <Center>
            <Button
              w="100%"
              h="60px"
              _hover={{ backgroundColor: '#194BB6' }}
              backgroundColor="#205FEC"
              color="white"
              size="lg"
              type="submit"
              mt={6}
              mb={10}
            >
              Swap Tokens
            </Button>
          </Center>
          <Text color="tomato">{errors.fromAmount && 'From Amount is required'}</Text>
        </form>
      </Box>
    </Center>
  );
}