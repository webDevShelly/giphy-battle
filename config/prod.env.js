'use strict'
module.exports = {
  NODE_ENV: '"production"',
  // Base URL of the Giphy Battle game server (serves /status, /submission, /upvote).
  // The live site is served over HTTPS, so this MUST be an https:// URL or the
  // browser blocks every request as mixed content.
  // TODO: replace with an HTTPS game server; the original class server is plain HTTP.
  GAME_SERVER_URL: '"http://circuslabs.net:6432"'
}
