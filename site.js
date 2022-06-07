var appForm = document.getElementById('app-form');
var listaPessoas = document.getElementById('listaContatos');
var btnOrdenar = document.getElementById('btnOrdenar');
var btnExemplo = document.getElementById('btnExemplo');

var pessoas = [];

appForm.onsubmit = addContato;
btnOrdenar.onclick = ordenarLista;
btnExemplo.onclick = gerarListaSeed;

function addContato(e){
	e.preventDefault();

	console.log(e);

	var nome = e.target.contatoNome.value;
	var sobrenome = e.target.contatoSobrenome.value;
	var telefone = e.target.contatoTelefone.value

	var contato = {nome, sobrenome, telefone};

	var validation = validarCampos(contato);
	if(!validation.status){
		alert(validation.error);
		return;
	}

	contatos.push(contato);
	appForm.reset();
	mostrarLista();
	console.log(contatos);
}

function validarCampos(contato){
	var validation = {status: true, error: '',};

	if(contato.nome.length === 0){
		validation.status = false;
		validation.error = 'Por favor, preencha o campo "Nome"!';
	}
	else if(contato.sobrenome.length === 0){
		validation.status = false;
		validation.error = 'Por favor, preencha o campo "Sobrenome"!';
	}
	else if(contato.telefone.length < 10){
		validation.status = false;
		validation.error = 'Por favor, preencha o campo "Telefone" corretamente';
	}
	return validation;
}

function mostrarLista(){
	listaContatos.innerHTML = '';
	for(contato of contatos){
		var nomeEl = document.createElement('strong');
		nomeEl.appendChild(document.createTextNode(contato.nome + ' ' + contato.sobrenome));

		var telefoneEl = document.createElement('p');
		telefoneEl.appendChild(document.createTextNode('Telefone: ' + contato.telefone));

		var indice = contatos.indexOf(contato);

		var removerEl = document.createElement('a');
		removerEl.setAttribute('href', '#');
		var removerText = document.createTextNode('Remover');
		removerEl.appendChild(removerText);
		removerEl.setAttribute('onclick', 'removerContato(' + indice + ')');

		var alterarEl = document.createElement('a');
		alterarEl.setAttribute('href', '#');
		var alterarText = document.createTextNode('Alterar');
		alterarEl.appendChild(alterarText);
		alterarEl.setAttribute('onclick', 'alterarContato(' + indice + ')');

		var itemEl = document.createElement('li');
		itemEl.appendChild(nomeEl);
		itemEl.appendChild(telefoneEl);
		itemEl.appendChild(alterarEl);
		itemEl.appendChild(removerEl);

		listaContatos.appendChild(itemEl);
	}
}

function gerarListaSeed(){
	var contatoExemplo = [
		{nome: 'Megumi', sobrenome: 'Fushiguro', telefone: 1199998888},
		{nome: 'Noé', sobrenome: 'Archiviste', telefone: 2199998888},
		{nome: 'Ritsuka', sobrenome: 'Uenoyama', telefone: 3199998888},
		{nome: 'Mafuyu', sobrenome: 'Sato', telefone: 6199998888},
		{nome: 'Gojo', sobrenome: 'Satoru', telefone: 3199998888},
		{nome: 'Mikasa', sobrenome: 'Ackerman', telefone: 1199998888},
		{nome: 'Levi', sobrenome: 'Ackerman', telefone: 3199998888},
	];
	contatos = contatosExemplo;
	mostrarLista();
}

function removerContato(indice){
	contatos.splice(indice, 1);
	mostrarLista();
}

function alterarContato(indice){
	var btnCadastrar = document.getElementById('btnCadastrar');
	var btnEditar = document.getElementById('btnEditar');
	var input_nome = document.getElementById('contatoNome');
	var input_sobrenome = document.getElementById('contatoSobrenome');
	var input_telefone = document.getElementById('contatoTelefone');

	btnCadastrar.setAttribute('style', 'display:none');
	btnEditar.setAttribute('style', 'display:');

	input_nome.value = contatos[indice].nome;
	input_sobrenome.value = contatos[indice].sobrenome;
	input_telefone.value = contatos[indice].telefone;

	btnEditar.onclick = function(){
		var contatoAlterado = {
			nome: input_nome.value,
			sobrenome: input_sobrenome.value,
			telefone: input_telefone.value,
		};

		var validation = validarCampos(contatoAlterado);
		if(!validation.status){
			alert(validation.error);
			return;
		}

		input_nome.value = '';
		input_sobrenome.value = '';
		input_telefone.value = '';

		btnCadastrar.setAttribute('style', 'display:');
		btnEditar.setAttribute('style', 'display:none');

		contatos[indice] = contatoAlterado;
		mostrarLista();
	};
}

function ordenarLista(){
	contatos.sort(function(a, b){
		var x = a.nome.toLowerCase() + a.sobrenome.toLowerCase();
		var y = b.nome.toLowerCase() + b.sobrenome.toLowerCase();
		if(x < y) return -1;
		if(x > y) return 1;
		return 0;
	});
	mostrarLista();
}