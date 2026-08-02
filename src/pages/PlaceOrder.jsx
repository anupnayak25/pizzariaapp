import React from 'react'
import pizzas from "../data/pizzzaData.json"
import PizzaCard from '../components/PizzaCard'

function PlaceOrder() {
  return (
    <>
    <h1 className='text-3xl p-5 font-bold'>Select your pizza.....!</h1>
    <div className='grid grid-cols-3 gap-4 m-2 p-2'>
      {pizzas.map((pizza)=>(
        <PizzaCard key={pizza.id} pizza={pizza}/>
      ))}

    </div>
    </>
  )
}

export default PlaceOrder