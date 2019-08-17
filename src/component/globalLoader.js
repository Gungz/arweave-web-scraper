import React from 'react';
import Blank from './blank';
import LoadBar from './loadBar';

export default (props) => {
    if(props.globalLoaderVisible){
        return(
            <div className="se-pre-con">
                <LoadBar />
            </div>
        );
    }else{
        return(
            <Blank />
        );
    }
}