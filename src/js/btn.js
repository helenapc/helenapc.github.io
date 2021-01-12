document.getElementById('bkmodal').addEventListener('click', () => { buttonModalCancel() });



//home
buttonLogin.addEventListener('click', () => {
    barProgressF('success', 'indeterminate');
    localStorage.setItem('accessTempData', code(nameLog.value) + 'GD' + code(passLog.value) + 'GD');

    db.collection(coll).onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
            if (!coincidencia) {
                docB1 = doc.data().B1;
                docB2 = doc.data().B2;
                docB3 = doc.data().B3;

                userID = doc.id;

                userRestoreAccount = doc.data().B1.split('GD');

                if (docB1.includes(localStorage.getItem('accessTempData'))) {
                    coincidencia = true;
                    localStorage.setItem('tPin', Date.now());
                    updateDB('B1', 'L1');
                    splitInit();
                    aTotalTOnewTotal();
                    localStorage.setItem('accessTempData', txt[0] + 'GD' + code(nameLog.value) + 'GD' + code(passLog.value) + 'GD'); //TEST
                    localStorage.setItem('bp', txt[4]); //FIX?
                    document.getElementById('userName').innerHTML = deco(txt[0]);
                    multipleAttribute(['.button_nav', '#buttonAdd', '#nameSetting', '#showCard', '#buttonSearch'], 'style', 'pointer-events: auto; opacity: 1');
                    window.location.reload();
                }

                if (code(nameLog.value) == userRestoreAccount[1] && passLog.value == docB3) {
                    coincidencia = true;

                    const alert = document.createElement('ion-alert');
                    alert.subHeader = 'Restablecer contraseña';
                    alert.inputs = [
                        { name: 'pass01', placeholder: 'Nueva contraseña...', value: '' },
                        { name: 'pass02', placeholder: 'Confirmar contraseña...', value: '' }
                    ];
                    alert.buttons = [
                        { text: 'Cancelar', handler: () => { window.location.reload(); } },
                        {
                            text: 'Ok',
                            handler: usRData => {

                                if (usRData.pass01 == '' || usRData.pass02 == '' || usRData.pass01 != usRData.pass02) {
                                    alertMsg('Error', 'Datos incorrectos o vacíos.');
                                    window.location.reload();
                                    return;
                                }

                                localStorage.setItem('tPin', Date.now());
                                txt[0] = (userRestoreAccount[0] == '') ? '25' : userRestoreAccount[0]
                                txt[1] = userRestoreAccount[1];
                                txt[2] = code(usRData.pass01);
                                txt[3] = userRestoreAccount[3];
                                txt[4] = userRestoreAccount[4];

                                document.getElementById('userName').innerHTML = deco(txt[0]);
                                document.getElementById('nameSettingText').innerHTML = deco(txt[0]).slice(0, 1).toUpperCase();
                                localStorage.setItem('accessTempData', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD');
                                localStorage.setItem('bp', txt[4]);
                                localStorage.setItem('tPin', Date.now());

                                localStorage.setItem('L1', `${txt[0]}GD${txt[1]}GD${txt[2]}GD${txt[3]}GD${txt[4]}`);
                                updateDB('L1', 'B1');
                                updateDB('L1', 'B2');
                                comparePersonalData = false;

                                db.collection(coll).doc(userID).update({
                                    B3: firebase.firestore.FieldValue.delete()
                                }).then(function () {
                                    presentToast('Contraseña restablecida', '800', 'success')
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 1000);
                                });
                            },
                        },
                    ];
                    document.body.appendChild(alert);
                    return alert.present();
                }
            };
        });
        barProgressF('light', 'determinate');
        if (coincidencia) {
            showLogin.innerHTML = '';
        } else {
            barProgressF('warning', 'determinate');
            alertMsg('Error', 'Datos incorrectos o vacíos.');
            setTimeout(() => { barProgressF('light', 'determinate'); }, 1500);
        }
    });
});

