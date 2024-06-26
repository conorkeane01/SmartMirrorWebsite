// /api/new-data

async function handler(req, res) { // can be called anything you like
    const response = await fetch('http://34.239.36.76:8000/readData', {  //http://34.239.36.76:8000/readData
      method: 'POST',
      body: JSON.stringify({ cmd: 'all' }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(JSON.stringify(data))
    res.json(data)
  }
  
  export default handler;

