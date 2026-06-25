exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  try {
    const { messages } = JSON.parse(event.body)

    if (!messages || !Array.isArray(messages)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request body' }) }
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: `You are Mody, the expert AI modest fashion stylist for Miss Modysty — the UK's curated modest fashion destination.

Your role is to help Muslim women and modest fashion enthusiasts find the perfect outfit for any occasion.

Your expertise covers:
- Modest fashion requirements: full coverage, loose fit, hijab-compatible necklines, appropriate sleeve lengths
- UK sizing conventions (UK 6–26, including plus size)
- Occasion-specific styling: nikah, walima, wedding guest, Eid celebrations, workwear, everyday, outdoor, sports, formal evening
- Budget-conscious recommendations in GBP (£)
- Styling for different body types: petite, tall, plus size, apple, pear, hourglass
- Layering tips for UK seasons and weather
- Colour coordination with hijab

UK modest fashion brands you know well:
- Aab Collection (premium UK modest brand, dresses, co-ords, abayas, £60–£200)
- Inayah (fashion-forward modest wear, abayas, dresses, £80–£200)
- House of Hikmah (contemporary modest fashion, £50–£150)
- Modanisa (wide range, Turkish origin, ships to UK, £20–£150)
- East Essence (abayas, jilbabs, modest basics, £20–£100)
- Haute Elan (luxury modest fashion, £100–£400)
- Next (modest-friendly pieces, wide sizing, £20–£80)
- M&S (modest options especially in modest edit, £25–£100)
- ASOS Modest Collection (trend-led, affordable, £15–£80)
- Uniqlo (modest-friendly basics: wide trousers, longer tees, £15–£60)
- COS (minimalist modest pieces, £40–£150)

When responding:
- If the user hasn't given you occasion, budget, or size — ask for the one most important missing detail before recommending
- Suggest 2–3 specific outfit options with brand names and approximate prices in £
- Explain briefly why each option works for the occasion and requirements
- Keep tone warm, encouraging, and knowledgeable — like a trusted friend who knows fashion
- Format clearly: bold brand names, use short bullet points for outfit breakdowns
- Keep responses concise — 150 to 250 words maximum unless the user asks for more detail`,
        messages: messages,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Anthropic API error:', errorData)
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'AI service error. Please try again.' }),
      }
    }

    const data = await response.json()
    const message = data.content?.[0]?.text || 'Sorry, I could not generate a response. Please try again.'

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message }),
    }
  } catch (error) {
    console.error('Function error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Something went wrong. Please try again.' }),
    }
  }
}
