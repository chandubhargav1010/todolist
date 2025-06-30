// To-Do List Application
class TodoApp {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.currentEditId = null;
        this.currentDeleteId = null;
        
        this.initializeElements();
        this.bindEvents();
        this.renderTasks();
        this.updateStats();
    }

    initializeElements() {
        // Form elements
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskInput');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.dueDateInput = document.getElementById('dueDateInput');
        
        // Search and filter elements
        this.searchInput = document.getElementById('searchInput');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        // Action buttons
        this.exportBtn = document.getElementById('exportBtn');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        
        // Containers
        this.tasksContainer = document.getElementById('tasksContainer');
        this.emptyState = document.getElementById('emptyState');
        this.toastContainer = document.getElementById('toastContainer');
        
        // Modals
        this.editModal = document.getElementById('editModal');
        this.deleteModal = document.getElementById('deleteModal');
        this.editTaskForm = document.getElementById('editTaskForm');
        
        // Stats elements
        this.totalTasks = document.getElementById('totalTasks');
        this.completionRate = document.getElementById('completionRate');
        this.allCount = document.getElementById('allCount');
        this.pendingCount = document.getElementById('pendingCount');
        this.completedCount = document.getElementById('completedCount');
    }

    bindEvents() {
        // Form submission
        this.taskForm.addEventListener('submit', (e) => this.handleAddTask(e));
        
        // Search functionality
        this.searchInput.addEventListener('input', () => this.handleSearch());
        
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleFilter(btn.dataset.filter));
        });
        
        // Action buttons
        this.exportBtn.addEventListener('click', () => this.exportTasks());
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        
        // Modal events
        this.bindModalEvents();
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    bindModalEvents() {
        // Edit modal
        const editCloseBtn = this.editModal.querySelector('.close-btn');
        const editCancelBtn = this.editModal.querySelector('.cancel-btn');
        editCloseBtn.addEventListener('click', () => this.closeEditModal());
        editCancelBtn.addEventListener('click', () => this.closeEditModal());
        this.editTaskForm.addEventListener('submit', (e) => this.handleEditTask(e));
        
        // Delete modal
        const deleteCloseBtn = this.deleteModal.querySelector('.close-btn');
        const deleteCancelBtn = this.deleteModal.querySelector('.cancel-btn');
        const deleteConfirmBtn = this.deleteModal.querySelector('.delete-confirm-btn');
        deleteCloseBtn.addEventListener('click', () => this.closeDeleteModal());
        deleteCancelBtn.addEventListener('click', () => this.closeDeleteModal());
        deleteConfirmBtn.addEventListener('click', () => this.confirmDelete());
        
        // Close modals on backdrop click
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) this.closeEditModal();
        });
        this.deleteModal.addEventListener('click', (e) => {
            if (e.target === this.deleteModal) this.closeDeleteModal();
        });
    }

    handleAddTask(e) {
        e.preventDefault();
        
        const text = this.taskInput.value.trim();
        if (!text) {
            this.showToast('Please enter a task description', 'error');
            return;
        }
        
        const task = {
            id: this.generateId(),
            text: text,
            completed: false,
            priority: this.prioritySelect.value,
            dueDate: this.dueDateInput.value || null,
            createdAt: new Date().toISOString(),
            completedAt: null
        };
        
        this.tasks.unshift(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        
        // Reset form
        this.taskForm.reset();
        this.prioritySelect.value = 'medium';
        
        this.showToast('Task added successfully!', 'success');
        this.taskInput.focus();
    }

    handleSearch() {
        this.renderTasks();
    }

    handleFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.renderTasks();
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + Enter to add task
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (document.activeElement === this.taskInput) {
                this.taskForm.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            this.closeEditModal();
            this.closeDeleteModal();
        }
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            
            const message = task.completed ? 'Task completed!' : 'Task marked as pending';
            this.showToast(message, 'success');
        }
    }

    openEditModal(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;
        
        this.currentEditId = id;
        
        // Populate form
        document.getElementById('editTaskText').value = task.text;
        document.getElementById('editPriority').value = task.priority;
        document.getElementById('editDueDate').value = task.dueDate || '';
        
        this.editModal.classList.add('show');
        this.editModal.setAttribute('aria-hidden', 'false');
        document.getElementById('editTaskText').focus();
    }

    closeEditModal() {
        this.editModal.classList.remove('show');
        this.editModal.setAttribute('aria-hidden', 'true');
        this.currentEditId = null;
    }

    handleEditTask(e) {
        e.preventDefault();
        
        if (!this.currentEditId) return;
        
        const task = this.tasks.find(t => t.id === this.currentEditId);
        if (!task) return;
        
        const newText = document.getElementById('editTaskText').value.trim();
        if (!newText) {
            this.showToast('Please enter a task description', 'error');
            return;
        }
        
        task.text = newText;
        task.priority = document.getElementById('editPriority').value;
        task.dueDate = document.getElementById('editDueDate').value || null;
        
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        this.closeEditModal();
        
        this.showToast('Task updated successfully!', 'success');
    }

    openDeleteModal(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;
        
        this.currentDeleteId = id;
        
        // Show task preview
        const preview = document.getElementById('deleteTaskPreview');
        preview.textContent = task.text;
        
        this.deleteModal.classList.add('show');
        this.deleteModal.setAttribute('aria-hidden', 'false');
    }

    closeDeleteModal() {
        this.deleteModal.classList.remove('show');
        this.deleteModal.setAttribute('aria-hidden', 'true');
        this.currentDeleteId = null;
    }

    confirmDelete() {
        if (!this.currentDeleteId) return;
        
        this.tasks = this.tasks.filter(t => t.id !== this.currentDeleteId);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        this.closeDeleteModal();
        
        this.showToast('Task deleted successfully!', 'success');
    }

    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            this.showToast('No completed tasks to clear', 'info');
            return;
        }
        
        if (confirm(`Are you sure you want to delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            
            this.showToast(`${completedCount} completed task(s) deleted!`, 'success');
        }
    }

    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `todo-list-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showToast('Tasks exported successfully!', 'success');
    }

    renderTasks() {
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            this.tasksContainer.style.display = 'none';
            this.emptyState.style.display = 'block';
        } else {
            this.tasksContainer.style.display = 'block';
            this.emptyState.style.display = 'none';
            
            this.tasksContainer.innerHTML = filteredTasks
                .map(task => this.createTaskHTML(task))
                .join('');
            
            // Bind task events
            this.bindTaskEvents();
        }
    }

    getFilteredTasks() {
        let filtered = [...this.tasks];
        
        // Apply search filter
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            filtered = filtered.filter(task =>
                task.text.toLowerCase().includes(searchTerm)
            );
        }
        
        // Apply status filter
        switch (this.currentFilter) {
            case 'pending':
                filtered = filtered.filter(task => !task.completed);
                break;
            case 'completed':
                filtered = filtered.filter(task => task.completed);
                break;
            // 'all' shows everything
        }
        
        return filtered;
    }

    createTaskHTML(task) {
        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
        const dueDateFormatted = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;
        
        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-content">
                    <input 
                        type="checkbox" 
                        class="task-checkbox" 
                        ${task.completed ? 'checked' : ''}
                        aria-label="Mark task as ${task.completed ? 'incomplete' : 'complete'}"
                    >
                    <div class="task-details">
                        <div class="task-text">${this.escapeHtml(task.text)}</div>
                        <div class="task-meta">
                            <span class="priority-badge priority-${task.priority}">
                                ${task.priority} priority
                            </span>
                            ${dueDateFormatted ? `
                                <span class="due-date ${isOverdue ? 'overdue' : ''}">
                                    <i class="fas fa-calendar"></i>
                                    ${dueDateFormatted}
                                    ${isOverdue ? '(Overdue)' : ''}
                                </span>
                            ` : ''}
                            <span class="created-date">
                                <i class="fas fa-clock"></i>
                                ${new Date(task.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="task-btn edit" aria-label="Edit task">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="task-btn delete" aria-label="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    bindTaskEvents() {
        // Checkbox events
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const taskId = e.target.closest('.task-item').dataset.id;
                this.toggleTask(taskId);
            });
        });
        
        // Edit button events
        document.querySelectorAll('.task-btn.edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = e.target.closest('.task-item').dataset.id;
                this.openEditModal(taskId);
            });
        });
        
        // Delete button events
        document.querySelectorAll('.task-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = e.target.closest('.task-item').dataset.id;
                this.openDeleteModal(taskId);
            });
        });
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        this.totalTasks.textContent = `${total} task${total !== 1 ? 's' : ''} total`;
        this.completionRate.textContent = `${completionPercentage}% completed`;
        
        this.allCount.textContent = total;
        this.pendingCount.textContent = pending;
        this.completedCount.textContent = completed;
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${this.escapeHtml(message)}</span>
            </div>
        `;
        
        this.toastContainer.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
                setTimeout(() => toast.remove(), 300);
            }
        }, 3000);
    }

    getToastIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'info': return 'info-circle';
            default: return 'info-circle';
        }
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    loadTasks() {
        try {
            const stored = localStorage.getItem('todoTasks');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    }

    saveTasks() {
        try {
            localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
            this.showToast('Error saving tasks', 'error');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});

// Add slideOutRight animation for toast removal
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);
