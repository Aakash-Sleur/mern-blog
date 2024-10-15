import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  createdAt,
  author,
}) {
  return (
    <div className="post bg-white max-w-[300px] shadow-md rounded-lg overflow-hidden mb-8">
      <div className="image h-56 overflow-hidden">
        <Link to={`/post/${_id}`}>
          <img
            src={`http://localhost:4000/${cover}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>
      <div className="p-4">
        <Link to={`/post/${_id}`} className="hover:text-blue-600">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        </Link>
        <p className="info text-sm text-gray-500 mb-4 flex items-center gap-2">
          <span className="author font-medium text-gray-700">
            {author.username}
          </span>
          <time className="text-gray-400">
            {formatISO9075(new Date(createdAt))}
          </time>
        </p>
        <p className="summary text-gray-700 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}
