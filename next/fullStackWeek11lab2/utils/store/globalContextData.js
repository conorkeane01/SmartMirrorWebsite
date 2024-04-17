import { createContext, useState, useEffect } from 'react';

const GlobalContextData = createContext();

export function GlobalContextProviderData(props) {
  const [globals, setGlobals] = useState({
    aString: 'init val', 
    count: 0, 
    hideHamMenu: true, 
    userData: [], 
    dataLoaded: false 
  });

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    try {
      const response = await fetch('/api/get-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data && data.userData) {
        setGlobals(previousGlobals => ({
          ...previousGlobals,
          userData: data.userData,
          dataLoaded: true
        }));
      }
    } catch (error) {
      console.error("Error fetching userData:", error);
    }
  }

  async function editGlobalData(command) {
    if (command.cmd === 'hideHamMenu') {
      setGlobals((previousGlobals) => {
        const newGlobals = { ...previousGlobals };
        newGlobals.hideHamMenu = command.newVal; 
        return newGlobals;
      });
    }
    if (command.cmd === 'addData') {
      const response = await fetch('/api/new-data', {
        method: 'POST',
        body: JSON.stringify(command.newVal),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json(); // Should check here that it worked OK
      setGlobals((previousGlobals) => {
        const newGlobals = { ...previousGlobals };
        newGlobals.userData.push(command.newVal); 
        return newGlobals;
      });
    }
  }

  const context = {
    updateGlobals: editGlobalData,
    theGlobalObject: globals // Ensure globals contains userData
  };

  return (
    <GlobalContextData.Provider value={{ ...globals }}>
      {props.children}
    </GlobalContextData.Provider>
  );
}

export default GlobalContextData;
