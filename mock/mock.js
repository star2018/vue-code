// mockjs内置的数据生成规则函数
// @boolean         @boolean(1, 9, true)
// @natural         @natural(60, 100)
// @integer         @integer(60, 100)
// @float           @float(60, 100, 3, 5)
// @character       @character("lower")   @character("upper")   @character("number")   @character("symbol")
// @string          @string(7, 10)   @string("lower", 5)   @string("upper", 5)   @string("number", 5)   @string("symbol", 5)
// @range           @range(3, 7)     @range(1, 10, 3)
// @date("yyyy-MM-dd")    @date("yy-MM-dd")   @date("y-M-d")
// @time  @time("A HH:mm:ss")   @time("a HH:mm:ss")   @time("H:m:s")
// @datetime  @datetime("yyyy-MM-dd A HH:mm:ss")  @datetime("y-MM-dd HH:mm:ss")  @datetime("y-M-d H:m:s")
// @now
// @color           @hex  @rgb   @rgba   @hsl
// @paragraph       @paragraph(1, 3)
// @sentence        @sentence(3, 5)
// @word            @word(3, 5)
// @title           @title(3, 5)
// @cparagraph      @cparagraph(1, 3)
// @csentence       @csentence(3, 5)
// @cword           @cword(3, 5)          @cword("零一二三四五六七八九十", 5, 7)
// @ctitle          @ctitle(3, 5)
// @first           @last
// @cfirst          @clast
// @name            @cname
// @url             @domain       @protocol     @ip
// @email
// @province        @city       @city(true)
// @county          @county(true)
// @zip
// @guid            @id         @increment

// http://mockjs.com/examples.html
import Mock from 'mockjs'

// 当前模块内的接口返回延时定义（优先级高于全局定义）
export const delay = 50
// 是否禁用当前模块的接口mock
export const disabled = false
// 是否定位接口在代码中的位置
export const locate = false

const path = 'my-api'

// 可自由使用es6语法
export default {
  // API拦截格式为"method api"(请求方法，api地址)
  // 使用函数值时，三个参数，分别为请求对象，返回对象，以及中间件的next调用方法
  // 直接调用next，该接口被转发至代理服务器
  'GET /my-api/remote': (req, res, next) => next(),

  // 可以使用mockjs来辅助生成数据
  'GET /my-api/names': Mock.mock({
    'list|100': [{ name: '@name', 'value|1-100': 150, 'type|0-2': 1 }]
  }),

  // 也可以直接返回固定的数据
  [`POST /${path}/save`]: () => ({
    state: 1,
    message: '成功'
  }),

  // 可通过res自行处理数据返回等
  'GET /my-api/other'(req, res) {
    // 如果方法返回了不为undefined的值，会被mock服务以res.json()调用来返回给浏览器
    // 另外，方法也可以返回一个Promise，mock服务会将该Promise的resolve值作为数据返回给浏览器
    // return Promise.resolve({ success: true })
    // 也可以自己调用res返回数据
    res.json({ success: true })
  },

  // restful api，可以使用[:param]形式来捕获路径参数
  'POST /my-api/:id': (req) => {
    //
    const { params, query, body } = req
    const { name } = body // body为post等请求发送的内容
    const { pageIndex } = query // query为URL查询参数
    const { id } = params // params为RESTFUL接口路径中的动态参数
    // params 为get请求时的url查询参数
    // body 为post请求时发送的数据
    // 可以使用这些参数做动态返回
    if (pageIndex === 1) {
      return [{ name, id }]
    } else {
      return [{ name: 'boo', id }]
    }
  }
}

// Mock示例
Mock.mock({
  'data|1-10': [
    {
      id: '@id',
      name: '@cname(2, 4)'
    }
  ],
  count() {
    return this.data.length
  }
})
