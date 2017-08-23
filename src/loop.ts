const raf = window.requestAnimationFrame
export class Loop {
  private paused = false
  private looper: (now: number) => void
  private time: number
  constructor (private cb: (dt: number) => void) {
    this.looper = (now: number) => {
      if (now < 0) now = 0
      let dt = now - this.time
      if (dt < 0) dt = 0
      this.cb(dt)
      this.time = now
      if (!this.paused) {
        raf(this.looper)
      }
    }
  }

  pause () {
    this.paused = true
  }

  unpause () {
    this.paused = false
    this.loop()
  }

  loop () {
    this.time = Date.now()
    raf(this.looper)
  }
}

export function loop (cb: (dt: number) => void) {
  let l = new Loop(cb)
  l.loop()
}
