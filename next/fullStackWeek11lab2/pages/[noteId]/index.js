import NoteDetail from '../../components/notes/NoteDetail'
import { useRouter } from 'next/router'
//import GlobalContext from "../store/globalContext"
import GlobalContext from '../../utils/store/globalContext'
import { useContext } from 'react'
/*
export default function () {
    const globalCtx = useContext(GlobalContext)
    const router = useRouter();

    // Back to basics, a simple for loop. Also trim() comes into play as it usually does!
    let returnVal = null
    for (let ii = 0; ii < globalCtx.theGlobalObject.notings.length; ii++) {
        let temp = globalCtx.theGlobalObject.notings[ii]
        if (temp._id.trim() == router.query.noteId.trim()) {
            returnVal = <NoteDetail title={temp.title} description={temp.description} />
        }
    }
    // In the real world, we'd put the code above in the store context module. 
    return returnVal
}
*/

export default function NotePage() {
    const globalCtx = useContext(GlobalContext);
    const router = useRouter();

    let returnVal = null;
    for (let ii = 0; ii < globalCtx.theGlobalObject.notings.length; ii++) {
        let temp = globalCtx.theGlobalObject.notings[ii];
        if (temp._id.trim() === router.query.noteId.trim()) {
            returnVal = <NoteDetail title={temp.title} description={temp.description} />;
        }
    }
    return returnVal;
}



