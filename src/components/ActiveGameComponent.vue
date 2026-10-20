<template>
  <div>
    <router-link v-if="status.phase === 'post-game'" to="/winner">
      Game over! Click here to see the winner!
    </router-link>

    <div class="container">
      <div class="background-image"></div>
      <div class="ripped-bg"></div>
      <div class="headline">Giphy Battle</div>

      <div class="text">
        <p class="current-username">Hi <span>{{username}}!</span></p>
        <p class="current-hashtag">The current hashtag is:<br><span>#{{status.question}}</span></p>
        <p class="time-left">You have <span>{{Math.round(status.timeLeftInPhase/1000)}}s</span> left in this round</p>
        <h2 class="section-title-text">Choose your Giphy here:</h2>
        <div class="row">
          <form class="col s12" @submit.prevent="searchGiphyAPI">
            <div class="row username-input">
              <div class="input-field col s6">
                <input v-model.trim="searchTerm" id="giphy-search" type="text">
                <label for="giphy-search">Search Giphy</label>
              </div>
              <button type="submit" name="action" class="btn waves-effect waves-light">Submit</button>
            </div>
          </form>
        </div>
      </div>

      <p v-if="status.submissions && status.submissions.length > 0" class="after-submission">You've submitted a giphy. Good. Now submit some more.</p>

      <div class="headlines">
          <h2 class="section-title">Submitted:</h2>
          <h2 class="section-title">Choose:</h2>
      </div>

      <div class="images">
        <div class="submitted-giphy-area">   


          <ul class='giphy-submissions'>
            <li v-bind:key='index' v-for='(submission, index) in status.submissions' class='submission-result'>
              <img :src="submission.giphyURL" class="submission-image" @click='upvoteProcess(index)'>

              <div class="image-hover" @click='upvoteProcess(index)'>Vote fot it</div>
              <div class="user-info">
                <p class="submitted-username">{{submission.username}}, </p>
                <p class="upvote-result"> upvoted <span class="upvote-amount">{{submission.upvotes.length}}</span> times</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="divider"></div>


        <div class="submission-area">        
          <ul class="giphy-results">
            <li v-bind:key="index" v-for="(gif, index) in giphys" class="giphy-result">
              <img :src="gif.images.original.url" class="giphy-image" @click='submissionProcess(gif.images.original.url)'>
              <div @click='submissionProcess(gif.images.original.url)' class="image-hover">Select</div>
              <div class="giphy-details">
                <p>Current Search Term: <span>{{status.question}}</span></p>
                <p>Rating: <span>{{gif.rating}}</span></p>
                <p>Title: <span>{{gif.title}}</span></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['status', 'username'],
  name: 'ActiveGame',
  data () {
    return {
      searchTerm: '',
      giphys: [],
      upvotes: [],
      errors: []
    }
  },
  watch: {
    searchTerm: function () {
      console.log('search term: ', this.searchTerm)
    },
    status: function () {
      if (this.status.phase === 'post-game') {
        this.$router.push('/winner')
      }
    }
  },
  methods: {
    submissionProcess: function (giphyURL) {
      console.log('submissionProcess', giphyURL)
      this.$emit('submitgiphy', giphyURL)
      this.searchTerm = ''
      this.giphys = []
    },
    upvoteProcess: function (index) {
        console.log('upvoting')
        console.log('votingProcess', index)
        this.$emit('upvotegiphy', index)
    },
    searchGiphyAPI: function () {
      if (!this.searchTerm) return
      axios.get('https://api.giphy.com/v1/gifs/search', {
        params: { q: this.searchTerm, api_key: 'Rz9F7aWZ98K6wECZtpJw8QTBdThU1IFf', limit: 8 }
      })
        .then(response => {
          console.log(response)
          this.giphys = response.data.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>

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
  max-width: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 

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
    background-image: url(../assets/ripped-bg-top.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin-left: -10vw;
    margin-top: -60vh;
    margin-bottom: -5vh;
    top: 0;
    width: 120vw;
    height: 0;
    padding-bottom: 100vh;
    position: absolute;
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
    max-width: 600px;
    margin-top: 10vh;

    .current-hashtag,
    .time-left {
       margin: 0;
       color: #fff;
       font-family: 'Southpark';
       font-size: 1.2rem;
       margin-bottom: 5%;

       & span {
         border-bottom: 2px solid #fff;
         font-size: 1.5rem;
       }
    }

    .current-username {
      margin: 0;
      color: #fff;
      font-family: 'Southpark';
      font-size: 2rem;
      margin-top: 50%;
      margin-bottom: 3vh;
    }

    .time-left {
      margin-top: 0;
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

    .section-title-text {
      color: #fff;
      font-family: 'Southpark';
      font-size: 1.5rem;
    }
  }

  .after-submission {
    color: #fff;
    font-family: 'Southpark';
    font-size: 1.5rem;
    width: 80%;
    margin-bottom: 10vh;
  }

  .headlines {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  
  .section-title {
    width: 40%;
    color: #fff;
    font-family: 'Southpark';
    font-size: 1.5rem;
    padding-bottom: 10px;
    border-bottom: 5px solid #229C8F;;
  }

  .images {
    width: 100%;
    display: flex;

    .submitted-giphy-area {
      display: flex;
      flex-direction: column;
      width: 50%;

      @media screen and (min-width: 600px) {
        width: 50%;
      }

      .section-title {
        color: #fff;
        font-family: 'Southpark';
        font-size: 1.5rem;
      }

      .giphy-submissions {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin: 5%;

        @media screen and (min-width: 900px) {
            flex-direction: row;
            justify-content: space-between;
        }

        .submission-result {
            display: flex;
            flex-direction: column;
            position: relative;
            box-shadow: 0px 0px 5px 5px rgba(204,204,204,1);
            padding: 2.5%;
            margin-bottom: 5vh;
            background: #fff;

            @media screen and (min-width: 900px) {
                flex-direction: column;
                width: 45%;
            }

            &:hover .image-hover {
                display: flex;
            }

            .submission-image {
                width: 100%;
                height: 20vh;
                // object-fit: cover;

                @media screen and (min-width: 600px) {
                  height: 30vh;
                }

                @media screen and (min-width: 900px) {
                  height: 20vh;
                }
            }

            .image-hover {
              font-family: "Southpark";
              display: none;
              position: absolute;
              top: 45%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #fff;
              font-size: 2rem;
              text-align: center;
              background: #229C8F;
              padding: 5px 10px;

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
                font-size: .8rem;

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
      }
    }

    .divider {
      width: 5px;
      height: 100vh;
      background: #229C8F;
      margin-top: -10vh;
    }

    .submission-area {
      display: flex;
      flex-direction: column;
      width: 50%;
      
      @media screen and (min-width: 600px) {
        width: 50%;
      }

      .giphy-results {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin: 5%;

        @media screen and (min-width: 600px) {
            flex-direction: row;
            justify-content: space-between;
        }

        .giphy-result {
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0px 0px 5px 5px rgba(204,204,204,1);
          padding: 2.5%;
          margin-bottom: 5vh;
          background: #fff;

          &:hover .image-hover {
              display: flex;
          }

          @media screen and (min-width: 600px) {
              flex-direction: column;
              width: 45%;
          }

          @media screen and (min-width: 900px) {
              flex-direction: column;
              width: 47.5%;
          }

          .giphy-image {
            width: 100%;
            height: 20vh;
            // object-fit: cover;
          }

          .image-hover {
            font-family: "Southpark";
            display: none;
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 2rem;
            text-align: center;
            background: #229C8F;
            padding: 5px 10px;

            @media screen and (min-width: 900px) {
                font-size: 1.2rem;
            }
          }


          .giphy-details {
            display: none;

            @media screen and (min-width: 900px) {
               // width: 100%;
               // justify-content: flex-start;

               color: #A1C2EB;
               font-family: 'Southpark';
               display: flex;
               flex-direction: column;
               justify-content: space-between;
               align-items: flex-start;
               text-align: start;
               width: 50vw;
               padding: 2.5%;
               margin-top: 5%;
            }

            & p {
              margin: 0;
              line-height: 1.4rem;

              @media screen and (min-width: 900px) {
               font-size: .8rem;
            }

              & span {
                color: #A05695;
              }
            }
          }
        }

      }

    }
  }

}



</style>
