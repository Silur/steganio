<template>
  <div class="columns">
    <div class="column is-full-mobile is-half-desktop hasdivider">
      <div class="columns is-vcentered is-mobile">
        <div class="column is-2 is-offset-3">
      <span class="fa-stack fa-2x">
         <i class="fas fa-circle fa-stack-1x" style="color: #00c4a7"></i>
         <i class="fa-stack-1x circledNumber" style="color: white">1</i>
      </span>
        </div>
        <div class="column is-2 is-10-mobile">
          Place your picture here!
        </div>
      </div>
      <picture-input
        ref="pictureInput"
        width="600"
        height="600"
        margin="16"
        accept="image/jpeg"
        size="10"
        button-class="button is-primary"
        :hideChangeButton=true
        :custom-strings="{
        upload: '<h1>Scrambling stuf...</h1>',
        drag: 'Simply drag or tap',
        }"
        @change="onChangeCover"
        >
      </picture-input>
      <button class="button is-primary extractbtn" @click="showModal = true" v-if="cover != null">Extract</button>
    </div>
    <div class="column is-one-quarter">
      <div class="columns is-multiline">
        <div class="column is-full">
          <div class="columns is-vcentered is-mobile">
            <div class="column is-2">
              <span class="fa-stack fa-2x">
                <i class="fas fa-circle fa-stack-1x" style="color: #00c4a7"></i>
                <i class="fa-stack-1x circledNumber" style="color: white">2</i>
              </span>
            </div>
            <div class="column is-10-mobile">
              Type your message!
            </div>
          </div>
          <input class="input" placeholder="Text to hide" v-model="secretText" :class="{ 'is-danger': missingSecret}"/>
        </div>
        <div class="column is-full typeDivider">
          <div class="columns is-vcentered">
            <div class="column is-5 is-hidden-mobile"><hr></div>
            <div class="column is-2">OR</div>
            <div class="column is-5 is-hidden-mobile"><hr></div>
          </div>
        </div>
        <div class="column">
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" @change="onChangeData($event)">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
            </label>
          </div>
      </div>
      </div>
          <div class="columns is-vcentered is-mobile">
            <div class="column is-2 is-2-mobile">
              <span class="fa-stack fa-2x">
                <i class="fas fa-circle fa-stack-1x" style="color: #00c4a7"></i>
                <i class="fa-stack-1x circledNumber" style="color: white">3</i>
              </span>
            </div>
            <div class="column is-10-mobile">
              Take care of security as well!
            </div>
          </div>
          <div class="columns is-vcentered">
            <div class="column is-2 is-2-mobile">
              <label class="label">Seed</label>
            </div>
            <div class="column">
                  <div class="control has-icons-right">
                    <input class="input" v-model="seed"/>
                    <span class="icon is-small is-left" v-tooltip="'This fires up the RNG, this is needed for extraction!'" style="zindex: 999">
                          <i class="far fa-question-circle"></i>
                    </span>
                  </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-offset-2">
            <label class="checkbox">
            <input type="checkbox" v-model="mustEncrypt">
              Encrypt
            </label>
            </div>
          </div>
          <div class="columns is-vcentered">
            <div class="column is-2 is-2-mobile">
              <label class="label">Password</label>
            </div>
            <div class="column">
                  <div class="control has-icons-right">
                  <input class="input" type="password" placeholder="Password" :disabled="!mustEncrypt" v-model="password"/>
                    <span class="icon is-small is-left" v-tooltip="'This is used for the encryption step. Strongly advised against statistical recovery!'">
                          <i class="far fa-question-circle"></i>
                    </span>
                  </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-offset-2">
              <label class="checkbox">
                <input type="checkbox" v-model="stripMeta">
                Strip medatada
              </label>
            </div>
          </div>
          <div class="columns">
            <div class="column is-offset-2 is-4">
              <button class="button is-primary hidebtn" @click="onHideClick">Hide it!</button>
            </div>
          </div>
    </div>
    <div class="modal" v-bind:class="{'is-active': showModal}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <!-- Any other Bulma elements you want -->
        <div class="columns is-vcentered">
          <div class="column is-2 is-2-mobile">
            <label class="label">Seed</label>
          </div>
          <div class="column">
              <input class="input" v-model="seed"/>
          </div>
        </div>
        <div class="columns is-vcentered">
          <div class="column is-2 is-2-mobile">
            <label class="label">Password</label>
          </div>
          <div class="column">
              <input class="input" type="password" placeholder="Password" v-model="password"/>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <button class="button is-primary" @click="extract()">Show me!</button>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="showModal = false"></button>
    </div>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import F5stego from 'f5stegojs'

