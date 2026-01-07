const StatCard = ({ title, value, color }) => {
    const colors = {
        blue: "bg-blue-50 text-blue-700 border-blue-100",
        purple: "bg-purple-50 text-purple-700 border-purple-100",
        green: "bg-green-50 text-green-700 border-green-100",
    };

    return (
        <div
            className={`bg-white p-6 rounded-2xl shadow-sm border ${
                colors[color].split(" ")[2]
            }`}
        >
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <p className="text-3xl font-extrabold tracking-tight text-gray-900">
                {value.toLocaleString()}
            </p>
        </div>
    );
};

export default StatCard;
