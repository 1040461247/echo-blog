function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = window.crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// function uuid() {
//   const uuid = window.crypto.getRandomValues(new Uint8Array(8))
//   return uuid.toString().split(',').join('')
// }

export default uuid
