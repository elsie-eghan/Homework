
import firebase from 'firebase/app';
import 'firebase/database'; // Use 'firebase/firestore' for Firestore

const firebaseConfig = {

  apiKey: "AIzaSyDSgl8BqRe9HPcfcmCcterVOuK4ckY1Ihc",
  authDomain: "task-list-7bb3b.firebaseapp.com",
  projectId: "task-list-7bb3b",
  storageBucket: "task-list-7bb3b.appspot.com",
  messagingSenderId: "439576102041",
  appId: "1:439576102041:web:596a1f4b8bc1cdc21ca408"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

class TaskList {
  constructor() {
    this.tasksRef = database.ref('tasks');
    this.tasks = [];
  }

  addTask(task) {
    const newTaskRef = this.tasksRef.push();
    task.id = newTaskRef.key;
    newTaskRef.set(task);
  }

  getAllTasks(callback) {
    this.tasksRef.on('value', snapshot => {
      const tasksData = snapshot.val();
      this.tasks = tasksData ? Object.values(tasksData) : [];
      callback(this.tasks);
    });
  }

  getTaskById(id, callback) {
    const taskRef = this.tasksRef.child(id);
    taskRef.on('value', snapshot => {
      const task = snapshot.val();
      callback(task);
    });
  }

  updateTask(id, updatedTask) {
    const taskRef = this.tasksRef.child(id);
    taskRef.update(updatedTask);
  }

  deleteTask(id) {
    const taskRef = this.tasksRef.child(id);
    taskRef.remove();
  }
}

class Task {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}


const taskList = new TaskList();

const task1 = new Task(null, 'Task 1', 'Description of Task 1');
const task2 = new Task(null, 'Task 2', 'Description of Task 2');


taskList.addTask(task1);
taskList.addTask(task2);


taskList.getAllTasks(tasks => {
  console.log(tasks);
});


const taskId = 'your-task-id';
taskList.getTaskById(taskId, task => {
  console.log(task);
});


const updatedTask = new Task(null, 'Updated Task 2', 'Updated description');
taskList.updateTask(taskId, updatedTask);


taskList.deleteTask(taskId);
