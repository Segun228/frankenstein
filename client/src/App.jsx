import './App.css'
import getUsers from './querries/GET/getUsers'
import createUser from './querries/POST/createUser'
import editUser from './querries/PUT/editUser'
import deleteUser from './querries/DELETE/deleteUser'
import { IoCloseCircle } from "react-icons/io5";
import { useEffect, useState } from 'react'


function App() {
  const [users, setUsers] = useState([])
  const [foundUser, setFoundUser] = useState(null)
  const [foundError, setFoundError] = useState(null)
  const [foundError1, setFoundError1] = useState(null)
  const [foundError2, setFoundError2] = useState(null)
  const [foundError3, setFoundError3] = useState(null)
  const [getId, setGetId] = useState("")
  const [createData, setCreateData] = useState({
    email: "", username: "", password: "",
  })
  const [updateData, setUpdateData] = useState({
    id: "", email: "", username: "", password: "",
  })
  const [deleteId, setDeleteId] = useState("")

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleGetSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await getUsers(getId);
      setFoundUser(user);
      console.log("User found:", user);
      setGetId("")
      setFoundError(false)
    } catch (err) {
      setFoundUser(null);
      setFoundError(true);
      console.error(err);
    }
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(createData);
      console.log("User created");
      await fetchUsers();
      setCreateData({ email: "", username: "", password: "", })
      setFoundError1(false);
    } catch (err) {
      setFoundError1(true);
      console.error(err);
    }
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(updateData);
      console.log("User updated");
      await fetchUsers();
      setUpdateData({ id: "", email: "", username: "", password: "" })
      setFoundError2(false);
    } catch (err) {
      setFoundError2(true);
      console.error(err);
    }
  }

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(deleteId);
      console.log("User deleted");
      await fetchUsers();
      setDeleteId("")
      setFoundError3(false);
    } catch (err) {
      console.error(err);
      setFoundError3(true);
    }
  }

  const handleCloseClick = async (user) => {
    console.log("sending this:", user)
    try {
      await deleteUser(user?.id);
      console.log("User deleted");
      await fetchUsers();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="wrapper">
      <div className="title">FRANKENSTEIN APP</div>

      <div className="form-section">
        <form onSubmit={handleGetSubmit} className="form">
          <div className="subtitle">Получение</div >
          <input 
            type='text' 
            name='id' 
            placeholder='Введите id пользователя'
            value={getId}
            onChange={(e) => setGetId(e.target.value)}
          />
          <button type='submit'>Найти</button>
        </form>
        <div className='error_container'>
          {foundError &&
            <div className='error'>User not found</div>
          }
        </div>
        {foundUser &&
          <div className="user-card">
              <div><b>user id:</b> {foundUser?.id}</div>
              <div><b>username:</b> {foundUser?.username}</div>
              <div><b>email:</b> {foundUser?.email}</div>
              <div><b>full name:</b> {foundUser?.first_name + " " + foundUser?.last_name}</div>
          </div>
        }
      </div>

      <div className="form-section">
        <form onSubmit={handleCreateSubmit} className="form">
          <div className="subtitle">Создание</div >
          {Object.keys(createData).map((field) => (
            <input
              key={field}
              type='text'
              name={field}
              placeholder={`Введите ${field}`}
              value={createData[field]}
              onChange={(e) => setCreateData({ ...createData, [field]: e.target.value })}
            />
          ))}
        <div className='error_container'>
        {foundError1 &&
            <div className='error'>User not found</div>
          }
        </div>
          <button type='submit'>Создать</button>
        </form>
      </div>

      <div className="form-section">
        <form onSubmit={handleUpdateSubmit} className="form">
          <div className="subtitle">Редактирование</div >
          {Object.keys(updateData).map((field) => (
            <input
              key={field}
              type='text'
              name={field}
              placeholder={`Введите ${field}`}
              value={updateData[field]}
              onChange={(e) => setUpdateData({ ...updateData, [field]: e.target.value })}
            />
          ))}
          <div className='error_container'>
          {foundError2 &&
            <div className='error'>User not found</div>
          }
        </div>
          <button type='submit'>Изменить</button>
        </form>
      </div>

      <div className="form-section">
        <form onSubmit={handleDeleteSubmit} className="form">
          <div className="subtitle">Удаление</div >
          <input
            type='text'
            name='id'
            placeholder='Введите id пользователя'
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <div className='error_container'>
            {foundError3 &&
              <div className='error'>User not found</div>
            }
          </div>
          <button type='submit'>Удалить</button>
        </form>
      </div>

      <div className='users-list'>
          {users.length > 0 && 
          <>
            <div className="subtitle">Список пользователей</div >
            <div className='flex-container'>
              {users.map((user, index) => (
                <div key={index} className="user-card">
                  <IoCloseCircle className='close' onClick={()=>{handleCloseClick(user)}} />
                  <div><b>user id: </b> {user?.id}</div>
                  <div><b>username: </b> {user?.username}</div>
                  <div><b>email: </b> {user?.email}</div>
                </div>
              ))}
            </div>
          </>}
      </div>
    </div>
  )
}

export default App;