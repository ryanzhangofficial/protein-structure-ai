import React, { useState } from "react";
import classifySequence from "./Model";

export default function UserSample() {
  const [seq, setSeq] = useState("");
  const [predictions, setPredictions] = useState([]);

  async function handleInput() {
    if (!seq) return;
    const preds = await classifySequence(seq);
    // take only as many predictions as the input length
    setPredictions(preds.slice(0, seq.length));
  }

  return (
    <>
      <input
        placeholder="Input sequence"
        value={seq}
        onChange={(e) => setSeq(e.target.value)}
        style={{ width: "300px", marginRight: "8px" }}
      />
      <button onClick={handleInput}>Predict</button>

      {predictions.length > 0 && (
        <div style={{ marginTop: "12px" }}>
          <div style={{ display: "flex" }}>
            {predictions.map((c, idx) => {
              let color;
              if (c === 0) color = "salmon";    // Helix
              else if (c === 1) color = "skyblue"; // Sheet 
              else color = "lightgray";         // Coil
              return (
                <div
                  key={idx}
                  title={c === 0 ? "H" : c === 1 ? "E" : "C"}
                  style={{
                    width: "10px",
                    height: "20px",
                    backgroundColor: color,
                    marginRight: "1px",
                  }}
                />
              );
            })}
          </div>
          <div style={{ marginTop: "6px", fontSize: "12px" }}>
            <span style={{ display: "inline-block", width: "12px", height: "12px", backgroundColor: "salmon", marginRight: "4px", verticalAlign: "middle" }} /> H  
            <span style={{ display: "inline-block", width: "12px", height: "12px", backgroundColor: "skyblue", margin: "0 4px", verticalAlign: "middle" }} /> E  
            <span style={{ display: "inline-block", width: "12px", height: "12px", backgroundColor: "lightgray", margin: "0 4px", verticalAlign: "middle" }} /> C
          </div>
        </div>
      )}
    </>
  );
}
