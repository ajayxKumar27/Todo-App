'use client';
import React from 'react';
import Button from '../Common/Button';

type Todo = { id: string; text: string };

interface Props {
    todos: Todo[];
    onRemove: (id: string) => void;
    onEditStart: (id: string) => void;
}

const TaskLists: React.FC<Props> = ({ todos, onRemove, onEditStart }) => {
    if (!todos.length) return <p className="text-center text-gray-500 italic mb-6">No tasks yet. Try adding one! </p>;

    return (
        <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {todos.map(({ id, text }) => (
                <li
                    key={id}
                    className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition p-3 rounded-lg shadow-sm"
                >
                    <span className="text-gray-800 flex-1 break-words">{text}</span>
                    <div className="flex gap-2 ml-3">
                        <Button onClick={() => onEditStart(id)} className="text-white hover:text-amber-50 bg-yellow-500">
                            Edit
                        </Button>
                        <Button onClick={() => onRemove(id)} className="text-white hover:text-amber-50 bg-red-500">
                            Delete
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskLists;
