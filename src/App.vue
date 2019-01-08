<template>
  <div id="app">
    <div class="columns is-vcentered header">
      <div class="column is-1">
        <span class="title">stegan.io</span>
      </div>
      <div class="column is-2 is-hidden-mobile"></div>
      <div class="column is-2">
        <span class="subtitle">Hiding in plain sight</span>
      </div>
      <div class="column is-2 is-offset-6">
        <a href="https://github.com/Silur/steganio"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>
      </div>
    </div>
    <Index/>
  </div>
</template>

<script>
import Index from './components/Index'

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style>
@font-face {
  font-family: Roboto;
  src: url("./assets/Roboto-Regular.ttf") format("truetype");
}
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.header {
  box-shadow: 0px 5px 4px 1px #e6e6e6;
  margin-bottom: 4em !important;
}
@font-face {
  font-family: Signika;
  src: url("./assets/Signika-Regular.otf") format("opentype");
}
@font-face {
  font-family: SignikaBold;
  src: url("./assets/Signika-Bold.otf") format("opentype");
}
.title {
  font-weight: bold;
  font-size: 3em;
  font-family: SignikaBold;
}
.subtitle {
  font-style: italic;
  font-family: Signika;
  color: #909090;
}
</style>
