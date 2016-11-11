/* global lib */

'use strict'

import './image.css'

const DEFAULT_SIZE = 200
const RESIZE_MODES = ['stretch', 'cover', 'contain']
const DEFAULT_RESIZE_MODE = 'stretch'

/**
 * resize: 'cover' | 'contain' | 'stretch', default is 'stretch'
 * src: url
 */
const proto = {
  create () {
    const node = document.createElement('div')
    node.classList.add('weex-img')
    node.classList.add('weex-element')
    return node
  },

  clearAttr () {
    this.src = ''
    this.node.style.backgroundImage = ''
  }
}

const attr = {
  src: function (val) {
    if (!this.src) {
      this.src = lib.img.defaultSrc
      this.node.style.backgroundImage = 'url(' + this.src + ')'
    }
    this.enableLazyload(val)
  },

  resize: function (val) {
    if (RESIZE_MODES.indexOf(val) === -1) {
      val = 'stretch'
    }
    this.node.style.backgroundSize = val === 'stretch'
                                    ? '100% 100%'
                                    : val
  }
}

const style = {
  width: function (val) {
    val = parseFloat(val) * this.data.scale
    if (val < 0 || isNaN(val)) {
      val = DEFAULT_SIZE
    }
    this.node.style.width = val + 'px'
  },

  height: function (val) {
    val = parseFloat(val) * this.data.scale
    if (val < 0 || isNaN(val)) {
      val = DEFAULT_SIZE
    }
    this.node.style.height = val + 'px'
  }
}

function init (Weex) {
  const Atomic = Weex.Atomic
  const extend = Weex.utils.extend

  function Image (data) {
    this.resize = DEFAULT_RESIZE_MODE
    Atomic.call(this, data)
  }
  Image.prototype = Object.create(Atomic.prototype)
  extend(Image.prototype, proto)
  extend(Image.prototype, { attr })
  extend(Image.prototype, {
    style: extend(Object.create(Atomic.prototype.style), style)
  })

  Weex.registerComponent('image', Image)
}

export default { init }
