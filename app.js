class Despesa{
	constructor(ano,mes,dia,tipo,descricao,valor){
   
   this.ano = ano;
   this.mes = mes;
   this.dia = dia;
   this.tipo = tipo;
   this.descricao = descricao;
   this.valor = valor;

	}  //contructor

validandoDados(){

  for(let i in this){

 if (this[i] === null || this[i] === undefined || this[i] === '') {

 	return false;
 }

  }  //for in
  return true;

 }  //validandoDados
}  //Despesa

class Bd{
	constructor(){

let id_null = localStorage.getItem('id');

if (id_null === null) {

	localStorage.setItem('id', 0);
}

	 }  //contructor

 getProximoId(){

 	let proximoId = localStorage.getItem('id') //null
 	return parseInt(proximoId) +1;

 }  //getProximoId

gravar(d){

	//localStorage.setItem('despesa', JSON.stringify(d));

	let id_att = this.getProximoId();

	localStorage.setItem('id', id_att);

	localStorage.setItem(id_att, JSON.stringify(d));

 }  //gravar

recuperarTodosRegistros(){
	let Array_Despesas = Array();

let id_Lista_Despesas = localStorage.getItem('id');

//recuperar todas as despesas cadastradas em localStorage
for(let i = 1; i <= id_Lista_Despesas; i++){

	let despesa_Unica = JSON.parse(localStorage.getItem(i));

//contro para caso alguma despesa tenha sido apagada;
	if (despesa_Unica === '') {
		continue;
	}

Array_Despesas.push(despesa_Unica);

}  //for
return Array_Despesas;
 }  //recuperartodosregistros
}  //Bd

let bd = new Bd();

function cadastarDespesas(){

	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	

	let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)

if (despesa.validandoDados()) {

//true
//bd.gravar(despesa);
$('#modalGravacao').modal('show');

document.getElementById('modal-conteudo').innerHTML = '<strong>Despesas Cadastradas com Sucesso!!</strong>';
document.getElementById('modal-button').innerHTML = 'Voltar';
document.getElementById('modal-button').className = 'btn btn-success';
document.getElementById('modal-titulo').innerHTML = 'Registro inserido';
document.getElementById('modal-titulo').className = 'text-success';
}else{

	//false
	$('#modalGravacao').modal('show');
document.getElementById('modal-conteudo').innerHTML = '<strong>Despesas nâo cadastradas</strong>';
document.getElementById('modal-button').innerHTML = 'Voltar e corrigir';
document.getElementById('modal-button').className = 'btn btn-danger';
document.getElementById('modal-titulo').innerHTML = 'Erro no Registro ';
document.getElementById('modal-titulo').className = 'text-danger';
}
	

}  //cadastrarDespesas

function carregaListaDespesa(){
	let recuperar_Despesas = Array()

recuperar_Despesas = bd.recuperarTodosRegistros();

let tbody = document.getElementById('tbody');

recuperar_Despesas.forEach((d)=>{

  //criando a linha 
  let linha = tbody.insertRow();

  //criando coluna
  linha.insertCell(0).innerHTML = `${d.ano}/${d.mes}/${d.dia}`;

  switch(d.tipo){

   case '1': d.tipo = 'Alimentação';
    break
   case '2': d.tipo = 'Educação';
    break
   case '3': d.tipo = 'Lazer';
    break
   case '4': d.tipo = 'Saúde';
    break
   case '5': d.tipo = 'Transporte';
    break

  }  //swtich
   linha.insertCell(1).innerHTML = d.tipo;
   linha.insertCell(2).innerHTML = d.descricao;
   linha.insertCell(3).innerHTML = d.valor;


})  //forEach


}  //carregarListaDespesa


