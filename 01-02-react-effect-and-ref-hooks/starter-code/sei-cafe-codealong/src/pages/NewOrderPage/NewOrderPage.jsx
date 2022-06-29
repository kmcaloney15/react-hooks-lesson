import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api'
import './NewOrderPage.css';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewOrderPage(props) {
  const [menuItems, setMenuItems] = useState([])

  const [activeCat, setActiveCat] = useState()

  const categoriesRef = useRef([]);

//   useEffect(function() {
//     console.log('NewOrderPage rendered');
//   })

//   useEffect(function() {
//     console.log('useEffect runs after every render');
//   });
  
//   // Add this useEffect with a dependency array
//   useEffect(function() {
//     console.log('useEffect runs only after first render');
//   }, [])

//  useEffect(function() {
//   console.log('useEffect runs when menuItems changes');
// }, [menuItems])

// Refactor the useEffect below - don't miss the empty []
useEffect(function() {
  async function getItems() {
    const items = await itemsAPI.getAll();
    categoriesRef.current = items.reduce((cats, item) => {
      const cat = item.category.name;
      return cats.includes(cat) ? cats : [...cats, cat];
    }, []);
    setMenuItems(items);
    setActiveCat(items[0].category.name)
  }
  getItems();
}, []);


return (
  <main className="NewOrderPage">
  <aside>
    <Logo />
    <CategoryList
      categories={categoriesRef.current}
      activeCat={activeCat}
      setActiveCat={setActiveCat}
    />
    <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
    <UserLogOut user={props.userProps} setUser={props.setUserProps} />
  </aside>
  <MenuList
    menuItems={menuItems.filter(item => item.category.name === activeCat)}
  />
  <OrderDetail />
</main>
);
}




// import { useState, useEffect, useRef } from "react";
// import * as itemsAPI from "../../utilities/items-api";
// import Logo from "../../components/Logo/Logo";
// import MenuList from "../../components/MenuList/MenuList";
// import CategoryList from "../../components/CategoryList/CategoryList";
// import OrderDetail from "../../components/OrderDetail/OrderDetail";
// import UserLogOut from "../../components/UserLogOut/UserLogOut";
// import { Link } from "react-router-dom";

// export default function NewOrderPage(props) {
//   const [menuItems, setMenuItems] = useState();
//   // Add state to track the "active" category
//   const [activeCat, setActiveCat] = useState("");

//   // Create and initialize the ref to an empty array
//   const categoriesRef = useRef([]);

//   // - Fetch the menuItems from the server via AJAX
//   // - When the data comes back, call setMenuItems to save in state

//   //General idea of how useEffect works
//   // useEffect(RUN THIS Function, EVERYTIME WHAT IS HERE CHANGES)

//   // useEffect(function(){
//   //   console.log(`useEffect runs after every render`)
//   // })
//   // useEffect(function(){
//   //   console.log(`useEffect runs when menuItems changes`)
//   // },[menuItems])

//   // useEffect(function() {
//   //   async function getItems(){
//   //     const items = await itemsAPI.getAll();
//   //     setMenuItems(items);
//   //   }
//   //   getItems()
//   // }, []);

//   useEffect(function () {
//     async function getItems() {
//       const items = await itemsAPI.getAll();
//       categoriesRef.current = items.reduce((cats, item) => {
//         const cat = item.category.name;
//         return cats.includes(cat) ? cats : [...cats, cat];
//       }, []);
//       setMenuItems(items);
//       // Add this line to initialize the active category
//       setActiveCat(items[0].category.name);
//     }
//     getItems();
//   }, []);

//   // Refactor the useEffect from above - don't miss the empty []
//   //need to have two functions here, because there is a race condition where they both are trying to run at the same time but it's unstable. could also use a .then instead of async/await approach which would eliminate the race error
//   // useEffect(function () {
//   //   async function getItems() {
//   //     const items = await itemsAPI.getAll();
//   //     setMenuItems(items);
//   //   }
//   //   getItems();
//   // }, []);

//   return (
//     <>
//       <main className="NewOrderPage">
//         <aside>
//           <Logo />
//           <CategoryList
//             categories={categoriesRef.current}
//             activeCat={activeCat}
//             setActiveCat={setActiveCat}
//           />
//           <Link to="/orders" className="button btn-sm">
//             PREVIOUS ORDERS
//           </Link>
//           <UserLogOut user={props.userProps} setUser={props.setUserProps} />
//         </aside>
//         <MenuList
//           menuItems={menuItems.filter(
//             (item) => item.category.name === activeCat
//           )}
//         />
//         <OrderDetail />
//       </main>
//     </>
//   );
// }
