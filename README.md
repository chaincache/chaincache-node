# chaincache-node

Nodejs client for ChainCache API

# Installation:
```bash
npm install --save chaincache-node
```

# Use

Import the library using `require`

```js
const chaincache = require('chaincache-node')
```

or ES6 `import`

```js
import ChaincacheClient from 'chaincache-node'
```

Examples

```js
const chainCacheClient = new ChainCacheClient({ apiKey: '...' });

await chainCacheClient.getEthereumTransactionsCount('0x...');
await chainCacheClient.getEthereumTransactions('0x...', 10, 1);

await chainCacheClient.getGnosisTransactionsCount('0x...');
await chainCacheClient.getGnosisTransactions('0x...', 10, 1);

await chainCacheClient.getTokenTransactionsCount('0x...');
await chainCacheClient.getTokenTransactions('0x...', 10, 1);

```
