// /api/delete-note

async function handler(req, res) {
    try {
      const { _id } = req.body; // Access _id instead of noteId
      if (!_id) {
        return res.status(400).json({ error: 'Invalid ID' });
      }
      
      const result = await notings.deleteOne({ _id }); // Use _id for deletion
      if (result.deletedCount === 1) {
        return res.json({ response: 'success' });
      } else {
        return res.json({ response: 'fail' });
      }
    } catch (error) {
      console.error('Error deleting:', error);
      res.status(500).json({ error: 'An error occurred while deleting the note' });
    }
  }
  
  export default handler;