import Card from '../ui/Card';
import classes from './NoteItem.module.css';
import { useRouter } from 'next/router';

function NoteItem(props) {
  const router = useRouter();


  function showDetailsHandler() {
    try {
      router.push('/' + props.id);
    } catch (error) {
      console.error('Error navigating to details page:', error);
    }
  }

  async function deleteDetailHandler() {
    try {
      if (!props.id) {
        console.error('Error deleting: Invalid ID');
        return;
      }
  
      const response = await fetch('http://localhost:8000/deleteNote', {
        method: 'POST',
        body: JSON.stringify({ _id: props.id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(JSON.stringify(data));
      
      // After successful deletion, reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  }

  return (
    <li className={classes.item}>
      
      <Card>

        <div className={classes.content}>
          <h3>{props.title}</h3>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
          <button onClick={deleteDetailHandler}>Delete Note</button>
        </div>
      </Card>
    </li>
  );
}

export default NoteItem;
