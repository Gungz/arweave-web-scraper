import React from 'react';

export default function hoc(Component1, Component2, flag, Component3=null, flagComp3=null){
    return function(props){
        let comp3 = "";
        if(props[flagComp3]){
            comp3 = <Component3 />;
        }
        if(props[flag]==null || props[flag]==""){
            return (
                <div className="container">
                    <Component1 {...props} /> {comp3}
                </div>
            );
        }else{
            return (
                <Component2 {...props} />
            );
        }
    }
}