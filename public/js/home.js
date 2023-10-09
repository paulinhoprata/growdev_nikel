// Instância do modal
const myModal = new bootstrap.Modal("#transaction-modal");

// Variáveis de sessão e dados
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

// EVENTOS CLICK
document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function () {
    window.location.href = "transactions.html"
});

// ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obter os valores do formulário
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    // Verificar se a operação levará a um saldo negativo
    const currentTotal = getTotalValue();
    if (type === "2" && value > currentTotal) {
        alert("Saldo insuficiente! A operação não pode ser realizada.");

        // Limpar o formulário e esconder o modal
        e.target.reset();
        myModal.hide();

        return;
    }

    // Adicionar o lançamento aos dados
    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    });

    // Salvar os dados atualizados
    saveData(data);

    // Atualizar as informações na página
    getCashIn();
    getCashOut();
    getTotal();

    // Exibir uma mensagem de sucesso
    alert("Lançamento adicionado com sucesso!");

    // Limpar o formulário e esconder o modal
    e.target.reset();
    myModal.hide();
});

// FUNÇÃO PARA OBTER ENTRADAS
function getCashIn() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "1");

    console.log(cashIn);

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            // Formate o valor com separador de milhar e vírgula como separador decimal
            const formattedValue = cashIn[index].value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            cashInHtml += `
        <div class="row mb-4">
            <div class="col-12">
                <h3 class="fs-2">${formattedValue}</h3>
                <div class="container p-0">
                    <div class="row">
                        <div class="col-12 col-md-8">
                            <P>${cashIn[index].description}</P>
                        </div>
                        <div class="col-12 col-md-3 d-flex justify-content-end">
                            ${cashIn[index].date}
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `
        }

        document.getElementById("cash-In-List").innerHTML = cashInHtml
    }
}

// Função para obter o saldo total
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

// FUNÇÃO PARA OBTER SAÍDAS
function getCashOut() {
    const transactions = data.transactions;

    const cashOut = transactions.filter((item) => item.type === "2");

    console.log(cashOut);

    if (cashOut.length) {
        let cashOutHtml = ``;
        let limit = 0;

        if (cashOut.length > 5) {
            limit = 5;
        } else {
            limit = cashOut.length;
        }

        for (let index = 0; index < limit; index++) {
            // Valor formatado com separador de milhar e vírgula como separador decimal
            const formattedValue = cashOut[index].value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            cashOutHtml += `
        <div class="row mb-4">
            <div class="col-12">
                <h3 class="fs-2">${formattedValue}</h3>
                <div class="container p-0">
                    <div class="row">
                        <div class="col-12 col-md-8">
                            <P>${cashOut[index].description}</P>
                        </div>
                        <div class="col-12 col-md-3 d-flex justify-content-end">
                            ${cashOut[index].date}
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `
        }

        document.getElementById("cash-Out-List").innerHTML = cashOutHtml;
    }
}

// FUNÇÃO PARA OBTER O TOTAL
function getTotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if (item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    // Valor formatado com separador de milhar e vírgula como separador decimal
    const formattedTotal = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Verificar se o saldo é negativo e definir para zero se for
    if (total < 0) {
        total = 0;
    }

    document.getElementById("total").innerHTML = formattedTotal;
}

// FUNÇÃO PARA SALVAR DADOS
function saveData(data) {
    localStorage.setItem(logged, JSON.stringify(data));
}

// FUNÇÃO PARA VERIFICAR SE O USUÁRIO ESTÁ LOGADO E OBTER OS DADOS
checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        // Redirecionar para a página de login se não estiver logado
        window.location.href = "index.html";
        return;
    }

    // Obter os dados do usuário logado
    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    // Atualizar as informações na página
    getCashIn();
    getCashOut();
    getTotal();
}

// FUNÇÃO PARA FAZER LOGOUT
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    // Redirecionar para a página de login após fazer logout
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

            // Formate o valor com separador de milhar e vírgula como separador decimal
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
