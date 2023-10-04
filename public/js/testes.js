const nome = "Marcelo Eltz";
let nome2 = "";
let pessoa = {
    nome: "Paulinho",
    idade: "46",
    trabalho: "Growdever"
}


let nomes = ["Marcelo Eltz", "Paulinho Prata", "Anne Bebê"];
let pessoas = [
    {
        nome: "Marcelo",
        idade: "46",
        trabalho: "Growdever"
    },
    {
        nome: "Paulinho",
        idade: "46",
        trabalho: "Growdever"
    },
    {
        nome: "Anne",
        idade: "46",
        trabalho: "Growdever"
    }
];

function adicionarPessoa(pessoa) {
    pessoas.push(pessoa); 
}

function imprimirPessoas() {
    pessoas.forEach((item) => {
        console.log("Nome");
        console.log(item.nome)

        console.log("Idade");
        console.log(item.idade)

        console.log("Trabalho");
        console.log(item.trabalho)
    })
}

imprimirPessoas();

adicionarPessoa({
    nome: "Pedro Silva",
    idade: "28",
    trabalho: "Porteiro"
});

imprimirPessoas();

//console.log(pessoas[1])

//function alterarNome() {
//    nome2 = "Dona Maria"
//    console.log("Valor alterado");
//    console.log(nome2);
//}

//function recebeEalterarNome(novoNome) {
//    nome2 = novoNome;
//    console.log("Valor alterado recebendo novo nome:");
//    console.log(nome2);
//}


//console.log(pessoas);

//console.log("Nome:");
//console.log(pessoa.nome);
//console.log(pessoa.idade);
//console.log(pessoa.trabalho);

//function imprimirPessoa (pessoa) {
//    console.log(pessoa.nome);
//    console.log(pessoa.idade);
//    console.log(pessoa.trabalho);
//}

//imprimirPessoa({
//    nome: "Paulinho Prata",
//    idade: "46",
//    trabalho: "Gostosão"
//});



//console.log(nomes[2]);

//recebeEalterarNome("José Maria")
//recebeEalterarNome("Maria José")