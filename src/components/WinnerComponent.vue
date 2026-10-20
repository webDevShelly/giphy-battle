<template>
  <div>
    <div class="container">
      <div class="background-image"></div>
      <div class="ripped-bg"></div>
      <h1 class="headline">Giphy Battle</h1>
      <div class="text">
        <h2 class="subline">And the winner for <span>#{{status.question}}</span> is:</h2>
        <div v-if="status.submissions && status.submissions.length" class="submission-result">
          <img :src="status.submissions[0].giphyURL" class="submission-image">
          <div class="user-info">
            <p class="submitted-username">{{status.submissions[0].username}}, </p>
            <p class="upvote-result"> upvoted <span class="upvote-amount">{{status.submissions[0].upvotes.length}}</span> times</p>
          </div>
        </div>
        <p class="next-round">Get ready, the next round starts in: <span>{{Math.round(status.timeLeftInPhase/1000)}}s</span></p>
      </div>
    </div>
  </div> 
    
</template>

<script>
export default {
  name: 'WinnerScreen',
  data () {
    return {
    }
  },
  props: ['status'],
  watch: {
    status: function () {
      if (this.status.phase === 'game') {
        this.$router.push('/game')
      }
    }
  },
  methods: {
    timestampProcessor: function () {
      let date = new Date(this.status.phaseStartTime * 1000)
      let hours = date.getHours()
      let minutes = '0' + date.getMinutes()
      let seconds = '0' + date.getSeconds()
      let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
      console.log(formattedTime)
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  max-width: 1200px;
  // overflow: hidden;
  // position: absolute;

  .background-image {
    background: linear-gradient(to bottom right, #5FA09F, #6D345B);
    width: 100vw;
    height: 120%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: -1;
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
    z-index: 5;
    @media screen and (min-width: 600px) {
      margin-left: -20vw;
    }

    // @media screen and (min-width: 900px) {
    //   margin-left: -30vw;
    // }
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
    z-index: 6;
    position: fixed;

    @media screen and (min-width: 900px) {
      font-size: 2.5rem;
      top: 5%;
    }
  }

  .text {
    width: 90%;
    max-width: 600px;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    .subline {
      font-family: 'Southpark';
      color: #fff;
      font-size: 2rem;
      line-height: 2.5rem;

      & span {
        border-bottom: 2px solid #fff;
      }
    }

    .submission-result {
        display: flex;
        flex-direction: column;
        box-shadow: 0px 0px 5px 5px rgba(204,204,204,1);
        padding: 2.5%;
        margin-bottom: 5vh;
        background: #fff;
        width: 90%;

        @media screen and (min-width: 600px) {
            width: 50%;
        }

        @media screen and (min-width: 900px) {
            width: 60%;
        }

        .submission-image {
            width: 100%;
            height: 30vh;
            // object-fit: cover;
        }

        .image-hover {
          display: none;
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 2rem;
          text-align: center;

          @media screen and (min-width: 900px) {
              font-size: 1.2rem;
          }

        }

        .user-info {
            color: #A1C2EB;
            font-family: 'Southpark';
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
            width: 100%;
            height: 5vh;

            .submitted-username {
              margin-right: 10px;
            }

            .upvote-result {
              .upvote-amount {
                  color: #A05695;
              }
            }
        }
    }

    .next-round {
      color: #fff;
      font-family: 'Southpark';

      & span {
        border-bottom: 2px solid #fff;
      }
    }

  }

}

</style>
