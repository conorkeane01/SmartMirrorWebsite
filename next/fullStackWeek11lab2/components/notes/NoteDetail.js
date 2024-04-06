import classes from './NoteDetail.module.css'
import Layout from '../layout/Layout';

function NoteDetail(props) {
    return (
        <Layout>
        <section className={classes.detail}>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </section>
        </Layout>
    )
}

export default NoteDetail;
