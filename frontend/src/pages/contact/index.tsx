import { useEffect, useState } from "react";

type Todo = {
  id: number;
  userId: number;
  todoName: string;
  todoDesc: string;
  todoTitle: string;
};

const ContactPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState<number | "">("");
  const [todoName, setTodoName] = useState("");
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editTodoName, setEditTodoName] = useState("");
  const [editTodoTitle, setEditTodoTitle] = useState("");
  const [editTodoDesc, setEditTodoDesc] = useState("");
  const [search, setSearch] = useState("");
  const [searchUserId, setSearchUserId] = useState<string>("");

  // Applied filters
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedUserId, setAppliedUserId] = useState("");

  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    const res = await fetch("http://127.0.0.1:8000/todo/");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userId || userId < 1) {
      setError("User ID must be a positive number starting from 1.");
      return;
    }

    try {
      const checkUser = await fetch(`http://127.0.0.1:8000/users/${userId}`);
      if (!checkUser.ok) {
        setError(`User with ID ${userId} does not exist.`);
        return;
      }

      const res = await fetch(
        `http://127.0.0.1:8000/users/${userId}/todos/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ todoName, todoTitle, todoDesc }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        setError(error.detail || "Could not create todo.");
        return;
      }

      const newTodo = await res.json();
      setTodos([newTodo, ...todos]);
      setTodoName("");
      setTodoTitle("");
      setTodoDesc("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while adding the todo.");
    }
  };

  const deleteTodo = async (id: number) => {
    await fetch(`http://127.0.0.1:8000/todos/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((t) => t.id !== id));
  };

  const startEdit = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditTodoName(todo.todoName);
    setEditTodoTitle(todo.todoTitle);
    setEditTodoDesc(todo.todoDesc);
  };

  const saveEdit = async (id: number) => {
    const res = await fetch(`http://127.0.0.1:8000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todoName: editTodoName,
        todoTitle: editTodoTitle,
        todoDesc: editTodoDesc,
      }),
    });

    const updatedTodo = await res.json();
    setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    setEditingTodoId(null);
  };

  const filteredTodos = todos.filter((t) => {
    const matchesText =
      t.todoName.toLowerCase().includes(appliedSearch.toLowerCase()) ||
      t.todoTitle.toLowerCase().includes(appliedSearch.toLowerCase()) ||
      t.todoDesc.toLowerCase().includes(appliedSearch.toLowerCase());

    const matchesUserId =
      appliedUserId === "" || t.userId.toString() === appliedUserId;

    return matchesText && matchesUserId;
  });

  const clearSearch = () => {
    setSearch("");
    setSearchUserId("");
    setAppliedSearch("");
    setAppliedUserId("");
  };

  return (
    <div className="min-h-screen font-serif p-6">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-center text-3xl font-bold text-primary">My Todos</h2>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          {/* Add Todo Form */}
          <form onSubmit={addTodo} className="flex-1 space-y-3">
            <input
              type="number"
              min={1}
              placeholder="User ID"
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
              required
            />
            <input
              type="text"
              placeholder="Todo Name"
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Todo Title"
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Todo Description"
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              value={todoDesc}
              onChange={(e) => setTodoDesc(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-1.5 text-base text-white font-semibold shadow-md transition duration-300 hover:bg-primary/80 hover:shadow-lg"
            >
              Add Todo
            </button>

            {error && (
              <div className="mt-3 rounded-lg bg-red-100 border border-red-400 px-4 py-2 text-red-700 text-sm font-medium">
                {error}
              </div>
            )}
          </form>

          {/* Search bars */}
          <div className="w-full md:w-1/3 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search todos..."
                className="flex-1 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={() => setAppliedSearch(search)}
                className="rounded-lg bg-blue-500 px-4 py-1.5 text-white shadow hover:bg-blue-600"
              >
                Search
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                placeholder="Search by User ID"
                className="flex-1 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
              />
              <button
                onClick={() => setAppliedUserId(searchUserId)}
                className="rounded-lg bg-blue-500 px-4 py-1.5 text-white shadow hover:bg-blue-600"
              >
                Search
              </button>
            </div>
            <button
              onClick={clearSearch}
              className="w-full rounded-lg bg-gray-400 px-4 py-1.5 text-white shadow hover:bg-gray-500"
            >
              Clear Search
            </button>
          </div>
        </div>

        {/* Todo List */}
        <ul className="mt-6 space-y-4">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="rounded-lg border p-4 shadow-md bg-gray-50"
            >
              {editingTodoId === todo.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    className="w-full rounded-lg border px-3 py-2"
                    value={editTodoName}
                    onChange={(e) => setEditTodoName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-full rounded-lg border px-3 py-2"
                    value={editTodoTitle}
                    onChange={(e) => setEditTodoTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full rounded-lg border px-3 py-2"
                    value={editTodoDesc}
                    onChange={(e) => setEditTodoDesc(e.target.value)}
                  ></textarea>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="rounded-lg bg-green-500 px-4 py-1.5 text-white shadow hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTodoId(null)}
                      className="rounded-lg bg-gray-400 px-4 py-1.5 text-white shadow hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-primary">
                    {todo.todoTitle}
                  </h3>
                  <p className="text-gray-700">{todo.todoDesc}</p>
                  <p className="text-sm text-gray-500">By User {todo.userId}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => startEdit(todo)}
                      className="rounded-lg bg-blue-500 px-4 py-1.5 text-white shadow hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="rounded-lg bg-red-500 px-4 py-1.5 text-white shadow hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;
