import React, { useEffect } from 'react';
import arweave from '../util/arweave_util';
import { TRANSACTION_ACCEPTED } from '../util/constant';

export default (props) => {

    useEffect(() => {
        const interval = setInterval(() => {
            arweave.transactions.getStatus(props.transactionId).then(status => {
                console.log(status);
                if(status.status == TRANSACTION_ACCEPTED){
                    props.setTransactionId("");
                    props.refreshDocList();
                    props.refreshBalance();
                }else if(String(status.status).startsWith("4")){
                    alert("Transaction " + props.transactionId + " failed, please try again.");
                    props.setTransactionId("");
                    props.refreshDocList();
                    props.refreshBalance();
                }
            });
        }, 10000);
        return () => clearInterval(interval);
    }, []);
      
    return (
        <div className="container">
            <h6 className="text-danger"> <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span> Transaction <strong>{props.transactionId}</strong> pending</h6>
        </div>
    );
}