const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const datePicker = document.getElementById('date-picker');
const clearAllBtn = document.getElementById('clear-all-btn');
clearAllBtn.addEventListener('click', () => {
	list.innerHTML = '';
});

// Set date picker to today's date by default
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
datePicker.value = `${yyyy}-${mm}-${dd}`;

function addTask() {
	const taskText = input.value.trim();
	if (taskText === '') return;
	const li = document.createElement('li');

	// Create left section for date
	const leftSection = document.createElement('div');
	leftSection.style.display = 'flex';
	leftSection.style.alignItems = 'center';

	// Checkbox for done/pending
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.style.marginRight = '10px';
	checkbox.title = 'Mark as done';
	leftSection.appendChild(checkbox);

	// Date always on left
	const dateSpan = document.createElement('span');
	dateSpan.textContent = datePicker.value;
	dateSpan.style.marginRight = '10px';
	dateSpan.style.color = '#1565c0';
	leftSection.appendChild(dateSpan);

	li.appendChild(leftSection);

	// Task text in middle, allow wrapping
	const taskTextDiv = document.createElement('div');
	taskTextDiv.textContent = taskText;
	taskTextDiv.style.flex = '1';
	taskTextDiv.style.wordBreak = 'break-word';
	taskTextDiv.style.marginLeft = '10px';
	li.appendChild(taskTextDiv);

	// Mark done/pending
	checkbox.addEventListener('change', () => {
		if (checkbox.checked) {
			li.classList.add('done');
		} else {
			li.classList.remove('done');
		}
	});

	const delBtn = document.createElement('button');
	delBtn.textContent = 'Delete';
	delBtn.className = 'delete-btn';
	delBtn.onclick = () => li.remove();
	li.appendChild(delBtn);
	list.appendChild(li);
	input.value = '';
	input.focus();
}

addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', e => {
	if (e.key === 'Enter') addTask();
});
