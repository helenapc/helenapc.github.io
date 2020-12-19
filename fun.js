
const showCardAll = (account, user, pass, notes) => {
    const ionCard = document.createElement('ion-card');
    ionCard.setAttribute('button', 'click-btn');
    const newHeader = document.createElement('ion-card-header');
    const newSub1 = document.createElement('ion-card-subtitle');
    // newSub1.setAttribute('style','font-weight: bold; margin-bottom:0px');
    const newSub2 = document.createElement('ion-card-subtitle');
    const newSub3 = document.createElement('ion-card-subtitle');
    const newSub4 = document.createElement('ion-card-subtitle');
    const sep = document.createElement('ion-item');

    newSub1.textContent = account.toUpperCase();
    newSub2.textContent = 'Usuario: ' + user;
    newSub3.textContent = 'Contraseña: ' + pass;
    newSub4.textContent = 'Notas: ' + notes;

    // newSub2.setAttribute('id', 'newSub2');
    // newSub3.setAttribute('id', 'newSub3');
    // newSub4.setAttribute('id', 'newSub4');

    newSub2.setAttribute('class', 'hide');
    newSub3.setAttribute('class', 'hide');
    newSub4.setAttribute('class', 'hide');

    // if (expandIcon.getAttribute('name') == 'expand-outline') {
    if (expandIcon.getAttribute('name') == icoExp) {
        newSub1.setAttribute('style', 'font-weight: bold; margin-bottom:0px');
    } else {
        newSub1.setAttribute('style', 'font-weight: bold; margin-bottom:12px;');
        newSub2.classList.remove("hide");
        newSub3.classList.remove("hide");
        newSub4.classList.remove("hide");
    };

    newHeader.appendChild(newSub1);
    newHeader.appendChild(newSub2);
    newHeader.appendChild(newSub3);
    newHeader.appendChild(newSub4);

    ionCard.appendChild(newHeader);
    showSearch.appendChild(ionCard);
};

const item = (id, ico, text, color = '', show = true) => {
    const ionItem = document.createElement('ion-item');
    ionItem.textContent = text;
    ionItem.setAttribute('color', color);
    ionItem.setAttribute('button', 'click-btn');
    ionItem.setAttribute('id', id);
    const ionIco = document.createElement('ion-icon');
    ionIco.setAttribute('name', ico);
    ionIco.setAttribute('slot', 'start');
    ionIco.setAttribute('class', id);
    ionIco.setAttribute('style', 'margin-right:10px;');
    ionItem.appendChild(ionIco);

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



function setAttributes(elem, obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) elem[prop] = obj[prop];
    }
}

