delay = (ms) ->
  new Promise (resolve) ->
    setTimeout resolve, ms


Example = pc.createScript('example')
Example.attributes.add('message', type: 'string')


Example::.initialize = ->
  console.log('initialized')
  await delay(1000)
  console.log("delayed")


Example::.update = (dt) ->


Example::swap = (old) ->
  console.log('swapping')
