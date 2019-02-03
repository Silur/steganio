# Steganio

An easy-to use steganography webapp.
Hide plain or even encrypted text/data into images that look like a normal jpeg to the human eye.

Note that you need to pass the **seed** to everyone you want to share the secret data with!

## Security concerns

Steganography is **obscurity**. It can only hide stuff from __humans__

Cryptography is **security** it also aims to hide stuff from computers.

This means that no matter how long you choose your seed, your original data will be always in the image somewhere (just scrambled). Although F5 is a quite good algorithm that can encode lots of stuff into the image it's shown to be vulnerable to statistical attacks.
To mitigate this I strongly advise you to use the encrypt function of the app or use an external (WinGPG etc) one to encrypt your data first.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
