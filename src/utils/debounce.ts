export default function decounce(fn: (...args: any[]) => any, duration: number) {
  let timer: NodeJS.Timeout | null = null

  return function (...args: any[]) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, duration)
  }
}
