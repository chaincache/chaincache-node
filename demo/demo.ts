import ChainCacheClient from '../src/index';

const chainCacheClient = new ChainCacheClient({ apiKey: '123' });

const correctRequest = async () => {
    try {
        const res = await chainCacheClient.getEthereumTransactions('0x58c69aFF4Df980357034eA98AaD35bbF78cBD849', 3);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

const badRequest = async () => {
    try {
        const res = await chainCacheClient.getEthereumTransactions('asd', 7777);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

correctRequest();
badRequest();
