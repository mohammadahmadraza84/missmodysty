// Retrieve anonymous Mody query logs.
// Access: /.netlify/functions/mody-logs?key=YOUR_LOGS_SECRET_KEY
// Set LOGS_SECRET_KEY in Netlify → Site configuration → Environment variables.
// Returns JSON: { count, logs: [{ message, timestamp, sessionId }] }

const { getStore } = require('@netlify/blobs')

exports.handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' }

  const providedKey = event.queryStringParameters?.key
  if (!providedKey || providedKey !== process.env.LOGS_SECRET_KEY) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Unauthorised' }) }
  }

  try {
    const store = getStore('mody-logs')
    const { blobs } = await store.list()

    const entries = await Promise.all(
      blobs.map(async ({ key }) => {
        try {
          const raw = await store.get(key)
          return raw ? JSON.parse(raw) : null
        } catch (_) {
          return null
        }
      })
    )

    const logs = entries
      .filter(Boolean)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ count: logs.length, logs }),
    }
  } catch (error) {
    console.error('mody-logs error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to retrieve logs.' }),
    }
  }
}
