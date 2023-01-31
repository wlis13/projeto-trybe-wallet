import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';
import '../style/wallet.css';

import WalletForm from '../components/WalletForm';

class Wallet extends Component {
  state = {

  };

  render() {
    return (
      <div className="container-wallet">
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default connect()(Wallet);
