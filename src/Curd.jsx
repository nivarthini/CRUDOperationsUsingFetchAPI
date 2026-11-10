import { useEffect, useState } from 'react'

export default function Curd() {
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [username, setUsername] =  useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [website, setWebsite] = useState("")
    const [city , setCity] = useState("")
    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) =>{
            setData (data)
            setLoading(false)
        })
        .catch(() =>{
            setError(true)
            setLoading(false)
        })
    },[])

    const AddItems =() =>{
        const TrimmedName = name.trim();
        const TrimmedUserName = username.trim();
        const TrimmedEmail = email.trim();
        const TrimmedPhone = phone.trim();
        const TrimmedWebsite = website.trim();
        const TrimmedCity = city.trim()


        if(!TrimmedName || !TrimmedUserName || !TrimmedEmail || !TrimmedPhone || !TrimmedWebsite || !TrimmedCity){
            alert("Please fill all the fields")
            return
        }
            fetch("https://jsonplaceholder.typicode.com/users",{
                method : "POST",
                body: JSON.stringify({
                    name : TrimmedName,
                    username : TrimmedUserName,
                    email: TrimmedEmail,
                    phone: TrimmedPhone,
                    website: TrimmedWebsite,
                    address: {
                        city: TrimmedCity
                    }
                }),
                headers : {
                    "content-Type" : "application/json;charset=UTF-8"
                }
            })
            .then((res) => res.json())
            .then((person)=>{
                const NewUser = {...person, id: data.length+1, address: {city: TrimmedCity

                }
            }
                setData([...data, NewUser])
                setName("")
                setUsername("")
                setEmail("")
                setPhone("")
                setWebsite("")
                setCity("")
                setEditId(null)
            })
        }

            const EditItems = (person) =>{
                setName(person.name)
                setUsername(person.username)
                setEmail(person.email)
                setPhone(person.phone)
                setWebsite(person.website)
                setCity(person.address?.city || person.city || "")
                setEditId(person.id)
            }

            const UpdateItems = () =>{
                const TrimmedName = name.trim()
                const TrimmedUserName = username.trim()
                const TrimmedEmail = email.trim()
                const TrimmedPhone = phone.trim()
                const TrimmedWebsite = website.trim()
                const TrimmedCity = city.trim()

                if(!TrimmedName || !TrimmedUserName || !TrimmedEmail || !TrimmedPhone || !TrimmedWebsite || !TrimmedCity){
                    alert("Please fill all the fields")
                    return
                }

                fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
                    method: "PUT",
                            body: JSON.stringify({
                                name: TrimmedName,
                                username: TrimmedUserName,
                                email: TrimmedEmail,
                                phone: TrimmedPhone,
                                website: TrimmedWebsite,
                                address: {
                                    city: TrimmedCity
                                }
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        .then((res) => res.json())
                        .then(() => {
                            const UpdatedData = data.map((person) => {
                                if (person.id === editId) {
                                    return {
                                        ...person,
                                        name: TrimmedName,
                                        username: TrimmedUserName,
                                        email: TrimmedEmail,
                                        phone: TrimmedPhone,
                                        website: TrimmedWebsite,
                                        address: {
                                            city: TrimmedCity
                                        }
                                    }
                            }
                            return person
                        })

                        setData(UpdatedData)

                        setName("")
                        setUsername("")
                        setEmail("")
                        setPhone("")
                        setWebsite("")
                        setCity("")
                        setEditId(null)
                    })

                }



            const handleDelete =(id)=>{
                fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                    method: "DELETE"
                })
                .then((res)=>res.json())
                .then(()=>{
                    const UpdatedData = data.filter((user) => {
                        return user.id !== id
                    })
                    setData(UpdatedData)
                })


            }

    return (
    <div>
        <div className="content">
            <h2>User Details</h2>
            <div className="table">
                {loading && <h3>Loading Users...</h3>}
                {error && <h3>Something went wrong!</h3>}
                {!loading && !error && (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>City</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((person)=>{
                            return(
                                <tr key = {person.id}>
                                    <td>{person.id}</td>
                                    <td>{person.name}</td>
                                    <td>{person.username}</td>
                                    <td>{person.email}</td>
                                    <td>{person.phone}</td>
                                    <td>{person.website}</td>
                                    <td>{person.address?.city || person.city}</td>
                                    <td><button className="edit-button" onClick={()=> EditItems(person)}>Edit</button></td>
                                    <td><button className="delete-button" onClick={()=>handleDelete(person.id)}>Delete</button></td>
                                </tr>
                            )

                        })}

                    <tr>
                        <td></td>
                        <td><input type="text" value={name} onChange={(e)=> setName (e.target.value)} ></input></td>
                        <td><input type="text" value={username} onChange={(e)=> setUsername (e.target.value)} ></input></td>
                        <td><input type="email" value={email} onChange={(e)=> setEmail (e.target.value)} ></input></td>
                        <td><input type="tel" value={phone} onChange={(e)=> setPhone (e.target.value)} ></input></td>
                        <td><input type="text" value={website} onChange={(e)=> setWebsite (e.target.value)} ></input></td>
                        <td><input type="text" value={city} onChange={(e)=> setCity (e.target.value)} ></input></td>
                        <td colSpan="2" className="form-actions">{editId === null ? (
                            <button className="save-button" onClick={AddItems}>Add User</button>
                        ) : (
                            <>
                                <button className="save-button" onClick={UpdateItems}>Update</button>
                                <button className="cancel-button" onClick={() => {
                                    setName("")
                                    setUsername("")
                                    setEmail("")
                                    setPhone("")
                                    setWebsite("")
                                    setCity("")
                                    setEditId(null)
                                }}>Cancel</button>
                            </>
                        )}</td>
                    </tr>
                    </tbody>
                </table>
                )}
            </div>
        </div>
    </div>
    )
}
