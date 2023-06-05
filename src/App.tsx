import { ChangeEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { StoreApp } from "../../backend/node_modules/@prisma/client"
import axiosInstance from "./axiosInstance";

function App() {
  const [apps, setApps] = useState<StoreApp[]>([])
  const [adding, setAdding] = useState(false);
  const [values, setValues] = useState({
    name: "",
    category: "",
    description: "",
    rating: 0,
    price: 0,
    downloads: 0,
    isVerified: false,
    developerId: 0
  })

  function handleDeleteApp(appId: number) {
    axiosInstance.delete(`/apps/${appId}`).then(response => {
      console.log(response)
      console.log(`App with ID ${appId} deleted successfully`);
      setApps(apps.filter(app => app.id !== appId));
    }).catch(error => {
      console.error(`Error deleting app with ID ${appId}: ${error}`);
    });
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  function handleAddApp() {
    axiosInstance.post<StoreApp>(`/apps`, {
      ...values,
      developerId: Number(values.developerId),
      price: Number(values.price),
      rating: Number(values.rating),
      downloads: Number(values.downloads),
    }).then(response => {
      console.log(response.data);
      setApps([...apps, response.data]);
    }).catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    axiosInstance.get<StoreApp[]>('/apps').then(response => {
      setApps(response.data);
    });
  }, []);


  return (
    <div className="bg-zinc-900 w-full h-full text-lime-400 m-0 font-mono">
      <div className="flex w-full justify-center">
        <ul>
          <li className="text-4xl p-3">
            Google Play
            <div className="cursor-pointer" onClick={() => setAdding(true)} >Add</div>
          </li>
          <li>
            <Link to={"/"}></Link>
          </li>
          <li>
            <Link to={""}></Link>
          </li>
        </ul>
      </div>
      <div className="grid gap-4 grid-cols-5 place-items-center ">
        {apps.map((app) => (
          <div className="pt-2 list-none bg-zinc-800 w-64 h-32 flex place-items-center flex-col text-center align-middle rounded-xl" key={app.id}>
            <Link to={`/store/apps/${app.developerId}/${app.id}`} className="cursor-pointer text-xl break-words w-60">{app.name} </Link>
            <div>category: {app.category}</div>
            <div className="text-xs">{app.rating} ★ {app.downloads} downloads</div>
            <div >{app.price} $ <span onClick={() => { handleDeleteApp(app.id) }} className="text-xs cursor-pointer text-lime-400 border px-1 rounded-full border-solid border-lime-500">✕</span></div>
          </div>
        ))}
      </div>
      {adding ?
        <div className="absolute top-10 left-32 w-1/4 h-96 bg-zinc-900 shadow-xl p-5 text-justify shadow-zinc-800">
          <div className="flex justify-between ">EDITING<span className="cursor-pointer" onClick={() => setAdding(false)} >X</span></div>
          <form className="h-full flex flex-col justify-around py-2">
            <label className="flex justify-between ">
              Name:
              <input name="name" onChange={handleInputChange} value={values.name} type="text" className="w-56 bg-zinc-800 rounded-lg px-2" />
            </label>
            <label className="flex justify-between ">
              Category:
              <input name="category" onChange={handleInputChange} value={values.category} type="text" className="w-56 bg-zinc-800 rounded-lg px-2" />
            </label>
            <label className="flex justify-between ">
              Description:
              <input name="description" onChange={handleInputChange} value={values.description} type="text" className="w-56 bg-zinc-800 rounded-lg px-2" />
            </label>
            <label className="flex justify-between ">
              Rating:
              <input name="rating" onChange={handleInputChange} value={values.rating} type="text" className="w-56 bg-zinc-800 rounded-lg px-2" />
            </label>
            <label className="flex justify-between ">
              Price:
              <input name="price" onChange={handleInputChange} value={values.price} type="text" className="w-56 bg-zinc-800 rounded-lg px-2" />
            </label>
            <label className="flex justify-between ">
              DeveloperId:
              <input name="developerId" onChange={handleInputChange} value={values.developerId} type="text" className="w-56 bg-zinc-800 rounded-lg px-2" />
            </label>
            <div onClick={() => handleAddApp()} className="cursor-pointer text-lime-400 border px-1 border-solid border-lime-500 text-center" >
              Confirm
            </div>
          </form>
        </div>
        :
        null
      }
    </div>
  )
}

export default App
