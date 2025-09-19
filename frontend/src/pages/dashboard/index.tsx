import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
    // Example stats
    const stats = [
        { title: "Total Recipes", value: 128, bgColor: "bg-yellow-400" },
        { title: "Orders Today", value: 54, bgColor: "bg-green-400" },
        { title: "Active Users", value: 102, bgColor: "bg-red-400" },
    ];

    // Popular Cameroonian dishes
    const popularDishes = [
        {
        name: "Ndolé",
        image: "f1.jpg",
        },
        {
        name: "Poulet DG",
        image: "f1.jpg",
        },
        {
        name: "Achu Soup",
        image: "f1.jpg",
        },
        {
        name: "Eru",
        image: "f1.jpg",
        },
    ];

    // Example chart data
    const orderData = [
        { day: "Mon", orders: 12 },
        { day: "Tue", orders: 18 },
        { day: "Wed", orders: 9 },
        { day: "Thu", orders: 22 },
        { day: "Fri", orders: 14 },
        { day: "Sat", orders: 35 },
        { day: "Sun", orders: 20 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-serif p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 sm:mb-8">
            Welcome to Foodie's Dashboard 🍽️
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat) => (
                <div
                key={stat.title}
                className={`p-4 sm:p-6 md:p-6 rounded-xl shadow-lg text-white ${stat.bgColor}`}
                >
                <h2 className="text-lg sm:text-xl font-semibold">{stat.title}</h2>
                <p className="text-2xl sm:text-3xl md:text-3xl font-bold mt-1 sm:mt-2">{stat.value}</p>
                </div>
            ))}
            </div>

            {/* Orders Chart */}
            <div className="mb-6 sm:mb-10 bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Orders This Week</h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={orderData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#f59e0b" />
                </BarChart>
            </ResponsiveContainer>
            </div>

            {/* Popular Dishes */}
            <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Popular Cameroonian Dishes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {popularDishes.map((dish) => (
                <div
                    key={dish.name}
                    className="rounded-lg overflow-hidden shadow-lg bg-white hover:scale-105 transition-transform duration-300"
                >
                    <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-48 sm:h-56 md:h-48 object-cover"
                    />
                    <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-lg text-center">{dish.name}</h3>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
