import classes from './NoteDetail.module.css'

function NoteDetail(props) {
    return (
        <section className={classes.detail}>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </section>
    )
}

export default NoteDetail;