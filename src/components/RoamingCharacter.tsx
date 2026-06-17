import { useEffect, useRef } from 'react'

const FRAME_SIZE = 32
const SCALE = 2
const SIZE = FRAME_SIZE * SCALE
const RUN_SPEED = 160
const IDLE_DIST = 40
const HURT_MS = 400
const ATTACK_MS = 500
const DEATH_CLICKS = 5
const CLICK_WINDOW = 600
const DEATH_MS = 800
const RESPAWN_DELAY = 2000
const ATTACK_COOLDOWN = 3000
const DUST_INTERVAL = 300

type State = 'idle' | 'run' | 'jump' | 'attack' | 'hurt' | 'death'

interface AnimConfig {
  sheet: string
  frames: number
  fps: number
}

const BASE = '/owlet_monster/Owlet_Monster'

const ANIMS: Record<State, AnimConfig> = {
  idle: { sheet: `${BASE}_Idle_4.png`, frames: 4, fps: 4 },
  run: { sheet: `${BASE}_Run_6.png`, frames: 6, fps: 10 },
  jump: { sheet: `${BASE}_Jump_8.png`, frames: 8, fps: 10 },
  attack: { sheet: `${BASE}_Attack1_4.png`, frames: 4, fps: 10 },
  hurt: { sheet: `${BASE}_Hurt_4.png`, frames: 4, fps: 10 },
  death: { sheet: `${BASE}_Death_8.png`, frames: 8, fps: 10 },
}

