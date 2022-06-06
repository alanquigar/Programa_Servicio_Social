import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import React from 'react'
import {gql, useQuery, useLazyQuery} from "@apollo/client"
import {Persons} from './Persons'
import { argsToArgsConfig } from 'graphql/type/definition'
import { Bar } from 'react-chartjs-2'



//PAGINA IMPORTANTE https://www.apollographql.com/blog/apollo-client/how-to-filter-and-search-using-variables-in-apollo-client/
//https://www.apollographql.com/docs/react/data/queries/#refetching


const ALL_PERSONS = gql`
  query AllPersons(
    $grade: Float
    $gender: String
    $year: Int
    $campus: String
    $credits: Int
    $career: String
  ) {
  allPersons(
    grade: $grade
    gender: $gender
    year: $year 
    campus: $campus
    credits: $credits
    career: $career
    ) {
    grade
    year
    credits
    career
    campus
    gender
  }
}
`
function usePersonsFilters(){
  const [filters, _updateFilter] = useState({
    gender: undefined
  })
  
  const updateFilter = (filterType, value) => {
    _updateFilter({
      [filterType]: value,
    });
  };

  return {
    models: {filters},
    operations: {updateFilter},
  }



}
function App(){
  
  const {data, loading, error, refetch} = useQuery(ALL_PERSONS,{
    variables: {},
  })
  

  if(error){  
    return <div className="App">
    <header className="App-header">
      <img src="http://www3.uacj.mx/comunicacion/PublishingImages/Escudo%20UACJ%202015/Logotipo%20(descriptivo)uacj%202015-azul-sin%20fondo.png" className="App-logo" alt="logo" />
      <div>
        <h1>
          Error en el sistema
        </h1>
      </div>
      {loading 
        ? <p className='Cargando'>Cargando...</p>
        : data.allPersons.map((allPersons) => (
          <table className='Tabla'>
            <th>
              {JSON.stringify(allPersons.grade)}
            </th>
             <th> 
              {JSON.stringify(allPersons.year)}
            </th>
            <th> 
              {JSON.stringify(allPersons.credits)}
            </th>
            <th> 
              {JSON.stringify(allPersons.campus)}
            </th>
            <th> 
              {JSON.stringify(allPersons.career)}
            </th>
            <th> 
              {JSON.stringify(allPersons.gender)}
            </th>
          </table>
        ))
        }
    </header>
  </div>
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src="http://www3.uacj.mx/comunicacion/PublishingImages/Escudo%20UACJ%202015/Logotipo%20(descriptivo)uacj%202015-azul-sin%20fondo.png" className="App-logo" alt="logo" />
        <div>

        {/*Grade*/}
      <input id='grade' type="integer" placeholder='Calificacion' onChange={()=> refetch({grade:parseFloat(grade.value)})}></input>

        {/*Year*/}
      <input id='year' type="integer" placeholder='Año' onChange={()=> refetch({year:parseInt(year.value)})}></input>

        {/*Credits*/}
      <input id='credits' type="integer" placeholder='Creditos' onChange={()=> refetch({credits:parseInt(credits.value)})}>
      </input>

        {/*Campus*/}
      <select id = "campus" onChange={() => refetch({campus:campus.value})}>
        <option value="">Campus</option>
        <option>IIT</option>
        <option>CU</option>
        <option>ICSA</option>
        <option>IADA</option>
        <option>ICB</option>
      </select>

       {/*Career*/}
       <input id='career' type="text" placeholder='Carrera' onChange={()=> refetch({career:career.value})}>
      </input>

        {/*Gender*/}
      <select id = "gender" onChange={() => refetch({gender:gender.value})}>
        <option value="" >Genero</option>
        <option>Masculino</option>
        <option>Femenino</option>
      </select>

        </div>
        {loading 
        ? <p className='Cargando'>Cargando...</p>
        : data.allPersons.map((allPersons) => (
          <table className='Tabla'>
            <th>
              {JSON.stringify(allPersons.grade)}
            </th>
             <th> 
              {JSON.stringify(allPersons.year)}
            </th>
            <th> 
              {JSON.stringify(allPersons.credits)}
            </th>
            <th> 
              {JSON.stringify(allPersons.campus)}
            </th>
            <th> 
              {JSON.stringify(allPersons.career)}
            </th>
            <th> 
              {JSON.stringify(allPersons.gender)}
            </th>
          </table>
        ))
        }
      </header>
    </div>
  )
}

export default App
