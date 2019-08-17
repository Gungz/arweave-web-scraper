import React from 'react';
import { Button } from 'reactstrap';
import arweave from '../util/arweave_util';
import { APP_NAME } from '../util/constant';


export default (props) => {

    const notAddToPermaweb = () => {
        props.setScrapeResult("");
        props.setSearch("");
        props.toggleDocList(true);
    }

    async function addToPermaWeb() {
        props.setGlobalLoaderVisible(true);
        let transaction = await arweave.createTransaction({
            data: props.scrapeResult,
        }, props.jwk);
        transaction.addTag('application', APP_NAME);
        await arweave.transactions.sign(transaction, props.jwk);
        const response = await arweave.transactions.post(transaction);
        //console.log(response);
        //console.log(transaction);
        if(response.status == 200){
            props.setTransactionId(transaction.id);
            alert("Transaction successfully posted.. Please wait before you do another transaction. The Submit button will be re-enabled once the transaction is mined into Permaweb..");
        }else{
            alert(response.data);
        }        
        
        props.setSearch("");
        props.setScrapeResult(""); 
        props.setGlobalLoaderVisible(false);
        props.refreshDocList();    
    }

    return (
        <span> 
            &nbsp; &nbsp; Add to Permaweb ? &nbsp; &nbsp;
            <Button type="button" color="primary" onClick={() => addToPermaWeb()}>
                Yes
            </Button> &nbsp; 
            <Button type="button" color="danger" onClick={() => notAddToPermaweb()}>
                No
            </Button>
        </span>
    );
}