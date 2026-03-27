const form = document.getElementById("formCadastro");
const listaUsuarios = document.getElementById("listaUsuarios");
const cancelarBtn = document.getElementById("cancelar");

function carregarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  listaUsuarios.innerHTML = "";
  usuarios.forEach((u, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${u.nome}</td>
      <td>${u.email}</td>
      <td>
        <button class="btn-editar" onclick="editarUsuario(${index})">Editar</button>
        <button class="btn-excluir" onclick="removerUsuario(${index})">Excluir</button>
      </td>
    `;
    listaUsuarios.appendChild(row);
  });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const index = document.getElementById("index").value;
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (index === "") {
    // Criar
    usuarios.push({ nome, email, senha });
  } else {
    // Atualizar
    usuarios[index] = { nome, email, senha };
    document.getElementById("index").value = "";
    cancelarBtn.style.display = "none";
  }

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  form.reset();
  carregarUsuarios();
});

function editarUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const u = usuarios[index];
  document.getElementById("nome").value = u.nome;
  document.getElementById("email").value = u.email;
  document.getElementById("senha").value = u.senha;
  document.getElementById("index").value = index;
  cancelarBtn.style.display = "inline-block";
}

function removerUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.splice(index, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  carregarUsuarios();
}

cancelarBtn.addEventListener("click", () => {
  form.reset();
  document.getElementById("index").value = "";
  cancelarBtn.style.display = "none";
});

carregarUsuarios();
