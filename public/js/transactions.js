// INSTÂNCIA DO MODAL
const myModal = new bootstrap.Modal("#transaction-modal");

// VARIÁVEIS DE SESSÃO E DADOS
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

// EVENTOS CLICK
document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("button-print-document").addEventListener("click", printDocument);

// ADICIONAR LANÇAMENTO
document
  .getElementById("transaction-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // OBTER OS VALORES DO FORMULÁRIO
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector(
      'input[name="type-input"]:checked'
    ).value;

    // VERIFICAR SE A OPERAÇÃO LEVARÁ A UM SALDO NEGATIVO
    const currentTotal = getTotalValue();
    if (type === "2" && value > currentTotal) {
      alert("Saldo insuficiente! A operação não pode ser realizada.");

      // LIMPAR O FORMULÁRIO E ESCONDER O MODAL
      e.target.reset();
      myModal.hide();

      return;
    }

    // ADICIONAR O LANÇAMENTO AOS DADOS
    data.transactions.unshift({
      value: value,
      type: type,
      description: description,
      date: date,
    });

    // SALVAR OS DADOS ATUALIZADOS
    saveData(data);

    // ATUALIZAR AS INFORMAÇÕES NA PÁGINA
    getCashIn();
    getCashOut();
    getTotal();

    // LIMPAR O FORMULÁRIO E ESCONDER O MODAL
    e.target.reset();
    myModal.hide();

    // EXIBIR UMA MENSAGEM DE SUCESSO
    alert("Lançamento adicionado com sucesso!");
});

// FUNÇÃO PARA OBTER O SALDO TOTAL
function getTotalValue() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if (item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    return total;
}

// FUNÇÃO PARA VERIFICAR SE O USUÁRIO ESTÁ LOGADO E OBTER OS DADOS
checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        // REDIRECIONAR PARA A PÁGINA DE LOGIN SE NÃO ESTIVER LOGADO
        window.location.href = "index.html";
        return;
    }

    // OBTER OS DADOS DO USUÁRIO LOGADO
    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    // ATUALIZAR A LISTA DE TRANSAÇÕES
    getTransactions();
}

// FUNÇÃO PARA FAZER LOGOUT
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    // REDIRECIONAR PARA A PÁGINA DE LOGIN APÓS FAZER LOGOUT
    window.location.href = "index.html";
}

// FUNÇÃO PARA OBTER E EXIBIR AS TRANSAÇÕES
function getTransactions() {
    const transactions = data.transactions;
    let transactionshtml = ``;

    if (transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if (item.type === "2") {
                type = "Saída";
            }

            // FORMATE O VALOR COM SEPARADOR DE MILHAR E VÍRGULA COMO SEPARADOR DECIMAL
            const formattedValue = item.value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            transactionshtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${formattedValue}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `;
        });
    }

    document.getElementById("transactions-list").innerHTML = transactionshtml;
}

function printDocument() {
    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

    mywindow.document.write(`<html><head><title>ASD</title>`);
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById('printable').innerHTML);
    mywindow.document.write('</></html>');

    mywindow.document.close(); // NECESSÁRIO PARA O IE >= 10
    mywindow.focus(); // NECESSÁRIO PARA O IE >= 10*/
    mywindow.print();
    mywindow.close();
}
