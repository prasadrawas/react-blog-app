import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import postService from "../../appwrite/post-service";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";
import routes from "../../config/routes";
import { Query } from "appwrite";
import { useSelector } from "react-redux";

function BlogSection({ showAuthorBlogsOnly = false }) {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const userData = useSelector((state) => state.user);

  useEffect(() => {
    const queries = showAuthorBlogsOnly
      ? [Query.equal("userId", userData?.$id)]
      : [];
    postService
      .getPosts(queries)
      .then((posts) => {
        if (posts && posts.documents.length > 0) {
          setBlogs(posts.documents);
        } else {
          setError("No posts found");
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl font-bold mt-10 px-10">
        {showAuthorBlogsOnly ? "My Blogs" : "All Blogs"}
      </h1>

      {/* Show loading indicator */}

      {loading === true && (
        <div className="mt-32">
          <Loading />
        </div>
      )}

      {/* show error message */}
      {error && !loading && (
        <div className="w-screen flex items-center justify-center mt-32">
          <p className="text-sm text-slate-700 font-light">{error}</p>
        </div>
      )}

      {/* List of blogs */}
      {blogs.length > 0 && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full px-10 py-10 gap-4">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.$id}
              blog={blog}
              showEditButton={showAuthorBlogsOnly}
              showLikeButton={!showAuthorBlogsOnly}
              onClick={() => {
                navigate(routes.viewBlog + `/${blog.$id}`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogSection;
