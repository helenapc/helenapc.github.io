
const showCardAll = (account, user, pass, notes) => {
    const ionCard = document.createElement('ion-card');
    ionCard.setAttribute('button', 'click-btn');
    const newHeader = document.createElement('ion-card-header');

    newHeader.setAttribute('id', 'ion-card-header');
    newHeader.setAttribute('class', 'cardExpand animCardCero');
    if (!configData.autoExpand) newHeader.classList.remove("cardExpand");
    if (configData.animacion) {
        newHeader.classList.remove("animCardCero");

        let test = document.getElementsByTagName('ion-card-header');
        let v = test.length;
        for (let i = 0; i < v; i++) { test[i].classList.toggle('ionCardHeader'); }
    }

    const newSub1 = document.createElement('ion-card-subtitle');
    const newSub2 = document.createElement('ion-card-subtitle');
    const newSub3 = document.createElement('ion-card-subtitle');
    const newSub4 = document.createElement('ion-card-subtitle');

    newSub1.textContent = account.toUpperCase();
    newSub2.textContent = 'Usuario: ' + user;
    newSub3.textContent = 'Contraseña: ' + pass;
    newSub4.textContent = 'Notas: ' + `${notes}`;

    newSub1.setAttribute('class', 'cardTitle');

    newHeader.appendChild(newSub1);
    newHeader.appendChild(newSub2);
    newHeader.appendChild(newSub3);
    newHeader.appendChild(newSub4);
    ionCard.appendChild(newHeader);
    showSearch.appendChild(ionCard);
};

const itemPers = (id, ico, text, button = true, color = '', show = true) => {

    const ionItem = document.createElement('ion-item');
    ionItem.innerHTML = text;
    setAttributes(ionItem, { 'color': color, 'id': id, 'lines': 'full' })
    if (button) ionItem.setAttribute('button', 'click-btn');

    if (ico != '') {
        const ionIco = document.createElement('ion-icon');
        setAttributes(ionIco, { 'name': ico, 'slot': 'start', 'class': 'id', 'style': 'margin-right:10px;' })
        ionItem.appendChild(ionIco);
    }



    if (show) {
        barContent.appendChild(ionItem);
    } else {
        if (localStorage.getItem('accessTempData') == '6669726E73GD6669726E73GD') {
            barContent.appendChild(ionItem);
        };
    };
    id = document.getElementById(id);

}




//######################## FUNCIONES ########################

function multipleAttribute(idElements, style, attribute) {
    for (let idElement of idElements) document.querySelector(idElement).setAttribute(style, attribute);
}

function setAttributes(elem, obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) elem[prop] = obj[prop];
    }
}

function delete_spaces(v1) {
    if (v1) {
        v1 = v1.split("");
        const v1Length = v1.length;
        for (let i = 0; i < v1Length; i++) {
            if (v1[i] == " ") { v1.shift(); i--; }
            else {
                while (true) {
                    if (v1[v1Length - 1] == " ") { v1.pop(); }
                    else { break; }
                }
                v1 = v1.join("");
                while (v1.includes("  ")) {
                    v1 = v1.split("  ");
                    v1 = v1.join(" ");
                }
                break;
            }
        }
    } else { v1 = ""; }
    return v1;
};

function barProgressF(color, state) {
    setAttributes(barProgress01, { color: color, type: state, value: '100' });
    barProgress.setAttribute('style', `opacity: ${(color == 'light' && state == 'determinate') ? 0 : 1}`);
};

function refreshData(toast = true, refresh = true) {
    aTotal.sort(); // borrar?
    let contador = 0;

    const newTotalLength = newTotal.length;
    if (refresh) showSearch.innerHTML = '';

    if (newSearch.value == '') {
        showSearch.innerHTML = '';
        showIcon.setAttribute('name', icoShow);
        expandIcon.setAttribute('name', icoExp);
        expandCard.setAttribute('style', 'opacity:0; pointer-events: none');
        return
    } else if (newSearch.value == '::id') { newSearch.value = userID; return }
    else if (newSearch.value == '::password') { newSearch.value = deco(txt[2]); showSearch.innerHTML = ''; return }
    else if (newSearch.value == '::bk') { newSearch.value = ''; downloadFile(docB1, (deco(txt[0]) + '_' + fecha())); return }


    for (i = 0; i < newTotalLength; i += 5) {
        if (newTotal[i].includes(newSearch.value.toLowerCase())) {
            showCardAll(newTotal[i].toUpperCase(), newTotal[i + 1], newTotal[i + 2], newTotal[i + 3]);
            contador++;
        }
    }

    if (showSearch.innerHTML == '') {
        showIcon.setAttribute('name', icoShow);
        expandCard.setAttribute('style', 'opacity:0; pointer-events: none');
    } else {
        showIcon.setAttribute('name', icoHide);
        expandCard.setAttribute('style', 'opacity:1; pointer-events: auto');
    };

    let s = (contador == 1) ? '' : 's';
    if (newSearch.value != '' && toast) presentToast(`${contador} Resultado${s} encontrado${s}.`, '800', 'black');
}

