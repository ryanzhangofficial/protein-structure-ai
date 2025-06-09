const sampleSeqs = [
  { name: 'Hemoglobin α-chain', seq: 'MVKVYAPASSANMSVGFDVL' },
  { name: 'Myoglobin',           seq: 'GLSDGEWQQVLNVWGKVEADI' },
  { name: 'Signal Peptide',      seq: 'MKTFFVAGVILLLLSGTQA' },
  { name: 'Insulin Prepro',      seq: 'MALWMRLLPLLALLALWGPDPAAA' }
]

export default function Samples({ onSelect }) {
  return (
    <div className="samples">
      {sampleSeqs.map((item, idx) => (
        <button
          key={idx}
          className="sample-button"
          onClick={() => onSelect(item.seq)}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}
