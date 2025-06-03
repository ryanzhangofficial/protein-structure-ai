import { useState } from 'react';
import './App.css';
import Image from './components/Image.jsx';
import Upload from './components/Upload.jsx';
import UserSample from './components/UserSample.jsx';

function App() {
  const [uploadedData, setUploadedData] = useState(null);

  const handleUpload = (data) => {
    setUploadedData(data); 
    console.log("Received in App:", data);
  };

  return (
    <>
      <h1>Protein Structure AI</h1>
      <UserSample />
      {/* <Image uploadedData={uploadedData}/>
      <Upload onUpload={handleUpload} /> */}
    </>
  );
}

export default App;