function alertMsg(msg1, msg2) {
    const alert = document.createElement('ion-alert');
    alert.subHeader = msg1;
    alert.message = msg2;
    document.body.appendChild(alert);
    return alert.present();
}

function alertMsgReset(msg1, msg2) {
    alerta = false
    const alert = document.createElement('ion-alert');
    alert.subHeader = msg1;
    alert.message = msg2;
    alert.buttons = [{ role: 'cancel', handler: () => { window.location.reload() } }];
    document.body.appendChild(alert);
    return alert.present();
}

function presentToast(msg, time, clase, btn = false) {
    const toast = document.createElement('ion-toast');
    toast.cssClass = clase;
    toast.message = msg;
    toast.duration = time;
    if (btn) {
        toast.buttons = [
            {
                side: 'end',
                text: 'Deshacer',
                handler: () => {
                    btnToast = false;
                    refreshData(false);
                    presentToast(`Deshaciendo cambios`, 2000, 'black');
                }
            }
        ];
    }
    document.body.appendChild(toast);
    return toast.present();
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function code(cod) {
    let hexCod = '', hexF = '';
    for (let i = 0; i < cod.length; i++) {
        hexCod = '' + cod.codePointAt(i).toString(16); //codifica
        if (hexCod.length == 2) {
            hexCod = (parseInt(hexCod, 16) + parseInt('05', 16)).toString(16).toUpperCase();
            hexF += '' + hexCod;
        } else {
            if (hexCod.length == 5) { hexF += '' + ("0x" + hexCod); i++ }
            if (hexCod.length == 4) hexF += '' + ("0x" + hexCod + 'Z');
        }
    }
    return hexF;
}

function deco(dec) {
    let str = '', decLength = dec.length;
    for (let n = 0; n < decLength; n += 2) {
        let tt = dec.substr(n, 2)
        if (tt == '0x') {
            n += 2
            let strCut = dec.substr((n), 5).split('');
            str += String.fromCodePoint(parseInt(dec.substr(n, (strCut[strCut.length - 1] == 'Z') ? 4 : 5), 16));
            n += 3
        } else {
            str += String.fromCharCode(parseInt(dec.substr(n, 2), 16) - 5);
        };
    }
    return str;
}

function splitInit() {
    txt = localStorage.getItem('L1').split('GD');
    aTotal = txt[3].split(txt[3].includes('Q0') ? 'Q0' : 'BO');
    aTotal.splice(-1, 1);
    if (txt.length == 4) txt.push('');
}

function aTotalTOnewTotal() {
    aTotal.sort();
    newTotal = [];
    for (b = 0; b < aTotal.length; b++) {
        const final = aTotal[b].split('OG');
        const finalLenght = final.length;
        for (n = 0; n < finalLenght; n++) {
            (n % 4 == 0) ? newTotal.push(deco(final[n]).toLowerCase()) : newTotal.push(deco(final[n]));
            if (n == 3) newTotal.push('oo');
        }
    }
}

function updateData(text, compareChanges, toast = true) {
    splitInit();
    aTotalTOnewTotal();

    localStorage.setItem('accessTempData', `${txt[0]}GD${txt[1]}GD${txt[2]}GD`);

    document.getElementById('userName').innerHTML = deco(txt[0]);
    showLogin.innerHTML = '';

    if (text == 'Rechazar') {
        if (localStorage.getItem('offline')) {
            localStorage.removeItem('offline');
            compareChanges = localStorage.getItem('L1');
        }
        localStorage.setItem('L1', (docB1 == newCompareData2) ? compareChanges : newCompareData2);
        updateDB('L1', 'B1');
    } else {
        updateDB('B1', 'L1');
    }

    newSearch.value = '';
    refreshData();
    if (toast) { presentToast((text == 'Rechazar') ? 'Cancelando cambios.' : 'Datos actualizados.', '1000', 'black') }
    else { presentToast('Datos offline actualizados', '1000', 'success') };
    setTimeout(() => { window.location.reload() }, 1000);
}

function updateDB(send, receive) {
    if (send == 'B1') return localStorage.setItem(receive, docB1);
    if (send == 'B2') return localStorage.setItem(receive, docB2);
    if (receive == 'B1') return db.collection(coll).doc(userID).update({ B1: localStorage.getItem(send), });
    if (receive == 'B2') return db.collection(coll).doc(userID).update({ B2: localStorage.getItem(send), });
}

function save() {
    localStorage.setItem('L1', `${txt[0]}GD${txt[1]}GD${txt[2]}GD${(aTotal.length > 0) ? aTotal.join('Q0') + 'Q0' + 'GD' : ''}${txt[4]}`);
}

function sendEmail() {
    coincidencia = false
    restoreKey = Math.floor(Math.random() * 999999) + 10000;

    const alert = document.createElement('ion-alert');
    alert.header = 'Recuperar contraseña';
    alert.inputs = [
        { type: 'text', name: 'restorePass', placeholder: 'Email' },
    ];
    alert.buttons = [
        { text: 'Cancelar', role: 'cancel' },
        {
            text: 'Ok',
            handler: usData => {

                if (usData.restorePass == '') {
                    alertMsg('Error', 'Debe insertar datos.');
                    return;
                }

                barProgressF('success', 'indeterminate');

                db.collection(coll).onSnapshot(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (!coincidencia) {
                            userID = doc.id;
                            userEmail = doc.data().B1.split('GD');
                            if (userEmail[1] == code(usData.restorePass)) {
                                coincidencia = true;
                                db.collection(coll).doc(userID).update({
                                    B3: restoreKey,
                                })
                                    .then(function () {
                                        presentToast('Mail enviado', 1000, 'success');
                                        barProgressF('light', 'determinate');
                                    });

                                emailjs.send("service_60bgz48", "template_jb9t50n", {
                                    to_email: usData.restorePass,
                                    restore_Key: restoreKey,
                                });
                            };
                        };
                    });
                    if (!coincidencia) {
                        barProgressF('light', 'determinated');
                        alertMsg('Error', 'Esa cuenta no está registrada');
                    };
                });
            },
        },
    ];
    document.body.appendChild(alert);
    return alert.present();
}

