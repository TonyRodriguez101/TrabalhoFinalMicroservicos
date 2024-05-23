//Função pra login
function login(event) {
    console.log('login')
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email === '' || password === '') {
        document.getElementById("mensagemErro").innerText = "Por favor, preencha todos os campos.";
        return;
    }

    document.getElementById("mensagemErro").innerText = "";

    var data = {
        email: email,
        password: password
    };
    console.log(data)
    fetch('http://localhost:3000/user/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    //console.log("Token:", data.token);
                    localStorage.setItem('token', data.token);

                    // Redireciona para a página de tarefas
                    window.location.href = "tasks/task.html";

                    let token = localStorage.getItem('token');
                    console.log(token)
                });
            } else {
                response.json().then(errorData => {
                    alert(errorData.message); // Exibe a mensagem de erro retornada pela API
                    console.error('Erro:', errorData.message);
                });
            }
        })
        .catch(error => {
            alert(error); // Se houver um erro de rede ou outro erro ao fazer a solicitação
            console.error('Erro:', error);
        });
    
}

//Função sair
function sair(){
    localStorage.removeItem('token');
    window.location.href = '../index.html';
}

//Função para registrar
function registrar(event) {
    // Evita a atualização da página
    console.log('teste')
    event.preventDefault();

    // Pegando os valores dos campos de entrada
    var email = document.getElementById("emailRegistro").value;
    var usernameRegistro = document.getElementById("usernameRegistro").value;
    var passwordResgistro = document.getElementById("passwordResgistro").value;
    var passwordConfirmarResgistro = document.getElementById("passwordConfirmarResgistro").value;

    // Verificando se os campos estão vazios
    if (email === '' || usernameRegistro === '' || passwordResgistro === '' || passwordConfirmarResgistro === '') {
        // Mostrando mensagem de erro
        alert("Por favor, preencha todos os campos.");
        return; // Para a execução da função
    }

    // Verificando se a senha tem no mínimo 8 caracteres
    if (passwordResgistro.length <= 8) {
        // Mostrando mensagem de erro
        alert("A senha deve ter no mínimo 8 caracteres.");
        return; // Para a execução da função
    }

    // Verificando se a senha e a confirmação de senha são iguais
    if (passwordResgistro !== passwordConfirmarResgistro) {
        // Mostrando mensagem de erro
        alert("As senhas não coincidem.");
        return; // Para a execução da função
    }

    // Limpa a mensagem de erro se os campos estiverem preenchidos corretamente
    document.getElementById("mensagemErroRegistrar").innerText = "";

    // Mostrando os valores no console
    console.log("E-mail:", email);
    console.log("Username:", usernameRegistro);
    console.log("Password:", passwordResgistro);
    console.log("Password Confirmar:", passwordConfirmarResgistro);

    // Construindo o corpo da requisição
    var data = {
        name: usernameRegistro,
        email: email,
        password: passwordResgistro
    };

    fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                console.log('registro feito');
                window.location.href = '../index.html';
            } else {
                response.json().then(errorData => {
                    console.error('Erro:', errorData.message);
                    // Lida com a mensagem de erro retornada pela API
                    // Por exemplo, você pode mostrar uma mensagem de erro para o usuário
                    if (errorData.message === 'Este email já está em uso.') {
                        document.getElementById("mensagemErroRegistrar").innerText = 'Este email já está em uso.';
                    }
                });
            }
        })
        .catch(error => {
            // Se houver um erro de rede ou outro erro ao fazer a solicitação
            alert(error);
            console.error('Erro:', error);
            // Você pode mostrar uma mensagem de erro para o usuário ou lidar com o erro de outra forma
        });

}

//Função para buscar o username
function username(){
     let token = localStorage.getItem('token'); 
     fetch('http://localhost:3000/user/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar usuário');
        }
        response.json().then(data => {
            console.log(data);
            document.getElementById('usernameDisplay').innerText = "Usuário: " + data.name;
        });
    })
    .catch(error => {
        alert(error);
        console.error('Erro:', error);
    });
   
}

