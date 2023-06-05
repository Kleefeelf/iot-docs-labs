import { ChangeEvent, useEffect, useState } from "react"
import { AppDto } from '../../backend/src/dto/app.dto';
import { StoreApp } from "../../backend/node_modules/@prisma/client"
import axiosInstance from "./axiosInstance";
import { useParams } from "react-router-dom";

interface Props {
  id: string;
  developerId: string;
}

function AppDetail(props: Props) {
  const [app, setApp] = useState<AppDto>();
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState({
    name: "",
    category: "",
    description: "",
    rating: 0,
    price: 0,
    downloads: 0,
    isVerified: false,
    developerId: props.developerId
  });

  useEffect(() => {
    axiosInstance.get<StoreApp>(`/apps/${props.id}`).then(response => {
      setApp(response.data);
    });

    console.log(values)
  }, [props.id, values, editing]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  function handleUpdateApp() {
    axiosInstance.put(`/apps/${props.id}`, {
      ...values,
      developerId: Number(values.developerId),
      price: Number(values.price),
      rating: Number(values.rating),
      downloads: Number(values.downloads),
      isVerified: values.isVerified ? true : false
    }).then(response => {
      setApp(response.data)
      console.log(response.data);
    })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <div className="p-10 w-full bg-zinc-900 min-h-screen h-full text-lime-400 m-0 font-mono flex flex-col justify-center items-center">
      <div className="w-96">
        <div className="text-2xl">{app?.name} </div>
        <div className="text-justify">About this game: <br />{app?.description}</div>
        <div>Category: {app?.category} </div>
        <div >
          <div className="flex justify-between text-justify">{app?.rating} ★ {app?.price} $ {app?.downloads} downloads </div>
        </div>
        <div> </div>
        <div className="pt-2 justify-between flex">
          <div className="w-36 text-center cursor-pointer border-solid border-2 border-lime-800">Download</div>
          <div onClick={() => setEditing(true)} className="w-36 text-center cursor-pointer border-solid border-2 border-lime-800">Update</div>
        </div>
        <div>
          {app?.reviews?.map((review) => (
            <div className="m-5 bg-zinc-800 p-4 rounded-xl" key={review?.id}>
              <div>
                {review?.rating} ★
              </div>
              <div>
                {review?.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      {editing ?
        <div className="absolute top-10 left-32 w-1/4 h-96 bg-zinc-900 shadow-xl p-5 text-justify shadow-zinc-800">
          <div className="flex justify-between ">EDITING<span className="cursor-pointer" onClick={() => setEditing(false)} >X</span></div>
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
              isVerified:
              <input name="isVerified" onChange={handleInputChange} checked={values.isVerified} type="checkbox" className="defaul:bg-zinc-800 px-2" />
            </label>
            <div onClick={() => handleUpdateApp()} className="cursor-pointer text-lime-400 border px-1 border-solid border-lime-500 text-center" >
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
// {
//   "name": "New App Name",
//   "category": "New Category",
//   "description": "New Description",
//   "rating": 4,
//   "price": 99,
//   "downloads": 10000,
//   "isVerified": true,
//   "developerId": 52
// }
function AppDetailWrapper() {
  const { id, developerId } = useParams<{ id?: string, developerId?: string }>();
  if (!id) {
    return <div>Invalid Id</div>
  }
  if (!developerId) {
    return <div>Invalid Id</div>
  }
  return <AppDetail id={id} developerId={developerId} />;
}


export default AppDetailWrapper
