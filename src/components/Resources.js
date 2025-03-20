import React from "react";

const Resources = () => {
  // List of free mental health books and websites
  const books = [
    {
      title: "The Body Keeps the Score",
      description: "A groundbreaking book on trauma and healing by Bessel van der Kolk.",
      link: "https://www.pdfdrive.com/the-body-keeps-the-score-e194994832.html",
    },
    {
      title: "Feeling Good: The New Mood Therapy",
      description: "A classic book on cognitive behavioral therapy by David D. Burns.",
      link: "https://www.pdfdrive.com/feeling-good-the-new-mood-therapy-e194994832.html",
    },
    {
      title: "Man's Search for Meaning",
      description: "A profound book on finding purpose and meaning in life by Viktor E. Frankl.",
      link: "https://www.pdfdrive.com/mans-search-for-meaning-e194994832.html",
    },
    {
      title: "The Anxiety and Phobia Workbook",
      description: "A practical guide to managing anxiety by Edmund J. Bourne.",
      link: "https://www.pdfdrive.com/the-anxiety-and-phobia-workbook-e194994832.html",
    },
  ];

  const websites = [
    {
      name: "Project Gutenberg",
      description: "A library of over 60,000 free eBooks, including many on mental health.",
      link: "https://www.gutenberg.org/",
    },
    {
      name: "Open Library",
      description: "An open-source library with millions of free books, including mental health topics.",
      link: "https://openlibrary.org/",
    },
    {
      name: "PDF Drive",
      description: "A free search engine for PDF books, including mental health resources.",
      link: "https://www.pdfdrive.com/",
    },
    {
      name: "National Institute of Mental Health (NIMH)",
      description: "A trusted source for mental health information and resources.",
      link: "https://www.nimh.nih.gov/",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Mental Health Resources
        </h2>
        <p className="text-gray-700 mb-4">
          Explore a wide range of mental health resources, including self-help guides, therapy exercises, and educational materials to help you manage stress, anxiety, and overall well-being.
        </p>

        {/* Free Books Section */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Free Mental Health Books</h3>
        <ul className="list-disc text-gray-700 pl-6 mb-8">
          {books.map((book, index) => (
            <li key={index} className="mb-4">
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {book.title}
              </a>
              <p className="text-gray-600">{book.description}</p>
            </li>
          ))}
        </ul>

        {/* Websites Section */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Useful Websites</h3>
        <ul className="list-disc text-gray-700 pl-6">
          {websites.map((website, index) => (
            <li key={index} className="mb-4">
              <a
                href={website.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {website.name}
              </a>
              <p className="text-gray-600">{website.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Resources;