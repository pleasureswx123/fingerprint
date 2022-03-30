import fpPromise from "./lib/fingerprintjs.js";
// const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
//     .then(FingerprintJS => FingerprintJS.load())
//
// Get the visitor identifier when you need it.

document.getElementById("app").innerHTML = "fsfsdf32131";

fpPromise
  .load()
  .then((fp) => fp.get())
  .then((result) => {
    // This is the visitor identifier:
    const visitorId = result.visitorId;
    console.log(visitorId);
    document.getElementById("app").innerHTML = `html1: ${visitorId}`;
  });
