// endpoint
// svelte auto creates /todos.json
// upon ctrl + space will give suggestions

import type { RequestHandler } from '@sveltejs/kit';

type Todo = {
	created_at: Date;
	text: string;
	done: boolean;
};

let todos: Todo[] = [];

export const get: RequestHandler = () => {
	return {
		status: 200,
		body: JSON.stringify(todos)
	};
};

export const post: RequestHandler = async ({ request }) => {
	const data: { newTodo: string } = await request.json();
	todos.push({
		created_at: new Date(),
		text: data.newTodo,
		done: false
	});
	return {
		status: 200
	};
};
