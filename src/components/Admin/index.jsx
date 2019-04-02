import React, { Component } from 'react';
import Search from './Search';
import Info from './Info';
import utils from '../../utils';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // inital state
      isClickedAddCustomer: false,
      isClickedCustomer: false,
      // 로그인 성공시 받아오는 정보
      STORE_ID: 2, // 매장 ID. 적립된 쿠폰 수 조회 및 손님등록시 필요
      REQUIRED: 10, // 필요 쿠폰 수
      // 손님 클릭시 가져올 정보
      couponsCount: 1 // 적립한 쿠폰 수
    };
  }

  clickAddCustomer = () => {
    this.setState({
      isClickedAddCustomer: true,
      isClickedCustomer: false
    });
  };

  clickCustomer = id => {
    utils
      .fetchPostData('/stores/coupons/get-coupons-count', {
        customerID: id,
        storeID: this.state.STORE_ID
      })
      .then(response => {
        this.setState({
          isClickedAddCustomer: false,
          isClickedCustomer: true,
          couponsCount: response.count
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { clickAddCustomer, clickCustomer } = this;
    const {
      isClickedAddCustomer,
      isClickedCustomer,
      couponsCount,
      REQUIRED
    } = this.state;
    return (
      <div className="container outerHeight">
        <div className="row outerHeight">
          <Search
            clickAddCustomer={clickAddCustomer}
            clickCustomer={clickCustomer}
          />
          <Info
            isClickedAddCustomer={isClickedAddCustomer}
            isClickedCustomer={isClickedCustomer}
            counts={{ count: couponsCount, REQUIRED }}
          />
        </div>
      </div>
    );
  }
}
