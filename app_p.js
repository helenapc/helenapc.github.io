const buttonTest = document.querySelector("#b-test")
// const buttonImp = document.querySelector("#b-imp")
const buttonImpExp = document.querySelector("#b-imp-exp")
const searchAccount = document.querySelector("#search-account")
const buttonSearch = document.querySelector("#b-search")

const showSearch = document.querySelector('#show-accounts1')
const showAccounts = document.querySelector("#show-accounts2")

const userAccount = document.querySelector("#u-account")
const userUser = document.querySelector("#u-user")
const userPass = document.querySelector("#u-pass")
const userNotes = document.querySelector("#u-notes")
const buttonAdd = document.querySelector("#b-add")
const buttonEdit = document.querySelector("#b-edit")
const buttonDelete = document.querySelector("#b-delete")

setNameUser();


// const aTotal = txt[i].split('BO');
// document.getElementById('naa').innerHTML = 'Hola ' + userName[0] + '!';



// document.getElementById('naa').innerHTML = 'Hola ' + userName[0] + '!';

var nEtiqueta = 0; // Para contar y eliminar etiquetas creadas.
const showCardAll = (account, user, pass, notes) => {
	const ionCard = document.createElement('ion-card');
	const newHeader = document.createElement('ion-card-header');
	const newSub1 = document.createElement('ion-card-subtitle');
	newSub1.textContent = account.toUpperCase();

	const newSub2 = document.createElement('ion-card-subtitle');
	newSub2.textContent = 'User: ' + user;

	const newSub3 = document.createElement('ion-card-subtitle');
	newSub3.textContent = 'Password: ' + pass;

	const newSub4 = document.createElement('ion-card-subtitle');
	newSub4.textContent = 'Notes: ' + notes;

	newHeader.appendChild(newSub1);
	newHeader.appendChild(newSub2);
	newHeader.appendChild(newSub3);
	newHeader.appendChild(newSub4);

	ionCard.appendChild(newHeader);

	showSearch.appendChild(ionCard);
	nEtiqueta++
}


const showCardAdd = (account, user, pass, notes) => {
	const ionCard = document.createElement('ion-card');
	const newHeader = document.createElement('ion-card-header');

	const newSub1 = document.createElement('ion-card-subtitle');
	newSub1.textContent = account.toUpperCase();

	const newSub2 = document.createElement('ion-card-subtitle');
	newSub2.textContent = 'User: ' + user;

	const newSub3 = document.createElement('ion-card-subtitle');
	newSub3.textContent = 'Password: ' + pass;

	const newSub4 = document.createElement('ion-card-subtitle');
	newSub4.textContent = 'Notes: ' + notes;

	newHeader.appendChild(newSub1);
	newHeader.appendChild(newSub2);
	newHeader.appendChild(newSub3);
	newHeader.appendChild(newSub4);

	ionCard.appendChild(newHeader);

	showAccounts.appendChild(ionCard);
}


// BUTTON TEST
buttonTest.addEventListener('click', () => {
	console.log(userAccount.value);
	console.log(userUser.value);
	console.log(userPass.value);
	console.log(userNotes.value);

	localStorage.setItem('kb', localStorage.getItem('orig'));
	const txt = localStorage.getItem('orig').split('-');
	const strSave = [];
	
	if (isEmpty(userAccount.value) || isEmpty(userUser.value) || isEmpty(userPass.value)) {
		presentAlert();
		return;
	}else{
		

		for (i = 1; i < txt.length;i++) {
			var aTotal = txt[i].split('BO');
			for (b = 0; b < (aTotal.length-1); b++) {
				const final = aTotal[b].split('OG'); 
				for (n = 0; n < final.length; n++) {
					if (deco(final[0])==(userAccount.value) && deco(final[1])==(userUser.value) && deco(final[2])==(userPass.value)){
						console.log('coincide! No guardar.')
						const alert = document.createElement('ion-alert');
						// alert.header = 'Error';
						alert.subHeader = 'La cuenta ya existe.';
						alert.message = 'Revise sus datos.';
						document.body.appendChild(alert);
						return alert.present();
					}
				}
			}
		}
		console.log('agregar cuenta')
	}
})


