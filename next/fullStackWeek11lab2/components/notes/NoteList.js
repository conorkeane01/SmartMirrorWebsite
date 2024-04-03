import NoteItem from './NoteItem';
import classes from './NoteList.module.css';

function NoteList(props) {
  return (
    <ul className={classes.list}>
      {props.notes.map((note) => (
        <NoteItem
          key={note._id}
          id={note.notingId}
          title={note.title}
  
        />
      ))}
    </ul>
  );
}

export default NoteList;
