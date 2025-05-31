// Upload.jsx
export default function Upload({ onUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localURL = URL.createObjectURL(file);
    onUpload({ url: localURL });    
         
    const formData = new FormData();
    formData.append("photo", file);

    fetch("/upload", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        if (data?.url) onUpload({ url: data.url });
      })
      .catch((err) => console.error("Upload error:", err));
  };

  return <input type="file" accept="image/*" onChange={handleFileChange} />;
}
