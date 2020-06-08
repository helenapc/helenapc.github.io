// if (localStorage.getItem('L2').length < 12) {
//     console.log('Error', 'No se pueden cargar datos');
//     localStorage.setItem('L2', '');
//     window.location.reload();
// };



// {
//     text: 'Fusionar',
//     handler: () => {
//         function presentAlertCheckbox() {
//             const alert = document.createElement('ion-alert');
//             alert.cssClass = 'my-custom-class';
//             alert.header = 'Agregar cambios';
//             alert.inputs = [
//                 {type: 'checkbox', label: 'Checkbox 1', value: 'value1',checked: true},
//                 {type: 'checkbox',label: 'Checkbox 2',value: 'value2'},
//                 {type: 'checkbox',label: 'Checkbox 3',value: 'value3'},
//                 {type: 'checkbox',label: 'Checkbox 4',value: 'value4'},
//                 {type: 'checkbox',label: 'Checkbox 5',value: 'value5'},
//                 {type: 'checkbox',label: 'Checkbox 6',value: 'value6'}
//             ];
//             alert.buttons = [
//                 {
//                     text: 'Cancel',
//                     role: 'cancel',
//                     cssClass: 'secondary',
//                     handler: () => {
//                         console.log('Confirm Cancel')
//                     }
//                 }, {text: 'Ok',handler: () => {console.log('Confirm Ok')}}
//             ];

//             document.body.appendChild(alert);
//             return alert.present();
//         }
//         presentAlertCheckbox();
//     }
// }


// OBTENER DIFERENCIA
// var txtTemp = [];
// var aTotalTemp = [];
// var newa = [];
// txtTemp = docB1.split('GD');
// aTotalTemp = txtTemp[3].split(txtTemp[3].includes('Q0') ? 'Q0' : 'BO');
// aTotalTemp.splice(-1, 1);
// aTotalTemp = aTotalTemp.concat(aTotal);
// aTotalTemp.sort();

// for (i = 0; i < aTotalTemp.length; i++) {
//     (aTotalTemp[i] == aTotalTemp[i + 1]) ? i++ : newa.push(aTotalTemp[i]);
// };
// console.log(newa);





//old local memory
// text: 'Memoria local',
// handler: () => {
//     splitInit();
//     aTotalTOnewTotal();
//     localStorage.setItem('accessTempData', txt[0] + 'GD' + txt[1] + 'GD' + txt[2] + 'GD');
//     document.getElementById('userName').innerHTML = deco(txt[0]);
//     showLogin.innerHTML = '';
//     disableItem(false);
//     updateDB('L2', 'B1');
//     // newSearch.value='';
//     refreshData();

// }