import React from 'react';

export default (props) => {

    return (
        <div className="container">
            <div className="row">
                &nbsp;
            </div>
            <div className="row">
                <p>Your address is {props.address}, your balance is {props.balance} AR</p>
            </div>
            <div className="row">
                <p>Click <a href="#" onClick={(e) => {e.preventDefault(); if(props.transactionId=="") {props.setAddress(null)} else {alert("Can't change address while transaction is pending")};}}>here</a> to change address</p>            
            </div>
        </div>
    );
}