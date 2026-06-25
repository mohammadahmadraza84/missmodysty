import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, RotateCcw } from 'lucide-react'

const STARTERS = [
  "I need a nikah guest outfit, budget £100, UK size 14",
  "What should I wear to work this winter? I wear hijab",
  "Outfit ideas for Eid celebrations, elegant and colourful",
  "Smart casual look for a family dinner, modest and comfortable",
  "Plus size modest fashion for a summer wedding",
]

const SYSTEM_PROMPT = `You are Mody, the expert AI modest fashion stylist for Miss Modysty — the UK's premier curated modest fashion platform.

Your role is to help Muslim women and modest fashion enthusiasts find the perfect outfits for any occasion.

Your expertise:
- Deep knowledge of modest fashion requirements (full coverage, loose fit, hijab-compatible necklines)
- UK sizing conventions and brands
- Occasion-specific styling: nikah/wedding, Eid, workwear, everyday, outdoor, sports, formal
- Budget-conscious UK pound (£) recommendations
- Styling tips for different body types and preferences
- Awareness of UK delivery and seasonal weather

UK modest fashion brands you know well: Aab Collection, Inayah, House of Hikmah, Modanisa (UK site), East Essence, Haute Elan, Next modest range, M&S modest options, ASOS Modest, Uniqlo (modest-friendly pieces), & Other Stories, COS.

When recommending:
- Always confirm the occasion, budget, and size before giving specific picks if not provided
- Suggest 2-3 concrete outfit options with brand names, rough prices in £, and why each works
- Consider hijab colour coordination if relevant
- Mention layering tips for UK weather
- Keep responses warm, specific, and practical — not generic

Formatting: Use short paragraphs. Bold brand names. Use bullet points for outfit breakdowns. Keep it conversational and encouraging.`

export default function AIStyler() {
  const [messages, setMessages] = useState([])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || loading) return

    const userMsg = { role: 'user', content: userText }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/.netlify/functions/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const reset = () => {
    setMessages([])
    setInput('')
    setError(null)
  }

  return (
    <div className="pt-16 min-h-screen flex flex-col bg-ivory">
      {/* Header */}
      <div className="bg-plum-900 bg-hero-pattern py-10 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 px-4 py-1.5 mb-4">
          <Sparkles size={14} className="text-gold-400" />
          <span className="font-body text-xs text-gold-300 tracking-widest uppercase">AI-Powered</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-light text-white">Meet Mody</h1>
        <p className="font-body text-white/60 text-sm mt-2 max-w-md mx-auto">
          Your personal modest fashion stylist. Describe your occasion, budget, and style — 
          I'll curate the perfect look.
        </p>
      </div>

      {/* Chat area */}
      <div className="flex-grow max-w-3xl w-full mx-auto px-4 py-6 flex flex-col">

        {/* Starter prompts */}
        {messages.length === 0 && (
          <div className="mb-6">
            <p className="font-body text-xs text-plum-400 tracking-widest uppercase mb-3 text-center">
              Try asking…
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {STARTERS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="font-body text-xs bg-white border border-blush text-plum-700 hover:border-gold-400 hover:text-gold-600 px-3 py-2 transition-colors text-left"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-grow space-y-4 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 bg-plum-900 flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                  <Sparkles size={14} className="text-gold-400" />
                </div>
              )}
              <div className={`max-w-[80%] px-4 py-3 font-body text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-plum-900 text-white'
                  : 'bg-white border border-blush text-plum-800'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 bg-plum-900 flex items-center justify-center flex-shrink-0 mr-3">
                <Sparkles size={14} className="text-gold-400 animate-pulse" />
              </div>
              <div className="bg-white border border-blush px-4 py-3 flex items-center gap-1">
                {[0,1,2].map(i => (
                  <span key={i} className="w-2 h-2 bg-mauve rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 font-body text-sm px-4 py-3 text-center">
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="bg-white border border-blush flex items-end gap-0 sticky bottom-4">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
            placeholder="Describe your occasion, budget, and style preferences…"
            rows={2}
            className="flex-grow resize-none px-4 py-3 font-body text-sm text-plum-900 placeholder-plum-300 focus:outline-none"
          />
          <div className="flex flex-col gap-0 border-l border-blush">
            <button
              onClick={reset}
              title="Start over"
              className="p-3 text-plum-400 hover:text-plum-700 hover:bg-blush/40 transition-colors"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="p-3 bg-plum-900 hover:bg-plum-800 disabled:bg-plum-200 text-white transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        <p className="font-body text-xs text-plum-300 text-center mt-3">
          Mody is an AI. All shopping links are affiliate links — we may earn a small commission.
        </p>
      </div>
    </div>
  )
}
