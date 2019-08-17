import React, { useState, useEffect }  from 'react';
import arweave from './util/arweave_util';
import hoc from './component/hoc'
import upload from './component/upload'
import loginInfo from './component/loginInfo';
import Header from './component/header';
import blank from './component/blank';
import { APP_NAME } from './util/constant';
import loadBar from './component/loadBar';
import docs from './component/docs';
import GlobalLoader from './component/globalLoader';
import Scrape from './component/Scrape';
import trxStatus from './component/trxStatus';

export default () => {
    const [address, setAddress] = useState(null);
    const [jwk, setJwk] = useState(null);
    const [balance, setBalance] = useState(0);
    const [docList, setDocList] = useState({documentList: [], loadProgress: false, visible: true});
    const Login = hoc(upload, loginInfo, "address");
    const DocumentList = hoc(blank, docs, "documentList", loadBar, "loading");
    const [globalLoaderVisible, setGlobalLoaderVisible] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const TransactionStatus = hoc(blank, trxStatus, "transactionId");
    
    const refreshDocList = () => {
        setDocList(prevDocList => ({
            ...prevDocList,
            loadProgress: true,
            documentList: [],
            visible: false
        }));
        arweave.arql({
            op: "and",
            expr1: {
                op: "equals",
                expr1: "from",
                expr2: address
            },
            expr2: {
                op: "equals",
                expr1: "application",
                expr2: APP_NAME
            }
        }).then(trxIds => {
            setDocList(prevDocList => ({
                ...prevDocList,
                loadProgress: false,
                documentList: trxIds,
                visible: true
            }));
        });
    };

    const toggleDocList = (val) => {
        setDocList(prevDocList => ({
            ...prevDocList,
            visible: val
        }));
    }

    const refreshBalance = () => {
        arweave.wallets.getBalance(address).then((balance) => {
            let ar = arweave.ar.winstonToAr(balance);
            setBalance(ar);                
        });
    }
    
    useEffect(()=>{
        if(address!=null){
            refreshBalance();
            refreshDocList();
        }
    }, [address]);

    return (
        <div>
            <GlobalLoader globalLoaderVisible={globalLoaderVisible} />
            <Header />
            <Login address={address} setAddress={setAddress} setJwk={setJwk} balance={balance} />
            <Scrape address={address} jwk={jwk} toggleDocList={toggleDocList} refreshDocList={refreshDocList} setGlobalLoaderVisible={setGlobalLoaderVisible} setTransactionId={setTransactionId} transactionId={transactionId} />
            <TransactionStatus transactionId={transactionId} refreshDocList={refreshDocList} setTransactionId={setTransactionId} refreshBalance={refreshBalance} />
            <DocumentList documentList={docList.documentList} loading={docList.loadProgress} visible={docList.visible} />
        </div>
    );
}