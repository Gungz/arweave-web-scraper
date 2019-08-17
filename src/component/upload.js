import React from 'react';
import arweave from './../util/arweave_util'

export default (props) => {
    let myref = null;

    const onFileSelected = (e) => {
        e.preventDefault();
        let input = myref;
        var url = input.value;
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && ext == "json") {
            var reader = new FileReader();
    
            reader.onload = function (event) {
                //console.log(event.target.result);
                let jwk = JSON.parse(event.target.result);
                if(jwk.n){
                    arweave.wallets.jwkToAddress(jwk).then((address) => {
                        props.setAddress(address);
                        props.setJwk(jwk);
                    });
                }else{
                    alert("The uploaded file is not Arweave JSON Web Key.");
                }
            }

            reader.onerror = function(event) {
                console.error("File could not be read! Code " + event.target.error.code);
            };

            reader.readAsText(input.files[0]);
        }else{
            alert("The uploaded file must be json file.");
        }
    }
    
    return (
      <div className="container">
        <br />
        <h2>Hello, please upload your key file to start using the app</h2>
        <input className="marginTop-1Pct" id='key-input' ref={(r) => { myref=r }} type='file' onChange={onFileSelected} />
      </div>
    );
}