buttonImpExp.addEventListener('click', () => { 
	function alertImpExp() {
		const alert = document.createElement('ion-alert');
        // alert.subHeader = 'Export';
		alert.message = 'Select to import/export.';
		alert.buttons = [
          {
			text: 'import',
			handler: () => {
				function alertImp() {
					const alert = document.createElement('ion-alert');
					alert.subHeader = 'Import';
					alert.inputs = [
					  {
						name: 'input1',
						placeholder: 'Data to import...'
					  },
					];
					alert.buttons = [
					  {
						text: 'no',
						role: 'cancel',
						cssClass: 'secondary',
						handler: () => {
						}
					  }, {
						text: 'yes',
						handler: (dataImp) => {
						
							if (dataImp.input1 == ''){
								const alert = document.createElement('ion-alert');
								alert.subHeader = 'Incorrect or empty values.';
								alert.message = 'Please verify your inputs.';
								document.body.appendChild(alert);
								return alert.present();
								return;
							}
							if (dataImp.input1 == 'clear'){
								localStorage.clear();
								removeCard();
								presentToast('Data deleted.', 800);
								return;
							}
							removeCard();
							localStorage.setItem('orig', dataImp.input1);
							presentToast('Imported data.', 800);
							setNameUser();
							
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
			text: 'export',
			handler: () => {
				function alertExp() {
					const alert = document.createElement('ion-alert');
					alert.subHeader = 'Confirm nombre to export';
					// alert.message = 'Confirm to export.';
					alert.inputs = [
						{
						  name: 'input2',
						  placeholder: 'File name...',
						  value: 'bk-' + fecha()
						},
					  ];
					alert.buttons = [
					  {
						text: 'no',
						role: 'cancel',
						cssClass: 'secondary',
					  }, 
					  {
						text: 'yes',
						handler: (dataExp) => {
						presentToast('Exported data.', 800);
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
			text: 'cancel',
			role: 'cancel',
			cssClass: 'secondary',
          }, 
		];
		document.body.appendChild(alert);
		return alert.present();
	}
	alertImpExp();
	
})



buttonSearch.addEventListener('click', () => {
	removeCard();
	const search = searchAccount.value.toLowerCase();
	if (isEmpty(search)) {
		return;
	}
	clearInputs();
	const txt = localStorage.getItem('orig').split('-');
	// console.log(txt2);

	for (i = 1; i < txt.length;i++) {
		const aTotal = txt[i].split('BO');
		for (b = 0; b < (aTotal.length-1); b++) {
			const final = aTotal[b].split('OG');
			for (n = 0; n < final.length; n++) {
				if (deco(final[0]).includes(search)) {
					showCardAll( deco(final[0]) , deco(final[1]), deco(final[2]), deco(final[3]));
					clearInputs();
					break;
				}
				if (search == 'name**') {
					if (localStorage.getItem('orig').includes('-')){
						// console.log('(1)entrando a "name"');

						var userName = localStorage.getItem('orig').split('-');
						// console.log('(2)crear variable userName dividiendo por "-": ' + userName);

						var newUserName = prompt('Inserte nuevo nombre de usuario');
						// console.log('(3)crear variable neUserName (prompt): ' + newUserName);
						
						document.getElementById('naa').innerHTML = 'Hola ' + newUserName + '!';
						// console.log('(5)camibiando titulo por newUserName: Hola ' + newUserName + '!');

						localStorage.setItem('orig', (code(newUserName) + '-' + userName[1]));
						// console.log('(6)creando origin (newUserName + userName[1]): '+ (newUserName + '+' + userName[1]))
						clearInputs();
						return;

					}

				}

				if (search == '***') {
					showCardAll(deco(final[0]), deco(final[1]), deco(final[2]), deco(final[3]));
					clearInputs();
					break;
				}
				
				if (search == 'pass**') {
					if (localStorage.getItem('orig').includes('-')){
						localStorage.setItem('access', '');
						// location.reload();
						presentToast('Contraseña eliminada. Reinicie el navegador', 1500)
						clearInputs();
						return;
					}
					// break;
				}

			}
		}
	}
	clearInputs();
})


buttonAdd.addEventListener('click', () => {
	// const account = userAccount.value;
	// const user = userUser.value;
	// const pass = userPass.value;
	// const notes = userNotes.value;
	const txt = localStorage.getItem('orig').split('-');

	if (isEmpty(userAccount.value) || isEmpty(userUser.value) || isEmpty(userPass.value)) {
		presentAlert();
		return;
	} else {
		for (i = 1; i < txt.length;i++) {
			var aTotal = txt[i].split('BO');
			for (b = 0; b < (aTotal.length-1); b++) {
				const final = aTotal[b].split('OG'); 
				for (n = 0; n < final.length; n++) {
					if (deco(final[0])==(userAccount.value) && deco(final[1])==(userUser.value) && deco(final[2])==(userPass.value)){
						console.log('coincide! No guardar.')
						const alert = document.createElement('ion-alert');
						// alert.header = 'Error';
						alert.subHeader = 'La cuenta ya existe.';
						alert.message = 'Revise sus datos.';
						document.body.appendChild(alert);
						return alert.present();
					}
				}
			}
		}
		showCardAdd(userAccount.value, userUser.value, userPass.value, userNotes.value);

		if ((localStorage.getItem('orig'))== null){
			localStorage.setItem('orig', ( txt[0]+ '-'));
		}
		const addData = (code(userAccount.value) +'OG'+  code(userUser.value) +'OG'+ code(userPass.value) +'OG'+ code(userNotes.value)+'BO');
		localStorage.setItem('orig', (localStorage.getItem('orig')+addData));

		presentToast('Data added.', 800)
		clearInputs();
		// showCardAdd(account, user, pass, notes);

		// if ((localStorage.getItem('orig'))== null){
		// 	localStorage.setItem('orig', '');
		// }
		// const addData = (code(account) +'OG'+  code(user) +'OG'+ code(pass) +'OG'+ code(notes)+'BO');
		// localStorage.setItem('orig', (localStorage.getItem('orig')+addData));

		// presentToast('Data added.', 800)
		// clearInputs();
	}
})


buttonEdit.addEventListener('click', () => {
	localStorage.setItem('kb', localStorage.getItem('orig'));

	// const txt = [localStorage.getItem('orig')];
	const txt = localStorage.getItem('orig').split('-');
	const strSave = [];
	
	if (isEmpty(userAccount.value) || isEmpty(userUser.value) || isEmpty(userPass.value)) {
		presentAlert();
		return;
	}else{
		
		var iguales = false;

		for (i = 1; i < txt.length;i++) {
			var aTotal = txt[i].split('BO');
			for (b = 0; b < (aTotal.length-1); b++) {
				const final = aTotal[b].split('OG'); 
				for (n = 0; n < final.length; n++) {
					if (deco(final[0])==(userAccount.value) && deco(final[1])==(userUser.value) && deco(final[2])==(userPass.value)){
						iguales = true;
						function presentAlertEdit() {
							const alert = document.createElement('ion-alert');
							alert.subHeader = 'Edit2';
							alert.inputs = [
							{
								name: 'newAccount',
								placeholder: 'New Account..',
								value: deco(final[0])
							},
							{
								name: 'newUser',
								placeholder: 'New User...',
								value: deco(final[1])
							},
							{
								name: 'newPass',
								placeholder: 'New Password...',
								value: deco(final[2])
							},
							{
								name: 'newNote',
								placeholder: 'New Note...',
								value: deco(final[3])
							}
							];
							alert.buttons = [
							{
								text: 'no',
								role: 'cancel',
								cssClass: 'secondary',
								handler: () => {
									localStorage.setItem('orig', localStorage.getItem('kb'));
								}
							}, 
							{
								text: 'yes',
								handler: (dataEdit) => {
									showCardAdd(dataEdit.newAccount, dataEdit.newUser, dataEdit.newPass, dataEdit.newNote);
									var addData2 = ( code(dataEdit.newAccount) +'OG'+  code(dataEdit.newUser) +'OG'+ code(dataEdit.newPass) +'OG'+ code(dataEdit.newNote)+'BO');
									strSave.push(addData2);
									localStorage.setItem('orig', ( txt[0]+'-' +localStorage.getItem('orig')+addData2));
									localStorage.setItem('bk', '');
								}
							}
							];
							document.body.appendChild(alert);
							return alert.present();
						}
						break;
					}else{
						strSave.push(aTotal[b]+'BO')
						break;
					}
				}
			} 
		}
	}
	localStorage.setItem('orig',strSave.join(''))
	if (iguales){
		presentAlertEdit();
		presentToast('Edit', 800)
		clearInputs();
	}else{
		presentAlert();
		return;
	}
})



buttonDelete.addEventListener('click', () => {
	const txt = localStorage.getItem('orig').split('-');
	// const txt = [localStorage.getItem('orig')];
	const account = userAccount.value;
	const user = userUser.value;
	const pass = userPass.value;
	
	if (isEmpty(userAccount.value) || isEmpty(userUser.value) || isEmpty(userPass.value)) {
		presentAlert();
		return;
	}
	const strSave = [];
	var iguales = false;
	for (i = 1; i < txt.length;i++) {
		const aTotal = txt[i].split('BO');
		for (b = 0; b < (aTotal.length-1); b++) {
			const final = aTotal[b].split('OG'); 
			for (n = 0; n < final.length; n++) {
				if (deco(final[0])==(userAccount.value) && deco(final[1])==(userUser.value) && deco(final[2])==(userPass.value)){
					iguales = true;
					break;
				}else{
					strSave.push(aTotal[b]+'BO');
					break;
				}
			}
		} 
	}
	localStorage.setItem('orig',( txt[0] + '-' +strSave.join('')))
	if (iguales){
		presentToast('Delete', 800)
		clearInputs();
	}else{
		presentAlert();
		return;
	}
})


const isEmpty = str => !str.trim().length;

const presentAlert = () => {
	const alert = document.createElement('ion-alert');
	alert.header = 'Error';
	alert.subHeader = 'Incorrect or empty values.';
	alert.message = 'Please verify your inputs.';
	document.body.appendChild(alert);
	return alert.present();
}


const clearInputs = () => {
	searchAccount.value = '';
	userAccount.value = '';
	userUser.value = '';
	userPass.value = '';
	userNotes.value = '';
}

async function presentToast(msg, time) {
	const toast = document.createElement('ion-toast');
	toast.message = msg;
	toast.duration = time;
	document.body.appendChild(toast);
	return toast.present();
}


function downloadFile(data, fileName, type="text/plain") {
	var data2 = new Blob([data], {type: 'text/plain'});
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

function removeCard(){
	const elements = document.getElementsByClassName("sc-ion-card-md-h sc-ion-card-md-s md hydrated");
	while(elements.length > 2){
		if (nEtiqueta == 0){
			elements[2].parentNode.removeChild(elements[2]);
		}else{
			elements[1].parentNode.removeChild(elements[1]);
		}
		if (nEtiqueta > 0){
			nEtiqueta--
		}

	}
	nEtiqueta = 0;
}



function deco(dec) {
	var dec2 = dec + '';
    var hexDec  = dec2.toString();
    var str = '';
    for (var n = 0; n < hexDec.length; n += 2) {
        str += String.fromCharCode(parseInt(hexDec.substr(n, 2), 16)-5);
    }
    return str;
}

function code(cod) {
    var hexCod = '';
    var hexF = '';
    for(var i=0;i<cod.length;i++) {
        hexCod = ''+cod.charCodeAt(i).toString(16);
		var hexCod = ((parseInt(hexCod, 16) + parseInt('05', 16)).toString(16).toUpperCase());
        hexF += ''+hexCod;
    }
    return hexF;
}


function fecha() {
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
		mm = '0'+ mm
	}
	today = DD + '-' + MM + '-' + (YYYY-2000) + '-' + hh+ mm;
	return today;
}

function setNameUser () {
	// const loopUserName = true
	while (true){
		if (localStorage.getItem('orig').includes('-')){
			var userName = localStorage.getItem('orig').split('-');
			// var newUserName = prompt('Inserte nuevo nombre de usuario')
			// userName[0] = newUserName
			document.getElementById('naa').innerHTML = 'Hola ' + deco(userName[0]) + '!';
			// console.log('nuevo usuario')
			// loopUserName = false;
			break;
		
		}else{
			var NU = prompt("Inserte su nombre");
			localStorage.setItem('orig', (NU + '-' + localStorage.getItem('orig')));

			// console.log('no hay guiones')
		}
	}
}
