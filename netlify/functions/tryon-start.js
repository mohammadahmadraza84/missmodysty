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
    const { model_image, garment_image, category } = JSON.parse(event.body)

    if (!model_image || !garment_image) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Both a person photo and garment image are required.' }),
      }
    }

    const validCategories = ['tops', 'bottoms', 'one-pieces']
    const garmentCategory = validCategories.includes(category) ? category : 'one-pieces'

    const response = await fetch('https://api.fashn.ai/v1/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FASHN_API_KEY}`,
      },
      body: JSON.stringify({
        model_image,
        garment_image,
        category: garmentCategory,
        mode: 'quality',
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('FASHN API error:', errorData)
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'Virtual try-on service error. Please try again.' }),
      }
    }

    const data = await response.json()

    if (data.error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: data.error }),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ id: data.id }),
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
