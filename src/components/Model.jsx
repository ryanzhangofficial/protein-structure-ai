import * as tf from "@tensorflow/tfjs";

// 1) Load the TFJS‐converted model.json (no .h5!)
const modelPromise = tf.loadLayersModel("/assets/models/tfjs_model/model.json");

// 2) Amino‐acid → one‐hot index map (unchanged)
const AA_TO_IDX = {
  A: 0,  R: 1,  N: 2,  D: 3,  C: 4,
  Q: 5,  E: 6,  G: 7,  H: 8,  I: 9,
  L: 10, K: 11, M: 12, F: 13, P: 14,
  S: 15, T: 16, W: 17, Y: 18, V: 19,
  X: 20  
};

function sequenceToTensor(seq) {
  const MAX_LEN = 700;
  // create a [700,22] array
  const arr700x22 = Array.from({ length: MAX_LEN }, () => new Array(22).fill(0));

  for (let i = 0; i < Math.min(seq.length, MAX_LEN); i++) {
    const aa = seq[i].toUpperCase();
    const idx = AA_TO_IDX[aa] ?? 20;
    arr700x22[i][idx] = 1;
  }

  // wrap into a tensor of shape [1,700,22]
  return tf.tensor(arr700x22).reshape([1, MAX_LEN, 22]);
}

// 3) Export a function that waits for the model to load, then does predict()
export default async function classifySequence(seqString) {
  const model = await modelPromise;
  const inputTensor = sequenceToTensor(seqString);   // [1,700,22]
  const prediction = model.predict(inputTensor);      // [1,700,3]
  const probs = await prediction.array();             // [[ [p0,p1,p2], … ]]

  // turn each residue‐row [p0,p1,p2] into the argmax class 0/1/2
  return probs[0].map((residueProb) =>
    residueProb.indexOf(Math.max(...residueProb))
  );
}
