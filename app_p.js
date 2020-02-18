const tit = document.getElementById("title");
const txt = document.getElementById("cod");



const api_url = "https://raw.githubusercontent.com/helenapc/helenapc.github.io/master/test.json"

async function getISS(){
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
  tit.innerHTML = `<h1>${data.id1}</h1>`;
  txt.innerHTML = `CODE: ${data.id2} <br/> DATA: ${data.id3}`;
};


getISS();

console.log('Test JSON');


