import {ApolloServer, gql, UserInputError} from 'apollo-server' //Importamos la libreria de Apollo
//import { findBreakingChanges } from 'graphql'
import './db.js'
import Persons from './models/persons.js'
import {v1} from 'uuid'
import { assertSchema } from 'graphql'
//import jwt from 'jsonwebtoken'
//import persons from './models/persons.js'
//import { PersistedQueryNotFoundError } from 'apollo-server-errors'

//Aqui le decimos a Graphql el tipo de dato que vamos a pedir

const typeDef = gql`

enum gender {
    Masculino
    Femenino
}

enum campus {
    IIT
    CU
    IADA
    ICB
    ICSA
}

type Person{
    grade: Float!
    year: Int!
    credits: Int!
    campus: String!
    career: String!
    gender: String!
    }

type Query {
    personsCount: Int
    allPersons(
        grade: Float
        year: Int
        credits: Int
        campus: String
        career: String
        gender: String
        ): [Person]
}
`


const resolvers = {
    Query: {
        personsCount: () => Persons.collection.countDocuments(),
        allPersons: async (root, args) =>
        {

            //Traemos los valores de los argumentos y los asignamos a constantes
            
            const {grade} = args
            const {year} = args
            const {credits} = args
            const {campus} = args
            const {career} = args
            const {gender} = args

            //El if es para revisar, si no recibimos ningun argumento nos va a mostrar todas las personas de la base de datos
            if(!args.grade && !args.year && !args.credits && !args.campus && !args.career && !args.gender){
                return Persons.find({})
            }
            else {
                //Caso contrario nos va a mostrar la informacion filtrada conforme se busca
                //Inicializamos variables extras las cuales nos van a servir para mandar la informacion requerida al $match
                var calificacion = {}
                var ano = {}
                var creditos = {}
                var campo = {}
                var carrera = {}
                var genero = {}
                
                /*Estos if consisten en que si existe un argumento pedido por el usuario este se mande, caso contrario
                se mandaria el valor vacio que iniciamos antes y ese filtro no nos realizaria*/
                if(args.grade){
                    calificacion = {grade:grade}
                }
                if(args.year){
                    ano = {year:year}
                }
                if(args.credits) {
                    creditos = {credits:credits}
                }
                if(args.campus){
                    campo = {campus:campus}
                }
                if(args.career){
                    carrera = {career:career}
                }
                if(args.gender){
                    genero = {gender:gender}
                }
                var dbmongo = {$match: {$and: [
                    calificacion,
                    ano,
                    creditos,
                    campo,
                    carrera,
                    genero
                ]}}
                return Persons.aggregate([
                    dbmongo
                ])
            }
        },
    },
}

const server = new ApolloServer({
    typeDefs: typeDef,
    resolvers
})

server.listen().then(({url}) => {//inicializa el servidor
    console.log(`Server ready at ${url}`)
}) 