function delete_spaces(v1) {
    if (!v1) { v1 = ""; }
    else {
        v1 = v1.split("");
        for (let i = 0; i < v1.length; i++) {
            if (v1[i] == " ") { v1.shift(); i--; }
            else {
                while (true) {
                    if (v1[v1.length - 1] == " ") { v1.pop(); }
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
    }
    return v1;
};

function disableItem(boolean) {
    barMenuPrincipal.setAttribute('disabled', boolean);
    document.getElementById('title').setAttribute('style', 'margin-left:0px');
    document.getElementById('buttonAdd').setAttribute('style', 'opacity:1; margin-bottom:0px; margin-right:-8px');
    // setAttributes(document.getElementById('buttonHelp'), { style: 'opacity:1; margin-top:58px; margin-right:-8px', disabled: boolean });
    setAttributes(document.getElementById('nameSetting'), { style: 'opacity:1', disabled: boolean });
    // expand
    setAttributes(document.getElementById('showCard'), { style: 'opacity:1', disabled: boolean });
    setAttributes(document.getElementById('buttonSearch'), { style: 'opacity:1', disabled: boolean });
    // space
    setAttributes(document.getElementById('refresher'), { style: 'opacity:1', disabled: boolean });

    content.setAttribute('style', '--background: #ffffff00');
    if (!boolean) document.body.style.backgroundColor = "var(--ion-background-color)";
}

function barProgressF(color, state) {
    setAttributes(barProgress01, { color: color, type: state, value: '100' });
    // if (color == 'light' && state == 'determinate') {
    //     barProgress.setAttribute('style', 'opacity:0');
    // } else {
    //     barProgress.setAttribute('style', 'opacity:1');
    // }

    barProgress.setAttribute('style', `opacity: ${(color == 'light' && state == 'determinate') ? 0 : 1}`);
};

function refreshData(toast = true) {
    //funciones

    // if (newSearch.value == '::bk') { newSearch.value = ''; downloadFile(docB1, (txt[0] + '_' + fecha() ))}
    if (newSearch.value == '::id') newSearch.value = userID;
    if (newSearch.value == '::cs') newSearch.value = deco(txt[2]);


    // if (newSearch.value == '::a1') {
    //     newSearch.value = '';
    //     document.body.style.transitionDuration = '2s';
    // };

    // if (newSearch.value == '::a0') {
    //     newSearch.value = '';
    //     document.body.style.transitionDuration = '0s';
    // };

    // if (newSearch.value == '::bk'){
    //     newSearch.value = 'Hacer copia de seguridad';

    // }







    aTotal.sort();
    if (newSearch.value) {
        // setAttributes(document.getElementById('expandCard'), { style: 'opacity:1', disabled: false });
        document.querySelector('#expandCard').setAttribute('style', 'opacity:1; pointer-events: auto');
    } else {
        // showIcon.setAttribute('name', 'eye-outline');
        // expandIcon.setAttribute('name', 'expand-outline');

        showIcon.setAttribute('name', icoShow);
        expandIcon.setAttribute('name', icoExp);
        // setAttributes(document.getElementById('expandCard'), { style: 'opacity:0', disabled: true });
        document.querySelector('#expandCard').setAttribute('style', 'opacity:0; pointer-events: none');
    }

    showSearch.innerHTML = '';

    var contador = 0;
    for (i = 0; i < newTotal.length; i += 5) {
        if (newSearch.value === '*') {
            showCardAll(
                newTotal[i].toUpperCase(),
                newTotal[i + 1],
                newTotal[i + 2],
                newTotal[i + 3]
            );
            contador++;
        } else if (newTotal[i].includes(newSearch.value.toLowerCase())) {
            showCardAll(
                newTotal[i].toUpperCase(),
                newTotal[i + 1],
                newTotal[i + 2],
                newTotal[i + 3]
            );
            contador++;
        }
    }
    newSearch.value === '' ? (showSearch.innerHTML = '') : contador == 1 ? (s = '') : (s = 's');
    if (newSearch.value != '' && toast) presentToast(`${contador} resultado${s} encontrado${s}`, '500', 'dark');
    // if (showSearch.innerHTML != '') showIcon.setAttribute('name', 'eye-off-outline');
    if (showSearch.innerHTML != '') showIcon.setAttribute('name', icoHide);
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

function presentToast(msg, time, color) {
    const toast = document.createElement('ion-toast');
    toast.setAttribute('color', color);
    toast.message = msg;
    toast.duration = time;
    document.body.appendChild(toast);
    return toast.present();
}



function code(cod) {
    let hexCod = '';
    let hexF = '';
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
    let hexDec = dec;
    let str = '';
    for (let n = 0; n < hexDec.length; n += 2) {
        let tt = hexDec.substr(n, 2)
        if (tt == '0x') {
            n += 2
            let strCut = hexDec.substr(n, 5).split('');
            if (strCut[strCut.length - 1] == 'Z') {
                str += String.fromCodePoint(parseInt(hexDec.substr(n, 4), 16));
            } else {
                str += String.fromCodePoint(parseInt(hexDec.substr(n, 5), 16));
            }
            n += 3
        } else {
            str += String.fromCharCode(parseInt(hexDec.substr(n, 2), 16) - 5);
        };
    }
    return str;
}

function splitInit() {
    txt = localStorage.getItem('L1').split('GD');
    // txt[3] == undefined ? (txt2 = txt.unshift('')) : null;
    aTotal = txt[3].split(txt[3].includes('Q0') ? 'Q0' : 'BO');
    aTotal.splice(-1, 1);
    if (txt.length == 4) txt.push('');
}

function aTotalTOnewTotal() {
    aTotal.sort();
    newTotal = [];
    for (b = 0; b < aTotal.length; b++) {
        const final = aTotal[b].split('OG');
        for (n = 0; n < final.length; n++) {
            (n % 4 == 0) ? newTotal.push(deco(final[n]).toLowerCase()) : newTotal.push(deco(final[n]));
            if (n == 3) newTotal.push('oo');
        }
    }
}

function updateData(text, compareChanges) {

    // if (text == 'Aceptar') updateDB('B1', 'L1');
    // (text == 'Aceptar') ? updateDB('B1', 'L1') : updateDB('L1', 'B1');

    splitInit();
    aTotalTOnewTotal();

    localStorage.setItem('accessTempData', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD');
    // localStorage.setItem('accessTempData', txt[1] + 'GD' + txt[2] + 'GD');

    document.getElementById('userName').innerHTML = deco(txt[0]);
    showLogin.innerHTML = '';
    disableItem(false);
    let mensaje = 'Datos actualizados.';

    if (text == 'Rechazar') {
        mensaje = 'Cancelando cambios.';

        // console.log('////////////// Rechazar /////////////////');
        // console.log(deco(docB1));
        // console.log(deco(compareChanges));
        // console.log(deco(newCompareData2));
        // localStorage.setItem('L1', compareChanges);
        // (docB1 == newCompareData2) ? localStorage.setItem('L1', compareChanges): localStorage.setItem('L1', newCompareData2);
        localStorage.setItem('L1', (docB1 == newCompareData2) ? compareChanges : newCompareData2);
        updateDB('L1', 'B1');
    };

    newSearch.value = '';
    refreshData();
    presentToast(mensaje, '1000', 'dark');
    setTimeout(() => { window.location.reload() }, 1000);
}



function updateDB(send, receive) {
    if (send == 'B1') localStorage.setItem(receive, docB1);
    if (send == 'B2') localStorage.setItem(receive, docB2);
    if (receive == 'B1') {
        return db.collection(coll).doc(userID).update({
            B1: localStorage.getItem(send),
        })
            .catch(function (error) {
                presentToast('Error updating document.', 1000, 'danger');
                console.error('Error updating document: ', error);
                return;
            });
    }

    if (receive == 'B2') {
        return db.collection(coll).doc(userID).update({
            B2: localStorage.getItem(send),
        })
            .catch(function (error) {
                presentToast('Error updating document.', 1000, 'danger');
                console.error('Error updating document: ', error);
                return;
            });
    }
}

function save() {
    if (aTotal.length > 0) {
        localStorage.setItem('L1', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD' + aTotal.join('Q0') + 'Q0' + 'GD' + txt[4]);
    } else {
        localStorage.setItem('L1', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD' + txt[4]);
    }
}

function sendEmail() {
    coincidencia = false
    restoreKey = Math.floor(Math.random() * 999999) + 10000;

    const alert = document.createElement('ion-alert');
    alert.header = 'Recuperar contraseña';
    alert.inputs = [
        { type: 'email', name: 'restorePass', placeholder: 'Email' },
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
                                        setTimeout(() => { window.location.reload(); }, 1000);
                                    });


                                Email.send({
                                    Host: "smtp.gmail.com",
                                    Username: "restore.pass.helena@gmail.com",
                                    Password: "restaurar1234",
                                    To: usData.restorePass,
                                    From: "restore.pass.helena@gmail.com",
                                    Subject: "Restaurar contraseña",
                                    Body:
                                        `
                                        <h2>Nueva contraseña temporal:</h2>
                                        <h1>${restoreKey}</h1><h4>(Válida por única vez)</h1>
                                    `,
                                })

                            };
                        };
                    });
                    if (!coincidencia) {
                        barProgressF('light', 'determinated');
                        alertMsg('Error', 'Esta cuenta no está registrada');
                    };
                });
            },
        },
    ];
    document.body.appendChild(alert);
    return alert.present();
}



