'use strict'

const t = require('tap')
const Fastify = require('../fastify')

// Sync test works but async test is current a work in progress
t.test('*****onListen should be called in order*****', t => {
  t.plan(2)

  const fastify = Fastify()
  t.teardown(fastify.close.bind(fastify))

  let order = 0

  fastify.addHook('onListen', function () {
   
    console.log("coming from hooks.on-listen.test.js")
    t.equal(order++, 0, '1st called in root - line 17')
  })

  fastify.addHook('onListen', function () {
    console.log("coming from hooks.on-listen.test.js")
    t.equal(order++, 1, '2nd called in root - line 22')
  })
  fastify.listen({
    host: 'localhost',
    port: 0
  })
})
t.test('***async onListen should be called in order***', async t => {
  t.plan(2)
  const fastify = Fastify()
  t.teardown(fastify.close.bind(fastify))
  let order = 0

  fastify.addHook('onListen', async function () {
    console.log("coming from hooks.on-listen.test.js")
    t.equal(order++, 0, '1st async called in root - line 37')
  })

  fastify.addHook('onListen', async function () {
    console.log("coming from hooks.on-listen.test.js")
    t.equal(order++, 1, '2nd async called in root - line 42')
  })

  await fastify.listen({
    host: 'localhost',
    port: 0
  })

  /*
  err 
  */
})
