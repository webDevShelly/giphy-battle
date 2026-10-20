<template>
  <div id="app">
    <router-view 
      @submitgiphy="postGiphysToBackend" 
      @upvotegiphy="upvoteSubmissions" 
      @usernameentered="storeUsername" 
      :status="status" 
      :username="username"/>
  </div>
</template>

<script>

import axios from 'axios'

// Game server base URL. Set GAME_SERVER_URL in config/dev.env.js / config/prod.env.js.
// It must be https:// for the deployed site, or browsers block the requests.
const GAME_SERVER = process.env.GAME_SERVER_URL

export default {
  name: 'App',
  data () {
    return {
      status: { phase: '', question: '', timeLeftInPhase: 0, submissions: [] },
      username: localStorage.getItem('username'),
      errors: [],
      refreshStatus: null
    }
  },
  // watch: {
  //   status: function () {
  //     if (this.status.phase !== 'game') {
  //       this.$router.push('/winner')
  //     }
  //   }
  // },
  methods: {
    getStatusUpdate: function () {
      axios.get(`${GAME_SERVER}/status`)
        .then(response => {
          this.status = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    storeUsername: function (username) {
        this.username = username
        localStorage.setItem('username', this.username)
    },
    upvoteSubmissions: function (index) {
      axios.post(`${GAME_SERVER}/upvote/${index}`, {
        username: this.username
      })
      .then(response => {
        console.log('You upvoted the giphy')
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    postGiphysToBackend: function (giphyURL) {
      console.log('app.js postGiphysToBackend()')
      console.log('send data', giphyURL, this.username)
      axios.post(`${GAME_SERVER}/submission`, {
        giphyURL: giphyURL,
        username: this.username
      })
      .then(response => {
        console.log('You posted to the backend')
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
  },
  created: function () {
    this.getStatusUpdate()
    this.refreshStatus = setInterval(this.getStatusUpdate, 1000)
  },
  beforeDestroy: function () {
    clearInterval(this.refreshStatus)
  },
}
</script>

<style>

body {
  margin: 0;
  /*overflow: hidden;*/
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  margin: 0;
}
</style>
