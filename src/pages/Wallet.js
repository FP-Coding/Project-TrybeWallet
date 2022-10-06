import React from 'react';
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';
import Table from '../components/Table';
import ContainerWallet from './css/Wallet.styled';

class Wallet extends React.Component {
  render() {
    return (
      <ContainerWallet>
        <Header />
        <WalletForm />
        <Table />
      </ContainerWallet>
    );
  }
}

export default Wallet;
