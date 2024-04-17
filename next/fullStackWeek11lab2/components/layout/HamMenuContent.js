import classes from './HamMenuContent.module.css';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import GlobalContext from '../../utils/store/globalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCloudSunRain, faBed, faStickyNote } from '@fortawesome/free-solid-svg-icons';


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
    { title: 'Home', webAddress: '/home', icon: faHome },
    { title: 'Weather', webAddress: '/weather', icon: faCloudSunRain },
    { title: 'Sleep', webAddress: '/sleep', icon: faBed },
    { title: 'Notes', webAddress: '/', icon: faStickyNote },
  ];

  let contentJsx = menuItems.map((item, index) => (
  <div className={classes.menuItem} key={index} onClick={() => clicked(item.webAddress)}>
    <FontAwesomeIcon icon={item.icon} /> {item.title}
  </div>
));

  return (
    <div className={classes.background} onClick={() => closeMe()}>
      <div className={classes.mainContent}>{contentJsx}</div>
    </div>
  );
}