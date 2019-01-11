var f = (a) => {
  return new Promise((resolve, reject) => {
    console.log('Entered promise');
    if(a == 1) resolve('Aye 1');
    reject('Noe 1');
  });
}


setTimeout(() => {
    f(1).then((msg) => {
      console.log(msg);
    }).catch((err) => {
      console.log(err);
    })
}, 1000);

setTimeout(() => {
  f(2).then((msg) => {
    console.log(msg);
  }).catch((err) => {
    console.log(err);
  })
}, 2000);
