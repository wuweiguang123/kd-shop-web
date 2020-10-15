import { get, post } from './httpRequest'

// 获取首页分类信息
export function catelogs(params) {
  return get('catelog/catelogList')
}

export function addGoods(params) {
  return post('good/add', params)
}
