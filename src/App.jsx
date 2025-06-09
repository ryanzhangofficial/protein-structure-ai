import { useState } from 'react'
import './App.css'
import UserSample from './components/UserSample'
import Samples from './components/Samples'

export default function App() {
  const [seq, setSeq] = useState('')

  function handleSelectSample(sample) {
    setSeq(sample)
  }

  const slides = [
    {
      title: 'Motivation',
      image:
        'https://www.genengnews.com/wp-content/uploads/2018/10/July13_2010_18168316_DNAMadeofMoneyAgainstBlueSky_SyntheticBioAI3284194197.jpg',
      source: 'genengnews.com',
      content:
        'Lab methods like X-ray crystallography and NMR take too long and are expensive. Protein Structure AI has the potential to make fast, in-browser secondary structure predictions to make insights available and speed up research workflows.',
    },
    {
      title: 'Background',
      image: 'https://faculty.uml.edu/vbarsegov/research/_images/TOC_new.png',
      source: 'faculty.uml.edu',
      content:
        'Proteins form α-helices and β-sheets through backbone hydrogen bonds, which shape their 3D cores. Traditional tools like DSSP and PSIPRED use sequence profiles, while modern deep-learning tools AlphaFold2 and RoseTTAFold predict full 3D shapes but require much more computational power.',
    },
    {
      title: 'Problem',
      image:
        'https://miro.medium.com/v2/resize:fit:1400/1*p7fQObyc5Eth1jhY1neZ3g.png',
      source: 'miro.medium.com',
      content:
        'Most ML tools need offline training or server-side inference, which makes them hard to use. There isn’t a simple client-side web app that shows per-residue helix, sheet, and coil predictions in the browser for any sequence.',
    },
    {
      title: 'Methodology',
      image: '/assets/images/code.png',
      content:
        'Sequences are one-hot encoded into a fixed 700×22 tensor and fed into Conv1D→Dropout→Conv1D→Dropout→TimeDistributed(Dense-softmax) layers trained on PDB secondary structure labels. The trained network is then converted into a TensorFlow.js GraphModel for client-side inference.',
    },
    {
      title: 'Results',
      images: ['/assets/images/loss.png', '/assets/images/acc.png'],
      content:
        'On a held-out validation set, the model reaches 94.34% per-residue accuracy. Real examples match known structures closely. Predictions finish in under 500 ms in modern browsers, giving fast, clear visual feedback without server calls.',
    },
    {
      title: 'Future Steps',
      image:
        'https://www.researchgate.net/publication/374912121/figure/fig2/AS:11431281201050113@1698195738518/sualization-of-attention-mapping-and-attention-computation-A-Based-on-the-protein.jpg',
      source: 'researchgate.net',
      content:
        'Use more detailed amino-acid features to boost prediction accuracy, support sequences of any length with attention-based models, and make the app installable so it works offline like a Progressive Web App.',
    },
  ]

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Protein Structure AI</h1>
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