//Função para alterar o nome
function salvarAlteracoes(event) {
    // Evita a atualização da página
    event.preventDefault();

    // Pegando os valores dos campos de entrada
    var usernamePerfil = document.getElementById("usernamePerfil").value;

    // Verificando se os campos não estão vazios
    if (usernamePerfil === '' ) {
        // Mostrando mensagem de erro
        document.getElementById("mensagemPerfil").innerText = "Por favor, preencha todos o campo.";
        return; // Para a execução da função
    }

    // Limpa a mensagem de erro se os campos estiverem preenchidos corretamente
    document.getElementById("mensagemPerfil").innerText = "";

    // Mostrando os valores no console
    console.log("Novo Username:", usernamePerfil);

    // Construindo o corpo da requisição
    var data = {
        name: usernamePerfil
    };

    let token = localStorage.getItem('token'); 
    fetch('http://localhost:3000/user/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao editar usuário');
        }
        response.json().then(data => {
            console.log("Usuário alterado com sucesso");
            window.location.reload();
        });
    })
    .catch(error => {
        alert(error);
        console.error('Erro:', error);
    });
}

//Função adicionar task
function adicionarTarefa(event) {
    // Evita a atualização da página
    event.preventDefault();

    // Pegando os valores dos campos de entrada
    var taskName = document.getElementById("task-name").value;
    var taskDescription = document.getElementById("task-description").value;

    if (taskName === '' || taskDescription === '' ) {
        // Mostrando mensagem de erro
        document.getElementById("mensagemAdd").innerText = "Por favor, preencha todos os campos.";
        return; // Para a execução da função
    }

    // Mostrando os valores no console
    console.log("Título da Tarefa:", taskName);
    console.log("Descrição da Tarefa:", taskDescription);

    var data = {
        title: taskName,
        description: taskDescription
    };

    let token = localStorage.getItem('token'); 
    fetch('http://localhost:3000/task/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao registrar tarefa');
        }
        console.log('registro feito')
        window.location.href = 'task.html';
    })
    .catch(error => {
        // Tratamento de erros
        alert(error);
        console.error('Erro:', error);
        // Você pode mostrar uma mensagem de erro para o usuário ou lidar com o erro de outra forma
    });
}

//Função busca tarefa do usuário
function buscarTarefa() {
    let token = localStorage.getItem('token'); 
    fetch('http://localhost:3000/task/task', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar tarefas');
        }
        response.json().then(data => {
            console.log(data);
            // Renderiza as tarefas na lista
            renderizarTarefas(data);
        });
    })
    .catch(error => {
        const listaTarefas = document.querySelector('.task-list');
        listaTarefas.innerHTML = 'Sem tarefas';
        console.error('Erro:', error);
    });
}

// Função para renderizar as tarefas na lista
// Função para renderizar as tarefas na lista
function renderizarTarefas(tarefas) {
    const listaTarefas = document.querySelector('.task-list');
    listaTarefas.innerHTML = ''; // Limpa a lista antes de renderizar

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (tarefa.done) {
            li.classList.add('done');
        }

        // Verifica se o status da resposta é 0 e adiciona o background azul
        if (tarefa.status === false) {
            li.style.backgroundColor = '#c5ede0';
            const botaoCheck = document.createElement('a');
            botaoCheck.href = ''; // Adicione a URL ou o evento para marcar a tarefa como concluída
            botaoCheck.classList.add('check-btn');
            botaoCheck.innerHTML = '<span><i class="fas fa-minus"></i></span>';

            // Adiciona um listener de clique ao botão de check
            botaoCheck.addEventListener('click', function(event) {
                event.preventDefault()
                // Obtém o id da tarefa a partir do atributo data-id do elemento pai (li)
                let idTarefa = tarefa.id;
                abrirTarefa(idTarefa);
            });
            li.appendChild(botaoCheck);
        } else {
            // Botão de check
            const botaoCheck = document.createElement('a');
            botaoCheck.href = ''; // Adicione a URL ou o evento para marcar a tarefa como concluída
            botaoCheck.classList.add('check-btn');
            botaoCheck.innerHTML = '<span><i class="fas fa-check"></i></span>';

            // Adiciona um listener de clique ao botão de check
            botaoCheck.addEventListener('click', function(event) {
                event.preventDefault()
                // Obtém o id da tarefa a partir do atributo data-id do elemento pai (li)
                let idTarefa = tarefa.id;
                completeTarefa(idTarefa);
            });

            // Botão de editar
            const botaoEditar = document.createElement('a');
            botaoEditar.href = ''; // Adicione a URL ou o evento para editar a tarefa
            botaoEditar.classList.add('edit-btn');
            botaoEditar.innerHTML = '<span><i class="fas fa-edit"></i></span>';

            // Adiciona um listener de clique ao botão de editar
            botaoEditar.addEventListener('click', function(event) {
                event.preventDefault()
                // Obtém o id da tarefa a partir do atributo data-id do elemento pai (li)
                let idTarefa = tarefa.id;
                editarTarefaPage(idTarefa);
            });
            li.appendChild(botaoCheck);
            li.appendChild(botaoEditar);
        }

        // Texto da tarefa
        const texto = document.createElement('span');
        texto.textContent = tarefa.title;
        texto.classList.add('editable-text');

        // Adiciona um evento de clique ao texto da tarefa para mostrar os detalhes
        texto.addEventListener('click', function(event) {
            event.preventDefault();
            // Mostra os detalhes da tarefa
            mostrarDetalhesTarefa(tarefa);
        });

        // Adiciona os elementos à lista de tarefas
        li.appendChild(texto);
        listaTarefas.appendChild(li);
    });
}