function listDrop(arrLista, tituloLista) {
    let arrListaLength = arrLista.length
    if (arrListaLength != 1) {
        let el = '';
        for (let i = 1; i < arrListaLength; i++) { el += `<p class="list_text">- ${arrLista[i]}</p>`; };
        return `
        <div style="margin:5px 0px 2px 0px; padding: 5px 5px 5px 0px">
            <label class="ccse" >&#9679 Cuentas ${tituloLista} (${arrListaLength - 1})</label>
        </div>
        ${el}
        `
    } else {
        return '';
    }
}

function presentAlertConfirmEdit(confPersonal) {
    const alert = document.createElement('ion-alert');
    alert.header = 'ADVERTENCIA!';
    alert.subHeader = 'Al cambiar estos datos se cerrará la sesión en otros dispositivos';
    alert.message = '¿Confirmar?';
    alert.buttons = [
        { text: 'Cancelar', role: 'cancel' },
        {
            text: 'Ok',
            handler: () => {
                (code(confPersonal[0]) == '') ? txt[0] = '25' : txt[0] = code(confPersonal[0]);
                txt[1] = code(confPersonal[1]);
                txt[2] = code(confPersonal[2]);
                txt[4] = code(confPersonal[3]);

                document.getElementById('userName').innerHTML = deco(txt[0]);
                document.getElementById('nameSettingText').innerHTML = deco(txt[0]).slice(0, 1).toUpperCase();
                localStorage.setItem('accessTempData', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD');
                localStorage.setItem('bp', txt[4]);

                save();
                updateDB('L1', 'B1');
                updateDB('L1', 'B2');
            },
        },
    ];
    document.body.appendChild(alert);
    return alert.present();
}



//EXTRAS
function fecha() {
    let today = new Date();
    let DD = String(today.getDate()).padStart(2, '0');
    let MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let YY = today.getFullYear();
    let hh = (today.getHours() < 10) ? '0' : '' + today.getHours();
    let mm = (today.getMinutes() < 10) ? '0' : '' + today.getMinutes();
    return today = `${DD}-${MM}-${YY}_${hh}${mm}`
}

function downloadFile(data, fileName, type = 'text/plain') {
    var data2 = new Blob([data], { type: 'text/plain' });
    const a = document.createElement('a');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(new Blob([data2], { type }));
    a.setAttribute('download', fileName);
    a.click();
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}

// function mostrarCambios() {
//     let openAdd = 0; openDel = 0; openEdit = 0;

//     document.getElementById('modal').innerHTML = `
//     <p id="op1" class="cct">Cambios</p>
//     <hr style="height:1px; border-width:0; color:gray;background-color:gray">
//     <p style="margin: 0px 0px 0px 0px;">

//     ${listDetail(arrCompareAdd, 'Nuevas', 'dropAddButton')}
//     ${listDetail(arrCompareDel, 'Borradas', 'dropDelButton')}
//     ${listDetail(arrCompareEdit, 'Editadas', 'dropEditButton')}

//     <input type="button" class="modal_btns" value="ACEPTAR" onClick="buttons_modal('aceptar')">
//     <input type="button" class="modal_btns" value="RECHAZAR" onClick="buttons_modal('rechazar')">
//     </p>
//     `;


//     document.getElementById('bkmodal').setAttribute('style', 'opacity:1; pointer-events: none');
//     document.getElementById('modal').setAttribute('style', 'opacity:1; pointer-events: auto');
//     document.querySelector('.dropdown-content').setAttribute('style', 'display: none');

//     const dropAddButton = document.querySelector('#dropAddButton');
//     const dropDelButton = document.querySelector('#dropDelButton');
//     const dropEditButton = document.querySelector('#dropEditButton');

//     if (arrCompareAdd.length != 1) {
//         dropAddButton.addEventListener('click', () => {
//             openDel = 0, openEdit = 0, openAdd++

//             if (openAdd < 2) {
//                 listDrop(arrCompareAdd);
//                 document.querySelector('.dropdown-content').setAttribute('style', 'display: block;');
//                 if (dropAddButton) dropAddButton.setAttribute('style', 'background-color: var(--ion-border-color)');
//                 if (dropDelButton) dropDelButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
//                 if (dropEditButton) dropEditButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
//             }
//             else {
//                 openAdd = 0;
//                 document.querySelector('.dropdown-content').setAttribute('style', 'display: none');
//                 dropAddButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
//             }
//         });
//     }

//     if (arrCompareDel.length != 1) {
//         dropDelButton.addEventListener('click', () => {
//             openDel++, openEdit = 0, openAdd = 0;

//             if (openDel < 2) {
//                 listDrop(arrCompareDel);
//                 document.querySelector('.dropdown-content').setAttribute('style', 'display: block;');
//                 if (dropAddButton) dropAddButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
//                 if (dropDelButton) dropDelButton.setAttribute('style', 'background-color: var(--ion-border-color)');
//                 if (dropEditButton) dropEditButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
//             }
//             else {
//                 openDel = 0;
//                 document.querySelector('.dropdown-content').setAttribute('style', 'display: none');
//                 dropDelButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
//             }
//         });
//     }

//     if (arrCompareEdit.length != 1) {
//         dropEditButton.addEventListener('click', () => {
//             openDel = 0, openEdit++, openAdd = 0;

//             if (openEdit < 2) {
//                 listDrop(arrCompareEdit);
//                 document.querySelector('.dropdown-content').setAttribute('style', 'display: block;');
//                 if (dropAddButton) dropAddButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
//                 if (dropDelButton) dropDelButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
//                 if (dropEditButton) dropEditButton.setAttribute('style', 'background-color: var(--ion-border-color)');

//             }
//             else {
//                 openEdit = 0;
//                 document.querySelector('.dropdown-content').setAttribute('style', 'display: none');
//                 dropEditButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
//             }
//         });
//     }
// }