<template>

  <div>
    <div class="container">
      <div class="background-image"></div>
      <div class="ripped-bg"></div>
      <h1 class="headline">Giphy Battle</h1>
      <div class="text">
        <h2 class="subline">How to play</h2>
        <div class="how-to-play">
          Welcome to Giphy Battle - where you can battle players for the best Giphy out there!<br><br>
          Watch the game screen to see the hashtag, then choose a Giphy to match it in the funniest, sickest, awesomest, or silliest way possible.
          Then vote on which Giphys are the best. After each round, the winner is the Giphy with the most votes.
        </div>
        <div class="row">
          <form class="col s12" @submit.prevent="startGame">
            <div class="row username-input">
              <div class="input-field col s6">
                <input v-model.trim="username" id="username" type="text">
                <label for="username">Username</label>
              </div>
              <button :disabled="!usernameValid" type="submit" name="action" class="btn waves-effect waves-light">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div> 
    
</template>

<script>
export default {
  name: 'GameSetup',
  data () {
    return {
      username: ''
    }
  },
  computed: {
    usernameValid: function () {
      if (this.username.length > 3) {
        return true
      }
      return false
    }
  },
  methods: {
    startGame: function () {
      if (!this.usernameValid) return
      this.$emit('usernameentered', this.username)
      this.$router.push('/game')
    }
  }
}
</script>

<style lang="scss">
  .gamesetup {
    overflow: hidden;
  }
</style>

<style lang="scss" scoped>

$font_path: '~@/assets/fonts/';

@font-face{
  font-family    : 'Southpark';
  src            : url($font_path +'south-park.ttf');
  font-style     : normal;
  font-weight    : 400;
  text-rendering : optimizeLegibility;
}

$southpark : 'Southpark', sans-serif;

.btn {
  font-family: 'Southpark';
}

.container {

  .background-image {
    background: linear-gradient(to bottom right, #5FA09F, #6D345B);
    width: 100vw;
    height: 120%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: -1;
    position: fixed;
  }


  .ripped-bg {
    background-image: url(../assets/ripped-bg3.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin-left: -10vw;
    margin-top: -5vh;
    margin-bottom: -5vh;
    width: 120vw;
    height: 120vh;
    position: fixed;
    @media screen and (min-width: 600px) {
      margin-left: -20vw;
    }
  }


  .headline {
    font-family: 'Southpark';
    background: linear-gradient(to bottom right, #5FA09F, #6D345B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 3rem;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    z-index: 2;

    @media screen and (min-width: 900px) {
      font-size: 2.5rem;
      top: 5%;
    }

  }

  .text {
    width: 90%;
    max-width: 600px;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);

    .subline {
      font-family: 'Southpark';
      color: #fff;
      font-size: 2.5rem;
    }

    .how-to-play {
      margin: 0% 5%;
      color: #fff;
      margin-bottom: 5%;
    }

    .username-input {
      display: flex;
      justify-content: center;
      align-items: center;

      .input-field {
        margin-left: 0;
        
        #last_name {
          color: #fff;
          border-bottom: 1px solid #fff;

        }
      }

      .input-field input[type=text]:focus + label {
        color: #fff;
      }

      .input-field input[type=text]:focus {
         border-bottom: 1px solid #fff;
         box-shadow: 0 1px 0 0 #fff;
      }
    }
  }

}

</style>
