import React, { useEffect, useState } from "react"
import {gql, useLazyQuery} from "@apollo/client"
import { EntityStore } from "@apollo/client/cache"

export const Persons = ({persons}) => {
    
    if(persons === null)
    {
        return null 
    }
    return (
        <div>
            <table>
            {persons.map( p=><div border = '1px' key={p.id} className="personas">
                <table>
                    <th id = "grade" className = "data">
                    {p.grade}
                    &nbsp;
                    </th>
                    <th id = "year" className = "data">
                    {p.year}
                    &nbsp;
                    </th>
                    <th id = "credits" className = "data">
                    {p.credits}
                    &nbsp;
                    </th>
                    <th id = "campus" className = "data">
                    {p.campus}
                    &nbsp;
                    </th>
                    <th id = "career" className = "data">
                    {p.career}
                    &nbsp;
                    </th>
                    <th id = "gender" className = "data">
                    {p.gender}
                    &nbsp;    
                    </th>
                </table>
            </div>
            )}
            </table>
        </div>
    )

}
