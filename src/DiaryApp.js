import React, { useState, useEffect } from 'react';

const DiaryApp = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    setEntries(savedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEntry.trim()) {
      const newEntry = {
        id: Date.now(),
        content: currentEntry,
        date: new Date().toLocaleString()
      };
      setEntries([newEntry, ...entries]);
      setCurrentEntry('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Diary</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
          placeholder="What's on your mind?"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Save Entry
        </button>
      </form>
      <div>
        {entries.map((entry) => (
          <div key={entry.id} className="mb-4 p-4 border rounded">
            <p className="text-gray-600 text-sm">{entry.date}</p>
            <p className="mt-2">{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryApp;