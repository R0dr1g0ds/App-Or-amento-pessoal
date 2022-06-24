
class Despesa{
   
   constructor(ano, mes, dia, tipo, descricao, valor){

   	this.ano = ano;
   	this.mes = mes;
   	this.dia = dia;
   	this.tipo = tipo;
   	this.descricao = descricao;
   	this.valor = valor;
   }
   validandoDados(){

     for(let i in this){
     
      if (this[i] === undefined || this[i] === null || this[i] === '') {

      	  return false;
      }
     }  // for In
     return true;
   }  // validandoDados

}  //Despesa

class Bd{

	constructor(){

     let id = localStorage.getItem('id');

     if (id === null) {

     	 localStorage.setItem('id', 0);
     }
	}  //constructor

	getProximoId(){

		 let proximoId = localStorage.getItem('id') // null;

		 return parseInt(proximoId) + 1;
	}  // getProximoId

	gravar(d){

	//localStorage.setItem('despesa', JSON.stringify(d))

	let novo_id = this.getProximoId();

	localStorage.setItem('id', novo_id);

 localStorage.setItem(novo_id, JSON.stringify(d))

}  //gravar

  recuperarTodosRegistros(){
  	//array de despesas
  	let array_Despesas = Array();
 
    let id = localStorage.getItem('id'); //numero referente aos ids

  //recuperando todos os ids
    for(let i = 1; i <= id; i++){

     //recuperando todos os dados da despesa a casa ciclo de repetiçao do id;
    	let despesas = JSON.parse(localStorage.getItem(i));

    	//verificar se existe indices que foram pulados/deletado. caso sim vamos pular esses indices
    	if (despesas === null) {

    		continue;
    	}

    	array_Despesas.push(despesas);


    }  //for

    return array_Despesas;

 }  //recuperarTodosRegistros()

  pesquisar(dps){

  	let registrosFiltrados = Array();

 registrosFiltrados = this.recuperarTodosRegistros();

 

 //ano
 if (dps.ano != '') {
 	//atualmente so funciona o filtro com a arrow function
 	registrosFiltrados =  registrosFiltrados.filter((d) => d.ano == dps.ano );
 }
 //mes
 if (dps.mes != '') {
 	//atualmente so funciona o filtro com a arrow function
 registrosFiltrados = registrosFiltrados.filter((d) => d.mes == dps.mes );
 }
 //dia
 if (dps.dia != '') {
 	//atualmente so funciona o filtro com a arrow function
 	registrosFiltrados = registrosFiltrados.filter((d) => d.dia == dps.dia );
 }
 //tipo
 if (dps.tipo != '') {
 	//atualmente so funciona o filtro com a arrow function
 	registrosFiltrados = registrosFiltrados.filter((d) => d.tipo == dps.tipo );
 }
 //descricao
 if (dps.descricao != '') {
 	//atualmente so funciona o filtro com a arrow function
 	registrosFiltrados = registrosFiltrados.filter((d) => d.descricao == dps.descricao );
 }
 //valor
 if (dps.valor != '') {
 	//atualmente so funciona o filtro com a arrow function
 	registrosFiltrados = registrosFiltrados.filter((d) => d.valor == dps.valor );
 }

 return registrosFiltrados;

  } //pesquisar

}  //Bd


let bd = new Bd();


function cadastarDespesas(){


	let ano = document.getElementById('ano');
	let mes = document.getElementById('mes');
	let dia = document.getElementById('dia');
	let tipo = document.getElementById('tipo');
	let descricao = document.getElementById('descricao');
	let valor = document.getElementById('valor');


	let despesa = new Despesa(ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value);

	if (despesa.validandoDados()) {
  //true
 // bd.gravar(despesa);
 $('#modalGravacao').modal('show');
  console.log('valido')

  document.getElementById('modal-class').className = 'text-success';
		document.getElementById('modal-titulo').innerHTML = 'Registro inserido';
		document.getElementById('modal-conteudo').innerHTML = 'Despesa Cadastrada com Sucesso';
		document.getElementById('modal-button').className = 'btn btn-success';

   //limpando os campso caso true
   ano.value = '';
		mes.value = '';
		dia.value = '';
		tipo.value = '';
		descricao.value = '';
		valor.value = '';

	}else{
		//false
		console.log('invalido')

		$('#modalGravacao').modal('show');
		document.getElementById('modal-class').className = 'text-danger';
		document.getElementById('modal-titulo').innerHTML = 'Registro não inserido';
		document.getElementById('modal-conteudo').innerHTML = 'Despesa Não Cadastrada';
		document.getElementById('modal-button').className = 'btn btn-danger';
		
	}
}  //cadastarDespesas

function carregaListaDespesa(){

	let array_Lista_Despesas = Array();

	array_Lista_Despesas = bd.recuperarTodosRegistros();

	

//selecionando o elemento tbody html da tabela
	let tbody = document.getElementById('tbody');

	//percorrer o array array_Lista_Despesas, listando casa despesa de forma dinamica;
	array_Lista_Despesas.forEach((d) =>{

  //criando a linha (tr)
let linha = tbody.insertRow();
  //criando a coluna(td);
  linha.insertCell(0).innerHTML = `${d.ano}/${d.mes}/${d.dia}`;

 
  //ajustar o tipo

  switch(d.tipo){

     case '1': d.tipo = 'Alimentação';
      break;
     case '2': d.tipo = 'Educação';
      break;
     case '3': d.tipo = 'Lazer';
      break;
     case '4': d.tipo = 'Saúde';
      break; 
      case '5': d.tipo = 'Transporte';
      break;
  }
   linha.insertCell(1).innerHTML = d.tipo;
   

  linha.insertCell(2).innerHTML = d.descricao;
  linha.insertCell(3).innerHTML = d.valor;
	})
}  //carregaListaDespesa;

function filtrarDespesas(){

let ano = document.getElementById('ano').value;
	let mes = document.getElementById('mes').value;
	let dia = document.getElementById('dia').value;
	let tipo = document.getElementById('tipo').value;
	let descricao = document.getElementById('descricao').value;
	let valor = document.getElementById('valor').value;


	let classe_Despesa = new Despesa(ano,mes,dia,tipo,descricao,valor);

 let todas_despesas =	bd.pesquisar(classe_Despesa);

	//selecionando o elemento tbody html da tabela
	let tbody = document.getElementById('tbody');
	tbody.innerHTML = '';

	//percorrer o array array_Lista_Despesas, listando casa despesa de forma dinamica;
	todas_despesas.forEach((d) =>{

  //criando a linha (tr)
let linha = tbody.insertRow();
  //criando a coluna(td);
  linha.insertCell(0).innerHTML = `${d.ano}/${d.mes}/${d.dia}`;

 
  //ajustar o tipo

  switch(d.tipo){

     case '1': d.tipo = 'Alimentação';
      break;
     case '2': d.tipo = 'Educação';
      break;
     case '3': d.tipo = 'Lazer';
      break;
     case '4': d.tipo = 'Saúde';
      break; 
      case '5': d.tipo = 'Transporte';
      break;
  }
   linha.insertCell(1).innerHTML = d.tipo;
   

  linha.insertCell(2).innerHTML = d.descricao;
  linha.insertCell(3).innerHTML = d.valor;
	})

}  //filtrarDespesas()


