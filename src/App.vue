<template>
  <router-view />
</template>

<script>
var mqtt = require("mqtt")
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

const host = 'ws://broker.emqx.io:8083/mqtt'

const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
}

console.log('Connecting mqtt client')
const client = mqtt.connect(host, options)

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

client.on('reconnect', () => {
  console.log('Reconnecting...')
})

client.on('connect', () => {
  console.log('Client connected:' + clientId)
  // Subscribe
  client.subscribe('firmanskuy', { qos: 0 })
})

client.on('message', (message) => {
  console.log('Received Message: ' + message.toString())
})

export default {
  data: () => {
    return {
      topic: "budekan1",
      message: 120,
      broker: "http://broker.hivemq.com/"
    }
  },
  methods: {
    start() {

    }
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

body,
html {
  margin: 0;
  padding: 0;
  background-color: lightgrey;
  font-family: 'Poppins', sans-serif;
  height: 100vh;
}

.container {
  width: 428px;
  height: 100vh;
  background-color: #FCF8E8;
  margin: 0 auto;
  /* box-sizing: border-box; */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
  color: #000000;
}

.desc {
  margin: 0;
  padding: 0;
}

.input {
  width: 322px;
  height: 65px;
  background: #D9D9D9;
  border-radius: 32px;
  border: 0;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 16px;
}

.input::placeholder {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  text-align: center;

  color: #000000;
}

.btn {
  width: 150px;
  height: 50px;
  border: none;
  background: #DF7861;
  font-style: normal;
  font-weight: 700;
  font-size: 1em;
  line-height: 29px;
  text-align: center;
  color: #FFFFFF;
  margin-top: 5%;
}

@media screen and (max-width:400px) {
  .container {
    width: 100%;
    height: 100vh;
    background-color: #FCF8E8;
    margin: 0 auto;
    /* box-sizing: border-box; */
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: 1.5em;
  }

  .input {
    width: 80%;
    height: 10%;
    background: #D9D9D9;
    border-radius: 32px;
    border: 0;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .input::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */

    text-align: center;

    color: #000000;
  }

  .btn {
    width: 30%;
    height: 7%;
    border: none;
    background: #DF7861;
    font-style: normal;
    font-weight: 700;
    font-size: 1em;
    line-height: 29px;
    text-align: center;
    color: #FFFFFF;
    margin-top: 5%;
  }
}
</style>
