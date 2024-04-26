// /api/new-note

async function handler(req, res) { // can be called anything you like
 /* const response = await fetch('http://localhost:8000/saveNote', {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  res.json(data)*/
  const response = await fetch('http://localhost:8000/createNote', { //http://34.239.36.76:8000/createNote
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  res.json(data)
}

export default handler;