export default {
  name: 'Index',
  components: {
    PictureInput
  },
  data () {
    return {
      mustEncrypt: false,
      secretText: '',
      secretData: null,
      coverImg: null,
      seed: '',
      password: '',
      cover: null,
      missingSecret: false,
      stripMeta: true,
      showModal: false
    }
  },
  methods: {
    onChangeCover (img) {
      if (img) {
        const reader = new FileReader()
        reader.onload = (data) => {
          this.cover = new Uint8Array(data.target.result)
        }
        reader.readAsArrayBuffer(this.$refs.pictureInput.file)
      } else { this.cover = null }
    },
    onChangeData (event) {
      const reader = new FileReader()
      reader.onload = (data) => {
        this.secretData = new Uint8Array(data.target.result)
      }
      reader.readAsArrayBuffer(event.target.files[0])
    },
    onHideClick () {
      const secret = this.secretData || new TextEncoder().encode(this.secretText)
      if (secret === null || secret.length === 0) {
        this.missingSecret = true
        return
      }
      this.missingSecret = false
      const key = new TextEncoder().encode(this.seed)
      const stegger = new F5stego(key)
      if (this.stripMeta) {
        stegger.strip()
      }
      if (this.mustEncrypt) {
        this.encrypt(secret, this.password).then((cipher) => {
          let res = []
          try {
            res = stegger.embed(this.cover, new Uint8Array(cipher))
          } catch (err) {
            alert('this jpg file is not suitable for steganography')
            return 0
          }
          this.promptDownload('data:image/jpeg;base64,' + btoa(this.Uint8ToString(res)), '.jpg')
        }).catch((e) => {
          console.log('encryption error', e)
        })
      } else {
        let res = []
        try {
          res = stegger.embed(this.cover, secret)
        } catch (err) {
          alert('this jpg file is not suitable for steganography')
          return 0
        }

        this.promptDownload('data:image/jpeg;base64,' + btoa(this.Uint8ToString(res)), '.jpg')
      }
    },
    Uint8ToString (u8a) {
      const CHUNK_SZ = 0x8000
      const c = []
      for (let i = 0; i < u8a.length; i += CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)))
      }
      return c.join('')
    },
    promptDownload (data, ext) {
      console.log('call prompt with', data)
      const element = document.createElement('a')
      element.setAttribute('href', data)
      const filename = Math.random().toString(36).substring(2)
      element.setAttribute('download', filename + ext)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    encrypt (data, rawKey) {
      const iv = window.crypto.getRandomValues(new Uint8Array(16))
      const salt = window.crypto.getRandomValues(new Uint8Array(16))
      return window.crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(rawKey),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      ).then((keyMaterial) => {
        return window.crypto.subtle.deriveKey(
          {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
          },
          keyMaterial,
          { name: 'AES-CBC', length: 256 },
          true,
          ['encrypt', 'decrypt']
        )
      }).then((key) => {
        return window.crypto.subtle.encrypt(
          {
            name: 'AES-CBC',
            iv
          },
          key,
          data
        )
      }).then((cipher) => {
        return new Promise((resolve) => {
          cipher = new Uint8Array(cipher)
          const res = new Uint8Array(32 + cipher.length)
          res.set(iv)
          res.set(salt, 16)
          res.set(cipher, 32)
          resolve(res)
        })
      }).catch((e) => {
        console.log('encryption error:', e)
      })
    },
    decrypt (data, rawKey) {
      const iv = data.slice(0, 16)
      const salt = data.slice(16, 32)
      data = data.slice(32)
      return window.crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(rawKey),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      ).then((keyMaterial) => {
        return window.crypto.subtle.deriveKey(
          {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
          },
          keyMaterial,
          { name: 'AES-CBC', length: 256 },
          true,
          ['encrypt', 'decrypt']
        )
      }).then((key) => {
        return window.crypto.subtle.decrypt(
          {
            name: 'AES-CBC',
            iv
          },
          key,
          data
        )
      }).catch((e) => {
        console.log('decryption error:', e)
      })
    },
    extract () {
      const seed = new TextEncoder().encode(this.seed)
      const stegger = new F5stego(seed)
      const res = stegger.extract(this.cover)
      if (this.password !== '') {
        this.decrypt(res, this.password).then((plain) => {
          plain = new Uint8Array(plain)
          this.promptDownload('data:application/octet=stream;base64,' + btoa(String.fromCharCode.apply(null, plain)), '')
        })
      } else {
        this.promptDownload('data:application/octet=stream;base64,' + btoa(String.fromCharCode.apply(null, res)), '')
      }
      this.showModal = false
      this.seed = ''
      this.password = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.input {
  margin-bottom: 1em;
}
.circledNumber {
  margin-top: .55em;
  margin-right: .15em;
  font-size: .8em;
}
@media only screen and (min-width: 768px) {
  .hasdivider {
    border-right: 2px solid #909090;
  }
  .is-mobile {
    margin-left: -2.5em;
    margin-bottom: -1.5em;
  }
  .typeDivider {
    padding-top: 000px;
    padding-bottom: 0.0px;
    margin-bottom: -2em;
    margin-top: -2em;
  }
.extractbtn {
  width: 10%;
}
}
.checkbox {
  float: left;
  margin-top: -1.8em;
}
.hidebtn {
  float: left;
  width: 100%;
}
.picture-preview {
  background-image: url('../assets/drag_and_drop_picture.png');
}
.extractbtn {
  margin-top: 1em;
}
.modal {
  z-index: 10002;
}
.modal-content {
  background-color: #909090;
  color: white;
  padding: 1em;
  border-radius: 1em;
}

.icon {
  pointer-events: unset !important;
}
</style>
