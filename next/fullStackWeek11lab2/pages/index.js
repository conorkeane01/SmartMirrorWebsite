import NoteList from '../components/notes/NoteList'
import { useContext } from "react";
import GlobalContext from "./store/globalContext"

function HomePage() {
    const globalCtx = useContext(GlobalContext)

    if (globalCtx.theGlobalObject.dataLoaded == true) {
        return <NoteList notes={globalCtx.theGlobalObject.notings} />
    }
    return <div>Loading data from database, please wait . . . </div>
}

export default HomePage;