import { useState, useEffect } from 'react';
// import './App.css'

function App() {

  const [ posts, setPosts ] = useState([]);

  useEffect( () => {

    fetch('localhost:3000/posts/')
    .then(response => response.json())
    .then( data => {

      setPosts(data)

    })
    .catch(error => {

      console.error(error);

    })

  }, [] )

  return (

    <>
      <div className="min-h-screen w-full flex flex-col gap-4u items-center py-12u">
        
      </div>
    </>

  )
}

export default App;
