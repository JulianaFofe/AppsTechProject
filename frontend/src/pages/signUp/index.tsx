import { useState } from "react";

const Signup= ({ onSignup }: { onSignup: () => void }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
        const res = await fetch("http://127.0.0.1:8000/signup/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) throw new Error("Signup failed");

        onSignup();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
        setError("Signup failed. Try again.");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50 font-serif">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-3xl font-bold text-primary">Sign Up</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
                type="text"
                placeholder="Name"
                className="w-full rounded border px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                className="w-full rounded border px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full rounded border px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
                type="submit"
                className="w-full rounded bg-primary py-2 text-lg text-white"
            >
                Sign Up
            </button>
            </form>
        </div>
        </div>
    );
}

export default Signup;