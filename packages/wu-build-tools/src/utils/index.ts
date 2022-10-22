// 将 snake_case 转为 camelCase
function snake2camel (key: string) {
    return key.replace(/-([a-z])/g, (p, m) => m.toUpperCase())
}

export {
    snake2camel
}
  