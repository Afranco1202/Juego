import React from "react";

type Data ={
  id:number;
  nombre:string;
  edad:string;
  correo:string;
}

type userListProps ={
  users: Data[];
  onDelete: (id:number) =>void;
}

export default function Card({users,onDelete}: userListProps){

  return(
  <div>
    {users.map((u)=>(
      <div
      key={u.id}
      className="flex items-center justify-between border-b py-2">
      <p> {u.nombre} {u.edad} {u.correo} </p>  
      <button className="borde-4" onClick={()=>onDelete(u.id)}>Eliminar</button>
      </div>  
    ))}
  </div>

  );

}