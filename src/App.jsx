import { useState, useEffect } from 'react';
// import './App.css'

function App() {

  const [ posts, setPosts ] = useState([]);


  // GET -> index
  const getPosts = () => {

    fetch('http://localhost:3000/posts/')
    .then(response => response.json())
    .then( (data) => { setPosts(data) })
    .catch(error => { console.error(error); })

    console.log("ddd")

  }

  // mostra elenco posts al montaggio comp
  useEffect( () => { getPosts(); }, [] )

  // DELETE -> destroy
  const deletePost = (id) => {

    fetch(`http://localhost:3000/posts/${id}`, { method: 'DELETE' })
    .then( getPosts )
    .catch(error => { console.error(error) })

  }

  // var dinamica form values
  const [ formValues, setFormValues ] = useState({});

  // onChange function che aggiorna formValues
  const handleField = (e) => {
  
      const { name, value } = e.target;
      let updateFormValues = {};

      // conversione tags string in array
      if (name === 'tags') {
        updateFormValues = {
          ...formValues,
          [name]: value.split(",")
        }

      } else {
        updateFormValues = {
          ...formValues,
          [name]: value
        }
      }

      // const updateFormValues = {
      //   ...formValues,
      //   [name]: value
      // }
      setFormValues ( updateFormValues )

  }

  // POST -> store
  const addPost = (e) => {

    e.preventDefault();

    console.log(formValues)

    fetch(`http://localhost:3000/posts/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues)
    })
    .then( getPosts )
    // .then(response => response.json())
    // .then( (data) => { setPosts(data) })
    .catch(error => { console.error(error); })

  }

  return (

    <>
      <div className="w-full max-h-screen p-10u overflow-y-auto flex flex-col gap-7u">

        <div className='w-full flex flex-col gap-5u'>

          <h1 className='font-h1'>Crea un post</h1>

          {/* form aggiunta post */}
          <form className='flex flex-col gap-3u max-w-[480px]' onSubmit={ addPost }>
            {/* post title */}
            <div className='flex flex-col gap-u'>
              <label htmlFor="title">Titolo post</label>
              <input type="text" placeholder='Carbonara' name='title' className='border border-smoke-100 rounded-md px-2u py-u' onChange={ handleField } />
            </div>
            {/* post content */}
            <div className='flex flex-col gap-u'>
              <label htmlFor="content">Contenuto post</label>
              <textarea type="text" placeholder='Scrivi qui il contenuto del tuo post' name='content' className='border border-smoke-100 rounded-md px-2u py-u' onChange={ handleField } />
            </div>
            {/* post img */}
            <div className='flex flex-col gap-u'>
              <label htmlFor="image">URL immagine</label>
              <input type="text" placeholder='link immagine' name='image' className='border border-smoke-100 rounded-md px-2u py-u' onChange={ handleField } />
            </div>
            {/* post tags */}
            <div className='flex flex-col gap-u'>
              <label htmlFor="tags">Tags post</label>
              <input type="text" placeholder='ricetta, primo, spaghetti...' name='tags' className='border border-smoke-100 rounded-md px-2u py-u' onChange={ handleField } />
            </div>
            {/* submit button */}
            <div className='flex flex-col gap-u'>
              <button type='submit' className='px-7u py-4u w-full bg-black text-white rounded-md md:w-fit'>Inserisci post</button>
            </div>
          </form>
          
        </div>


        {/* tabella */}
        <table className='bg-smoke-50 w-full h-full overflow-y-scroll'>
          <thead>
            <tr className='bg-smoke-200'>
              <th>Id</th>
              <th>Title</th>
              <th className='min-w-[480px]'>Content</th>
              <th>Image</th>
              <th className='min-w-[200px]'>Tags</th>
              <th>Operazioni</th>
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
                    <td>
                      <button
                      className='w-10u aspect-square bg-red-400 text-white rounded-md'
                      onClick={ () => deletePost(id)}
                      >X</button>
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
