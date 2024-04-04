import classes from './HamMenuContent.module.css';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import GlobalContext from '../../pages/store/globalContext';

export default function HamMenuContent(props) {
  const globalCtx = useContext(GlobalContext);
  const router = useRouter();
  let [popupToggle, setPopupToggle] = useState(false);

  if (globalCtx.theGlobalObject.hideHamMenu) {
    return null;
  }

  function clicked(webAddress) {
    globalCtx.updateGlobals({ cmd: 'hideHamMenu', newVal: true });
    router.push(webAddress);
  }

  function closeMe() {
    globalCtx.updateGlobals({ cmd: 'hideHamMenu', newVal: true });
    if (popupToggle === true) {
      setPopupToggle(false);
    } else {
      setPopupToggle(true);
    }
  }

  // Define the menu items statically
  const menuItems = [
    { title: 'Home', webAddress: '/' },
    { title: 'Weather', webAddress: '/weather' },
    { title: 'Sleep', webAddress: '/sleep' },
    { title: 'Notes', webAddress: '/notes' },
  ];

  let contentJsx = menuItems.map((item, index) => (
    <div className={classes.menuItem} key={index} onClick={() => clicked(item.webAddress)}>
      {item.title}
    </div>
  ));

  return (
    <div className={classes.background} onClick={() => closeMe()}>
      <div className={classes.mainContent}>{contentJsx}</div>
    </div>
  );
}