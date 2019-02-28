const data = {
  str: 'Hello World'
}

class Dep {
  constructor() {
    this.subscribers = new Set()
  }
  // 订阅的函数列表
  depend() {
    if (cb) {
      this.subscribers.add(cb)
    }
  }
  // 通知所有函数重新运行
  notify() {
    this.subscribers.forEach(s => s())
  }
}

let cb = null
function dataListener(callback) {
  const run = () => {
    cb = run
    callback()
    cb = null
  }
  run()
}

// 观察(数据的状态)
function observe(obj) {
  Object.keys(obj).forEach(key => {
    let iv = obj[key]
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      // 注册订阅者
      get() {
        dep.depend()
        return iv
      },
      // 通知
      set(nv) {
        const changed = iv !== nv
        iv = nv
        if (changed) {
          dep.notify()
        }
      }
    })
  })
}

export { data, Dep, observe, dataListener }
