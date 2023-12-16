/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modal.js
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
class Modal {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    this._element = element;
  }
  renderAddModal() {
    const addModal = `
      <form class="modal add-modal">
        <h2 class="modal_title">Добавить тикет</h2>
        <h3 class="add-modal_textarea-title">Краткое описание</h3>
        <textarea type="text" name="name" class="add-modal_textarea add-modal_textarea--short" rows="2" autofocus></textarea>
        <h3 class="add-modal_textarea-title">Подробное описание</h3>
        <textarea type="text" name="description" class="add-modal_textarea add-modal_textarea--long" rows="4" autofocus></textarea>
        <div class="modal_btns">
          <button class="modal_btn-reset button">Отмена</button>
          <button type="submit" class="modal_btn-ok button">ОК</button>
        </div>
      </form>
    `;
    this._element.insertAdjacentHTML('beforeend', addModal);
  }
  renderDeleteModal() {
    const deleteModal = `
      <form class="modal delete-modal">
        <h2 class="modal_title">Удалить тикет</h2>
        <p class="delete-modal_text">
          Вы уверены, что хотите удалить тикет? Это действие необратимо.
        </p>
        <div class="modal_btns">
          <button class="modal_btn-reset button">Отмена</button>
          <button type="submit" class="modal_btn-ok button">ОК</button>
        </div>
      </form>
    `;
    this._element.insertAdjacentHTML('beforeend', deleteModal);
  }
  renderEditModal() {
    const editModal = `
      <form class="modal edit-modal">
        <h2 class="modal_title">Изменить тикет</h2>
        <h3 class="add-modal_textarea-title">Краткое описание</h3>
        <textarea type="text" name="name" class="add-modal_textarea add-modal_textarea--short" rows="2" autofocus></textarea>
        <h3 class="add-modal_textarea-title">Подробное описание</h3>
        <textarea type="text" name="description" class="add-modal_textarea add-modal_textarea--long" rows="4" autofocus></textarea>
        <div class="modal_btns">
          <button class="modal_btn-reset button">Отмена</button>
          <button type="submit" class="modal_btn-ok button">ОК</button>
        </div>
      </form>
    `;
    this._element.insertAdjacentHTML('beforeend', editModal);
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const port = 7010;
const url = `http://localhost:${port}`;
const addTicketBtn = document.querySelector('.add-ticket_btn');
const ticketsList = document.querySelector('.tickets-list');

// Отображение списка тикетов

function getTicketsList() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.response);
        data.forEach(elem => {
          ticketsList.insertAdjacentHTML('beforeend', `
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
addTicketBtn.addEventListener('click', e => {
  e.preventDefault();
  const modalAdd = new Modal('body');
  modalAdd.renderAddModal();
  const addTask = document.querySelector('.add-modal');
  addTask.classList.remove('hidden');
  addTask.addEventListener('submit', evt => {
    evt.preventDefault();
    const body = new FormData(addTask);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    addTask.classList.add('hidden');
    xhr.send(body);
    xhr.addEventListener('loadend', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          console.log(xhr.response);
        } catch (err) {
          console.error(err);
        }
      }
    });
  });
  const resetBtn = addTask.querySelector('.modal_btn-reset');
  resetBtn.addEventListener('click', event => {
    event.preventDefault();
    addTask.classList.add('hidden');
  });
});
ticketsList.addEventListener('click', e => {
  // Показать подробное описание
  if (e.target.classList.contains('ticket-name')) {
    const taskDescription = e.target.querySelector('.ticket-description');
    taskDescription.classList.toggle('hidden');
  }

  // Удаление тикета
  if (e.target.classList.contains('ticket-delete')) {
    const taskId = e.target.parentNode.dataset.id;
    const modalDel = new Modal('body');
    modalDel.renderDeleteModal();
    const delTask = document.querySelector('.delete-modal');
    delTask.classList.remove('hidden');
    delTask.addEventListener('submit', evt => {
      evt.preventDefault();
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        console.log(xhr.response);
      };
      xhr.open('DELETE', `${url}?id=${taskId}`);
      delTask.classList.add('hidden');
      xhr.send();
    });
    const resetBtn = delTask.querySelector('.modal_btn-reset');
    resetBtn.addEventListener('click', evt => {
      evt.preventDefault();
      delTask.classList.add('hidden');
    });
  }

  // Изменение тикета
  if (e.target.classList.contains('ticket-edit')) {
    const taskId = e.target.parentNode.dataset.id;
    const modalEdit = new Modal('body');
    modalEdit.renderEditModal();
    const editTask = document.querySelector('.edit-modal');
    editTask.classList.remove('hidden');
    editTask.addEventListener('submit', evt => {
      evt.preventDefault();
      const body = new FormData(editTask);
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', `${url}?id=${taskId}`);
      editTask.classList.add('hidden');
      xhr.send(body);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            console.log(xhr.response);
          } catch (err) {
            console.error(err);
          }
        }
      });
    });
    const resetBtn = editTask.querySelector('.modal_btn-reset');
    resetBtn.addEventListener('click', evt => {
      evt.preventDefault();
      editTask.classList.add('hidden');
    });
  }

  // Изменение статуса тикета
  if (e.target.classList.contains('ticket-status')) {
    const taskId = e.target.parentNode.dataset.id;
    const taskStatus = e.target.parentNode.dataset.status;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      console.log(xhr.response);
    };
    xhr.open('PUT', `${url}?id=${taskId}&status=${taskStatus}`);
    xhr.send();
  }
});
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;
//# sourceMappingURL=main.js.map