'use client';
import React from 'react';
import Button from '../Common/Button';

type Todo = { id: string; text: string; isMarked?: boolean };

interface Props {
    todos: Todo[];
    onRemove: (id: string) => void;
    onEditStart: (id: string) => void;
    isCompletedToggle: (id: string) => void;
}

const TaskLists: React.FC<Props> = ({ todos, onRemove, onEditStart, isCompletedToggle }) => {
    if (!todos.length) return <p className="text-center text-gray-500 italic mb-2">No tasks yet. Try adding one! </p>;

    return (
        <ul className="space-y-3 max-h-96 overflow-y-auto pr-2 scroll-smooth scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
            {todos?.map(({ id, text, isMarked }) => (
                <li
                    key={id}
                    className={`flex justify-between items-center text-slate-800 w-full rounded-md p-3 transition-all shadow-sm 
                    ${isMarked ? 'border border-green-500 bg-green-50' : 'hover:bg-slate-100'}
                    `}
                >
                    <span
                        className={`mr-2.5 cursor-pointer ${isMarked ? 'text-green-600' : 'text-primary'}`}
                        onClick={() => isCompletedToggle(id)}
                        title={isMarked ? 'Remove highlight' : 'Highlight this task'}
                    >
                        <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_980_24878)">
                                <path
                                    d="M5.03124 19.4375C4.74999 19.4375 4.46874 19.3437 4.24999 19.1875C3.81249 18.875 3.56249 18.3125 3.65624 17.7812L4.46874 12.75L0.968744 9.15625C0.593744 8.78125 0.468744 8.21875 0.624994 7.6875C0.781244 7.1875 1.21874 6.8125 1.71874 6.75L6.56249 5.96875L8.74999 1.375C8.99999 0.875 9.46874 0.5625 9.99999 0.5625C10.5312 0.5625 11.0312 0.875 11.25 1.375L13.4375 5.9375L18.25 6.6875C18.75 6.78125 19.1875 7.125 19.3437 7.625C19.5312 8.15625 19.375 8.71875 19 9.09375L15.5312 12.7187L16.3437 17.7812C16.4375 18.3437 16.2187 18.875 15.75 19.1875C15.3125 19.5 14.7812 19.5312 14.3125 19.2812L9.99999 16.9375L5.68749 19.2812C5.49999 19.4062 5.24999 19.4375 5.03124 19.4375ZM1.96874 8.125C1.96874 8.125 1.96874 8.15625 1.96874 8.1875L5.62499 11.9375C5.84374 12.1562 5.93749 12.5 5.90624 12.8125L5.06249 18.0312C5.06249 18.0312 5.06249 18.0312 5.06249 18.0625L9.56249 15.625C9.84374 15.4687 10.1875 15.4687 10.5 15.625L15 18.0625C15 18.0625 15 18.0625 15 18.0312L14.1562 12.7812C14.0937 12.4688 14.2187 12.1562 14.4375 11.9062L18.0937 8.15625C18.125 8.125 18.0937 8.09375 18.0937 8.09375L13.0625 7.3125C12.75 7.25 12.4687 7.0625 12.3437 6.75L9.99999 2L7.74999 6.78125C7.62499 7.0625 7.34374 7.28125 7.03124 7.34375L1.96874 8.125Z"
                                    fill={isMarked ? '#22c55e' : 'currentColor'}
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_980_24878">
                                    <rect width={20} height={20} fill="#00a63e" />
                                </clipPath>
                            </defs>
                        </svg>
                    </span>

                    <span className="text-gray-800 flex-1 break-words">{text}</span>
                    <div className="flex gap-2 ml-3">
                        <Button onClick={() => onEditStart(id)}
                            className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-xs sm:text-sm px-4 py-2">
                            Edit
                        </Button>
                        <Button
                            onClick={() => onRemove(id)}
                            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xs sm:text-sm px-4 py-2">
                            Delete
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskLists;
