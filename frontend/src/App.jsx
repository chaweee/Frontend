import { useState } from 'react';
import Header from './components/Header.jsx'
import UserCards from './components/UserCards.jsx';



function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {name, email, password};
    setUsers([...users, user]);
    setName('');
    setEmail('');
    setPassword('');
    console.log(users);
  }

  return (
    <>
      <Header name={"IMPORMASYON"} />

      <form action="" onSubmit={handleSubmit}>
      <section className='m-5 container p- mx-auto px-100 py-2  bg-yellow-300 rounded-lg shadow-md flex flex-col'>
        

      <p className='text-center text-4xl font-bold'>PANGALAN MO</p>
      <input type="text"
      name=""
      id=""
      className='border-2 m-px'
      onChange={(e) => setName(e.target.value)}
       />

      <p className='text-center text-4xl font-bold'>PASSWORD MO</p>
      <input type="text"
      name=""
      id=""
      className='border-2 m-px'
      onChange={(e) => setPassword(e.target.value)}
       />

      <p className='text-center text-4xl font-bold'>EMAIL MO</p>
      <input 
      type="text" 
      name="" 
      id="" 
      className='border-2 m-px' 
      onChange={(e) => setEmail(e.target.value)}
       />

      <button type="submit" className=' m-10 bg-cyan-300 text-black font-bold py-2 px-2 rounded'>SUBMIT</button>

      </section>

      </form>

      <UserCards users={users} />
    </>
    

    
  )
}

export default App;