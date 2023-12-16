import Modal from './modal'

const port = 7010;
const url = 'http://localhost:' + port;
const addTicketBtn = document.querySelector(".add-ticket_btn");
const ticketsList = document.querySelector(".tickets-list");

// Отображение списка тикетов

function getTicketsList() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.response);
        data.forEach((elem) => {
          ticketsList.insertAdjacentHTML("beforeend", `
            <div class="list-item" data-id="${elem.id}">
              <span class="ticket-status" data-status="${elem.status}"></span>
              <div class="ticket-name">${elem.name}
                <p class="ticket-description hidden">${elem.description}</p>
              </div>
              <span class="ticket-date">${elem.created}</span>
              <input type="button" class="ticket-edit">
              <input type="button" class="ticket-delete">
            </div>
          `);
        });
      } catch (e) {
        console.error(e);
      }
    }
  });
}

getTicketsList();

// Добавление тикета
addTicketBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const modalAdd = new Modal("body");
  modalAdd.renderAddModal();

  const addTask = document.querySelector(".add-modal");
  addTask.classList.remove("hidden");
  addTask.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const body = new FormData(addTask);
  
    const xhr = new XMLHttpRequest();
  
    xhr.open('POST', url);

    addTask.classList.add("hidden");
  
    xhr.send(body);

    xhr.addEventListener("loadend", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          console.log(xhr.response);    
        } catch (e) {
          console.error(e);
        }
      }
    });
  });

  const resetBtn = addTask.querySelector(".modal_btn-reset");
  resetBtn.addEventListener("click", (e) => {
    e.preventDefault();

    addTask.classList.add("hidden");
  });
});


ticketsList.addEventListener("click", (e) => {
  // Показать подробное описание
  if(e.target.classList.contains("ticket-name")) {
    const taskDescription = e.target.querySelector(".ticket-description");
    taskDescription.classList.toggle("hidden");
  }

  //Удаление тикета
  if (e.target.classList.contains("ticket-delete")) {
    const taskId = e.target.parentNode.dataset.id;
    const modalDel = new Modal("body");
    modalDel.renderDeleteModal();

    const delTask = document.querySelector(".delete-modal");
    delTask.classList.remove("hidden");
    delTask.addEventListener("submit", (e) => {
      e.preventDefault();

      const xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      
      console.log(xhr.response);
      }
  
      xhr.open('DELETE', url + '?' + `id=${taskId}`);

      delTask.classList.add("hidden");

      xhr.send();    
    });

    const resetBtn = delTask.querySelector(".modal_btn-reset");
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();

      delTask.classList.add("hidden");
  });
  };

// Изменение тикета
  if (e.target.classList.contains("ticket-edit")) {
    const taskId = e.target.parentNode.dataset.id;
    const modalEdit = new Modal("body");
    modalEdit.renderEditModal();

    const editTask = document.querySelector(".edit-modal");
    editTask.classList.remove("hidden");
    editTask.addEventListener("submit", (e) => {
      e.preventDefault();

      const body = new FormData(editTask);

      const xhr = new XMLHttpRequest();

      xhr.open('PUT', url + '?' + `id=${taskId}`);

      editTask.classList.add("hidden");

      xhr.send(body);

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            console.log(xhr.response);
          } catch (e) {
            console.error(e);
          }
        }
      });
    });

    const resetBtn = editTask.querySelector(".modal_btn-reset");
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();

      editTask.classList.add("hidden");
  });
  }

  // Изменение статуса тикета
  if (e.target.classList.contains("ticket-status")) {
    const taskId = e.target.parentNode.dataset.id;
    const taskStatus = e.target.parentNode.dataset.status;

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;

      console.log(xhr.response);
    }

    xhr.open('PUT', url + '?' + `id=${taskId}` + '&' + `status=${taskStatus}`);

    xhr.send();
  }
});
