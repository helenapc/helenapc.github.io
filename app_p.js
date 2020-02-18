const tit = document.getElementById("title");
const txt = document.getElementById("cor");

tit.innerHTML = `<h1>Pablo</h1>`;

const api_url = "https://raw.githubusercontent.com/helenapc/helenapc.github.io/master/test.json"

async function getISS(){
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
  tit.innerHTML += data.number + "<br/>" + data.final;
  txt.innerText = data.cod;
};


getISS();

console.log('prueba 4');


