import { useState, useEffect } from "react";

export default function NewOrderPage() {
  const [menuItems, setMenuItems] = useState();

  // - Fetch the menuItems from the server via AJAX
  // - When the data comes back, call setMenuItems to save in state

// General idea of how useEffects works:
// useEffect(RUN THIS FUNCTION, EVERY TIME WHAT'S HERE CHANGES)

  useEffect(function () {
    console.log("NewOrderPage rendered");
  });

  // Add this useEffect with a dependency array
  useEffect(function () {
    console.log("useEffect runs only after first render");
  }, []); // runs only after the first render because of the second paramater getting passed in - which is the empty array

  // Now when the button is clicked, the value of menuItems is updated, and because the useEffect depends upon menuItems, it runs every time menuItems changes.
  // Note: The dependency array can contain multiple dependencies.
  useEffect(function() {
    console.log('useEffect runs when menuItems changes')
  }, [menuItems]);


  // Refactor the useEffect from above - don't miss the empty []
  useEffect(async function(){
    const items = await itemsAPI.getAll()
    setMenuItems(items)
  }, [])
  

  return (
    <>
      <h1>NewOrderPage</h1>
      <button onClick={setMenuItems}>Trigger re-render</button>
    </>
  );
}