// ALERTS / POPUP
function alertAdd2(modalVal) {
    if (
        modalVal[0] == '' ||
        modalVal[1] == '' ||
        modalVal[2] == ''
    ) {
        barProgressF('warning', 'determinate');
        alertMsg('Error', 'Campos obligatorios vacíos.');
        setTimeout(() => { barProgressF('light', 'determinate'); }, 1500);
        return;
    }

    modalVal[0] = delete_spaces(modalVal[0].toLowerCase());
    modalVal[1] = delete_spaces(modalVal[1]);
    modalVal[2] = delete_spaces(modalVal[2]);
    modalVal[3] = delete_spaces(modalVal[3]);

    for (let i = 0; i < newTotal.length; i += 5) {
        if (
            modalVal[0] == newTotal[i] &&
            modalVal[1] == newTotal[i + 1] &&
            modalVal[2] == newTotal[i + 2]
        ) {
            alertMsg('Error', `La cuenta "${modalVal[0].toUpperCase()}" ya existe.`);
            return;
        }
    }

    aTotal.push(`${code(modalVal[0].toLowerCase())}OG${code(modalVal[1])}OG${code(modalVal[2])}OG${code(modalVal[3])}`)
    aTotalTOnewTotal();
    save();
    showSearch.innerHTML = '';
    newSearch.value = modalVal[0];
    // document.getElementById('expandIcon').setAttribute('name', 'contract-outline');
    document.getElementById('expandIcon').setAttribute('name', icoCom);
    refreshData();
    presentToast(`"${modalVal[0].toUpperCase()}" agregada`, 800, 'success');
    updateDB('L1', 'B1');
}

