exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  try {
    const id = event.queryStringParameters?.id

    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Prediction ID is required.' }),
      }
    }

    const response = await fetch(`https://api.fashn.ai/v1/status/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.FASHN_API_KEY}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('FASHN status error:', errorData)
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'Could not check try-on status.' }),
      }
    }

    const data = await response.json()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        id: data.id,
        status: data.status,
        output: data.output || [],
        error: data.error || null,
      }),
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
