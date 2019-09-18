import axios from 'axios';
import { TransactionsResult, CountResult } from "./interfaces";

export interface ClientOpts {
  /**
   * API key. Needed to make any API calls.
   */
  apiKey: string;
}

export default class ChainCacheClient {

  private _apiKey: string;

  private _client: any;

  /**
   * @constructor
   * @param {String} [options.apiKey=null]
   */
  constructor(option: ClientOpts) {
    if (!option.apiKey) {
      throw new Error('api key is required')
    }

    this._apiKey = option.apiKey
    this._client = axios.create({
      baseURL: 'http://localhost:3000/v1',
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    })
  }

  /*-------------------------------------------------------------------------*
   * Public
   *-------------------------------------------------------------------------*/

  public getEthereumTransactionsCount(address: string) : Promise<CountResult> {
    return this.request('get', '/ethereum/transactions/count', { params : { address }})
  }

  public getEthereumTransactions(address: string, limit : number = 50, page : number = 1) : Promise<TransactionsResult> {
    return this.request('get', '/ethereum/transactions', { params : { address, limit, page }})
  }

  public getGnosisTransactionsCount(address: string) : Promise<CountResult> {
    return this.request('get', '/gnosis/transactions/count', { params : { address }})
  }

  public getGnosisTransactions(address: string, limit : number = 50, page : number = 1) : Promise<TransactionsResult> {
    return this.request('get', '/gnosis/transactions', { params : { address, limit, page }})
  }


  public getTokenTransactionsCount(address: string) : Promise<CountResult> {
    return this.request('get', '/token/transactions/count', { params : { address }})
  }

  public getTokenTransactions(address: string, limit : number = 50, page : number = 1) : Promise<TransactionsResult> {
    return this.request('get', '/token/transactions', { params : { address, limit, page }})
  }

  /*-------------------------------------------------------------------------*
   * Private
   *-------------------------------------------------------------------------*/

  /**
   * @private
   * @method request
   * @param {String} method
   * @param {String} url
   * @param {Object} [options.data]
   * @param {Object} [options.params]
   */
  private async request(method, url, { headers = {}, params = {} } : any = {}) {
    params = this.sanitizeParams(params)

    if (this._apiKey) {
      headers.authorization = this._apiKey
    }

    const { data, status } = await this._client.request({ method, url, headers, params })
    if (data.error) {
      throw new Error(data.error)
    }

    if (status >= 300) {
      throw new Error(data.message)
    }

    return data
  }

  /**
   * @private
   * @method sanitizeParams
   * @param {Object} params
   * @return {Object}
   */
  private sanitizeParams(params : any = {}) {
    const obj = {}
    for (const key of Object.keys(params)) {
      if (params[key] === undefined) continue
      obj[key] = params[key]
    }
    return obj
  }
}