function alertEdit2(modalVal, reemplace) {
    const toRemplace = reemplace / 5;

    if (modalVal[0] == '' || modalVal[1] == '' || modalVal[2] == '') {
        // alertMsg('Error', 'Datos incorrectos o vacíos.');
        alertMsg('Error', 'Campos obligatorios vacíos.');
        return;
    }

    modalVal[0] = delete_spaces(modalVal[0].toLowerCase());
    modalVal[1] = delete_spaces(modalVal[1]);
    modalVal[2] = delete_spaces(modalVal[2]);
    modalVal[3] = delete_spaces(modalVal[3]);

    if (
        modalVal[0] == cuPath[0].toLowerCase() &&
        modalVal[1] == cuPath[1] &&
        modalVal[2] == cuPath[2] &&
        modalVal[3] == cuPath[3]
    ) {
        return;
    }

    for (i = 0; i < newTotal.length; i += 5) {
        if (
            modalVal[0] == newTotal[i] &&
            modalVal[1] == newTotal[i + 1] &&
            modalVal[2] == newTotal[i + 2] &&
            modalVal[3] == newTotal[i + 3]
        ) {
            alertMsg('Error', `La cuenta "${modalVal[0].toUpperCase()}" ya existe.`);
            return;
        }
    }

    aTotal.splice(toRemplace, 1, code(modalVal[0]) + 'OG' + code(modalVal[1]) + 'OG' + code(modalVal[2]) + 'OG' + code(modalVal[3]));
    aTotalTOnewTotal();
    refreshData();
    presentToast(`"${modalVal[0].toUpperCase()}" editado.`, 800, 'success');
    save();
    updateDB('L1', 'B1');
    closeAlert = false;

}

function alertDel(cuPath, reemplace) {
    document.getElementById('bkmodal').setAttribute('style', 'opacity:0; pointer-events: none');
    document.getElementById('modal').setAttribute('style', 'opacity:0; pointer-events: none');
    document.getElementById('buttonEdit').setAttribute('style', 'opacity:0; pointer-events: none');
    document.getElementById('buttonDelete').setAttribute('style', 'opacity:0; pointer-events: none');
    const alert = document.createElement('ion-alert');
    alert.message = `¿Eliminar "${cuPath[0]}"?`;
    alert.buttons = [
        { text: 'cancelar', role: 'cancel' },
        {
            text: 'ok',
            handler: () => {
                aTotal.splice(reemplace / 5, 1);
                aTotalTOnewTotal();
                refreshData();
                save();
                presentToast(`"${cuPath[0]}" eliminado.`, 500, 'danger');
                updateDB('L1', 'B1');
                // if (showSearch.value == '') newSearch.value = '';
                closeAlert = false;
                // alertcompare = false;
                // setTimeout(() => { alertcompare = true; }, 1500)
            },
        },
    ];
    document.body.appendChild(alert);
    return alert.present();
}

function presentCompareData(metaObj, compareChanges) {
    const alert = document.createElement('ion-alert');
    alert.setAttribute('backdrop-dismiss', 'false');
    alert.header = 'Se detectaron cambios';
    alert.message = `¿Aceptar y sincorinizar con la base de datos? </br></br> DETALLES:`;
    alert.inputs = metaObj;
    alert.buttons = [
        { text: 'Rechazar', handler: () => { updateData('Rechazar', compareChanges) } },
        { text: 'Aceptar', handler: () => { updateData('Aceptar', compareChanges) } },
    ];
    document.body.appendChild(alert);
    return alert.present();
}

