import React, { useEffect, useState } from 'react';

interface Blog {
  title: string;
  description: string;
  link: string;
}

const RecommendedBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const queries = [
    "Dialect translation",
    "Marathi language and translation",
    "Marathi to English dialect comparison",
    "Challenges in translation",
    "Dialects",
    "Indian Accents",
    "Understanding Marathi dialect diversity",
    "Code-mixing in Marathi-English",
    "Code-mixing in Hindi-English",
    "Linguistic analysis of dialects",
  ];

  useEffect(() => {
    const cached = sessionStorage.getItem("recommendedBlogs");

    if (cached) {
      setBlogs(JSON.parse(cached));
      setLoading(false);
    } else {
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];

      fetch(`http://127.0.0.1:5000/recommend?q=${encodeURIComponent(randomQuery)}`)
        .then((res) => res.json())
        .then((data) => {
          setBlogs(data.results || []);
          sessionStorage.setItem("recommendedBlogs", JSON.stringify(data.results));
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch blog recommendations:", err);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <div className='mt-[30vh]'>
        <div className="flex justify-center items-center space-x-2 mt-4">
          <div className="dot delay-0"></div>
          <div className="dot delay-1"></div>
          <div className="dot delay-2"></div>
          <div className="dot delay-3"></div>
        </div>
        <p className="text-center text-2xl mt-8">Loading blogs, Please wait...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
      {blogs.map((blog, idx) => (
        <a
          key={idx}
          href={blog.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-transparent rounded-lg shadow-sm hover:scale-[1.04] duration-300 bxsd-class transition overflow-hidden flex flex-col"
        >
          <div className="p-4 flex-1 flex flex-col justify-between">
            <h3 className="text-md font-semibold mb-2 text-white line-clamp-2">{blog.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-3">{blog.description}</p>
          </div>
          <div className="px-4 py-2 text-sm text-blue-400 font-medium hover:underline">
            Read more →
          </div>
        </a>
      ))}
    </div>
  );
};

export default RecommendedBlogs;
