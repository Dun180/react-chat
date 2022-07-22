export class Result {
  static succ = (data) => {
    return {
      code: 200,
      msg: '操作成功',
      data: data
    }
  }
  static fail = (msg) => {
    return {
      code: 500,
      msg: msg
    }
  }
}
