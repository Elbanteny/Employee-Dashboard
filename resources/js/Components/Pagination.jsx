import { Link } from "@inertiajs/react";

const Pagination = ({ links }) => {
    if (links.length <= 3) return null;

    return (
        <div className="flex flex-wrap justify-center gap-1">
            {links.map((link, index) => {
                if (link.url === null) {
                    return (
                        <span
                            key={index}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-100 text-gray-300 cursor-not-allowed"
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                            link.active
                                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                        preserveScroll
                    />
                );
            })}
        </div>
    );
};

export default Pagination;
