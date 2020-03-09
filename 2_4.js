const buttonImpExp = document.querySelector("#b-imp-exp")
const newSearch = document.getElementById("new-s")
const showSearch = document.querySelector('#show-accounts1')
const buttonAdd = document.querySelector("#b-add")
const setDelayP = "1000"


const showCardAll = (account, user, pass, notes) => { // OK
    const ionCard = document.createElement('ion-card');
    ionCard.setAttribute("button", "click-btn");
    const newHeader = document.createElement('ion-card-header');

    const newSub1 = document.createElement('ion-card-subtitle');
    newSub1.textContent = account.toUpperCase();
    const newSub2 = document.createElement('ion-card-subtitle');
    newSub2.textContent = 'Usuario: ' + user;
    const newSub3 = document.createElement('ion-card-subtitle');
    newSub3.textContent = 'Contraseña: ' + pass;
    const newSub4 = document.createElement('ion-card-subtitle');
    newSub4.textContent = 'Notas: ' + notes;

    newHeader.appendChild(newSub1);
    newHeader.appendChild(newSub2);
    newHeader.appendChild(newSub3);
    newHeader.appendChild(newSub4);
    ionCard.appendChild(newHeader);
    showSearch.appendChild(ionCard);
}

if (localStorage.length < 1){
    localStorage.setItem('orig', '26GD' + 'GD');
    var crear = true;
}

// ------------------ DECO ------------------ //
function save(){localStorage.setItem('orig', txt[0] + 'GD' + txt[1] + 'GD' + aTotal.join('Q0') + 'Q0')} //BO
const txt = localStorage.getItem('orig').split('GD');
const cut = txt[2].includes('Q0') ? 'Q0' : 'BO';
const aTotal = txt[2].split(cut);
aTotal.splice(-1, 1);
var newTotal = [];

copyStringToClipboard("pepe");

function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
 }
 

aTotalTOnewTotal();


swal("Inserte clave para continuar:", {
    content: "input",
  })
  .then((access) => {
    if (access == "m*" && deco(txt[1]) != '') {
        swal({text: deco(txt[1]),button: false,})
        .then (() =>{window.location.reload();});
    }else if (access != deco(txt[1])) {
        window.location.reload();
    }
});

setNameUser();

if (crear){
    showCardAll('GOOGLE (ejemplo)','hola@gmail.com','hola1234','Nota de prueba');
    swal({
        title: "Hola!",
        text: "No se registraron datos.\nSe creará una de muestra que se eliminará automáticamente.",
        button: false,
      });
} 


newSearch.addEventListener('ionInput', () => { refreshData() }); //SEARCH_BAR // OK


buttonImpExp.addEventListener('click', () => { //BUTTON IMP/EXP
    function alertImpExp() {
        const alert = document.createElement('ion-alert');
        alert.subHeader = 'Seleccione una opción';
        alert.buttons = [
            {
                text: 'importar',
                handler: () => {
                    function alertImp() {
                        const alert = document.createElement('ion-alert');
                        alert.subHeader = 'Importar';
                        alert.inputs = [
                            {
                                name: 'input1',
                                placeholder: 'Datos a importar...'
                            },
                        ];
                        alert.buttons = [
                            {
                                text: 'cancelar',
                                role: 'cancel',
                                cssClass: 'secondary',
                            }, {
                                text: 'ok',
                                handler: (dataImp) => {
                                    if (dataImp.input1 == 'n*') {
                                        swal("Inserte nombre:", {
                                            content: "input",
                                          })
                                          .then((nuevoNombre) => {
                                            const userName = localStorage.getItem('orig').split('GD'); //userName[0];
                                            localStorage.setItem('orig', code(nuevoNombre) + 'GD' + userName[1] + 'GD' + userName[2]);
                                            document.getElementById('naa').innerHTML = 'Hola ' + nuevoNombre + '!';
                                            presentToast('Nombre cambiado.', 500);
                                        });
                                        return;
                                    }
                                    if (dataImp.input1 == 'c*') {
                                        swal("Nueva contraseña:", {
                                            content: "input",
                                          })
                                          .then((newPass) => {
                                            const userName = localStorage.getItem('orig').split('GD'); //userName[0];
                                            localStorage.setItem('orig', userName[0] + 'GD' +  code(newPass) + 'GD' + userName[2]);
                                            presentToast('Contraseña modificada.', 500);
                                        });
                                        return;
                                    }
                                    if (dataImp.input1 == 'clear*') {
                                        localStorage.clear();
                                        presentToast('Datos eliminados', 500);
                                        window.location.reload();
                                        return;
                                    }
                                    if (dataImp.input1 == '' || dataImp.input1.length < 16) {
                                        alertMsg('Error','Datos incorrectos o vacíos.')
                                        return;
                                    }
                                    localStorage.setItem('orig', dataImp.input1);
                                    presentToast('Datos importados.', 500);
                                    setNameUser();
                                    window.location.reload();
                                }
                            }
                        ];
                        document.body.appendChild(alert);
                        return alert.present();
                    }
                    alertImp();
                }
            },
            {
                text: 'exportar',
                handler: () => {
                    function alertExp() {
                        save();
                        const alert = document.createElement('ion-alert');
                        alert.subHeader = 'Confirme nombre:';
                        alert.inputs = [
                            {
                                name: 'input2',
                                placeholder: 'Nombre del archivo...',
                                value: 'bk-' + fecha()
                            },
                            {
                                name: 'input3',
                                value: localStorage.getItem('orig')
                            }
                        ];
                        alert.buttons = [
                            {
                                text: 'cancelar',
                                role: 'cancel',
                                cssClass: 'secondary',
                            },
                            {
                                text: 'ok',
                                handler: (dataExp) => {
                                    // console.log()
                                    presentToast('Datos exportados.', 500);
                                    save();
                                    // localStorage.setItem('orig', txt[0] + 'GD' + txt[1] + 'GD' + aTotal.join('BO') + 'BO')
                                    downloadFile(localStorage.getItem('orig'), (dataExp.input2));
                                }
                            }
                        ];
                        document.body.appendChild(alert);
                        return alert.present();
                    }
                    alertExp();
                }
            },
            {
                text: 'cancelar',
                role: 'cancel',
                cssClass: 'secondary',
            },
        ];
        document.body.appendChild(alert);
        return alert.present();
    }
    alertImpExp();

});


