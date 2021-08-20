import React, {useState} from "react"
import { useForm } from "react-hook-form"

const ReactForm = () => {
  const [friends, setFriends] = useState([])
  const [counter, setCounter] = useState(0)
  const { 
    handleSubmit, 
    register,
    formState: { errors }
  } = useForm();

  console.log(errors, "errors")

  const addFriend = () => {
    setFriends(prevFriends => [...prevFriends, counter])
    setCounter(prevCounter => prevCounter + 1)
  }

  const removeFriend = index => () => {
    setFriends(prevFriends => [...prevFriends.filter(i => i !== index)])
    setCounter(prevCounter => prevCounter - 1)
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("username", { required: true })} />                   
      <input type="email" {...register("email", { pattern: /(.+)@(.+){2,}\.(.+){2,}/ })} />                   
      <input type="text" {...register("phone_number", { pattern: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ })} />                   
      <input type="password" {...register("password", { min: 6 })} /> 

      <h3>Next of kin</h3>
      <input 
        type="text" 
        {...register("kin.full_name")} 
      /> 
      <input 
        type="text" 
        {...register("kin.phone_number")} 
      /> 

      <h3>Friends</h3>
      {friends.map((f, index) => {
        const field = `friends[${index}]`;
        return ( 
          <div key={index} className="grid grid-col"> 
            <input 
              type="text" 
              {...register(`${field}.full_name`)} 
            /> 
            <button className="close" type="button" onClick={removeFriend(index)}>x</button>
          </div>
        )
      })}

      <button className="btn" type="submit">Send</button>
    </form>

    <button className="btn" type="button" onClick={addFriend}>add</button>
    </>
  )
} 

export default ReactForm