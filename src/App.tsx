import React from 'react';
import DragAndDropFile from './components/DragAndDropFile';
import './styles/App.css';

function App() {
  return (
    <section className='file-uploader'>
      <div className="file-uploader__container">
        <DragAndDropFile />

      </div>
    </section>
  );
}

export default App;
