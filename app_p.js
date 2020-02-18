const tit = document.getElementById("title");
const txt = document.getElementById("cod");

tit.innerHTML = `<h1>Pablo</h1>`;

const api_url = "https://raw.githubusercontent.com/helenapc/helenapc.github.io/master/test.json"

async function getISS(){
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
  tit.innerHTML += "TEST: " + data.i2;
  txt.innerHTML = "CODE: " + data.i5 + "<br/>" + data.i6;
};


getISS();

console.log('Test JSON');


