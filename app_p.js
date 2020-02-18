const tit = document.getElementById("title");
const txt = document.getElementById("cod");

tit.innerHTML = `<h1>Pablo</h1>`;

const api_url = "https://raw.githubusercontent.com/helenapc/helenapc.github.io/master/test.json"

async function getISS(){
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
  tit.innerHTML += "TEST: " + data;02;
  // txt.innerHTML = "CODE: " + data.05 + "<br/>" + data.06;
};


getISS();

console.log('Test JSON');


