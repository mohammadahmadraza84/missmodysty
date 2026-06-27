import { useState, useRef } from 'react'
import { Camera, Upload, Loader2, AlertCircle, ExternalLink, RefreshCw, ChevronRight } from 'lucide-react'

const CATEGORY_OPTIONS = [
  { value: 'tops',       label: 'Top / Blouse' },
  { value: 'bottoms',    label: 'Skirt / Trousers' },
  { value: 'one-pieces', label: 'Dress / Abaya / Kaftan' },
]

const SAMPLE_GARMENTS = [
  { name: 'Embroidered Maxi Dress',   brand: 'Aab Collection', price: 95,  url: 'https://www.aabcollection.com', category: 'one-pieces' },
  { name: 'Draped Satin Abaya',       brand: 'Inayah',         price: 119, url: 'https://www.inayah.co',         category: 'one-pieces' },
  { name: 'Pleated Wide-Leg Trousers',brand: 'House of Hikmah',price: 68,  url: 'https://www.houseofhikmah.com',category: 'bottoms'    },
  { name: 'Floral Chiffon Midi Skirt',brand: 'Aab Collection', price: 79,  url: 'https://www.aabcollection.com', category: 'bottoms'    },
]

export default function TryOn() {
  const [step,          setStep]          = useState(1) // 1=photo, 2=garment, 3=result
  const [personImage,   setPersonImage]   = useState(null) // base64
  const [personPreview, setPersonPreview] = useState(null) // object URL
  const [garmentUrl,    setGarmentUrl]    = useState('')
  const [garmentFile,   setGarmentFile]   = useState(null)
  const [garmentPreview,setGarmentPreview]= useState(null)
  const [category,      setCategory]      = useState('one-pieces')
  const [result,        setResult]        = useState(null)
  const [predictionId,  setPredictionId]  = useState(null)
  const [loading,       setLoading]       = useState(false)
  const [polling,       setPolling]       = useState(false)
  const [error,         setError]         = useState(null)

  const personInputRef  = useRef(null)
  const garmentInputRef = useRef(null)

  /* ── File helpers ── */
  const toBase64 = (file) => new Promise((res, rej) => {
    const r = new FileReader()
    r.onload  = () => res(r.result)
    r.onerror = rej
    r.readAsDataURL(file)
  })

  const handlePersonUpload = async (file) => {
    if (!file) return
    const b64 = await toBase64(file)
    setPersonImage(b64)
    setPersonPreview(URL.createObjectURL(file))
    setStep(2)
  }

  const handleGarmentUpload = async (file) => {
    if (!file) return
    const b64 = await toBase64(file)
    setGarmentFile(b64)
    setGarmentPreview(URL.createObjectURL(file))
  }

  const selectSampleGarment = (g) => {
    setGarmentUrl(g.url)
    setCategory(g.category)
    setGarmentPreview(null)
    setGarmentFile(null)
  }

  /* ── API call: start try-on ── */
  const startTryOn = async () => {
    if (!personImage || (!garmentFile && !garmentUrl)) {
      setError('Please provide both a person photo and a garment.')
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/.netlify/functions/tryon-start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model_image:   personImage,
          garment_image: garmentFile || garmentUrl,
          category,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setPredictionId(data.id)
      setStep(3)
      window.gtag?.('event', 'tryon_started')
      pollStatus(data.id)
    } catch (e) {
      setError(e.message || 'Failed to start try-on. Please try again.')
      setLoading(false)
    }
  }

  /* ── API call: poll status ── */
  const pollStatus = (id) => {
    setPolling(true)
    const interval = setInterval(async () => {
      try {
        const res  = await fetch(`/.netlify/functions/tryon-status?id=${id}`)
        const data = await res.json()
        if (data.status === 'completed' && data.output?.length) {
          setResult(data.output[0])
          setLoading(false)
          setPolling(false)
          clearInterval(interval)
          window.gtag?.('event', 'tryon_completed')
        } else if (data.status === 'failed') {
          setError('Try-on generation failed. Please try again.')
          setLoading(false)
          setPolling(false)
          clearInterval(interval)
        }
      } catch {
        setError('Lost connection while generating. Please retry.')
        setLoading(false)
        setPolling(false)
        clearInterval(interval)
      }
    }, 3000)
    // Safety timeout after 90s
    setTimeout(() => {
      clearInterval(interval)
      if (!result) {
        setError('Generation timed out. Please try again.')
        setLoading(false)
        setPolling(false)
      }
    }, 90000)
  }

  const reset = () => {
    setStep(1); setPersonImage(null); setPersonPreview(null)
    setGarmentUrl(''); setGarmentFile(null); setGarmentPreview(null)
    setResult(null); setPredictionId(null); setLoading(false); setPolling(false); setError(null)
  }

  return (
    <div className="pt-16 min-h-screen bg-ivory">
      {/* Header */}
      <div className="bg-plum-900 bg-hero-pattern py-10 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 px-4 py-1.5 mb-4">
          <Camera size={14} className="text-gold-400" />
          <span className="font-body text-xs text-gold-300 tracking-widest uppercase">AI Powered</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-light text-white">Virtual Try-On</h1>
        <p className="font-body text-white/60 text-sm mt-2 max-w-md mx-auto">
          Upload your photo, choose a garment, and see how it looks on you — before you buy.
        </p>
      </div>

      {/* Privacy notice */}
      <div className="bg-blush/60 border-b border-blush">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-start gap-2">
          <AlertCircle size={14} className="text-plum-500 mt-0.5 flex-shrink-0" />
          <p className="font-body text-xs text-plum-600 leading-relaxed">
            <strong>Privacy:</strong> Your photos are sent securely to our AI provider (FASHN.ai) for processing and are not stored or used for any other purpose. 
            Read our <a href="#" className="underline">privacy policy</a>.
          </p>
        </div>
      </div>

      {/* Steps indicator */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-2 mb-10">
          {['Your Photo', 'Choose Garment', 'Your Look'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 ${step > i + 1 || (step === i + 1) ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-body text-xs font-medium
                  ${step === i + 1 ? 'bg-gold-500 text-white' : step > i + 1 ? 'bg-plum-900 text-white' : 'bg-blush text-plum-400'}`}>
                  {i + 1}
                </div>
                <span className="font-body text-sm text-plum-700 hidden sm:block">{label}</span>
              </div>
              {i < 2 && <ChevronRight size={14} className="text-plum-300" />}
            </div>
          ))}
        </div>

        {/* ─ Step 1: Upload your photo ─ */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="font-display text-3xl text-plum-900 font-light mb-2">Upload Your Photo</h2>
            <p className="font-body text-plum-500 text-sm mb-8">
              Use a clear, front-facing full-body photo for best results.
            </p>

            <input ref={personInputRef} type="file" accept="image/*" className="hidden"
              onChange={e => handlePersonUpload(e.target.files[0])} />

            <button
              onClick={() => personInputRef.current.click()}
              className="w-full max-w-sm mx-auto border-2 border-dashed border-blush hover:border-gold-400 bg-white p-12 flex flex-col items-center gap-4 transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 bg-blush flex items-center justify-center">
                <Upload size={28} className="text-mauve" />
              </div>
              <div>
                <p className="font-body font-medium text-plum-800">Click to upload your photo</p>
                <p className="font-body text-sm text-plum-400 mt-1">JPG, PNG — full body, front-facing works best</p>
              </div>
            </button>

            <div className="mt-6 bg-plum-50 border border-plum-100 p-4 max-w-sm mx-auto text-left">
              <p className="font-body text-xs text-plum-600 font-medium mb-2">📸 Tips for best results:</p>
              <ul className="font-body text-xs text-plum-500 space-y-1 list-disc list-inside">
                <li>Stand facing forward in good lighting</li>
                <li>Full body visible in the photo</li>
                <li>Plain or simple background</li>
                <li>Wearing fitted clothing gives clearest results</li>
              </ul>
            </div>
          </div>
        )}

        {/* ─ Step 2: Choose garment ─ */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <img src={personPreview} alt="You" className="w-20 h-28 object-cover border-2 border-gold-400" />
              <div>
                <h2 className="font-display text-3xl text-plum-900 font-light">Choose a Garment</h2>
                <p className="font-body text-plum-500 text-sm mt-1">Pick from our featured pieces or upload your own garment image.</p>
                <button onClick={() => setStep(1)} className="font-body text-xs text-gold-500 mt-2 underline">Change photo</button>
              </div>
            </div>

            {/* Garment type */}
            <div className="mb-6">
              <p className="font-body text-xs text-plum-500 tracking-widest uppercase mb-3">Garment Type</p>
              <div className="flex gap-3 flex-wrap">
                {CATEGORY_OPTIONS.map(opt => (
                  <button key={opt.value}
                    onClick={() => setCategory(opt.value)}
                    className={`font-body text-sm px-4 py-2 border transition-colors ${
                      category === opt.value
                        ? 'bg-plum-900 text-white border-plum-900'
                        : 'bg-white text-plum-700 border-blush hover:border-plum-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured garments */}
            <div className="mb-6">
              <p className="font-body text-xs text-plum-500 tracking-widest uppercase mb-3">Featured Pieces</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SAMPLE_GARMENTS.map((g, i) => (
                  <button key={i}
                    onClick={() => selectSampleGarment(g)}
                    className={`bg-white border p-3 text-left transition-all ${
                      garmentUrl === g.url
                        ? 'border-gold-400 shadow-md'
                        : 'border-blush hover:border-plum-300'
                    }`}
                  >
                    <div className={`aspect-[3/4] bg-gradient-to-br from-blush to-plum-100 mb-2 flex items-center justify-center`}>
                      <span className="font-display text-3xl text-plum-300 italic">MM</span>
                    </div>
                    <p className="font-body text-xs text-gold-500 truncate">{g.brand}</p>
                    <p className="font-body text-xs text-plum-800 font-medium leading-tight">{g.name}</p>
                    <p className="font-body text-xs text-plum-500 mt-0.5">£{g.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload own garment */}
            <div className="mb-6">
              <p className="font-body text-xs text-plum-500 tracking-widest uppercase mb-3">Or Upload a Garment Image</p>
              <input ref={garmentInputRef} type="file" accept="image/*" className="hidden"
                onChange={e => handleGarmentUpload(e.target.files[0])} />
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => garmentInputRef.current.click()}
                  className="font-body text-sm border border-dashed border-blush hover:border-gold-400 bg-white px-6 py-3 text-plum-600 transition-colors flex items-center gap-2"
                >
                  <Upload size={14} /> Upload garment photo
                </button>
                {garmentPreview && <img src={garmentPreview} alt="Garment" className="w-14 h-20 object-cover border border-gold-400" />}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 font-body text-sm px-4 py-3 mb-4">
                {error}
              </div>
            )}

            <button
              onClick={startTryOn}
              disabled={loading || (!garmentFile && !garmentUrl)}
              className="btn-gold w-full flex items-center justify-center gap-2 text-sm"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
              {loading ? 'Generating…' : 'Generate My Look'}
            </button>
          </div>
        )}

        {/* ─ Step 3: Result ─ */}
        {step === 3 && (
          <div className="text-center">
            <h2 className="font-display text-3xl text-plum-900 font-light mb-2">
              {loading ? 'Creating your look…' : 'Your Look ✨'}
            </h2>
            <p className="font-body text-plum-500 text-sm mb-8">
              {loading ? 'This usually takes 15–30 seconds. Hang tight.' : 'Love it? Shop the look below.'}
            </p>

            {loading && (
              <div className="flex flex-col items-center gap-6 py-16">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-blush border-t-gold-500 rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera size={24} className="text-gold-500" />
                  </div>
                </div>
                <p className="font-body text-sm text-plum-400 animate-pulse">AI is styling your look…</p>
              </div>
            )}

            {result && (
              <div className="max-w-md mx-auto">
                <img src={result} alt="Your virtual try-on result" className="w-full shadow-lg border border-blush" />
                <div className="mt-6 flex gap-3">
                  <a href={garmentUrl || '#'} target="_blank" rel="noopener noreferrer"
                    className="btn-gold flex-1 flex items-center justify-center gap-2 text-sm">
                    Shop This Look <ExternalLink size={14} />
                  </a>
                  <button onClick={reset} className="btn-outline flex items-center gap-2 text-sm px-4">
                    <RefreshCw size={14} /> Try Another
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 font-body text-sm px-4 py-4 max-w-md mx-auto">
                <p className="font-medium mb-2">Something went wrong</p>
                <p className="text-xs">{error}</p>
                <button onClick={reset} className="mt-3 font-body text-xs underline">Start over</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
