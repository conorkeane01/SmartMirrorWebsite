import NoteItem from './NoteItem';
import classes from './NoteList.module.css';

function NoteList(props) {
  return (
    <ul className={classes.list}>
      {props.notes.map((note) => (
        <NoteItem
          key={note._id}
          _id={note._id}
          title={note.title}
  
        />
      ))}
    </ul>
  );
}

export default NoteList;
