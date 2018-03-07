// import { JSDOM } from "jsdom"

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === "undefined")
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {}
    )
  Object.defineProperties(target, props)
}

const window = {
  document : {}
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: "node.js",
}
copyProps(window, global)
