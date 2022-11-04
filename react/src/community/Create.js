import axios from 'axios';
import { useState } from 'react';
import Layout from '../common/Layout';

function Create() {

  const [ Title, setTitle ] = useState('');
	const [ Content, setContent ] = useState('');

	const handleCreate = ()=>{
		const item = {title: Title, content: Content};

		axios.post('/api/create', item)
		.then(response=>{
			console.log(response);
		})
		.catch(err=>{
			console.log(err);
		})
	}

  return (
    <Layout name='Post'>
      <ul>
        <li>
          <label htmlFor='title'>Title</label>
          <input type='text'
            name='title' id='title'
            value={Title}
            onChange={e=>setTitle(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor='content'>Content</label>
          <textarea
            name='content' id='content'
            cols='30' rows='3'
            value={Content}
            onChange={e=>setContent(e.target.value)}
          ></textarea>
        </li>
        <li>
          <button
            onClick={handleCreate}
          >SEND</button>
        </li>
      </ul>
    </Layout>
  )
}

export default Create;