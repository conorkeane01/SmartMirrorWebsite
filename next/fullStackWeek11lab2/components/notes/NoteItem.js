import Card from "../ui/Card";
import classes from "./NoteItem.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import GlobalContext from "../../utils/store/globalContext";
import Link from 'next/link'
import HamMenu from "../generic/HamMenu"
import HamMenuFAB from "../generic/HamMenuFAB"
import HamMenuContent from "../layout/HamMenuContent"

function NoteItem(props) {
  const router = useRouter();
  const globalCtx = useContext(GlobalContext);

  function showDetailsHandler() {
    try {
      router.push("/" + props._id); // Change props.id to props._id
    } catch (error) {
      console.error("Error navigating to details page:", error);
    }
  }

  async function deleteDetailHandler() {
    try {
      console.log("Deleting note:", props._id);
      if (!props._id) {
        console.error("Error deleting: Invalid ID");
        return;
      }

      const response = await fetch("http://localhost:8000/deleteNote", {   //http://34.239.36.76:8000/deleteNote
        method: "POST",
        body: JSON.stringify({ _id: props._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(JSON.stringify(data));

      // After successful deletion, reload the page
      window.location.reload();
    } catch (error) {
      console.error("Error deleting:", error);
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
          {/* Use Link component for navigation */}
          <Link href="/new-note">
            <button>Add New Note</button>
          </Link>
        </div>
      </Card>
    </li>
  );
}

export default NoteItem;
