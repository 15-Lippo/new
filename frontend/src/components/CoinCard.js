<<<<<<< HEAD
<<<<<<< HEAD
import { Box, Text, Image, Flex } from '@chakra-ui/react';
import React from 'react';

export default function CoinCard() {
  return (
    <Box boxShadow="base" w="100px" h="100px" p={3}>
      <Flex direction="row-reverse" mb={3}>
        <Image src="/static/eth.png" alt="eth-logo" />
      </Flex>
      <Text fontSize="xs" opacity={0.7}>
        Ethereum
      </Text>
      <Text fontSize="md">3.49 ETH</Text>
=======
=======
import { Box, Text, Image, Flex } from '@chakra-ui/react';
>>>>>>> f875f80 (finish my wallet view)
import React from 'react';

export default function CoinCard() {
  return (
<<<<<<< HEAD
    <Box boxShadow="base" w="100px" h="100px">
      <Text>Ethereum</Text>
      <Text>3.495 ETH</Text>
>>>>>>> 951a98a (Add exchanges view and wallet view (#11))
=======
    <Box boxShadow="base" w="100px" h="100px" p={3}>
      <Flex direction="row-reverse" mb={3}>
        <Image src="/static/eth.png" alt="eth-logo" />
      </Flex>
      <Text fontSize="xs" opacity={0.7}>
        Ethereum
      </Text>
      <Text fontSize="md">3.49 ETH</Text>
>>>>>>> f875f80 (finish my wallet view)
    </Box>
  );
}
