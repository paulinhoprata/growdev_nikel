// INSTÂNCIA DO MODAL DE CRIAÇÃO DE CONTA
const registerModal = new bootstrap.Modal(
  document.getElementById("register-modal")
);

// INSTÂNCIA DO MODAL DE TERMOS DE USO
const termoDeUsoModal = new bootstrap.Modal(
  document.getElementById("term-of-use")
);

// VARIÁVEL PARA ARMAZENAR O ESTADO DO CHECKSESSION
let checkSessionState = false;

// EVENTO DE LOGIN
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // OBTER OS VALORES DO FORMULÁRIO
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  checkSessionState = document.getElementById("session-check").checked;

  // OBTER A CONTA COM BASE NO EMAIL
  const account = getAccount(email);

  if (!account) {
    alert("Oops! Verifique o usuário ou a senha!");
    return;
  }

  if (account.password !== password) {
    alert("Oops! Verifique o usuário ou a senha!");
    return;
  }

  // SALVAR A SESSÃO E REDIRECIONAR PARA A PÁGINA INICIAL
  saveSession(email, checkSessionState);
  window.location.href = "home.html";
});

// EVENTO DE CRIAÇÃO DE CONTA
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // OBTER OS VALORES DO FORMULÁRIO
  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

});

// EVENTO DE ACEITAR OS TERMOS
document.getElementById("aceitar-termos").addEventListener("click", function () {
  // OBTER OS VALORES DO FORMULÁRIO
  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

  // SALVAR A NOVA CONTA E OCULTAR O MODAL DE TERMOS
  saveAccount({
    login: email,
    password: password,
    transactions: [],
  });

  termoDeUsoModal.hide();

  alert("Conta criada com sucesso!");

  // SALVAR A SESSÃO E REDIRECIONAR PARA A PÁGINA INICIAL
  if (checkSessionState) {
    saveSession(email, true);
  }

  window.location.href = "home.html";
});

// FUNÇÃO PARA VERIFICAR SE O EMAIL JÁ ESTÁ CADASTRADO
function emailAlreadyExists(email) {
  const existingAccount = getAccount(email);
  return existingAccount !== null;
}

// EVENTO DE CRIAÇÃO DE CONTA
document.getElementById("btnCriarConta").addEventListener("click", function () {
  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

  if (email.length < 8) {
    alert("Preencha o campo com um email válido!");
    email.focus();
  } else if (!validarEmail(email)) {
    alert("O email inserido é inválido!");
    x;
    email.focus();
  } else if (password.length < 4) {
    alert("Preencha a senha com no mínimo quatro dígitos!");
  } else if (emailAlreadyExists(email)) {
    alert("Este email já foi cadastrado!");
  } else {
    termoDeUsoModal.show();
  }
});

// FUNÇÃO PARA VALIDAR EMAIL
function validarEmail(email) {
  var regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // VERIFICAR SE O EMAIL ESTÁ EM LETRAS MINÚSCULAS
  if (email.toLowerCase() !== email) {
    return false; // CAPS LOCK ESTÁ ATIVADO
  }

  // VERIFICAR SE O EMAIL CORRESPONDE AO PADRÃO REGEX
  if (email.match(regex)) {
    // VERIFICAR SE O EMAIL CONTÉM UM DOMÍNIO VÁLIDO (POR EXEMPLO, ".COM")
    var partes = email.split('@');
    if (partes.length === 2) {
      var dominio = partes[1];
      if (dominio.includes('.')) {
        return true; // EMAIL VÁLIDO
      }
    }
  }
  
  return false; // EMAIL INVÁLIDO
}

// FUNÇÃO PARA SALVAR UMA CONTA
function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

// FUNÇÃO PARA SALVAR A SESSÃO
function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }

  sessionStorage.setItem("logged", data);
}

// FUNÇÃO PARA OBTER UMA CONTA PELO EMAIL
function getAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return null;
}

// VERIFICAR SE O USUÁRIO JÁ ESTÁ LOGADO
checkLogged();
