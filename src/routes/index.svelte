<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/todos.json');
		if (res.ok) {
			const todos = await res.json();
			return {
				props: { todos }
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import TodoItem from '$lib/todo-item.svelte';

	type Todo = {
		created_at: Date;
		text: string;
		done: boolean;
	};
	export let todos: Todo[];

	const title = 'Todo';

	const submitForm = async () => {
		try {
			const submit = await fetch('/todos.json', {
				method: 'POST',
				body: JSON.stringify({ newTodo })
			});
			newTodo = '';
			goto('/');
		} catch (err) {
			console.log(err);
		}
	};
	let newTodo: string = '';
</script>

<svelte:head>
	<title>
		{title}
	</title>
</svelte:head>

<div class="todos">
	<h1>{title}</h1>
	<form class="new" on:submit|preventDefault={submitForm}>
		<input
			bind:value={newTodo}
			type="text"
			name="text"
			aria-label="Add a todo"
			placeholder="+ type to add a todo"
		/>
	</form>

	{#each todos as todo}
		<TodoItem {todo} />
	{/each}
</div>

<style>
	.todos {
		width: 100%;
		max-width: 42rem;
		margin: 4rem auto 0 auto;
	}
	.new {
		margin: 0 0 0.5rem 0;
	}
	.new input {
		font-size: 20px;
		width: 100%;
		padding: 0.5em 1em 0.3em 1em;
		background: rgba(255, 255, 255, 0.05);
		box-sizing: border-box;
		border-radius: 8px;
		text-align: center;
	}
	/* target all inputs in the todos class */
	.todos :global(input) {
		border: 1px solid transparent;
	}
	.todos :global(input:focus-visible) {
		box-shadow: inset 1px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid #ff3e00 !important;
		outline: none;
	}
</style>
