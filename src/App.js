import React, { useState, useEffect } from 'react';

// Navigation Component
const Navigation = ({ setCurrentPage }) => (
  <nav className="mb-8">
    <ul className="flex space-x-6">
      <li>
        <button 
          onClick={() => setCurrentPage('home')} 
          className="text-green-400 hover:text-green-300 text-sm"
        >
          home
        </button>
      </li>
      <li>
        <button 
          onClick={() => setCurrentPage('blog')} 
          className="text-green-400 hover:text-green-300 text-sm"
        >
          blog
        </button>
      </li>
      <li>
        <button 
          onClick={() => setCurrentPage('contact')} 
          className="text-green-400 hover:text-green-300 text-sm"
        >
          contact
        </button>
      </li>
    </ul>
  </nav>
);

// Footer Component
const Footer = () => (
  <footer className="mt-16 pt-8 border-t border-gray-700">
    <p className="text-sm text-gray-400">
      © {new Date().getFullYear()} vengy.
    </p>
  </footer>
);

// Home Page
const Home = () => (
  <main>
    <h1 className="text-2xl font-bold mb-4 text-white">
      hello, it's vengy.
    </h1>

    <div className="prose prose-sm max-w-none prose-invert">
      <p className="mb-4 text-gray-300">
        i work on small trading tools in claude.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-white">
        projects
      </h2>

      <p className="mb-4 text-gray-300">
        most of my projects are on{' '}
        <a 
          href="https://github.com/nickvengy" 
          className="text-green-400 hover:text-green-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
      </p>

      <p className="mb-4 text-gray-300">some interesting projects of note are:</p>

      <ul className="list-disc pl-5 space-y-2 mb-8 text-gray-300">
        <li>
          <a 
            href="#" 
            className="text-green-400 hover:text-green-300"
          >
            project-one
          </a>
          : description of your first major project and what it does.
        </li>
        <li>
          <a 
            href="#" 
            className="text-green-400 hover:text-green-300"
          >
            project-two
          </a>
          : description of your second project and its purpose.
        </li>
        <li>
          <a 
            href="#" 
            className="text-green-400 hover:text-green-300"
          >
            project-three
          </a>
          : details about another significant project you've worked on.
        </li>
      </ul>
    </div>
  </main>
);

// Blog Page
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Read the posts.json file
        const response = await window.fs.readFile('posts.json', { encoding: 'utf8' });
        const postsData = JSON.parse(response);
        setPosts(postsData);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      }
    };

    loadPosts();
  }, []);

  const handlePostClick = async (postId) => {
    if (selectedPost === postId) {
      setSelectedPost(null);
      return;
    }

    try {
      // Read the individual post content
      const response = await window.fs.readFile(`posts/${postId}.md`, { encoding: 'utf8' });
      const post = posts.find(p => p.id === postId);
      post.content = response;
      setSelectedPost(postId);
    } catch (error) {
      console.error('Error loading post content:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-white">blog</h1>
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="post-info mb-8">
            <div className="mb-2">
              <button 
                onClick={() => handlePostClick(post.id)} 
                className="text-green-400 hover:text-green-300 text-lg text-left"
              >
                {post.title}
              </button>
              <p className="text-gray-400 text-sm">{post.date}</p>
            </div>
            <p className="text-gray-300">
              {selectedPost === post.id ? post.content : post.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contact Page
const Contact = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4 text-white">contact</h1>
    <div className="space-y-4 text-gray-300">
      <p>you can find me on:</p>
      <ul className="space-y-2">
        <li>
          <a 
            href="https://github.com/NickVengy" 
            className="text-green-400 hover:text-green-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </li>
        <li>
          <a 
            href="mailto:vengyus@protonmail.com" 
            className="text-green-400 hover:text-green-300"
          >
            email
          </a>
        </li>
      </ul>
    </div>
  </div>
);

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Navigation setCurrentPage={setCurrentPage} />
        {renderPage()}
        <Footer />
      </div>
    </div>
  );
};

export default App;