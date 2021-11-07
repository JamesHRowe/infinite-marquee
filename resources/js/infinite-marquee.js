import gsap from 'gsap'
import { debounce, isNull } from 'lodash'
import { defaults } from './config'

export default class InfiniteMarquee {
  constructor(options = {}) {
    this.options = { ...defaults, ...options }
    this.animation = null

    try {
      this.getDom()

      this.fillCount = this.getFillCount()

      if (this.options.css) {
        this.fillContainerCss()
      } else {
        this.fillContainerJs()
      }

      this.animate()

      if (!this.options.disableResize) {
        this.addResize()
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Get DOM
  getDom() {
    if (isNull(this.options.el))
      throw new Error('Infinite Marquee: el not found')

    this.dom = {
      el: this.options.el,
      inner: this.options.el.querySelector('.marquee-inner'),
      content: this.options.el.querySelector('.marquee-content')
    }

    if (isNull(this.dom.inner))
      throw new Error('Infinite Marquee: inner not found')
    if (isNull(this.dom.content))
      throw new Error('Infinite Marquee: content not found')
  }

  // Update
  update() {
    this.dom.content = this.options.el.querySelector('.marquee-content')

    const count = this.getFillCount()

    if (count === this.fillCount) return

    this.fillCount = count

    if (this.options.css) {
      this.fillContainerCss()
    } else {
      this.fillContainerJs()
    }
  }

  // Add internal resize event
  addResize() {
    const resizeHandle = debounce(this.onResize.bind(this), 150)
    window.addEventListener('resize', resizeHandle, { passive: true })
  }

  // Get fill count using content and container dimensions
  getFillCount() {
    const containerWidth = this.dom.el.offsetWidth
    const contentWidth = this.dom.content.offsetWidth

    // How many content items it takes to fill the container (doubled if JS so animation can loop infinitely)
    if (this.options.css) {
      return Math.ceil(containerWidth / contentWidth)
    } else {
      return Math.ceil(containerWidth / contentWidth) * 2
    }
  }

  // Create and append JS DOM
  fillContainerJs() {
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < this.fillCount; i++) {
      const contentClone = this.dom.content.cloneNode(true)
      fragment.appendChild(contentClone)
    }

    this.dom.inner.innerHTML = ''

    this.dom.inner.appendChild(fragment)
  }

  // Create and append CSS DOM
  fillContainerCss() {
    const fragment = document.createDocumentFragment()
    const innerClone = this.dom.inner.cloneNode()

    innerClone.style.setProperty(
      'animation-duration',
      `${this.options.duration}s`
    )

    for (let i = 0; i < this.fillCount; i++) {
      const contentClone = this.dom.content.cloneNode(true)
      innerClone.appendChild(contentClone)
    }

    fragment.appendChild(innerClone)
    fragment.appendChild(innerClone.cloneNode(true))

    this.dom.el.innerHTML = ''

    this.dom.el.appendChild(fragment)
  }

  // Create marquee animation
  animate() {
    if (this.options.css) {
      this.dom.el.classList.add(
        this.options.direction === 'left' ? 'marquee-left' : 'marquee-right'
      )
    } else {
      this.animation = gsap.fromTo(
        this.dom.inner,
        {
          x: this.options.direction === 'left' ? 0 : '-50%'
        },
        {
          duration: this.options.duration,
          repeat: -1,
          x: this.options.direction === 'left' ? '-50%' : 0,
          ease: 'linear'
        }
      )
    }
  }

  // Update when resized
  onResize() {
    this.update()
  }
}