function buttons_modal(func) {

    if (func === 'ok') {
        let modalVal = [
            document.querySelectorAll('.modal_input')[0].value,
            document.querySelectorAll('.modal_input')[1].value,
            document.querySelectorAll('.modal_input')[2].value,
            document.querySelectorAll('.modal_input')[3].value,
        ];
        if (document.getElementById('op1').innerHTML == 'Editar cuenta') {
            alertEdit2(modalVal, reemplace);
        }
        if (document.getElementById('op1').innerHTML == 'Agregar cuenta') {
            alertAdd2(modalVal);
        }

        document.querySelectorAll('.ccse')[0].setAttribute('style', 'user-select:all;');
        document.querySelectorAll('.ccse')[1].setAttribute('style', 'user-select:all;');
        document.querySelectorAll('.ccse')[2].setAttribute('style', 'user-select:all;');
    }

    if (func == 'aceptar') { updateData('Aceptar', compareChanges) };
    if (func == 'rechazar') { updateData('Rechazar', compareChanges) };

    if (func == 'ok_user') {
        let modalVal = [
            document.querySelectorAll('.modal_input')[0].value,
            document.querySelectorAll('.modal_input')[1].value,
            document.querySelectorAll('.modal_input')[2].value,
            document.querySelectorAll('.modal_input')[3].value,
        ];

        // console.log(modalVal[0] + '==' + deco(txt[0]));
        // console.log(modalVal[1] + '==' + deco(txt[1]));
        // console.log(modalVal[2] + '==' + deco(txt[2]));
        // console.log(modalVal[3] + '==' + deco(txt[4]));

        if (modalVal[1] == '' || modalVal[2] == '') {
            barProgressF('danger', 'determinate');
            alertMsg('Error', 'Datos vacíos.');
            setTimeout(() => { barProgressF('light', 'determinate'); }, 1500);
            return;
        }

        // if (modalVal[0] == deco(txt[0]) && modalVal[1] == deco(txt[1]) && modalVal[2] == deco(txt[2]) && modalVal[3] == deco(txt[4])) {
        //     return;
        // }


        if (modalVal[0] == deco(txt[0]) && modalVal[1] == deco(txt[1]) && modalVal[2] == deco(txt[2]) && modalVal[3] == deco(txt[4]))
        { 
            //return;
        } else { presentAlertConfirmEdit(modalVal); }
        // const confPersonal = [usNData.userEditName, usNData.userEditUser, usNData.userEditPass, usNData.userPin];
        // presentAlertConfirmEdit(confPersonal);
        // console.log(modalVal);
        // console.log(deco(txt[4]));
    }

    // console.log('Listo');
    document.getElementById('bkmodal').setAttribute('style', 'opacity:0; pointer-events: none');
    document.getElementById('modal').setAttribute('style', 'opacity:0; pointer-events: none');

    // alertcompare = false;
    // setTimeout(() => { alertcompare = true; }, 15
}



function listDrop(arrayFinal) {
    document.querySelector(".dropdown-content").innerHTML = '';
    for (let i = 0; i < arrayFinal.length; i++) {
        let el = document.createElement("p");
        (i == 0) ? el.textContent = arrayFinal[0] :
            el.textContent = '\u25b8 ' + arrayFinal[i];
        // document.querySelector(".dropdown-content").appendChild(el);
    };

}


function listDrop2(arrayFinal) {
    // document.querySelector(".dropdown-content").innerHTML = '';
    if (arrayFinal.length != 1) {
        // let listTemp = [];
        let el = '';
        for (let i = 1; i < arrayFinal.length; i++) {

            el += `<p class="list_text">- ${arrayFinal[i]}</p>`;




            // let el = document.createElement("p").textContent = `<p class="list_text"><input type="checkbox" id= "${delete_spaces(arrayFinal[i])}"> ${arrayFinal[i]}
            // </p>`
            // listTemp.push(el);

            // el += `<p class="list_text"><input type="checkbox">${arrayFinal[i]}</p>`;


            // el += `<p class="list_text">\u21b3 ${arrayFinal[i]}</p>`
            // return el;
        };
        return el;
        // return listTemp.join('');
    };
    return '';
}

