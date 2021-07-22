// 匹配分组捕获
// [ '1ab', 'a', 'b', index: 0, input: '1ab', groups: undefined ]
console.log('1ab'.match(/1([a-z])([a-z])/))

// 非匹配分组
// [ '1ab', 'b', index: 0, input: '1ab', groups: undefined ]
console.log('1ab'.match(/1(?:[a-z])([a-z])/))

