import { ChakraProvider, extendTheme, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ExchangesTable from './components/ExchangesTable';
import FullPageErrorFallback from './components/FullPageErrorFallback';
import MyWallet from './components/MyWallet';
import NavBar from './components/NavBar';
import SwapForm from './components/SwapForm';

function App() {
  const config = {
    useSystemColorMode: false,
    initialColorMode: 'light',
  };
  const [fromToken, setFromToken] = React.useState('');
  const [toToken, setToToken] = React.useState('');
  const [tabIndex, setTabIndex] = React.useState(0);

  const customTheme = extendTheme({ config });
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
        <NavBar setTabIndex={setTabIndex} />
        <Grid h="100%" templateColumns="repeat(3, 1fr)" gap={4} mt={3}>
          <GridItem colSpan={2} bg="white" p={6}>
            {tabIndex === 0 ? <ExchangesTable fromToken={fromToken} toToken={toToken} /> : null}
            {tabIndex === 2 ? <MyWallet /> : null}
          </GridItem>
          <GridItem colSpan={1}>
            <SwapForm setFromToken={setFromToken} setToToken={setToToken} />
          </GridItem>
        </Grid>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
