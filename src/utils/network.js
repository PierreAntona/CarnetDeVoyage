import * as Network from 'expo-network';

const checkNetworkStatus = async () => {
    const networkState = await Network.getNetworkStateAsync();
    setNetwork(networkState.isConnected)
    console.log('Connectivité réseau :', networkState.isConnected);
  };

  export { checkNetworkStatus }