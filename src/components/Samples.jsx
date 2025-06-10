const sampleSeqs = [
  {
    name: 'Hemoglobin α-chain (HBA_HUMAN, UniProt P69905)',
    seq:
      'MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTPAVHASLDKFLASVSTVLTSKYR'
    // source: UniProt FASTA Œsp|P69905|HBA_HUMAN…:contentReference[oaicite:0]{index=0}
  },
  {
    name: 'Ubiquitin (Chain A of PDB 1UBQ, Homo sapiens)',
    seq:
      'MQIFVKTLTGKTITLEVEPSDTIENVKAKIQDKEGIPPDQQRLIFAGKQLEDGRTLSDYNIQKESTLHLVLRLRGG'
    // source: PDBe FASTA for 1UBQ chain A :contentReference[oaicite:1]{index=1}
  },
  {
    name: 'Lysozyme C (Hen egg-white, SASBDB SASDMF2)',
    seq:
      'KVFGRCELAAAMKRHGLDNYRGYSLGNWVCAAKFESNFNTQATNRNTDGSTDYGILQINSRWWCNDGRTPGSRNLCNIPCSALLSSDITASVNCAKKIVSDGNGMNAWVAWRNRCKGTDVQAWIRGCRL'
    // source: SASBDB FASTA :contentReference[oaicite:2]{index=2}
  },
  {
    name: 'Preproinsulin (INS_HUMAN, first 55 aa)',
    seq:
      'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKT'
    // source: Fastfold docs example :contentReference[oaicite:3]{index=3}
  }
]

export default function Samples({ onSelect }) {
  return (
    <>
      <h3>Example Samples</h3>
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
    </>
  )
}
