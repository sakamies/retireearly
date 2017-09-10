const dom = q => [...document.querySelectorAll(q)]
const domOne = q => document.querySelector(q)


//http://www.jacklmoore.com/notes/rounding-in-javascript/
function round (value, decimals) {
  decimals = decimals === undefined ? 2 : decimals
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals).toFixed(decimals);
}
function roundAbout (value) {
  return Number(Math.round(value).toPrecision(4));
}


const getOpt = input => {
  let value
  if (input.dataset.parse === 'int') {
    value = parseInt(input.value)
  }
  if (input.dataset.parse === 'float') {
    value = parseFloat(input.value)
  }
  if (!value) {
    value = 0
  }
  return {[input.name]: value}
}


//In case we want to read opts from the dom instead of providing defaults, not used and probably should not be used
// const getOpts = el => {
//   let opts = {}
//   dom('input').forEach(input => Object.assign(opts, getOpt(input)))
//   return opts
// }



const syncInputs = el => {
  const targets = dom(`[name="${el.name}"]`)
  if (targets.length) {
    targets.forEach(target => {
      if (target !== el) {
        target.value = el.value
      }
      if (target.type === 'number') {
        autowidth(target)
      }
    })
  }
}




const autowidth = (el) => {
  el.classList.add('autowidth')

  const style = window.getComputedStyle(el)
  const measure = document.createElement('span')

  //Just measuring what I'm using in css, this is not a generic method
  // measure.style.visibility = 'hidden'
  measure.style.position = 'absolute'
  measure.style.display = 'block'
  measure.style.fontSize = style.getPropertyValue('font-size')
  measure.style.fontWeight = style.getPropertyValue('font-weight')
  measure.style.letterSpacing = style.getPropertyValue('letter-spacing')
  measure.innerText = el.value

  document.body.appendChild(measure)
  const width = measure.clientWidth + 4
  measure.remove()

  el.style.width = width + 'px'
}



// domready (c) Dustin Diaz 2014 - License MIT
// https://github.com/ded/domready/blob/master/ready.js
!function (name, definition) {

  // if (typeof module != 'undefined') module.exports = definition()
  // else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  /*else*/ this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = typeof document === 'object' && document
    , hack = doc && doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = doc && (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded && doc)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

})