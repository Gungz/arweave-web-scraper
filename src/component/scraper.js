import React, { useState } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Row, Col, Label } from 'reactstrap';
import hoc from './hoc';
import blank from './blank';
import addToPermaweb from './addToPermaweb';
import loadBar from './loadBar';

export default React.memo((props) => {
    const [scrapeResult, setScrapeResult] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(null);
    const AddToPermaweb = hoc(blank, addToPermaweb, "scrapeResult", loadBar, "loading");

    const handleScrape = (values) => {
        setScrapeResult("");
        setLoading(true);
        fetch(values.url)
          .then(response => response.text())
          .then(data => {
            setScrapeResult(data);
            setLoading(false);
            props.toggleDocList(false);
           })
          .catch(error => {
            alert(error);
            setLoading(false);
            props.toggleDocList(true);
        });
    }

    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    const validUrl = (val) => /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(val);
    const required = (val) => val && val.length;

    return (
        <div className="container">
            <div className="row">
                <LocalForm name="scrapeForm" onSubmit={(values) => handleScrape(values)}>
                    <Row className="form-group">
                        <Label htmlFor="url" xs={12}>Enter Web Page to Scrape</Label>
                        <Col xs={12}>
                        <Control.text model=".url" id="url" name="url"
                            placeholder="https://example.com"
                            className="form-control"
                            validators={{
                                required, minLength: minLength(10), maxLength: maxLength(300), validUrl
                            }} value={search} onChange={(e) => setSearch(e.target.result)}
                            />
                        <Errors
                            className="text-danger"
                            model=".url"
                            show="touched"
                            messages={{
                                required: 'Required; ',
                                minLength: 'Must be greater than 10 characters; ',
                                maxLength: 'Must be 300 characters or less; ',
                                validUrl: 'Must be web page'
                            }}
                        />                                      
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col xs={{size:12}}>
                            <Button type="submit" color="primary" disabled={props.transactionId!=""}>
                                Submit
                            </Button> <AddToPermaweb scrapeResult={scrapeResult} setScrapeResult={setScrapeResult} setSearch={setSearch} loading={loading} setLoading={setLoading} {...props} />
                        </Col>
                    </Row>
                </LocalForm>
            </div>
            <div className="row">
                {scrapeResult}
            </div>
        </div>
    );
})