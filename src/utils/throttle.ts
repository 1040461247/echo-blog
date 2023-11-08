export default function throttle(fn: (...args: any[]) => any, delay: number) {
  let nextTriggerTime = 0

  return function (this: any, ...args: []) {
    const nowTime = Date.now()
    const canTrigger = nowTime - nextTriggerTime >= delay

    if (canTrigger) {
      nextTriggerTime = nowTime
      fn.apply(this, args)
    }
  }
}
