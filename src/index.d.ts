import { TransactionsResult, CountResult } from "./interfaces";
export interface ClientOpts {
    /**
     * API key. Needed to make any API calls.
     */
    apiKey: string;
}
export default class ChainCacheClient {
    private _apiKey;
    private _client;
    /**
     * @constructor
     * @param {String} [options.apiKey=null]
     */
    constructor(option: ClientOpts);
    getEthereumTransactionsCount(address: string): Promise<CountResult>;
    getEthereumTransactions(address: string, limit?: number, page?: number): Promise<TransactionsResult>;
    getGnosisTransactionsCount(address: string): Promise<CountResult>;
    getGnosisTransactions(address: string, limit?: number, page?: number): Promise<TransactionsResult>;
    getTokenTransactionsCount(address: string): Promise<CountResult>;
    getTokenTransactions(address: string, limit?: number, page?: number): Promise<TransactionsResult>;
    /**
     * @private
     * @method request
     * @param {String} method
     * @param {String} url
     * @param {Object} [options.data]
     * @param {Object} [options.params]
     */
    private request;
    /**
     * @private
     * @method sanitizeParams
     * @param {Object} params
     * @return {Object}
     */
    private sanitizeParams;
}
