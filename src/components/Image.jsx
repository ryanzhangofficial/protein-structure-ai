export default function Image({ uploadedData }) {
  if (!uploadedData?.url) return null;

  return (
    <img src={uploadedData.url} alt="Uploaded Protein" width="350" height="350"/>
  );
}
