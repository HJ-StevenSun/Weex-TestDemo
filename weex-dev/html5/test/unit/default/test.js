/*eslint no-eval: "off"*/

import { Document } from './helper/document'

// fs

import fs from 'fs'
import path from 'path'

function readInput (name) {
  const readpath = path.join(__dirname, './assets', name + '.input')
  return fs.readFileSync(readpath, 'utf8')
}

function readOutput (name) {
  const readpath = path.join(__dirname, './assets', name + '.output')
  return fs.readFileSync(readpath, 'utf8')
}

// main
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import '../../../shared'
import framework from '../../../runtime'
import { subversion } from '../../../../package.json'

Object.assign(global, framework, {
  frameworkVersion: subversion.native,
  transformerVersion: subversion.transformer
})

/**
 * register modules & methods
 */
import * as modules from '../../../default/api/modules'
import * as methods from '../../../default/api/methods'
framework.registerModules(modules)
framework.registerMethods(methods)

const expect = chai.expect
chai.use(sinonChai)

const callNativeSpy = sinon.spy()
global.callNative = function () {}

const callAddElementSpy = sinon.spy()
global.callAddElement = function () {}

describe('test input and output', () => {
  const oriCallNative = global.callNative
  const oriCallAddElement = global.callAddElement
  const allDocs = {}

  function callAddElementWrapper (name, ref, json, index, cbId) {
    callAddElementSpy(ref, json, index)

    const doc = allDocs[name]

    doc.addElement(ref, json, index)

    return callAddElementSpy.args.length
  }

  function callNativeWrapper (name, tasks, cbId) {
    callNativeSpy(tasks)

    const doc = allDocs[name]
    tasks.forEach(function (task) {
      if (task.module === 'dom') {
        if (doc[task.method]) {
          doc[task.method].apply(doc, task.args)
        }
      }
    })
    if (cbId >= 0) {
      setTimeout(() => {
        framework.callJS(name, [{ method: 'callback', args: [cbId, null, true] }])
      }, 16)
    }

    return callNativeSpy.args.length
  }

  before(() => {
    sinon.stub(console, 'info')
    sinon.stub(console, 'warn')
    sinon.stub(console, 'error')
  })

  after(() => {
    console.info.restore()
    console.warn.restore()
    console.error.restore()
  })

  beforeEach(() => {
    callNativeSpy.reset()
    global.callNative = callNativeWrapper

    callAddElementSpy.reset()
    global.callAddElement = callAddElementWrapper
  })

  afterEach(() => {
    global.callNative = oriCallNative
    global.callAddElement = oriCallAddElement
  })

  it('single case', () => {
    const name = 'foo'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('static1 case', () => {
    const name = 'static1'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('static2 case', () => {
    const name = 'static2'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('static3 case', () => {
    const name = 'static3'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('static4 case', () => {
    const name = 'static4'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo2 case', () => {
    const name = 'foo2'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo3 case', () => {
    const name = 'foo3'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo4 case', () => {
    const name = 'foo4'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()

    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo5 case', () => {
    const name = 'foo5'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo6 case', () => {
    const name = 'foo6'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo7 case', () => {
    const name = 'foo7'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo8 case', () => {
    const name = 'foo8'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo9 case', () => {
    const name = 'foo9'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('computed case', () => {
    const name = 'computed'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.refreshInstance(name, { x: 10 })
    expected.children[0].attr.value = 12
    expected.children[1].attr.value = 12
    expect(actual).eql(expected)

    framework.refreshInstance(name, { m: 10 })
    expected.children[0].attr.value = 20
    expected.children[1].attr.value = 20
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('computed in repeat case', () => {
    const name = 'computed-in-repeat'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('backward(register/render) case', () => {
    const name = 'backward1'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('backward(define/require) case', () => {
    const name = 'backward2'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('append case', () => {
    const name = 'append'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('append-root case', () => {
    const name = 'append-root'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('append-root-event case', () => {
    const name = 'append-root-event'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.callJS(name, [{
      method: 'fireEvent',
      args: [doc.body.children[0].ref, 'click', {}]
    }])

    expect(doc.body.children[0].attr.value).eql(2)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('clear-module case', () => {
    const nameA = 'clear-moduleA'
    const nameB = 'clear-moduleB'
    const inputCodeA = readInput(nameA)
    const outputCodeA = readOutput(nameA)
    const inputCodeB = readInput(nameB)
    const outputCodeB = readOutput(nameB)

    const docA = new Document(nameA)
    const docB = new Document(nameB)
    allDocs[nameA] = docA
    allDocs[nameB] = docB

    framework.createInstance(nameA, inputCodeA)
    framework.createInstance(nameB, inputCodeB)

    const expectedB = eval('(' + outputCodeB + ')')
    const actualB = docB.toJSON()
    expect(actualB).eql(expectedB)

    framework.destroyInstance(nameB)

    framework.callJS(nameA, [{
      method: 'fireEvent',
      args: [docA.body.children[0].ref, 'click', {}]
    }])

    const expectedA = eval('(' + outputCodeA + ')')
    const actualA = docA.toJSON()

    expect(actualA).eql(expectedA)

    framework.destroyInstance(nameA)
    delete allDocs[nameA]
    delete allDocs[nameB]
  })

  it('clear-dep-target case', () => {
    const nameError = 'clear-dep-target-error'
    const nameFine = 'clear-dep-target-fine'
    const inputCodeError = readInput(nameError)
    const inputCodeFine = readInput(nameFine)
    const outputCodeFine = readOutput(nameFine)

    const docError = new Document(nameError)
    allDocs[nameError] = docError

    // should throw
    expect(() => {
      framework.createInstance(nameError, inputCodeError)
    }).to.throw(TypeError)

    framework.destroyInstance(nameError)

    const docFine = new Document(nameFine)
    allDocs[nameFine] = docFine

    // no throw
    framework.createInstance(nameFine, inputCodeFine)

    const expected = eval('(' + outputCodeFine + ')')
    const actual = docFine.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(nameFine)
    delete allDocs[nameError]
    delete allDocs[nameFine]
  })

  it('if case', () => {
    const name = 'if'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('if in root element case', () => {
    const name = 'if-root'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat with index case', () => {
    const name = 'repeat-index'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat in root element case', () => {
    const name = 'repeat-root'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat with array no-kv case', () => {
    const name = 'repeat-array-no-kv'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat with array v case', () => {
    const name = 'repeat-array-v'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat with array kv case', () => {
    const name = 'repeat-array-kv'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat with array track-by case', () => {
    const name = 'repeat-track-by'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    framework.refreshInstance(name, {
      titlelist: [
        { text: 'Hello World2' },
        { text: 'Hello World1' }
      ]
    })
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat with array non-obj case', () => {
    const name = 'repeat-array-non-obj'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat-watch case', () => {
    const name = 'repeat-watch'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('if-refresh case', () => {
    const name = 'if-refresh'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    framework.refreshInstance(name, { showTitle: false })
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('if-repeat case', () => {
    const name = 'if-repeat'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('if-repeat-refresh case', () => {
    const name = 'if-repeat-refresh'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    framework.refreshInstance(name, {
      titlelist: [
        { showTitle: false, title: 'Hello World1' },
        { showTitle: true, title: 'Hello World2' },
        { showTitle: true, title: 'Hello World3' }
      ]
    })
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('reset class style case', () => {
    const name = 'reset-style'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')

    framework.callJS(name, [{
      method: 'fireEvent',
      args: [doc.body.children[0].ref, 'click', {}]
    }])

    setTimeout(function () {
      expect(doc.toJSON()).eql(expected)
      framework.destroyInstance(name)
      delete allDocs[name]
    }, 32)
  })

  it('dynamic type case', () => {
    const name = 'dynamic-type'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('click case', () => {
    const name = 'click'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.callJS(name, [{
      method: 'fireEvent',
      args: [doc.body.children[0].ref, 'click', {}]
    }])

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('inline click case', () => {
    const name = 'inline-click'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()

    expect(actual).eql(expected)

    framework.callJS(name, [{
      method: 'fireEvent',
      args: [doc.body.children[0].ref, 'click', {}]
    }])

    expected.children[0].attr.value = 'Hello World2'
    expect(doc.toJSON()).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('bind subvm', () => {
    const name = 'subvm'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('components options', () => {
    const name = 'components'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('refresh twice', () => {
    const name = 'refresh2'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    let actual = doc.toJSON()
    expect(actual).eql({
      type: 'container'
    })

    framework.refreshInstance(name, { ext: { showbar1: false }})
    framework.refreshInstance(name, { ext: { showbar1: true }})
    const expected = eval('(' + outputCode + ')')
    actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('require 3rd', () => {
    const name = 'require'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('a correct transformer version', () => {
    const name = 'transformer1'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('a less wrong transformer version', () => {
    const name = 'transformer2'
    const inputCode = readInput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    const result = framework.createInstance(name, inputCode)
    expect(result).to.be.an.instanceof(Error)
    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('a bigger wrong transformer version', () => {
    const name = 'transformer3'
    const inputCode = readInput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    const result = framework.createInstance(name, inputCode)
    expect(result).to.be.an.instanceof(Error)
    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('change data when created', () => {
    const name = 'created'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('change data when ready', () => {
    const name = 'ready'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('input binding', () => {
    const name = 'input-binding'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    let actual = doc.toJSON()
    expect(actual).eql(expected)

    expected.children[0].attr.value = 'abcdefg'
    framework.callJS(name, [{
      method: 'fireEvent',
      args: [
        doc.body.children[0].ref,
        'change',
        {},
        { attrs: { value: 'abcdefg' }}
      ]
    }])

    expected.children.push({ type: 'text', attr: { value: '1 - abcdefg' }})
    actual = doc.toJSON()
    expect(actual).eql(expected)

    expected.children[0].attr.value = '12345'
    framework.callJS(name, [{
      method: 'fireEvent',
      args: [
        doc.body.children[0].ref,
        'change',
        {},
        { attrs: { value: '12345' }}
      ]
    }])

    expected.children.push({ type: 'text', attr: { value: '2 - 12345' }})
    actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('promise case', () => {
    const name = 'promise'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })
})

describe('test callNative signals', () => {
  const oriCallNative = global.callNative
  const oriCallAddElement = global.callAddElement

  function genCallNativeWrapper (count) {
    return (name, tasks, cbId) => {
      callNativeSpy(tasks)
      const length = callNativeSpy.args.length
      if (length > count) {
        return -1
      }
      return length
    }
  }

  function genCallAddElementWrapper (count) {
    return (name, ref, json, index, cbId) => {
      callAddElementSpy(ref, json, index)
      const length = callAddElementSpy.callCount
      if (length > count) {
        return -1
      }
      return length
    }
  }

  before(() => {
    sinon.stub(console, 'info')
    sinon.stub(console, 'warn')
    sinon.stub(console, 'error')
  })

  after(() => {
    console.info.restore()
    console.warn.restore()
    console.error.restore()
  })

  beforeEach(() => {
    callNativeSpy.reset()
    callAddElementSpy.reset()
  })

  afterEach(() => {
    global.callNative = oriCallNative
    global.callAddElement = oriCallAddElement
  })

  it('signals control', function () {
    this.timeout(15000)

    const name = 'signals'
    const inputCode = readInput(name)

    function run (calls) {
      callNativeSpy.reset()
      callAddElementSpy.reset()
      global.callNative = genCallNativeWrapper(calls)
      global.callAddElement = genCallAddElementWrapper(calls)

      framework.createInstance(name + calls, inputCode)
      expect(callNativeSpy.callCount).eql(2)
      expect(callAddElementSpy.callCount).eql(calls + 1)
      framework.destroyInstance(name + calls)
    }

    for (let i = 5; i < 60; i++) {
      run(i)
    }
  })

  it('long signals control', function () {
    this.timeout(500000)

    const name = 'signals-long'
    const inputCode = readInput(name)

    function run (calls) {
      callNativeSpy.reset()
      callAddElementSpy.reset()
      global.callNative = genCallNativeWrapper(calls)
      global.callAddElement = genCallAddElementWrapper(calls)
      framework.createInstance(name + calls, inputCode)
      framework.destroyInstance(name + calls)

      expect(callNativeSpy.args.length).eql(2)
      expect(callAddElementSpy.args.length).eql(calls + 1)
    }
    run(10)
    run(30)
    run(90)
  })
})