const DUST_SHEET = '/owlet_monster/Walk_Run_Push_Dust_6.png'
const DUST_FRAMES = 6
const DUST_FPS = 10

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export default function RoamingCharacter() {
  const elRef = useRef<HTMLDivElement>(null)
  const dustRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elRef.current
    const dustEl = dustRef.current
    if (!el || !dustEl) return

    const pad = SIZE * 2

    function randTarget() {
      return {
        x: rand(pad, window.innerWidth - pad),
        y: rand(pad, window.innerHeight - pad),
      }
    }

    let pos = randTarget()
    let mouseX = pos.x
    let mouseY = pos.y
    let state: State = 'idle'
    let dir = 1
    let frame = 0
    let frameTimer = 0
    let dustFrame = 0
    let dustTimer = 0
    let dustActive = false
    let lastTime = performance.now()
    let clickCount = 0
    let clickTimer: ReturnType<typeof setTimeout> | null = null
    let hurtTimeout: ReturnType<typeof setTimeout> | null = null
    let deathTimeout: ReturnType<typeof setTimeout> | null = null
    let attackTimeout: ReturnType<typeof setTimeout> | null = null
    let rAF: number

    function clearTimeouts() {
      if (clickTimer) { clearTimeout(clickTimer); clickTimer = null }
      if (hurtTimeout) { clearTimeout(hurtTimeout); hurtTimeout = null }
      if (deathTimeout) { clearTimeout(deathTimeout); deathTimeout = null }
      if (attackTimeout) { clearTimeout(attackTimeout); attackTimeout = null }
    }

    function applyAnim(s: State) {
      state = s
      frame = 0
      frameTimer = 0
      const cfg = ANIMS[s]
      el.style.backgroundImage = `url(${cfg.sheet})`
      el.style.backgroundSize = `${cfg.frames * SIZE}px ${SIZE}px`
      el.style.backgroundPosition = '0 0'
    }

    function setTransform() {
      el.style.transform = `translate(${pos.x}px, ${pos.y}px) scaleX(${dir})`
    }

    function spawnDust() {
      dustActive = true
      dustFrame = 0
      dustTimer = 0
      dustEl.style.display = 'block'
      dustEl.style.backgroundImage = `url(${DUST_SHEET})`
      dustEl.style.backgroundSize = `${DUST_FRAMES * SIZE}px ${SIZE}px`
      dustEl.style.backgroundPosition = '0 0'
      dustEl.style.transform = `translate(${pos.x - SIZE * 0.2}px, ${pos.y + SIZE * 0.6}px)`
    }

    function scheduleAttack() {
      if (attackTimeout) clearTimeout(attackTimeout)
      attackTimeout = setTimeout(() => {
        if (state === 'idle') {
          applyAnim('attack')
          attackTimeout = setTimeout(() => {
            if (state === 'attack') applyAnim('idle')
            scheduleAttack()
          }, ATTACK_MS)
        } else {
          scheduleAttack()
        }
      }, rand(ATTACK_COOLDOWN, ATTACK_COOLDOWN * 3))
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function handleClick() {
      if (state === 'death') return

      clickCount++
      if (clickTimer) clearTimeout(clickTimer)
      clickTimer = setTimeout(() => { clickCount = 0 }, CLICK_WINDOW)

      if (clickCount >= DEATH_CLICKS) {
        clickCount = 0
        clearTimeouts()
        applyAnim('death')
        deathTimeout = setTimeout(() => {
          el.style.opacity = '0'
          dustEl.style.display = 'none'
          setTimeout(() => {
            pos = randTarget()
            mouseX = pos.x
            mouseY = pos.y
            setTransform()
            el.style.opacity = '1'
            scheduleAttack()
            applyAnim('idle')
          }, RESPAWN_DELAY)
        }, DEATH_MS)
        return
      }

      clearTimeouts()
      applyAnim('hurt')
      hurtTimeout = setTimeout(() => {
        applyAnim('idle')
        scheduleAttack()
      }, HURT_MS)
    }

    applyAnim('idle')
    setTransform()
    scheduleAttack()

    document.addEventListener('mousemove', onMouseMove)
    el.addEventListener('click', handleClick)

    function tick(time: number) {
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      const cfg = ANIMS[state]
      frameTimer += dt
      const frameDur = 1 / cfg.fps
      if (frameTimer >= frameDur) {
        frameTimer -= frameDur
        frame = (frame + 1) % cfg.frames
        el.style.backgroundPosition = `-${frame * SIZE}px 0`
      }

      if (state === 'run' || state === 'jump' || state === 'idle') {
        const dx = mouseX - pos.x
        const dy = mouseY - pos.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < IDLE_DIST) {
          if (state !== 'idle') {
            applyAnim('idle')
            scheduleAttack()
          }
        } else {
          dir = dx > 0 ? 1 : -1
          const speed = RUN_SPEED * dt
          pos.x += (dx / dist) * speed
          pos.y += (dy / dist) * speed
          setTransform()

          const wanted = dy < -15 ? 'jump' : 'run'
          if (state !== wanted) applyAnim(wanted)
        }
      }

      // Dust
      if (state === 'run') {
        dustTimer += dt * 1000
        if (!dustActive && dustTimer >= DUST_INTERVAL) {
          dustTimer = 0
          spawnDust()
        }
      } else if (state !== 'jump') {
        dustActive = false
        dustEl.style.display = 'none'
      }

      if (dustActive) {
        dustTimer += dt * 1000
        const dustDur = 1000 / DUST_FPS
        if (dustTimer >= dustDur) {
          dustTimer -= dustDur
          dustFrame++
          if (dustFrame >= DUST_FRAMES) {
            dustActive = false
            dustEl.style.display = 'none'
          } else {
            dustEl.style.backgroundPosition = `-${dustFrame * SIZE}px 0`
          }
        }
      }

      rAF = requestAnimationFrame(tick)
    }

    rAF = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rAF)
      clearTimeouts()
      document.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <>
      <div
        ref={dustRef}
        style={{
          position: 'fixed',
          zIndex: 9998,
          pointerEvents: 'none',
          width: SIZE,
          height: SIZE,
          imageRendering: 'pixelated',
          backgroundRepeat: 'no-repeat',
          display: 'none',
        }}
      />
      <div
        ref={elRef}
        style={{
          position: 'fixed',
          zIndex: 9999,
          width: SIZE,
          height: SIZE,
          imageRendering: 'pixelated',
          backgroundRepeat: 'no-repeat',
          cursor: 'pointer',
          transition: 'opacity 0.4s',
        }}
      />
    </>
  )
}
