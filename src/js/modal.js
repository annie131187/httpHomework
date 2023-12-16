/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
export default class Modal {
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
