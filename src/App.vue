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
// Single-player game loop. This used to come from the Creative Circus game
// server; it now runs entirely in the browser so the game works on any host.
const GAME_LENGTH = 120 * 1000 // time to pick and vote on GIFs
const WINNER_LENGTH = 15 * 1000 // time the winner screen is shown
const HASHTAGS = [
  'mondays', 'coffee', 'friyay', 'mood', 'nailedit', 'facepalm', 'dancing',
  'cats', 'dogs', 'pizza', 'deadline', 'success', 'awkward', 'mindblown',
  'weekend', 'sleepy', 'party', 'fail', 'hungry', 'sotrue', 'bye', 'hugs'
]

export default {
  name: 'App',
  data () {
    return {
      status: { phase: 'game', question: '', timeLeftInPhase: GAME_LENGTH, phaseStartTime: 0, submissions: [] },
      username: localStorage.getItem('username'),
      lastHashtag: null,
      phaseEndsAt: 0,
      timer: null
    }
  },
  methods: {
    pickHashtag: function () {
      const options = HASHTAGS.filter(tag => tag !== this.lastHashtag)
      this.lastHashtag = options[Math.floor(Math.random() * options.length)]
      return this.lastHashtag
    },
    startRound: function () {
      const now = Date.now()
      this.phaseEndsAt = now + GAME_LENGTH
      this.status = {
        phase: 'game',
        question: this.pickHashtag(),
        timeLeftInPhase: GAME_LENGTH,
        phaseStartTime: Math.floor(now / 1000),
        submissions: []
      }
    },
    endRound: function () {
      const now = Date.now()
      this.phaseEndsAt = now + WINNER_LENGTH
      // Most votes first; ties go to whichever GIF was submitted first.
      const ranked = this.status.submissions
        .map((submission, order) => ({ submission, order }))
        .sort((a, b) => (b.submission.upvotes.length - a.submission.upvotes.length) || (a.order - b.order))
        .map(item => item.submission)
      this.status = Object.assign({}, this.status, {
        phase: 'post-game',
        timeLeftInPhase: WINNER_LENGTH,
        phaseStartTime: Math.floor(now / 1000),
        submissions: ranked
      })
    },
    getStatusUpdate: function () {
      const timeLeft = this.phaseEndsAt - Date.now()
      if (timeLeft > 0) {
        this.status = Object.assign({}, this.status, { timeLeftInPhase: timeLeft })
      } else if (this.status.phase === 'game') {
        this.endRound()
      } else {
        this.startRound()
      }
    },
    storeUsername: function (username) {
      this.username = username
      localStorage.setItem('username', this.username)
    },
    upvoteSubmissions: function (index) {
      const submission = this.status.submissions[index]
      if (!submission || this.status.phase !== 'game') return
      const voter = this.username || 'you'
      const voted = submission.upvotes.indexOf(voter)
      // Clicking a GIF again takes the vote back, so each player gets one vote per GIF.
      if (voted === -1) {
        submission.upvotes.push(voter)
      } else {
        submission.upvotes.splice(voted, 1)
      }
    },
    postGiphysToBackend: function (giphyURL) {
      if (this.status.phase !== 'game') return
      const alreadySubmitted = this.status.submissions.some(s => s.giphyURL === giphyURL)
      if (alreadySubmitted) return
      this.status.submissions.push({
        giphyURL: giphyURL,
        username: this.username || 'you',
        upvotes: []
      })
    }
  },
  created: function () {
    this.startRound()
    this.timer = setInterval(this.getStatusUpdate, 1000)
  },
  beforeDestroy: function () {
    clearInterval(this.timer)
  }
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
