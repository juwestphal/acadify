 // Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
 
 // Configuração do Firebase
        const firebaseConfig = {
  apiKey: "AIzaSyDKs2phFs0u26NYRGi1TKnhvAJsJ7yE4HY",
  authDomain: "acadify-5ab24.firebaseapp.com",
  projectId: "acadify-5ab24",
  storageBucket: "acadify-5ab24.appspot.com",
  messagingSenderId: "235339619489",
  appId: "1:235339619489:web:da715c79da31cd21b3e4e0",
  measurementId: "G-X2SZQE18KK"
};

        // Inicializa o Firebase
        firebase.initializeApp(firebaseConfig);

        // Inicializa o módulo de autenticação do Firebase
        const auth = firebase.auth();

        // Inicializa o Firestore
        const db = firebase.firestore();

        // Manipulador de evento para o formulário de registro
        document.getElementById("register-form").addEventListener("submit", function(event) {
            event.preventDefault(); // Evita o envio padrão do formulário

            const email = document.getElementById("register-email").value;
            const password = document.getElementById("register-password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            if (password !== confirmPassword) {
                alert("As senhas não coincidem. Por favor, tente novamente.");
                return;
            }

            // Chama a função para registrar o utilizador
            registrarUsuario(email, password);
        });

        // Função para registrar o usuário utilizando o Firebase Authentication
        function registrarUsuario(email, password) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Registro bem-sucedido
                    const user = userCredential.user;
                    alert(`Usuário registrado com sucesso! ID: ${user.uid}`);

                    // Redirecionar para a página de login após o registro e salvamento
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    // Erro durante o registro
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(`Erro ao registrar usuário: ${errorMessage}`);
                });
        }





                    // Professores

         function toggleMenu() {
            document.querySelector('.sidebar').classList.toggle('collapsed');
        }

        function openModal() {
            document.getElementById('myModal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('myModal').style.display = 'none';
        }

        function addProfessor() {
            const professorName = document.getElementById("professorName").value;
            const professorSubject = document.getElementById("professorSubject").value;
            const professorSchedule = document.getElementById("professorSchedule").value;
            const professorInitial = professorName.charAt(0).toUpperCase();

            if (professorName && professorSubject && professorSchedule) {
                const professorData = {
                    nome: professorName,
                    materia: professorSubject,
                    horario: professorSchedule,
                    initial: professorInitial
                };

                // Adicionando o professor à coleção do Firestore
                db.collection("professores").add(professorData)
                    .then((docRef) => {
                        console.log("Professor adicionado com ID: ", docRef.id);
                        displayProfessor(professorData); // Atualiza a exibição do professor
                        closeModal();
                        clearModalFields(); // Limpa os campos do modal
                    })
                    .catch((error) => {
                        console.error("Erro ao adicionar professor: ", error);
                    });
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        }

        function displayProfessor(professor) {
            const professorContainer = document.createElement('div');
            professorContainer.classList.add('professor-container');

            const professorCircle = document.createElement('div');
            professorCircle.classList.add('professor-circle');
            professorCircle.innerText = professor.nome.charAt(0).toUpperCase();

            const professorContent = document.createElement('div');
            professorContent.classList.add('professor-content');

            const nameDiv = document.createElement('div');
            nameDiv.classList.add('professor-name');
            nameDiv.innerText = professor.nome;

            const subjectDiv = document.createElement('div');
            subjectDiv.classList.add('professor-subject');
            subjectDiv.innerText = professor.materia || "Matéria não especificada";

            const scheduleDiv = document.createElement('div');
            scheduleDiv.classList.add('professor-schedule');
            scheduleDiv.innerText = professor.horario || "Horário não especificado";

            professorContent.appendChild(nameDiv);
            professorContent.appendChild(subjectDiv);
            professorContent.appendChild(scheduleDiv);
            professorContainer.appendChild(professorCircle);
            professorContainer.appendChild(professorContent);

            const contentDiv = document.querySelector('.content');
            contentDiv.appendChild(professorContainer);
        }

        function loadProfessors() {
            db.collection("professores").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const professorData = doc.data();
                    displayProfessor(professorData);
                });
            }).catch((error) => {
                console.error("Erro ao buscar documentos: ", error);
            });
        }

        function clearModalFields() {
            document.getElementById("professorName").value = "";
            document.getElementById("professorSubject").value = "";
            document.getElementById("professorSchedule").value = "";
        }

        function resetProfessors() {
            db.collection("professores").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection("professores").doc(doc.id).delete().then(() => {
                        console.log("Professor deletado: ", doc.id);
                    }).catch((error) => {
                        console.error("Erro ao deletar professor: ", error);
                    });
                });
            });

            document.querySelector('.content').innerHTML = '<div class="professor-list-title">Lista de Professores</div>';
        }

        // Carrega os professores ao carregar a página
        window.onload = loadProfessors;






                 // Notas

        let notes = [13, 17, 7, 17, 5];

        // Função para alternar o menu lateral
        function toggleMenu() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('collapsed');
        }

        window.addEventListener("load", (event) => {
            const sidebar = document.querySelector('.sidebar');

            if (window.innerWidth < 780) {
                sidebar.classList.add('collapsed');
            }
        });

        // Função para adicionar uma nota
        function addNote() {
            const noteTitle = prompt("Digite o nome da matéria:");
            const noteDate = prompt("Digite a data da nota (Exemplo: 9 Maio 2024):");
            const noteGrade = parseFloat(prompt("Digite a nota (de 0 a 20):"));

            if (isNaN(noteGrade) || noteGrade < 0 || noteGrade > 20) {
                alert("Nota inválida! Digite um valor entre 0 e 20.");
                return;
            }

            db.collection("notas").add({
                aluno: "userId1", // Substitua pelo ID do aluno correto
                data: noteDate,
                materia: noteTitle,
                nota: noteGrade
            })
            .then((docRef) => {
                console.log("Nota adicionada com ID: ", docRef.id);

                // Criar novo elemento da nota
                const noteContainer = document.createElement('div');
                noteContainer.classList.add('note-container');
                const noteCircle = document.createElement('div');
                noteCircle.classList.add('note-circle');
                const noteContent = document.createElement('div');
                noteContent.classList.add('note-content');
                const titleDiv = document.createElement('div');
                titleDiv.classList.add('note-title');
                const dateDiv = document.createElement('div');
                dateDiv.classList.add('note-date');

                // Definir o conteúdo da nota
                titleDiv.innerText = noteTitle;
                dateDiv.innerText = noteDate;
                noteContent.appendChild(titleDiv);
                noteContent.appendChild(dateDiv);
                noteContainer.appendChild(noteCircle);
                noteContainer.appendChild(noteContent);

                // Adicionar a nova nota antes do contêiner da média
                const contentDiv = document.querySelector('.content');
                const averageContainer = document.querySelector('.average-container');
                contentDiv.insertBefore(noteContainer, averageContainer);

                // Definir a cor do círculo com base na nota
                if (noteGrade < 8) {
                    noteCircle.style.backgroundColor = '#FF3C6A'; // Vermelho
                } else {
                    noteCircle.style.backgroundColor = '#6BCB91'; // Verde
                }

                // Definir a nota no círculo
                noteCircle.innerText = noteGrade;

                // Adicionar a nota ao array de notas
                notes.push(noteGrade);

                // Atualizar a média das notas
                updateAverage();
            })
            .catch((error) => {
                console.error("Erro ao adicionar nota: ", error);
            });
        }





             // Definições 

        async function adicionarMateria(userId, nomeMateria) {
    try {
        // Adiciona o documento com o ID específico ⁠ materialId1 ⁠
        const docRef = db.collection("materias").doc("materialId1");
        
        // Define o documento com os campos desejados
        await docRef.set({
            userId: userId,
            nome: nomeMateria
        });

        console.log("Matéria adicionada com sucesso com ID: materialId1");
        return docRef.id;
    } catch (error) {
        console.error("Erro ao adicionar matéria: ", error);
        return null;   }
}
    // Função para abrir um novo ticket de suporte na coleção 'suporte'
        async function abrirTicketSuporte(nome, telefone, email, problema) {
            try {
                const docRef = await db.collection("suporte").add({
                    nome: nome,
                    telefone: telefone,
                    email: email,
                    problema: problema,
                    data: firebase.firestore.Timestamp.now(),
                    status: "aberto"
                });
                console.log("Novo ticket de suporte aberto com ID: ", docRef.id);
                return docRef.id;
            } catch (error) {
                console.error("Erro ao abrir ticket de suporte: ", error);
                return null;
            }
        }

        // Event listener para enviar solicitação de suporte
        document.getElementById('support-form').addEventListener('submit', async function(event) {
            event.preventDefault(); // Evita que o formulário seja enviado

            const nome = document.getElementById('name').value;
            const telefone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const problema = document.getElementById('issue').value;

            if (!nome || !telefone || !email || !problema) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            try {
                const ticketId = await abrirTicketSuporte(nome, telefone, email, problema);
                if (ticketId) {
                    alert(`Sua solicitação de suporte foi enviada com sucesso! Ticket ID: ${ticketId}`);
                    document.getElementById('support-form').reset(); // Limpa o formulário após o envio
                } else {
                    alert('Erro ao enviar solicitação de suporte. Verifique o console para mais detalhes.');
                }
            } catch (error) {
                console.error('Erro ao enviar solicitação de suporte:', error);
                alert('Erro ao enviar solicitação de suporte. Verifique o console para mais detalhes.');
            }
        });

          function toggleMenu() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('collapsed');
        }

        window.addEventListener("load", (event) => {
            const sidebar = document.querySelector('.sidebar');

            if(window.innerWidth < 780) {
                sidebar.classList.add('collapsed');
            }
        });





                    // Cadeiras

        // Função para adicionar nova cadeira
        function addNewCadeira() {
            const cadeiraName = prompt('Digite o nome da nova cadeira:');
            if (cadeiraName) {
                // Aqui você pode obter o userId1 do usuário atual, dependendo da lógica de autenticação que você implementou
                const userId1 = "seu-id-de-usuario"; // Aqui você deve colocar o ID do usuário atual

                // Adiciona ao Firestore
                db.collection("materias").add({
                    nome: cadeiraName,
                    userId1: userId1
                }).then((docRef) => {
                    console.log("Matéria adicionada com sucesso!", docRef.id);
                    // Atualiza a interface
                    const newCadeira = document.createElement('div');
                    newCadeira.classList.add('note-container');
                    newCadeira.style.backgroundColor = 'rgba(244, 164, 96, 0.3)';
                    newCadeira.innerHTML = `
                        <div class="note-content">
                            <div class="note-title" onclick="editTitle(this)" data-docid="${docRef.id}">${cadeiraName}</div>
                        </div>
                    `;
                    document.getElementById('content').appendChild(newCadeira);
                }).catch((error) => {
                    console.error("Erro ao adicionar matéria: ", error);
                });
            }
        }

        // Função para editar o nome da cadeira
        function editTitle(element) {
            const newTitle = prompt('Editar nome da cadeira:', element.innerText);
            if (newTitle) {
                                const docId = element.getAttribute('data-docid');
                db.collection("materias").doc(docId).update({
                    nome: newTitle
                }).then(() => {
                    console.log("Nome da matéria atualizado com sucesso!");
                    element.innerText = newTitle;
                }).catch((error) => {
                    console.error("Erro ao atualizar nome da matéria: ", error);
                });
            }
        }

        // Função para alternar o menu lateral
        function toggleMenu() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('collapsed');
            document.querySelector('.content').style.marginLeft = sidebar.classList.contains('collapsed') ? '0' : '250px';
        }

        // Listener para carregar o serviço de worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, error => {
                    console.log('ServiceWorker registration failed: ', error);
                });
            });
        }






               // Horários

 function toggleMenu() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('collapsed');
        }

        window.addEventListener("load", (event) => {
            const sidebar = document.querySelector('.sidebar');
            if (window.innerWidth < 780) {
                sidebar.classList.add('collapsed');
            }
        });

        function openModal() {
            document.getElementById('addModal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('addModal').style.display = 'none';
        }

        function adicionarMateria() {
            const materia = document.getElementById('materia').value;
            const horario = document.getElementById('horario').value;
            const lembrete = document.getElementById('lembrete').checked;

            // Verificar se os dados são válidos
            if (!materia || !horario) {
                alert("Dados inválidos! Por favor, preencha todos os campos.");
                return;
            }

            // Criar o elemento de horário
            const timeSlot = document.createElement('div');
            timeSlot.classList.add('time-slot');
            timeSlot.setAttribute('onclick', `alert('Matéria: ${materia}\\nHorário: ${horario}')`);

            const classDiv = document.createElement('div');
            classDiv.classList.add('class');
            classDiv.innerText = materia;

            const timeDiv = document.createElement('div');
            timeDiv.classList.add('time');
            timeDiv.innerText = horario;

            timeSlot.appendChild(classDiv);
            timeSlot.appendChild(timeDiv);

            // Adicionar o novo horário ao final da lista
            const scheduleDiv = document.querySelector('.schedule');
            scheduleDiv.appendChild(timeSlot);

            // Adicionar linha horizontal abaixo do novo horário
            const hr = document.createElement('hr');
            hr.classList.add('divider');
            scheduleDiv.appendChild(hr);

            // Configurar o lembrete se necessário
            if (lembrete) {
                const horarioDate = new Date(`1970-01-01T${horario}:00`);
                const agora = new Date();
                const tempoParaLembrete = horarioDate - agora;

                if (tempoParaLembrete > 0) {
                    setTimeout(() => {
                        alert(`Lembrete: ${materia} começa às ${horario}`);
                    }, tempoParaLembrete);
                }
            }

            // Fechar o modal e limpar os campos
            closeModal();
            document.getElementById('materia').value = '';
            document.getElementById('horario').value = '';
            document.getElementById('lembrete').checked = false;
        }

        function resetSchedule() {
            const scheduleDiv = document.querySelector('.schedule');
            scheduleDiv.innerHTML = '';
        }





             // Calendário 

   function toggleMenu() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('collapsed');
        }

        window.addEventListener("load", (event) => {
            const sidebar = document.querySelector('.sidebar');
            if(window.innerWidth < 780) {
                sidebar.classList.add('collapsed');
            }
        });

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, error => {
                    console.log('ServiceWorker registration failed: ', error);
                });
            });
        }

        function toggleEventForm() {
            const eventForm = document.getElementById('eventForm');
            eventForm.style.display = eventForm.style.display === 'none' ? 'block' : 'none';
        }

        function addEvent() {
            const eventTitle = document.getElementById('eventTitle').value;
            const eventDate = document.getElementById('eventDate').value;
            const eventDescription = document.getElementById('eventDescription').value;

            // Add to Firestore
            firestore.collection('calendario').add({
                title: eventTitle,
                date: eventDate,
                description: eventDescription
            })
            .then((docRef) => {
                console.log('Evento adicionado com ID: ', docRef.id);
                alert('Evento adicionado com sucesso!');
                clearEventForm();
            })
            .catch((error) => {
                console.error('Erro ao adicionar evento: ', error);
                alert('Ocorreu um erro ao adicionar o evento. Verifique o console para mais detalhes.');
            });
        }

        function clearEventForm() {
            document.getElementById('eventTitle').value = '';
            document.getElementById('eventDate').value = '';
            document.getElementById('eventDescription').value = '';
        }



               // Página inicial

        function toggleMenu() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('collapsed');
        }

        window.addEventListener("load", (event) => {
            const sidebar = document.querySelector('.sidebar');

            if (window.innerWidth < 780) {
                sidebar.classList.add('collapsed');
            }
        });

        // Modal
        const modal = document.getElementById("myModal");

        function openModal() {
            modal.style.display = "block";
        }

        function closeModal() {
            modal.style.display = "none";
        }

        // Formulário de adição
        const form = document.getElementById("addForm");

        form.onsubmit = function(event) {
            event.preventDefault();

            const type = document.getElementById("type").value;
            const title = document.getElementById("title").value;
            const time = document.getElementById("time").value;

            // Adicionar ao Firestore
            db.collection("eventos").add({
                tipo: type,
                titulo: title,
                horario: time
            })
            .then(function(docRef) {
                console.log("Evento adicionado com ID: ", docRef.id);

                // Atualizar interface com o evento adicionado
                const itemHTML = `
                    <div class="task-item">
                        <p><strong>${title}</strong></p>
                        <p>${time}</p>
                        <button class="delete-button" onclick="deleteItem(this)">Excluir</button>
                    </div>
                `;

                let container;
                if (type === "evento") {
                    container = document.getElementById("eventos-container");
                } else if (type === "aula") {
                    container = document.getElementById("aulas-container");
                }

                container.insertAdjacentHTML('beforeend', itemHTML);

                // Adicionar evento de clique ao botão de exclusão
                const deleteButtons = container.querySelectorAll('.delete-button');
                deleteButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        this.parentElement.remove();
                    });
                });

                // Rolar para o fim do container
                container.scrollTop = container.scrollHeight;

                // Limpar o formulário e fechar o modal
                form.reset();
                modal.style.display = "none";
            })
            .catch(function(error) {
                console.error("Erro ao adicionar evento: ", error);
            });
        }

        // Função de resetar
        function resetList() {
            document.getElementById("eventos-container").innerHTML = "";
            document.getElementById("aulas-container").innerHTML = "";
        }

    