function listDetail(arrLista, tituloLista, idbtn) {
    if (arrLista.length != 1) {
        return `
        <div style="margin:5px 0px 2px 0px; padding: 5px 5px 5px 5px">
            <label class="ccse" >\u25b8 Cuentas ${tituloLista} (${arrLista.length - 1})</label>
            <button id=${idbtn}>+</button>
            <div class="dropdown-content"></div>
        </div>
        `
    } else {
        return '';
    }
};

function listDetail2(arrLista, tituloLista) {
    if (arrLista.length != 1) {
        return `
        <div style="margin:5px 0px 2px 0px; padding: 5px 5px 5px 0px">
            <label class="ccse" >&#9679 Cuentas ${tituloLista} (${arrLista.length - 1})</label>
        </div>
        `
    } else {
        return '';
    }
};




// CONFIG EDIT NM/US/PS/NO
function alertPass_DELETE() {
    const alertPassItem = document.createElement('ion-alert');
    alertPassItem.header = 'Configuración personal';
    alertPassItem.message = 'Inserte contraseña para continuar..';
    alertPassItem.inputs = [
        { name: 'uEPass', placeholder: 'Contraseña', type: 'password' },
    ];
    alertPassItem.buttons = [
        {
            text: 'Ok',
            handler: u => {
                if (u.uEPass == deco(txt[2])) {
                    if (txt[0] == '25') txt[0] = '';
                    // presentAlertEditUserData();
                    // presentAlertEditUserData2(txt);

                } else {
                    presentToast('Incorrecto.', '800', 'warning');
                }
            },
        },
    ];
    document.body.appendChild(alertPassItem);
    return alertPassItem.present();
}
function presentAlertEditUserData_DELETE() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Editar cuenta';
    alert.inputs = [
        { name: 'userEditName', placeholder: 'Nombre (Opcional)', value: deco(txt[0]) },
        { name: 'userEditUser', placeholder: 'Email', value: deco(txt[1]) },
        { name: 'userEditPass', placeholder: 'Contraseña', value: deco(txt[2]) },
        { name: 'userPin', placeholder: 'PIN', value: deco(txt[4]) },
    ];
    alert.buttons = [
        { text: 'Cancelar', role: 'cancel' },
        {
            text: 'Ok',
            handler: usNData => {
                if (usNData.userEditUser == '' || usNData.userEditPass == '') {
                    barProgressF('danger', 'determinate');
                    alertMsg('Error', 'Datos vacíos.');
                    setTimeout(() => { barProgressF('light', 'determinate'); }, 1500);
                    return;
                }

                if (usNData.userEditUser == deco(txt[0]) && usNData.userEditPass == deco(txt[1]) && usNData.userEditPass == deco(txt[2]) && usNData.userPin == deco(txt[4])) {
                    return;
                }
                const confPersonal = [usNData.userEditName, usNData.userEditUser, usNData.userEditPass, usNData.userPin];

                presentAlertConfirmEdit(confPersonal);



            },
        },
    ];
    document.body.appendChild(alert);
    return alert.present();
}
function presentAlertEditUserData2_DELETE(txt) {

    document.getElementById('bkmodal').setAttribute('style', 'opacity:0.3; pointer-events: auto');
    document.getElementById('modal').setAttribute('style', 'opacity:1; pointer-events: auto');


    document.getElementById('modal').innerHTML =
        `
    <p id="op1" class="cct">Editar cuenta</p>
    <hr style="height:1px; border-width:0; color:gray;background-color:gray">
    <p style="margin: 0px 0px 0px 0px;">
    <input type="text" placeholder="*Opcional" class="ccse modal_input" value="${deco(txt[0])}">
    <label class="cce" > Nombre: </label>
    <input type="text" placeholder="*Obligatorio" class="ccse modal_input" value="${deco(txt[1])}">
    <label class="cce" > Email: </label>
    <input type="text" placeholder="*Obligatorio" class="ccse modal_input" value="${deco(txt[2])}">
    <label class="cce" > Contraseña: </label>
    <input type="text" placeholder="*Opcional" class="ccse modal_input" value="${deco(txt[4])}">
    <label class="cce" > PIN: </label>

        <input type="button" class="modal_btns" value="OK" onClick="buttons_modal('ok_user')">
        <input type="button" class="modal_btns" value="CANCELAR" onClick="buttons_modal('cancel')">

    </p>
`;

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
                // localStorage.setItem('accessTempData', txt[1] + 'GD' + txt[2] + 'GD');

                // 
                localStorage.setItem('bp', txt[4]);
                // 

                save();
                updateDB('L1', 'B1');
                updateDB('L1', 'B2');

                // alertcompare = false;
            },
        },
    ];
    document.body.appendChild(alert);
    return alert.present();
}




