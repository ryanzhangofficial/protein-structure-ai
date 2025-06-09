import React, { useState, useEffect } from 'react'
import classifySequence from './Model'
import Loading from './Loading'

export default function UserSample({ initialSequence }) {
  const [seq, setSeq] = useState(initialSequence || '')
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (initialSequence) {
      setSeq(initialSequence)
      handlePredict(initialSequence)
    }
  }, [initialSequence])

  async function handlePredict(input = seq) {
    if (!input) return
    setError(null)
    setLoading(true)
    try {
      const preds = await classifySequence(input)
      setPredictions(preds.slice(0, input.length))
    } catch (e) {
      console.error(e)
      setError('Failed to use model. Check console for details.')
      setPredictions([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <input
          className="sequence-input"
          placeholder="Input sequence"
          value={seq}
          onChange={e => setSeq(e.target.value)}
          disabled={loading}
        />
        <button
          className="predict-button"
          onClick={() => handlePredict()}
          disabled={loading}
        >
          Predict
        </button>
      </div>

      <div className="result-area">
        {loading && <Loading />}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {!loading && !error && predictions.length > 0 && (
          <>
            <div className="prediction-bar">
              {predictions.map((c, i) => {
                let cls = c === 0
                  ? 'helix'
                  : c === 1
                  ? 'sheet'
                  : 'coil'
                return (
                  <div
                    key={i}
                    className={`residue-box ${cls}`}
                    title={c === 0 ? 'H' : c === 1 ? 'E' : 'C'}
                  />
                )
              })}
            </div>
            <div className="legend">
              <div className="legend-item">
                <span className="legend-color helix" /> Helix (H)
              </div>
              <div className="legend-item">
                <span className="legend-color sheet" /> Sheet (E)
              </div>
              <div className="legend-item">
                <span className="legend-color coil" /> Coil (C)
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
