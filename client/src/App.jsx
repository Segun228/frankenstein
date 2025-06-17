import './App.css'
import getUsers from './querries/GET/getUsers'
import createUser from './querries/POST/createUser'
import editUser from './querries/PUT/editUser'
import deleteUser from './querries/DELETE/deleteUser'
import { IoCloseCircle } from "react-icons/io5";
import { useEffect, useState } from 'react'
import ActionButton from './components/actionButton/ActionButton'
import AnimatedContent from './AnimatedContent/AnimatedContent/AnimatedContent.jsx'

function App() {
  const [users, setUsers] = useState([])
  const [foundUser, setFoundUser] = useState(null)

  const [foundError, setFoundError] = useState(null)
  const [foundError1, setFoundError1] = useState(null)
  const [foundError2, setFoundError2] = useState(null)
  const [foundError3, setFoundError3] = useState(null)

  const [foundSuccess, setFoundSuccess] = useState(null)
  const [foundSuccess1, setFoundSuccess1] = useState(null)
  const [foundSuccess2, setFoundSuccess2] = useState(null)
  const [foundSuccess3, setFoundSuccess3] = useState(null)

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
    e.stopPropagation();
    try {
      const user = await getUsers(getId);
      setFoundUser(user);
      console.log("User found:", user);
      setGetId("")
      setFoundSuccess(true)
      setFoundError(false)
    } catch (err) {
      setFoundSuccess(false)
      setFoundUser(null);
      setFoundError(true);
      console.error(err);
    }
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await createUser(createData);
      console.log("User created");
      await fetchUsers();
      setCreateData({ email: "", username: "", password: "", })
      setFoundSuccess1(true)
      setFoundError1(false);
    } catch (err) {
      setFoundError1(true);
      setFoundSuccess1(false)
      console.error(err);
    }
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await editUser(updateData);
      console.log("User updated");
      await fetchUsers();
      setUpdateData({ id: "", email: "", username: "", password: "" })
      setFoundError2(false);
      setFoundSuccess2(true)
    } catch (err) {
      setFoundError2(true);
      setFoundSuccess2(false)
      console.error(err);
    }
  }

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteUser(deleteId);
      console.log("User deleted");
      await fetchUsers();
      setDeleteId("")
      setFoundError3(false);
      setFoundSuccess3(true)
    } catch (err) {
      console.error(err);
      setFoundError3(true);
      setFoundSuccess3(false)
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

  const handleMessageClear = ()=>{
    setFoundError(false)
    setFoundSuccess(false)
  }

  const handleMessageClear1 = ()=>{
    setFoundError1(false)
    setFoundSuccess1(false)
  }

  const handleMessageClear2 = ()=>{
    setFoundError2(false)
    setFoundSuccess2(false)
  }

  const handleMessageClear3 = ()=>{
    setFoundError3(false)
    setFoundSuccess3(false)
  }

  return (
    <div className="wrapper">
      <div className="title">FRANKENSTEIN APP</div>
      <AnimatedContent>
        <div className="form-section" onClick={()=>handleMessageClear()}>
          <form onSubmit={handleGetSubmit} className="form">
            <div className="subtitle">Получение</div >
            <input
              type='text'
              name='id'
              placeholder='Введите id пользователя'
              value={getId}
              onChange={(e) => setGetId(e.target.value)}
            />
            <ActionButton type="submit">Найти</ActionButton>
          </form>
          {foundError &&
            <div className='error'>User not found</div>
          }
          {foundSuccess &&
            <div className='success'>User found succesfully</div>
          }
          {foundUser &&
            <div className="user-card">
                <div><b>user id:</b> {foundUser?.id}</div>
                <div><b>username:</b> {foundUser?.username}</div>
                <div><b>email:</b> {foundUser?.email}</div>
                <div><b>full name:</b> {foundUser?.first_name + " " + foundUser?.last_name}</div>
            </div>
          }
        </div>
      </AnimatedContent>

      <AnimatedContent>
      <div className="form-section" onClick={()=>handleMessageClear1()}>
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
          {foundError1 &&
            <div className='error'>Error creating user</div>
          }
          {foundSuccess1 &&
            <div className='success'>User created succesfully</div>
          }
          <ActionButton type="submit">Создать</ActionButton>
        </form>
      </div>
      </AnimatedContent>

      <AnimatedContent>
      <div className="form-section" onClick={()=>handleMessageClear2()}>
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
          {foundError2 &&
            <div className='error'>Error editing user</div>
          }
          {foundSuccess2 &&
            <div className='success'>User edited succesfully</div>
          }
          <ActionButton type="submit">Изменить</ActionButton>
        </form>
      </div>
      </AnimatedContent>

      <AnimatedContent>
      <div className="form-section" onClick={()=>handleMessageClear3()}>
        <form onSubmit={handleDeleteSubmit} className="form">
          <div className="subtitle">Удаление</div >
          <input
            type='text'
            name='id'
            placeholder='Введите id пользователя'
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          {foundError3 &&
            <div className='error'>Error deleting user</div>
          }
          {foundSuccess3 &&
            <div className='success'>User deleted succesfully</div>
          }
          <ActionButton type="submit">Удалить</ActionButton>
        </form>
      </div>
      </AnimatedContent>

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