//EXTRAS

function fecha() { //var/let
    let today = new Date();
    let DD = String(today.getDate()).padStart(2, '0');
    let MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let YYYY = today.getFullYear();
    let hh = today.getHours();
    if (hh < 10) hh = '0' + hh;
    let mm = today.getMinutes();
    if (mm < 10) mm = '0' + mm;
    today = DD + '-' + MM + '-' + (YYYY - 2000) + '-' + hh + mm;
    return today;
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


function mostrarCambios() {
    let openAdd = 0; openDel = 0; openEdit = 0;

    document.getElementById('modal').innerHTML = `
    <p id="op1" class="cct">Cambios</p>
    <hr style="height:1px; border-width:0; color:gray;background-color:gray">
    <p style="margin: 0px 0px 0px 0px;">
    
    ${listDetail(arrCompareAdd, 'Nuevas', 'dropAddButton')}
    ${listDetail(arrCompareDel, 'Borradas', 'dropDelButton')}
    ${listDetail(arrCompareEdit, 'Editadas', 'dropEditButton')}
    
    <input type="button" class="modal_btns" value="ACEPTAR" onClick="buttons_modal('aceptar')">
    <input type="button" class="modal_btns" value="RECHAZAR" onClick="buttons_modal('rechazar')">
    </p>
    `;


    document.getElementById('bkmodal').setAttribute('style', 'opacity:0.3; pointer-events: none');
    document.getElementById('modal').setAttribute('style', 'opacity:1; pointer-events: auto');
    document.querySelector('.dropdown-content').setAttribute('style', 'display: none');

    const dropAddButton = document.querySelector('#dropAddButton');
    const dropDelButton = document.querySelector('#dropDelButton');
    const dropEditButton = document.querySelector('#dropEditButton');

    if (arrCompareAdd.length != 1) {
        dropAddButton.addEventListener('click', () => {
            openDel = 0, openEdit = 0, openAdd++

            if (openAdd < 2) {
                listDrop(arrCompareAdd);
                document.querySelector('.dropdown-content').setAttribute('style', 'display: block;');
                if (dropAddButton) dropAddButton.setAttribute('style', 'background-color: var(--ion-border-color)');
                if (dropDelButton) dropDelButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
                if (dropEditButton) dropEditButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
            }
            else {
                openAdd = 0;
                document.querySelector('.dropdown-content').setAttribute('style', 'display: none');
                dropAddButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
            }
        });
    }

    if (arrCompareDel.length != 1) {
        dropDelButton.addEventListener('click', () => {
            openDel++, openEdit = 0, openAdd = 0;

            if (openDel < 2) {
                listDrop(arrCompareDel);
                document.querySelector('.dropdown-content').setAttribute('style', 'display: block;');
                if (dropAddButton) dropAddButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
                if (dropDelButton) dropDelButton.setAttribute('style', 'background-color: var(--ion-border-color)');
                if (dropEditButton) dropEditButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
            }
            else {
                openDel = 0;
                document.querySelector('.dropdown-content').setAttribute('style', 'display: none');
                dropDelButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
            }
        });
    }

    if (arrCompareEdit.length != 1) {
        dropEditButton.addEventListener('click', () => {
            openDel = 0, openEdit++, openAdd = 0;

            if (openEdit < 2) {
                listDrop(arrCompareEdit);
                document.querySelector('.dropdown-content').setAttribute('style', 'display: block;');
                if (dropAddButton) dropAddButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
                if (dropDelButton) dropDelButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
                if (dropEditButton) dropEditButton.setAttribute('style', 'background-color: var(--ion-border-color)');

            }
            else {
                openEdit = 0;
                document.querySelector('.dropdown-content').setAttribute('style', 'display: none');
                dropEditButton.setAttribute('style', 'background-color: var(--ion-color-primary)');
            }
        });
    }
}