/**
 * 拼接请求字符串
 * @param {Object} params 请求参数集合
 * @returns query 字符串，例如：a=sdfsdf&b=asdfasd
 */
export function toQuery (params = {}) {
    const queryList = Object.entries(params)
        .filter(([key, value]) => !!value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    return queryList.join('&')
}