function mostrarDetalhesTarefa(tarefa) {
    // Você pode exibir os detalhes da tarefa como quiser, por exemplo, em uma caixa de diálogo modal
    alert(`Detalhes da Tarefa:\n\nTítulo: ${tarefa.title}\nDescrição: ${tarefa.description}`);
}

//Função que leva para a pagina de edit
function editarTarefaPage(idTask){
    console.log(idTask)
    window.location.replace('edittask.html?id=' + idTask);
}

//Função que edita tarefa
function editarTarefa(event) {
    event.preventDefault();
    // Obtendo o ID da tarefa da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idTarefa = urlParams.get('id');

    // Pegando os valores dos campos de entrada
    var taskNameEdit = document.getElementById("taskNameEdit").value;
    var taskDescriptionEdit = document.getElementById("taskDescriptionEdit").value;

    // Verificando se os campos não estão vazios
    if (taskNameEdit === '' || taskDescriptionEdit === '') {
        // Mostrando mensagem de erro
        document.getElementById("mensagemEdit").innerText = "Por favor, preencha todos os campos.";
        return; // Para a execução da função
    }

    // Mostrando os valores no console
    console.log("ID da Tarefa:", idTarefa);
    console.log("Título da Tarefa:", taskNameEdit);
    console.log("Descrição da Tarefa:", taskDescriptionEdit);

    var data = {
        id: idTarefa,
        title: taskNameEdit,
        description: taskDescriptionEdit
    };

    let token = localStorage.getItem('token'); 
    fetch('http://localhost:3000/task/task', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao editar tarefa');
        }
        response.json().then(data => {
            console.log("Tarefa alterada com sucesso:", data);
            alert('Tarefa atualizada');
            window.location.replace('task.html');
        });
    })
    .catch(error => {
        alert(error);
        console.error('Erro:', error);
    });
}

//Função para completar tarefa
function completeTarefa(idTask){
    var data = {
        id: idTask,
        status: 0,
    };

    let token = localStorage.getItem('token'); 
    fetch('http://localhost:3000/task/status', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao editar tarefa');
        }
        response.json().then(data => {
            console.log("Tarefa alterada com sucesso:", data);
            window.location.reload();
        });
    })
    .catch(error => {
        alert(error);
        console.error('Erro:', error);
    });
}

// Funcao para abrir tarefa
function abrirTarefa(idTask) {
    var data = {
        id: idTask,
        status: 1,
    };

    let token = localStorage.getItem('token');
    fetch('http://localhost:3000/task/status', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao editar tarefa');
            }
            response.json().then(data => {
                console.log("Tarefa alterada com sucesso:", data);
                window.location.reload();
            });
        })
        .catch(error => {
            alert(error);
            console.error('Erro:', error);
        });
}