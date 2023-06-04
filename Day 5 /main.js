class Task {
    constructor(title, description, priority) {
      this.title = title;
      this.description = description;
      this.priority = priority;
    }
  
    static fromJSON(json) {
      return new Task(json.title, json.description, json.priority);
    }
  }
  
  class UI {
    constructor() {
      this.form = document.getElementById('form');
  
      this.title = document.getElementById('title-input');
      this.description = document.getElementById('description-input');
      this.priority = document.getElementById('priority-input');
  
      this.tableBody = document.getElementById('table-body');
  
      this.form.addEventListener('submit', (e) => this.onFormSubmit(e));
  
      this.tasks = [];
      this.loadTasksFromLocalStorage();
      this.renderTaskTable();
    }
  
    onFormSubmit(e) {
      e.preventDefault();
  
      if (
        this.title.value === '' ||
        this.description.value === '' ||
        this.priority.value === ''
      ) {
        return;
      }
  
      const task = new Task(
        this.title.value,
        this.description.value,
        this.priority.value
      );
  
      this.tasks.push(task);
  
      this.saveTasksToLocalStorage();
      this.renderTaskTable();
  
      this.title.value = '';
      this.description.value = '';
      this.priority.value = '';
    }
  
    renderTaskTable() {
      this.tableBody.innerHTML = '';
  
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
  
        const tr = this.createTaskTableRow(task);
        this.tableBody.appendChild(tr);
      }
    }
  
    createTaskTableRow(task) {
      const tr = document.createElement('tr');
  
      const tdTitle = document.createElement('td');
      const tdDescription = document.createElement('td');
      const tdPriority = document.createElement('td');
      const tdActions = document.createElement('td');
  
      tdTitle.innerHTML = task.title;
      tdDescription.innerHTML = task.description;
      tdPriority.innerHTML = task.priority;
  
      const actionButtons = this.createActionButtons(task);
      tdActions.appendChild(actionButtons[0]);
      tdActions.appendChild(actionButtons[1]);
  
      tr.appendChild(tdTitle);
      tr.appendChild(tdDescription);
      tr.appendChild(tdPriority);
      tr.appendChild(tdActions);
  
      return tr;
    }
  
    createActionButtons(task) {
      const deleteButton = document.createElement('button');
      const editButton = document.createElement('button');
  
      deleteButton.setAttribute('class', 'btn btn-danger btn-sm');
      deleteButton.innerHTML = 'Delete';
      deleteButton.addEventListener('click', () =>
        this.onRemoveTaskClicked(task)
      );
  
      editButton.setAttribute('class', 'btn btn-warning btn-sm ms-2');
      editButton.innerHTML = 'Edit';
      editButton.addEventListener('click', () => this.onEditTaskClicked(task));
  
      return [deleteButton, editButton];
    }
  
    onRemoveTaskClicked(task) {
      this.tasks = this.tasks.filter((x) => {
        return task.title !== x.title;
      });
  
      this.saveTasksToLocalStorage();
      this.renderTaskTable();
    }
  
    onEditTaskClicked(task) {
      this.title.value = task.title;
      this.description.value = task.description;
      this.priority.value = task.priority;
  
      this.tasks = this.tasks.filter((x) => {
        return task.title !== x.title;
      });
  
      this.saveTasksToLocalStorage();
      this.renderTaskTable();
    }
  
    saveTasksToLocalStorage() {
      const json = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', json);
    }
  
    loadTasksFromLocalStorage() {
      const json = localStorage.getItem('tasks');
      if (json) {
        const taskArr = JSON.parse(json);
        this.tasks = taskArr.map((x) => Task.fromJSON(x));
      }
    }
  }
  
  const ui = new UI();
  