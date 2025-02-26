import { useState, useEffect } from 'react';
// import './App.css'

function App() {

  const [ posts, setPosts ] = useState([]);

  useEffect( () => {

    fetch('http://localhost:3000/posts/')
    .then(response => response.json())
    .then( (data) => { setPosts(data) })
    .catch(error => {

      console.error(error);

    })

  }, [] )

  return (

    <>
      <div className="min-h-screen w-full flex flex-col gap-4u items-center py-12u">
        {/* tabella */}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Content</th>
              <th>Image</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {
              posts.map( (post) => {

                const { id, title, content, image, tags } = post;

                return (

                  <tr key={id}>
                    <td><p>{title}</p></td>
                    <td><p>{content}</p></td>
                    <td>
                      <figure>
                        <img src={image} alt={title} />
                      </figure>
                    </td>
                    <td><p>{tags}</p></td>
                  </tr>

                )
              } )
            }
          </tbody>
        </table>
      </div>
    </>

  )
}

export default App;
