'use client';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputBox from '../Common/InputBox';
import Button from '../Common/Button';
import TaskLists from './TaskLists';

type Todo = { id: string; text: string };

const TodoApp = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('todos');
        stored && setTodos(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleSubmit = () => {
        const trimmed = newTodo.trim();
        if (!trimmed) return;

        if (editId) {
            setTodos(todos.map(todo => todo.id === editId ? { ...todo, text: trimmed } : todo));
            setEditId(null);
        } else {
            setTodos([...todos, { id: uuidv4(), text: trimmed }]);
        }

        setNewTodo('');
    };

    const handleRemove = (id: string) => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
        if (editId === id) {
            setEditId(null);
            setNewTodo('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    

    const handleEdit = (id: string) => {
        const task = todos.find(t => t.id === id);
        if (task) {
            setNewTodo(task.text);
            setEditId(id);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex items-center justify-center p-6">
            <div className="w-full max-w-1/2 bg-white shadow-lg rounded-xl p-6">
                <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">📝 Todo App</h1>
                <div className="flex gap-2 mb-6">
                    <InputBox
                        placeholder={editId ? 'Edit task...' : 'Add a new task...'}
                        value={newTodo}
                        onKeyDown={handleKeyDown}
                        onChange={e => setNewTodo(e.target.value)}
                        autoFocus
                    />
                    <Button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        {editId ? 'Update' : 'Add'}
                    </Button>
                </div>
                <TaskLists todos={todos} onRemove={handleRemove} onEditStart={handleEdit} />
            </div>
        </div>
    );
};

export default TodoApp;
