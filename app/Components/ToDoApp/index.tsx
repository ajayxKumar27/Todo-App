'use client';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputBox from '../Common/InputBox';
import Button from '../Common/Button';
import TaskLists from './TaskLists';

type Todo = { id: string; text: string; isMarked?: boolean };

const TodoApp = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [editId, setEditId] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('todos');
        stored && setTodos(JSON.parse(stored));
        setIsMounted(true);
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
            setTodos([...todos, { id: uuidv4(), text: trimmed, isMarked: false }]);
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

    const handleToggleCompleted = (id: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, isMarked: !todo.isMarked } : todo
            )
        );
    };

    if (!isMounted) return null;

    return (
        <div className="h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md sm:max-w-lg max-h-dvh md:max-w-2xl bg-white shadow-lg rounded-xl p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-4 sm:mb-6"> Todo App</h1>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 mb-4 sm:mb-6">
                    <InputBox
                        placeholder={editId ? 'Edit task...' : 'Add a new task...'}
                        value={newTodo}
                        onKeyDown={handleKeyDown}
                        onChange={e => setNewTodo(e.target.value)}
                        autoFocus
                    />
                    <Button
                        onClick={handleSubmit}
                        className="w-full sm:w-auto text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                    >
                        {editId ? 'Update' : 'Add'}
                    </Button>
                </div>

                <TaskLists
                    todos={todos}
                    onRemove={handleRemove}
                    onEditStart={handleEdit}
                    isCompletedToggle={handleToggleCompleted}
                />
            </div>
        </div>

    );
};

export default TodoApp;
