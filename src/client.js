const axios = require('axios')
const https = require('https')

class ChainCacheClient {

  /**
   * @constructor
   * @param {String} [options.apiKey=null]
   */
  constructor({ apiKey = null, keepAlive = true } = {}) {
    this._apiKey = apiKey
    this._client = axios.create({
      baseURL: 'http://localhost:3000/v1',
      httpsAgent: new https.Agent({ keepAlive })
    })
  }

  /*-------------------------------------------------------------------------*
   * Public
   *-------------------------------------------------------------------------*/

  async getEthereumTransactionsCount(address) {
    return this.request('get', '/ethereum/transactions/count', { params : { address }})
  }

  async getEthereumTransactions(address) {
    return this.request('get', '/ethereum/transactions', { params : { address }})
  }

  async getGnosisTransactionsCount(address) {
    return this.request('get', '/gnosis/transactions/count', { params : { address }})
  }

  async getGnosisTransactions(address) {
    return this.request('get', '/gnosis/transactions', { params : { address }})
  }


  async getTokenTransactionsCount(address) {
    return this.request('get', '/token/transactions/count', { params : { address }})
  }

  async getTokenTransactions(address) {
    return this.request('get', '/token/transactions', { params : { address }})
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
  async request(method, url, { headers = {}, params = {} } = {}) {
    params = this.sanitizeParams(params)

    if (this._apiKey) {
      headers.authorization = this._apiKey
    }

    const { data } = await this._client.request({ method, url, headers, params })

    if (!data.success) {
      throw new Error(data.message)
    }

    return data.result
  }

  /**
   * @private
   * @method sanitizeParams
   * @param {Object} params
   * @return {Object}
   */
  sanitizeParams(params = {}) {
    const obj = {}
    for (const key of Object.keys(params)) {
      if (params[key] === undefined) continue
      obj[key] = params[key]
    }
    return obj
  }
}

module.exports = ChainCacheClient
