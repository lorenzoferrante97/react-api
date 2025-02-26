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
      <div className="w-full max-h-screen p-10u overflow-y-auto">
        {/* tabella */}
        <table className='bg-smoke-50 w-full h-full overflow-y-scroll'>
          <thead>
            <tr className='bg-smoke-200'>
              <th>Id</th>
              <th>Title</th>
              <th className='min-w-[480px]'>Content</th>
              <th>Image</th>
              <th className='min-w-[200px]'>Tags</th>
            </tr>
          </thead>
          <tbody>
            {
              posts.map( (post) => {

                const { id, title, content, image, tags } = post;

                return (

                  <tr key={id}>
                    <td><p>{id}</p></td>
                    <td><p>{title}</p></td>
                    <td><p>{content}</p></td>
                    <td>
                      <figure>
                        <img src={image} alt={title} />
                      </figure>
                    </td>
                    <td>
                      {
                        tags.map( (tag) => {

                          return (
                            <p className='p-2u border border-smoke-100 rounded-md bg-white mb-2u' key={tag}>{tag}</p>
                          )

                        } )
                      }
                    </td>
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

// end code
