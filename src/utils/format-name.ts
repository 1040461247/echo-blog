function formatName(name: string) {
  // 例：将"JavaScript Demo"格式化为"javascript-demo"
  return name.toLowerCase().replaceAll(' ', '-')
}

export default formatName
