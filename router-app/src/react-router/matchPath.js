import { pathToRegexp } from 'path-to-regexp'

/**
 * 匹配路径
 * @param {*} pathname 当前路径
 * @param {*} options Route属性
 *                    path
 *                    component
 *                    exact
 */
export default function matchPath(pathname, options) {
  const { path, exact = false, strict = false, sensitive = false } = options

  const { keys, regexp } = compilePath(path, { end: exact, strict, sensitive })

  const match = pathname.match(regexp)
  if (!match) {
    return null
  }

  const [url, ...values] = match
  const isExact = path === pathname

  if (exact && !isExact) {
    return null
  }

  return {
    // 来自Route的path
    path,
    // 来自浏览器url
    url,
    // 是否精确匹配
    isExact,
    // 参数
    // /home/:id/:name
    params: keys.reduce((memo, key, index) => ({
      ...memo,
      [key.name]: values[index]
    }), {})
  }
}

function compilePath(path, options) {
  const keys = []
  const regexp = pathToRegexp(path, keys, options)
  return {
    regexp,
    keys
  }
}