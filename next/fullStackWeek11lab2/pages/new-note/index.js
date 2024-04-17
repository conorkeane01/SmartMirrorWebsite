// our-dimain.com/new-note
import NewNoteForm from '../../components/notes/NewNoteForm'
import { useRouter } from 'next/router';
//import GlobalContext from "../store/globalContext"
import GlobalContext from "../../utils/store/globalContext"
import { useContext } from 'react'

function NewNotePage() {
    const router = useRouter()
    const globalCtx = useContext(GlobalContext)

    async function addNoteHandler(enteredNoteData)  {
        await globalCtx.updateGlobals({cmd: 'addNote', newVal: enteredNoteData})
        router.push('/');
    }

    return <NewNoteForm onAddNote={addNoteHandler} />
}

export default NewNotePage