buttonCreate.addEventListener('click', () => {
    function presentAlertCreate() {
        const alert = document.createElement('ion-alert');
        alert.header = 'Registrarse';
        alert.inputs = [
            { name: 'userEditName', placeholder: 'Nombre (Opcional)' },
            { name: 'userEditUser', placeholder: 'Email' },
            { name: 'userEditPass', placeholder: 'Contraseña', type: 'password' },
        ];
        alert.buttons = [
            { text: 'Cancelar', role: 'cancel' },
            {
                text: 'Ok',
                handler: usCData => {
                    if (usCData.userEditUser == '' || usCData.userEditPass == '') {
                        barProgressF('warning', 'determinate');
                        alertMsg('Error', 'Datos obligatorios vacíos.');
                        setTimeout(() => { barProgressF('light', 'determinate'); }, 1500);
                        return;
                    };

                    barProgressF('success', 'indeterminate');
                    (code(usCData.userEditName) == '') ? txt[0] = '25' : txt[0] = code(usCData.userEditName);

                    localStorage.setItem('accessTempData', code(usCData.userEditName) + 'GD' + code(usCData.userEditUser) + 'GD' + code(usCData.userEditPass) + 'GD');

                    db.collection(coll).onSnapshot(querySnapshot => {
                        if (!coincidencia) {
                            querySnapshot.forEach(doc => {
                                uCA = doc.data().B1.split('GD');
                                if (!coincidencia && uCA[1] == code(usCData.userEditUser)) {
                                    coincidencia = true;
                                    docB1 = doc.data().B1;
                                    docB2 = doc.data().B2;
                                    userID = doc.id;
                                };
                            });
                        };

                        if (coincidencia) {
                            if (localStorage.getItem('alrt')) {
                                localStorage.removeItem('alrt');
                            } else {
                                barProgressF('light', 'determinate');
                                alertMsgReset('Error', 'Ya hay una cuenta registrada con este email.');
                            }
                            return

                        } else {
                            localStorage.setItem('alrt', code(usCData.userEditUser))
                            db.collection(coll).add({
                                B1: localStorage.getItem('accessTempData'),
                                B2: '',
                            })
                                .then(function () {
                                    updateDB('B1', 'L1');
                                    showLogin.innerHTML = '';
                                    splitInit();
                                    aTotalTOnewTotal();
                                    document.getElementById('userName').innerHTML = deco(txt[0]);
                                    multipleAttribute(['.button_nav', '#buttonAdd', '#nameSetting', '#showCard', '#buttonSearch', '#refresher'], 'style', 'pointer-events: auto; opacity: 1');
                                    barProgressF('light', 'determinate');
                                    window.location.reload();
                                })
                                .catch(function (error) {
                                    console.error('Error adding document: ', error);
                                });
                        };
                    });
                }
            },
        ];
        document.body.appendChild(alert);
        return alert.present();
    }
    presentAlertCreate();
    return;
});

newSearch.addEventListener('ionInput', () => { refreshData() });

showSearch.addEventListener('click', e => {  //editCard
    e.preventDefault();
    var xPath = 3;

    if (e.path[xPath].localName == 'ion-row') return;
    if (e.path[xPath].innerText == undefined) xPath = 0;
    if (e.path[xPath].innerText == '') xPath = 5;

    cuPath[0] = e.path[xPath].children[0].innerText;
    cuPath[1] = e.path[xPath].children[1].innerText.split('Usuario: ').pop();
    cuPath[2] = e.path[xPath].children[2].innerText.split('Contraseña: ').pop();
    cuPath[3] = e.path[xPath].children[3].innerText.split('Notas: ').pop();

    if (cuPath[3] == 'Notas:') cuPath[3] = '';

    for (i = 0; i < newTotal.length; i += 5) {
        if (
            cuPath[0].toLowerCase() == newTotal[i].toLowerCase() &&
            cuPath[1] == newTotal[i + 1] &&
            cuPath[2] == newTotal[i + 2] &&
            cuPath[3] == newTotal[i + 3]
        ) {
            reemplace = i
            document.getElementById('modal').innerHTML =
                `
            <p id="op1" class="cct" style="text-align: center">${cuPath[0]}</p>
            <hr style="height:1px; border-width:0; color:gray;background-color:gray">
            <p style="margin: 0px 0px 0px 0px;">
            <label class="cce_st" > Usuario: </label>
            <p class="ccse" > ${cuPath[1]} </p>
            <label class="cce_st" > Contraseña: </label>
            <p class="ccse" > ${cuPath[2]} </p>
            <label class="cce_st" > Notas: </label>
            <p class="ccse" > ${cuPath[3]} </p>
            </p>
            `;

            multipleAttribute(['#bkmodal', '#modal', '#buttonEdit', '#buttonDelete'], 'style', 'opacity:1; pointer-events: auto');
            multipleAttribute(['#nameSetting', '#expandCard', '#showCard', '#buttonSearch'], 'style', 'opacity:0.3; pointer-events: none');

            document.querySelectorAll('.ccse')[0].setAttribute('style', 'user-select:all;');
            document.querySelectorAll('.ccse')[1].setAttribute('style', 'user-select:all;');
            document.querySelectorAll('.ccse')[2].setAttribute('style', 'user-select:all;');
        }
    }
});

document.getElementById('refresher').addEventListener('ionRefresh', () => {
    setTimeout(() => {
        window.location.reload();
        document.getElementById('refresher').complete();
    }, 150);
});



//CHECK/TOGGLE
checkbox.addEventListener('click', () => {
    if (activeTheme[1] == 'dark') {
        document.body.classList.toggle('dark');
        document.body.classList.toggle(activeTheme[0]);
        activeTheme[1] = '';
    } else {
        document.body.classList.toggle(activeTheme[0]);
        document.body.classList.toggle('dark');
        activeTheme[1] = 'dark';
    }
    localStorage.setItem('theme', activeTheme);

    if (cargarTema1[0] && cargarTema1[0].classList[0] == 'light') {
        cargarTema1[0].setAttribute('style', `background: url('${(configData.fondo01 == '') ? 'src/img/bg1.jpg' : configData.fondo01} ') no-repeat 50% center/cover`);
    }
    else if (cargarTema2[0] && cargarTema2[0].classList[0] == 'dark') {
        cargarTema2[0].setAttribute('style', `background: url('${(configData.fondo02 == '') ? 'src/img/bg2.jpg' : configData.fondo02} ') no-repeat 50% center/cover`);
    }
});