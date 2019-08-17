import React from 'react';
import { ARWEAVE_URL } from '../util/constant';
import Blank from './blank';

export default (props) => {
    const docList = props.documentList.map((doc) => {
        return (
            <div className="row" key={doc}>
                <a href={`${ARWEAVE_URL}/${doc}`} target="_blank">{doc}</a> 
            </div>
        );
    });
    if(props.visible){
        return (
            <div className="container">
                <h3>Your Permaweb-stored Web Page</h3>
                { docList }
            </div>
        );
    }else {
        return (
            <Blank />
        );
    }
}