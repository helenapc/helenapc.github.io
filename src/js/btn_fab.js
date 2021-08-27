document.getElementById('buttonEdit').addEventListener('click', () => {

    multipleAttribute(['#buttonEdit', '#buttonDelete'], 'style', 'opacity:0; pointer-events: none');

    multipleAttribute(['#showCard', '#buttonAdd'], 'style', 'opacity:0.3; pointer-events: none');

    if (showSearch.innerHTML != '') multipleAttribute(['#expandCard'], 'style', 'opacity:0.3; pointer-events: none');

    document.getElementById('bkmodal').setAttribute('style', 'opacity:1; pointer-events: none');

    let lengthCard = document.querySelectorAll('ion-card').length;
    for (let i = 0; i < lengthCard; i++) { document.querySelectorAll('ion-card')[i].setAttribute('style', 'pointer-events:none') }

    let modalTemporal = document.getElementById('modal');
    // modalTemporal.setAttribute('style', 'z-index:20');
    modalTemporal.innerHTML =
        `
    <p id="op1" class="modalTitle">Editar cuenta</p>
    <hr style="height:1px; border-width:0; color:gray;background-color:gray">
    <p style="margin: 25px 0px 15px 0px;">
    <input type="text" placeholder="Obligatorio" class="modalContentData modal_input" value="${cuPath[0].toLowerCase()}">
    <label class="modalLabel" > Cuenta: </label>
    <input type="text" placeholder="Obligatorio" class="modalContentData modal_input" value="${cuPath[1]}">
    <label class="modalLabel" > Usuario: </label>
    <input type="text" placeholder="Obligatorio" class="modalContentData modal_input" value="${cuPath[2]}">
    <label class="modalLabel" > Contraseña: </label>
    <textarea placeholder="Opcional" cols='23' class="modalContentData modal_input">${cuPath[3]}</textarea>
    <label class="modalLabel noteTextArea"> Notas: </label>
    </p>
    
    <input type="button" class="modal_btns" value="OK" onClick="buttonModalEdit()">
    <input type="button" class="modal_btns" value="CANCELAR" onClick="buttonModalCancel()">
    
    `;
});

// document.getElementById('buttonDelete').addEventListener('keyup', () => {

//     console.log('keyup');
//     multipleAttribute(['#bkmodal', '#modal', '#buttonEdit', '#buttonDelete'], 'style', 'opacity:0; pointer-events: none');

//     multipleAttribute(['#showCard', '#buttonAdd'], 'style', 'opacity:1; pointer-events: auto');
//     if (showSearch.innerHTML != '') {
//         multipleAttribute(['#expandCard'], 'style', 'opacity:1; pointer-events: auto');
//     }


//     const alert = document.createElement('ion-alert');
//     alert.message = `¿Eliminarrrrr "${cuPath[0]}"?`;
//     alert.buttons = [
//         { text: 'cancelar', role: 'cancel' },
//         {
//             text: 'ok',
//             handler: () => {
//                 aTotal.splice(reemplace / 5, 1);
//                 aTotalTOnewTotal();

//                 multipleAttribute(['#showCard', '#buttonAdd'], 'style', 'opacity:1; pointer-events: auto');

//                 if (showSearch.innerHTML != '') expandCard.setAttribute('style', 'opacity:1; pointer-events: auto');

//                 if (newSearch.value == '') {


//                     showSearch.innerHTML = '';
//                     showIcon.setAttribute('name', icoHide);

//                     expandCard.setAttribute('style', 'opacity:1; pointer-events: auto');
//                     for (i = 0; i < newTotal.length; i += 5) {
//                         showCardAll(newTotal[i].toUpperCase(), newTotal[i + 1], newTotal[i + 2], newTotal[i + 3]);
//                     }
//                     newTotal.length / 5 == 1 ? (s = '') : (s = 's');
//                     presentToast(`${newTotal.length / 5} Cuenta${s} guardad${s}.`, '800', 'black');

//                 } else {
//                     refreshData();
//                 }
//                 save();
//                 presentToast(`"${cuPath[0]}" eliminadooooooooo.`, '800', 'danger');
//                 updateDB('L1', 'B1');
//                 closeAlert = false;

//             },
//         },
//     ];


//     document.body.appendChild(alert);
//     return alert.present();
// });

document.getElementById('buttonDelete').addEventListener('click', () => {
    console.log('Delete 1');
    // multipleAttribute(['#bkmodal', '#modal'], 'style', 'opacity:1; pointer-events: auto');
    // document.querySelectorAll('ion-card').setAttribute('style', 'opacity:0.3')
    // console.log(document.querySelectorAll('ion-card').length);
    let lengthCard = document.querySelectorAll('ion-card').length;

    for (let i = 0; i < lengthCard; i++) {
        document.querySelectorAll('ion-card')[i].setAttribute('style', 'pointer-events:none')
    }

    document.querySelectorAll('ion-card')[1].setAttribute('style', 'opacity:0.3')
    document.getElementById('bkmodal').setAttribute('style', 'opacity:1; pointer-events: none');
    document.getElementById('modal').setAttribute('style', 'opacity:1; pointer-events: auto; z-index:20');

    multipleAttribute(['#showCard', '#buttonAdd'], 'style', 'opacity:0.3; pointer-events: none');

    if (showSearch.innerHTML != '') multipleAttribute(['#expandCard'], 'style', 'opacity:0.3; pointer-events: none');

    document.getElementById('modal').innerHTML =
        `
    <p class="modalTitle" style="margin: 5px 0px 20px 0px;">
        ¿Eliminaaaaar ${cuPath[0]}?
    </p>
    <input type="button" class="modal_btns" value="OK" onClick="buttonModalDelete()">
    <input type="button" class="modal_btns" value="CANCELAR" onClick="buttonModalCancel()">

    `;

    multipleAttribute(['#buttonEdit', '#buttonDelete'], 'style', 'opacity:0; pointer-events: none');

});

document.getElementById('expandCard').addEventListener('click', () => {
    expandIcon.setAttribute('name', (expandIcon.getAttribute('name') == icoExp) ? icoCom : icoExp);

    let cards = document.getElementsByTagName('ion-card-header');
    let vuelta = cards.length;
    for (let i = 0; i < vuelta; i++) {
        cards[i].classList.toggle('btnExpandCard');
    }

});

document.getElementById('showCard').addEventListener('click', () => {

    newSearch.value = '';
    if (showIcon.getAttribute('name') == icoShow) {
        showIcon.setAttribute('name', icoHide);
        expandCard.setAttribute('style', 'opacity:1; pointer-events: auto');

        const newTotalLength = newTotal.length;
        for (i = 0; i < newTotalLength; i += 5) {
            showCardAll(newTotal[i].toUpperCase(), newTotal[i + 1], newTotal[i + 2], newTotal[i + 3]);
        }
        let s = (newTotalLength / 5 == 1) ? '' : 's';
        presentToast(`${newTotalLength / 5} Cuenta${s} guardada${s}.`, '1000', 'black');
    } else {
        showIcon.setAttribute('name', icoShow);
        showSearch.innerHTML = '';
        expandCard.setAttribute('style', 'opacity:0; pointer-events: none');
        expandIcon.setAttribute('name', icoExp);
    };
});



document.getElementById('buttonAdd').addEventListener('click', () => {
    let lengthCard = document.querySelectorAll('ion-card').length;
    for (let i = 0; i < lengthCard; i++) {
        document.querySelectorAll('ion-card')[i].setAttribute('style', 'pointer-events:none')
    }
    // multipleAttribute(['#bkmodal', '#modal'], 'style', 'opacity:1; pointer-events: auto; z-index:20');
    document.getElementById('bkmodal').setAttribute('style', 'opacity:1; pointer-events: none');
    document.getElementById('modal').setAttribute('style', 'opacity:1; pointer-events: auto');
    multipleAttribute(['#showCard', '#buttonAdd'], 'style', 'opacity:0.3; pointer-events: none');
    if (showSearch.innerHTML != '') multipleAttribute(['#expandCard'], 'style', 'opacity:0.3; pointer-events: none');

    document.getElementById('modal').innerHTML =
        `
        <p id="op1" class="modalTitle">Agregar cuenta</p>
        <hr style="height:1px; border-width:0; color:gray;background-color:gray">
        <p style="margin: 25px 0px 0px 0px;">
    
        <input type="text" placeholder="Obligatorio" class="modalContentData modal_input" value="">
        <label class="modalLabel" > Cuenta:</label>
        <input type="text" placeholder="Obligatorio" class="modalContentData modal_input" value="">
        <label class="modalLabel" > Usuario:</label>
        <input type="text" placeholder="Obligatorio" class="modalContentData modal_input" value="">
        <label class="modalLabel" > Contraseña:</label>
        <textarea placeholder="Opcional" cols='23' class="modalContentData modal_input"></textarea>
        <label class="modalLabel noteTextArea" > Notas:</label>
    </p>
    
    <input type="button" class="modal_btns" value="OK" onClick="buttonModalAdd()">
    <input type="button" class="modal_btns" value="CANCELAR" onClick="buttonModalCancel()">
    
    `;

});