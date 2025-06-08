import { useState } from 'react'
import './App.css'
import UserSample from './components/UserSample'
import Samples from './components/Samples'

export default function App() {
  const [seq, setSeq] = useState('')

  function handleSelectSample(sample) {
    setSeq(sample)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Protein Structure AI</h1>
      </header>

      <main className="app-main">
        <section className="left-panel">
          <UserSample initialSequence={seq} />
        </section>
        <aside className="right-panel">
          <Samples onSelect={handleSelectSample} />
        </aside>
      </main>

      <div className="slides-wrapper">
        {slides.map((slide, idx) => (
          <section className="slide" key={idx}>
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.content}</p>
              {slide.images ? (
                <div className="slide-graphs">
                  {slide.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${slide.title} graph ${i + 1}`}
                      className="slide-image-graph"
                    />
                  ))}
                </div>
              ) : (
                <>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="slide-image"
                  />
                  {slide.source && (
                    <div className="slide-source">[{idx + 1}] Source: {slide.source}</div>
                  )}
                </>
              )}
            </div>
          </section>
        ))}
      </div>

      <footer className="citations">
        <h2>Citations</h2>
        <ol>
          <li>
            Jumper et al., Highly accurate protein structure prediction with AlphaFold.
            <em>Nature</em> (2021).
          </li>
          <li>
            McGuffin et al., PSIPRED: prediction of protein secondary structure
            from sequence. <em>Bioinformatics</em> (2000).
          </li>
          <li>
            Kabsch & Sander, Dictionary of protein secondary structure.
            <em>Biopolymers</em> (1983).
          </li>
          <li>
            Elnaggar et al., ProtTrans: protein sequence pretraining for structure
            and function predictions. <em>Nature Communications</em> (2022).
          </li>
        </ol>
      </footer>
    </div>
  )
}