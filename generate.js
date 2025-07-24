const fetch = require('node-fetch')
exports.handler = async (event) => {
  const { system, user } = JSON.parse(event.body)
  const res = await fetch('https://api.openai.com/v1/chat/completions',{
    method:'POST',
    headers:{
      'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ]
    })
  })
  const data = await res.json()
  const text = data.choices[0].message.content
  return {
    statusCode: 200,
    body: JSON.stringify({ text })
  }
}
