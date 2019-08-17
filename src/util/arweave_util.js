import Arweave from 'arweave/web';
import { ARWEAVE_HOST, PROTOCOL } from './constant'

const arweave = Arweave.init({
    host: ARWEAVE_HOST,// Hostname or IP address for a Arweave node
    port: 443,           // Port, defaults to 1984
    protocol: PROTOCOL,  // Network protocol http or https, defaults to http
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: false     // Enable network request logging
});

export default arweave;