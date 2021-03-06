'use strict'

var test = require('tape')
var tinysonic = require('./')

function check (string, object) {
  test('check that ' + JSON.stringify(string) + ' is parsed to ' + JSON.stringify(object), function (t) {
    t.plan(1)

    t.deepEqual(tinysonic(string), object, 'matches')
  })
}

check('a:b', { a: 'b' })
check('a:b,c:d', { a: 'b', c: 'd' })
check('a: b, c: d', { a: 'b', c: 'd' })
check('a:42', { a: 42 })
check('a:true', { a: true })
check('a:false', { a: false })
check('hello:world', { hello: 'world' })
check('hello:world\n', { hello: 'world' })
check(new Buffer('a:b'), { a: 'b' })

check('a:b,c:{d:e}', { a: 'b', c: { d: 'e' } })

check('c:{d:e},a:b', { a: 'b', c: { d: 'e' } })

check('c:{d:e,f:{g:h}},a:b', { a: 'b', c: { d: 'e', f: { g: 'h' } } })

check({ an: 'object' }, null)
check(42, null)
check('{d:e}:b,a:b', null)
check('42', null)
check('a:b,c:{d:e},d', null)
check('a:b,c', null)
check('a:b,c:', { a: 'b', c: '' })
check('a:b,', null)
check('', null)
