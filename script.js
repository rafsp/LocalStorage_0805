// Substitua pelo valor obtido em https://www.pexels.com/api/
const API_KEY = 'sua chave'; 

// Simulação de login básico
function autenticar(email, senha) {
  return email && senha; // Qualquer valor preenche já autentica
}

// Faz uma requisição GET para buscar imagens da API da Pexels
async function buscarImagens(termo) {
  try {
    const resposta = await fetch(`https://api.pexels.com/v1/search?query=${termo}&per_page=12`, {
      headers: {
        Authorization: API_KEY
      }
    });

    // Converte a resposta para JSON
    const dados = await resposta.json();
    return dados.photos; // Retorna array de fotos
  } catch (erro) {
    console.error("Erro ao buscar imagens:", erro);
    return [];
  }
}

// Mostra as imagens na tela
function exibirImagens(imagens) {
  const galeria = document.getElementById('galeria');
  galeria.innerHTML = ''; // Limpa a área

  imagens.forEach(imagem => {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    // Cria um card Bootstrap para cada imagem
    col.innerHTML = `
      <div class="card mb-4 shadow-sm">
        <img src="${imagem.src.medium}" class="card-img-top" alt="${imagem.photographer}">
        <div class="card-body">
          <p class="card-text">Fotógrafo: ${imagem.photographer}</p>
        </div>
      </div>
    `;
    galeria.appendChild(col);
  });
}

// Lida com o envio do login
document.getElementById('login-form').addEventListener('submit', async function (evento) {
  evento.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (autenticar(email, senha)) {
    document.getElementById('login-container').classList.add('d-none');
    document.getElementById('galeria-container').classList.remove('d-none');

    // Mostra as primeiras imagens
    const imagens = await buscarImagens("atores");
    exibirImagens(imagens);
  } else {
    alert("Login inválido.");
  }
});

// Logout - volta para a tela de login
document.getElementById('logout-btn').addEventListener('click', function () {
  document.getElementById('galeria-container').classList.add('d-none');
  document.getElementById('login-container').classList.remove('d-none');
  document.getElementById('login-form').reset();
});

// Busca enquanto digita
document.getElementById('busca-input').addEventListener('input', async function () {
  const termo = this.value.trim();
  if (termo.length > 2) {
    const imagens = await buscarImagens(termo);
    exibirImagens(imagens);
  }
});
