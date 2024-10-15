import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form
      onSubmit={updatePost}
      className="max-w-5xl mx-auto p-6 h-full bg-white shadow-md rounded-lg"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        type="file"
        onChange={(ev) => setFiles(ev.target.files)}
        className="w-full p-3 mb-4 border rounded-lg"
      />
      <Editor onChange={setContent} value={content} className="mb-4" />
      <button
        type="submit"
        className="w-full mt-auto bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Update Post
      </button>
    </form>
  );
}
