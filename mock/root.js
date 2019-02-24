/* eslint-disable */

// http://mockjs.com/examples.html
import Mock from 'mockjs'

//
//
export const delay = 0
export const disabled = false
//
//
export default {
  //
  'GET /getDataList': (req, res, next) => {
    const { query } = req
    let data = null
    switch (query.type) {
      case 'letter':
        data = Mock.mock({
          'array|10-20': [{ id: '@id', value: '@character("lower")' }]
        }).array
        break
      case 'number':
        data = Mock.mock({
          'array|10-20': [{ id: '@id', value: '@integer(0, 100)' }]
        }).array
        break
      default:
        data = []
    }
    return data
  }
}
