
import React, { useState } from 'react';
import vocabData from './vocab-data.json';

export default function VocabPages() {
  const itemsPerPage = 30;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(vocabData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentWords = vocabData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Vocabulary List</h1>
      {currentWords.map((wordObj) => (
        <div key={wordObj.key} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
          <h2>{wordObj.word}</h2>
          {wordObj.definitions.map((def, index) => (
            <div key={index}>
              <p><i>({def.part_of_speech})</i> {def.definition}</p>
              <p dangerouslySetInnerHTML={{ __html: def.sentence }}></p>
              <p><strong>Synonyms:</strong> {def.synonyms.join(', ')}</p>
            </div>
          ))}
        </div>
      ))}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>Previous</button>
        <span style={{ margin: '0 15px' }}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