showSearch.addEventListener('long-press', (e) => { // MANIPULATE CARDS (EDIT - DELETE) // OK OK
    e.preventDefault();

    var cuPath = e.path[3].innerText;
    // console.log("en blanco\n" + cuPath);

    if (e.path[3].localName == "ion-row"){
        return;
    };
    if (cuPath == undefined){ //entre líneas
        cuPath = e.path[0].innerText;
        // console.log("entre líneas\n" + cuPath);
    } else if (cuPath == ''){ // en texto
        cuPath = e.path[5].innerText;
        // console.log("en texto\n" + cuPath);
    };
    
    for (i = 0; i< newTotal.length; i+=5) {
        if (cuPath.toLowerCase().includes(newTotal[i].toLowerCase()) && cuPath.includes(newTotal[i+1]) && cuPath.includes(newTotal[i+2])) {
            async function presentToastC(msg) {
                const toast = document.createElement('ion-toast');
                toast.message = msg;
                toast.duration = 2500;
                toast.buttons= [
                    {
                        icon: 'pencil',
                        text: '',
                        handler: () => {
                            function presentAlertEdit() {
                                const toRemplace = i/5;
                                const alert = document.createElement('ion-alert');
                                alert.header = 'Editar cuenta';
                                alert.inputs = [
                                    {
                                        name: 'name1',
                                        id: 'name1-id',
                                        placeholder: 'Cuenta',
                                        value: newTotal[i]
                                    },
                                    {
                                        name: 'name2',
                                        id: 'name2-id',
                                        placeholder: 'Usuario',
                                        value: newTotal[i+1]
                                    },
                                    {
                                        name: 'name3',
                                        id: 'name3-id',
                                        placeholder: 'Contraseña',
                                        value: newTotal[i+2]
                                    },
                                    {
                                        name: 'name4',
                                        id: 'name4-id',
                                        placeholder: 'Notas(Opcional)',
                                        value: newTotal[i+3]
                                    }
                                ];
                                alert.buttons = [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: () => {
                                        }
                                    }, 
                                    {
                                        text: 'Ok',
                                        handler: (newData) => {
                                            if (newData.name1 == '' || newData.name2 == '' || newData.name3 == '' ) {
                                                alertMsg('Error','Datos incorrectos o vacíos.');
                                                return;
                                            }
                                            aTotal.splice(toRemplace, 1, code(newData.name1) + "OG" + code(newData.name2) + "OG" + code(newData.name3) + "OG" + code(newData.name4));
                                            aTotalTOnewTotal();
                                            refreshData();
                                            if (showSearch.innerHTML === '') {
                                                newSearch.value = '';
                                            }
                                            presentToast(`Editado ${msg}`, 500);
                                            save();
                                            // localStorage.setItem('orig', txt[0] + 'GD' + txt[1] + 'GD' + aTotal.join('BO') + 'BO')
                                        }
                                    }
                                ];
                                document.body.appendChild(alert);
                                return alert.present();
                            }
                            presentAlertEdit();
                        }
                    },
                    {
                        icon: 'trash',
                        text: '',
                        handler: () => {
                            function alertDel() {
                                const alert = document.createElement('ion-alert');
                                alert.message = `¿Eliminar ${msg}?`;
                                alert.buttons = [
                                    {
                                        text: 'cancelar',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                    },
                                    {
                                        text: 'ok',
                                        handler: () => {
                                            aTotal.splice((i/5), 1);
                                            aTotalTOnewTotal();
                                            refreshData();
                                            if (showSearch.innerHTML === '') {
                                                newSearch.value = '';
                                            }
                                            presentToast(`Borrado ${msg}`, 500);
                                            save();
                                            // localStorage.setItem('orig', txt[0] + 'GD' + txt[1] + 'GD' + aTotal.join('BO') + 'BO')
                                        }
                                    },
                                ];
                                document.body.appendChild(alert);
                                return alert.present();
                            }
                            alertDel();                                
                        }                            
                    }];
                document.body.appendChild(toast);
                return toast.present();
            };
            const dividir = cuPath.split('Usuario');;
            presentToastC(dividir[0]);
            return;
        }
    }
    // }
});


buttonAdd.addEventListener('click', () => { // BUTTON ADD NEW // OK
    function presentAlertAdd() {
        const alert = document.createElement('ion-alert');
        alert.header = 'Agregar cuenta';
        alert.inputs = [
            {
                name: 'name1a',
                icon: 'save',
                id: 'name1a-id',
                placeholder: 'Cuenta',
                value: '',
            },
            {
                name: 'name2a',
                id: 'name2a-id',
                placeholder: 'Usuario',
                value: ''
            },
            {
                name: 'name3a',
                id: 'name3a-id',
                placeholder: 'Contraseña',
                value: ''
            },
            {
                name: 'name4a',
                id: 'name4a-id',
                placeholder: 'Notas(Opcional)',
                value: ''
    
            }
        ];
        alert.buttons = [
            {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                }
            }, {
                text: 'Ok',
                handler: (newData2) => {
                    if (newData2.name1a == '' || newData2.name2a == '' || newData2.name3a == '' ) {
                        refreshData();
                        alertMsg('Error','Datos incorrectos o vacíos.');
                        return;
                    }
                    for (let i = 0; i< newTotal.length; i+=5){
                        if (newData2.name1a == newTotal[i] && newData2.name2a ==  newTotal[i+1] && newData2.name3a ==  newTotal[i+2] ) {
                            refreshData();
                            alertMsg('Error', `La cuenta ${newTotal[i]} ya existe.`);
                            return;
                        }
                    }
                    newSearch.value= '';
                    aTotal.push(code(newData2.name1a.toLowerCase()) + "OG" + code(newData2.name2a) + "OG" + code(newData2.name3a) + "OG" + code(newData2.name4a));
                    aTotalTOnewTotal();
                    newSearch.value = newData2.name1a;
                    refreshData();
                    presentToast(`Cuenta: ${newData2.name1a} agregada`, 500)
                    save()
                    // localStorage.setItem('orig', txt[0] + 'GD' + txt[1] + 'GD' + aTotal.join('BO') + 'BO')
                }
            }
        ];
        document.body.appendChild(alert);
        return alert.present();
    }
    presentAlertAdd()
});


//######################## FUNCIONES ########################
function alertMsg(msg1, msg2) { // OK 
    const alert = document.createElement('ion-alert');
    alert.subHeader = msg1;
    alert.message = msg2;
    document.body.appendChild(alert);
    return alert.present();
}

async function presentToast(msg, time) { // OK 
    const toast = document.createElement('ion-toast');
    toast.message = msg;
    toast.duration = time;
    document.body.appendChild(toast);
    return toast.present();
}

function downloadFile(data, fileName, type = "text/plain") { // OK
    var data2 = new Blob([data], { type: 'text/plain' });
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(
        new Blob([data2], { type })
    );
    a.setAttribute("download", fileName);
    a.click();
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}

function deco(dec) { // OK 
    var dec2 = dec + '';
    var hexDec = dec2.toString();
    var str = '';
    for (var n = 0; n < hexDec.length; n += 2) {
        str += String.fromCharCode(parseInt(hexDec.substr(n, 2), 16) - 5);
    }
    return str;
}

function code(cod) { // OK 
    var hexCod = '';
    var hexF = '';
    for (var i = 0; i < cod.length; i++) {
        hexCod = '' + cod.charCodeAt(i).toString(16);
        var hexCod = ((parseInt(hexCod, 16) + parseInt('05', 16)).toString(16).toUpperCase());
        hexF += '' + hexCod;
    }
    return hexF;
}

