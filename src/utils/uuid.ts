function uuid() {
  const uuid = window.crypto.getRandomValues(new Uint8Array(8))
  return uuid.toString().split(',').join('')
}

export default uuid
