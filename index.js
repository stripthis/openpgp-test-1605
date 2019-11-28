const openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp

// put keys in backtick (``) to avoid errors caused by spaces or tabs
const pubkey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mQENBFrfQfMBCADGA/m9mdUGWH5OdhWCSrBdKrNOZP3zipI36oNNvJo9sFYicLwp
hPGZk2hMdUBIRKgbTq5fyBE3kJqTdndTXducu2e1sYsyyb9nmEuPttyi2bIDfjgj
dGyFD3lPQqg0ITy1wgQtmlAEaf66PZHUXskXx1bHPwXxMtPe0v8Yzjd84sGnh+pj
bvrVwKCk/LGGnfYAmV5/5WLLukBvT6znvbNKsRSQopVUUn/k/atluToWZIq9kmGO
lmaNQUoRWcLnrMuEevSEMQoUPXOhyIskjWHH/cY4FGghw9/QNZRfg6DX6lgkWHxb
ezln3JXqwhRVHXYe0rCC4Iierl0a41/MMo2/ABEBAAG0LVBhc3Nib2x0IGRlZmF1
bHQgdXNlciA8dGVjaG5pa0BwbGFub3B1bmt0LmRlPokBTgQTAQgAOBYhBKoY4GcN
n49plM6A66T9/g6tIHU2BQJa30HzAhsDBQsJCAcCBhUICQoLAgQWAgMBAh4BAheA
AAoJEKT9/g6tIHU2rsEH/jNKXVHwqUH7PgpiQOafBAYG6eY22XKZZbYsluqUkm7T
s17cc4zWMqLHyb/+qVceqs/CpRO5ZWvOAQ5TzOcf7NmGXh3c3J/H/maafffTdfmP
bLXFe9hdNv9T4TD6G8Q62I+7WlPpAv4xdYDzmBvqykVeshGmPRfB68WDVotkaN06
9ps8AcjPJAt9DCzQNOXOBB6iBDURpRT9zjLnw4Tx+bACDMWokAElJZ5MXTTYJQzr
sKxpQBQvxgQpgpFAXoVjt1IYR1ZdCSufaPfikmLAE0xWEOHLRM2JIilB/ni1nT+8
l0+HJxsgqOjDBj1bl3V9O6h2C8orBiTxNQBw6CkUjIK5AQ0EWt9B8wEIANFcnqLZ
gAYmtvWuf0udeuaEdVUhOSv8gn/Rvfv6gtozWmYvFbJ58fnkIEneRLHuLZZNB0Kh
ATfLY1k6NjNoFNmmWmQw+3ww8NSayeIdqppeM9sAzqek3NMRXycsneWhcwuweavW
iRXf+nktXSrZLlmqWpekdT1eKo5GoUKdjopycuirMWSOZg0qOZ9mo9DwrBocZspP
mAtr9JNubF7qIQaXYFaUBgacDQ9S5/4d5qsYE99R/26Zx8IMtyvy6fmHDV4WI6HW
jSqgi/EGSIBRO0OY3c2b6aEVa1tbnAmSVNiMAX8umXHvHcilStymI9vw6JXhYE9X
I7hv/QyFrQ1X5XUAEQEAAYkBNQQYAQgAIBYhBKoY4GcNn49plM6A66T9/g6tIHU2
BQJa30HzAhsMAAoJEKT9/g6tIHU2y+4H+LGnGd4JaUYA5ffpiJPWE5t11w8oA/o8
3fLseTkmZMoKCF/+glUfi+1BThv9zQ9JvIpd1D/AWdk0me+wJksqTN81aFgClDJo
lR8FNT3dEFPalZsn37s3YvKMA6z4GXTn+EzN4NS0aPR9ptVP+/MYFwf8AJ4q0PZW
ofDbauQEYUmyx+H3L/rWpE58LeWa2sy8eo9mm9X0HZ3LcSlMTC3gKa8dcJOm0j3j
70sXNqkoQfRGdIibKCWUiOrK4iseOTxn1QXUqPHsIpmLVIQSnMWFRf9vh1qNLFM0
HEbVS8RKqvYidyFlVz0oDi4bNtv/32UZmXaivlGDHi0UWcQo95h8Jw==
=mTBU
-----END PGP PUBLIC KEY BLOCK-----
`;

const encrypt = async () => {
  await openpgp.initWorker({ path:'openpgp.worker.js' });

  const options = {
    message: openpgp.message.fromText('Hello, World!'),
    publicKeys: (await openpgp.key.readArmored(pubkey)).keys,
  };

  openpgp.encrypt(options).then(ciphertext => {
      return ciphertext.data;
    })
    .then(async encrypted => {
      console.log(encrypted);
    })
    .catch(error => {
      console.error(error);
    });

};

encrypt();