function fecha() { // OK 
    var today = new Date();
    var DD = String(today.getDate()).padStart(2, '0');
    var MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var YYYY = today.getFullYear();
    var hh = today.getHours();
    if (hh < 10) {
        hh = '0' + hh
    }
    var mm = today.getMinutes();
    if (mm < 10) {
        mm = '0' + mm
    }
    today = DD + '-' + MM + '-' + (YYYY - 2000) + '-' + hh + mm;
    return today;
}

function setNameUser() { // OK
    while (true) {
        if (localStorage.getItem('orig').includes('-')){
            const simple = localStorage.getItem('orig').split('-');
            localStorage.setItem('orig', simple[0] + 'GD' + '' + 'GD' + simple[1]);
            break;
        }else{
            var userName = localStorage.getItem('orig').split('GD');
            document.getElementById('naa').innerHTML = 'Hola ' + deco(userName[0]) + '!';
            break;
        }
    }
}

function aTotalTOnewTotal(){ // OK 
    aTotal.sort();
    newTotal = [];
    for (b = 0; b < (aTotal.length); b++) {
        const final = aTotal[b].split('OG');
        for (n = 0; n < final.length; n++) {
            if ( (n % 4) == 0){
                newTotal.push(deco(final[n]).toLowerCase())
            }else{
                newTotal.push(deco(final[n]))
            }
            if ( n == 3){
                newTotal.push('oo');
            }
        }
    }
}

function refreshData(){ // OK 
    showSearch.innerHTML = '';
    var contador = 0;
    for (let i = 0; i< newTotal.length; i+=5){
        if (newSearch.value === "*"){
            showCardAll(newTotal[i].toUpperCase(), newTotal[i+1], newTotal[i+2], newTotal[i+3]);
            contador++;

        }else if (newTotal[i].includes(newSearch.value.toLowerCase())) {
            showCardAll(newTotal[i].toUpperCase(), newTotal[i+1], newTotal[i+2], newTotal[i+3]);
            contador++;
        }
    }

    if (newSearch.value === '') {
        showSearch.innerHTML = '';
    }else{
        if (contador == 1){
            presentToast(`${contador} resultado encontrado`, '500')
        }else{
            presentToast(`${contador} resultados encontrados`, '500')
        }
    } 
}


// EXTRA (long tap)

!function(e,t){"use strict";var n=null,a="ontouchstart"in e||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0,i=a?"touchstart":"mousedown",o=a?"touchend":"mouseup",m=a?"touchmove":"mousemove",u=0,r=0,s=10,c=10;function l(i){v(i);var m=i.target,u=parseInt(m.getAttribute("data-long-press-delay")||setDelayP,10);n=function(t,n){if(!(e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame&&e.mozCancelRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame))return e.setTimeout(t,n);var a=(new Date).getTime(),i={},o=function(){(new Date).getTime()-a>=n?t.call():i.value=requestAnimFrame(o)};return i.value=requestAnimFrame(o),i}(function(e){v();var n=a?e.touches[0].clientX:e.clientX,i=a?e.touches[0].clientY:e.clientY;this.dispatchEvent(new CustomEvent("long-press",{bubbles:!0,cancelable:!0,detail:{clientX:n,clientY:i}}))&&t.addEventListener(o,function e(n){t.removeEventListener(o,e,!0),function(e){e.stopImmediatePropagation(),e.preventDefault(),e.stopPropagation()}(n)},!0)}.bind(m,i),u)}function v(t){var a;(a=n)&&(e.cancelAnimationFrame?e.cancelAnimationFrame(a.value):e.webkitCancelAnimationFrame?e.webkitCancelAnimationFrame(a.value):e.webkitCancelRequestAnimationFrame?e.webkitCancelRequestAnimationFrame(a.value):e.mozCancelRequestAnimationFrame?e.mozCancelRequestAnimationFrame(a.value):e.oCancelRequestAnimationFrame?e.oCancelRequestAnimationFrame(a.value):e.msCancelRequestAnimationFrame?e.msCancelRequestAnimationFrame(a.value):clearTimeout(a)),n=null}"function"!=typeof e.CustomEvent&&(e.CustomEvent=function(e,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var a=t.createEvent("CustomEvent");return a.initCustomEvent(e,n.bubbles,n.cancelable,n.detail),a},e.CustomEvent.prototype=e.Event.prototype),e.requestAnimFrame=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(t){e.setTimeout(t,1e3/60)},t.addEventListener(o,v,!0),t.addEventListener(m,function(e){var t=Math.abs(u-e.clientX),n=Math.abs(r-e.clientY);(t>=s||n>=c)&&v()},!0),t.addEventListener("wheel",v,!0),t.addEventListener("scroll",v,!0),t.addEventListener(i,function(e){u=e.clientX,r=e.clientY,l(e)},!0)}(window,document);