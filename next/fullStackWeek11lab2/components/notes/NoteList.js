import NoteItem from './NoteItem';
import classes from './NoteList.module.css';
import Layout from '../layout/Layout';

function NoteList(props) {
  return (
    <Layout>
    <ul className={classes.list}>
      {props.notes.map((note) => (
        <NoteItem
          key={note._id}
          _id={note._id}
          title={note.title}
  
        />
      ))}
    </ul>
    </Layout>
  );
}

export default NoteList;
