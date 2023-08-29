// O metodo fetch vai fazer a requisição para a url passada e retornara uma Promisse então essa promisse é convertida em JSON para então ser mostrada no console em um formato de objeto para que possamos vizualizar os dados
//Basicamente esse codigo faz o seguinte: consulta a URL do via cep então pega resposta da consulta e transforma em JSON então se a resposta apresentar um erro esse erro vai ser "jogado" e "pegado" na hora de mostrar os erros com catch se não tiver nenhum erro vai simplesmente mostrar os dados no navegador

/*
//Metodo assincrono de fazer uma requisição com varios then
//Consulta a URL pelo metodo fetch
var consultaCEP = fetch('https://viacep.com.br/ws/03337040/json/')
//Entao pega essa resposta e coloca no formato json
.then(resposta => resposta.json())
//Entao faz uma condicional para ver se o cep existe
.then(r => {
    //Se o parametro erro for true
    if (r.erro) {
        //Joga a mensagem de erro para o catch
        throw Error('Esse cep não existe!')
    }else{
        //Se não, mostra na tela os dados retornados da requisição
        console.log(r)
    }
    })
//Caso tenha algum erro mostra na tela o erro e o tratamento dado a ele
.catch(erro => console.log(erro))
//Quando tudo finalizar mesmo se der erro ou se os dados retornarem corretamente o metodo finally é executado
.finally(mensagem => console.log('Processamento concluido'));

console.log(consultaCEP);
*/

//Metodo assincrono de fazer uma requisição com uma função async
//Declaro uma função assincrona
async function buscaEndereco(cep){
    //Mensagem de erro começa com um valor vazio
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = '';
    //Utilizamos o try para o codigo 'tentar' fazer a requisição, porem se não conseguir entra no catch
    try{
        //Consulta a URL pelo metodo fetch, com o detalhe de utilizar o operador await para esperar a Promisse, esse operador só pode ser utilizado dentro de uma função async
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        //Transformo a resposta da var consulta CEP em JSON
        var consultaCEPConvertida = await consultaCEP.json();
        //Condicional para verificar se a resposta do consultaCEPConvertida foi um erro
        if(consultaCEPConvertida.erro){
            //Caso seja um erro ele 'joga' esse erro para o catch com o tratamento colocado
            throw Error('CEP não existente');
        }
        //Pegando os campos e preenchendo automaticamente os inputs
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro')
        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro;

        //Printo na tela a resposta convertida em JSON 
        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    //Caso apresente algum erro ele 'pega' esse erro
    }catch(erro){
        mensagemErro.innerHTML = `<p class="erro__texto">CEP invalido tente novamente</p>`
        //Imprimindo o erro na tela
        console.log(erro);
    }
}

//variavel que busca o campo cep pelo ID
var cep = document.getElementById('cep');
//EventListener que vai ser ativo quando tirar o foco do input cep
cep.addEventListener("focusout",() => {
    buscaEndereco(cep.value);
})

/*

//Exemplo de como seria uma requisição com varios parametros
//Array com alguns ceps
let ceps = ['03337040','03337060'];
//Outro array com o resultado de cada buscaEndereco por cep do array, retorna promisses não resolvidas
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
//Metodo Promise.all resolve as promisses retornadas do conjuntoCeps e imprime na tela seus valores
Promise.all(conjuntoCeps).then(respostas => console.log(respostas))

*/