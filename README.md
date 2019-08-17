# Arweave Web Page Scraper

This is a simple React Web Application that lets you enter a web page that you want to scrape (only if the destination web server allows you fetch the content e.g. the destination web server allows cross-origin request, otherwise you will get an error). One hint for content to be scraped is that normally Github raw content allows to be scraped - for example: https://raw.githubusercontent.com/ArweaveTeam/arweave-js/master/README.md. 

Run `npm start` to start a development server on `http://localhost:8080/`.

Run `npm run build` to package your app in a single HTML file that you will find at `dist/index.html`.

## How to Use the App
1. When you open the app, you will be presented with a page to upload your AR JSON Web Key to login, upload your JSON Web Key.
2. You will then be presented with a page that shows your address and your balance and a text box to enter the web page URL you want to scrape and insert to Arweave.
3. On the same page if you have ever posted a content to Arweave via this web app, the previously uploaded documents will also be shown to you.
4. After you enter URL and click Submit, you will be asked if you want to push the content to Arweave or not.
5. Click "Yes" and there'll be an alert that says either your "Transaction already processed" or "Transaction Transaction successfully posted" and you have to wait until it is mined into Permaweb before you can continue submitting another one. It may also happen you get error like "Transaction Verification failed" if the account you use doesn't have enough AR to process the transaction.
6. On the main page you are redirected to after your transaction is posted, you can see a message showing "Transaction Pending" and only after the transaction is mined, the document will be displayed in the main "Permaweb-stored Web Page list"  and then you can start submitting again.

## Credit
This web app is developed by extending [react-inline-source-starter](https://github.com/ArweaveTeam/react-inline-source-starter).