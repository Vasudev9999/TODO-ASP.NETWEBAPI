const apiUrl = 'http://localhost:5185/api/todo';
let editingId = null;

async function fetchTodos() {
    try {
        const response = await fetch(apiUrl);
        const todos = await response.json();
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.name;

            const buttonCard = document.createElement('div');
            buttonCard.className = 'button-card';

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-btn';
            editButton.onclick = () => editTodo(todo);

            const doneButton = document.createElement('button');
            doneButton.textContent = 'Done';
            doneButton.className = 'done-btn';
            doneButton.onclick = () => deleteTodo(todo.id);

            buttonCard.appendChild(editButton);
            buttonCard.appendChild(doneButton);

            li.appendChild(buttonCard);
            todoList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

async function addTodo() {
    const input = document.getElementById('todo-input');
    const newTodo = { name: input.value, isComplete: false };
    try {
        if (editingId) {
            await fetch(`${apiUrl}/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTodo)
            });
            editingId = null;
            document.querySelector('button[onclick="addTodo()"]').textContent = 'Add'; // Reset button text
        } else {
            await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTodo)
            });
        }
        input.value = '';
        fetchTodos();
    } catch (error) {
        console.error('Error adding/updating todo:', error);
    }
}

async function deleteTodo(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        fetchTodos();
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

function editTodo(todo) {
    const input = document.getElementById('todo-input');
    input.value = todo.name;
    editingId = todo.id;
    document.querySelector('button[onclick="addTodo()"]').textContent = 'Update'; // Change button text to 'Update'
}

// Initial load of todos
fetchTodos();
