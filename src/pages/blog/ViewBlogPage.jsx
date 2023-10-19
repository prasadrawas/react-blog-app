import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../../appwrite/post-service";
import { BlogPost, Loading } from "../../components";

function ViewBlogPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
 


  useEffect(() => {
    if (id) {
      postService
        .getPost(id)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            setError("No post found")
          }
        })
        .catch((e) => {
          
          setError(e)
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Invalid blog post id");
      setLoading(false);
    }
  }, []);


 
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col items-center justify-center w-[90%] lg:w-[70%] my-10">
        {/* show error message */}
        {error && !loading && (
          <div className="w-screen flex items-center justify-center mt-32">
            <p className="text-sm text-slate-700 font-light">{error}</p>
          </div>
        )}

        {/* Show loading indicator */}
        {loading === true && (
          <div className="mt-32">
            <Loading />
          </div>
        )}

        {/* Show Post data*/}
        {(!loading && post) && <BlogPost post={post} />}
      </div>
    </section>
  );
}

export default ViewBlogPage;
