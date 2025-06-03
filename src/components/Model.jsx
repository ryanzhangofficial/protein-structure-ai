import * as tf from "@tensorflow/tfjs"

const model = await tf.loadLayersModel("../assets/models/protein_ss_model.h5")

// Map each amino acid letter to an index [0–21].
const AA_TO_IDX = {
  A: 0,  R: 1,  N: 2,  D: 3,  C: 4,
  Q: 5,  E: 6,  G: 7,  H: 8,  I: 9,
  L: 10, K: 11, M: 12, F: 13, P: 14,
  S: 15, T: 16, W: 17, Y: 18, V: 19,
  // You can reserve index 20 for “X” or unknown, and index 21 for padding (if you like).
  X: 20
};


function sequenceToTensor(seq) {
  const MAX_LEN = 700;
  // create a [700, 22] array filled with zeros
  const arr700x22 = Array.from({ length: MAX_LEN }, () => new Array(22).fill(0));

  for (let i = 0; i < Math.min(seq.length, MAX_LEN); i++) {
    const aa = seq[i].toUpperCase();
    const idx = AA_TO_IDX[aa] ?? 20; 
    arr700x22[i][idx] = 1;
  }

  // anything beyond seq.length up to 700 stays all-zeros (padding)
  // wrap in a batch dimension → [1, 700, 22]
  const tensor = tf.tensor(arr700x22).reshape([1, MAX_LEN, 22]);
  return tensor;
}

// Usage:
// assume you’ve already loaded your TFJS model as `model` (via `tf.loadLayersModel(...)`)
export default async function classifySequence(seqString) {
  const inputTensor = sequenceToTensor(seqString);     // shape [1,700,22]
  const prediction = model.predict(inputTensor);        // shape [1,700,3]
  // To get a plain JS array of class IDs (0,1,2) for each residue:
  const probs = await prediction.array();
  const classIds = probs[0].map(residueProb =>
    residueProb.indexOf(Math.max(...residueProb))
  );
  return classIds;  // an array of length 700 with values 0,1,2
}
