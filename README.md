"# Programa_Servicio_Social" 

//db.js
En este archivo creamos la conexion entre la base de datos, en este caso es con MongoDB
En mi caso, que utilicé las pruebas en MongoDb, utilicé una URL 'mongodb+srv://AlanQuigar:QUGA68529@cluster0.fbh5m.mongodb.net/alumnos?retryWrites=true&w=majority'
La cual está dividida por segmentos, AlanQuigar, es el nombre del lider de la base de dataos, QUGA68529 es la contraseña que permite el acceso y alumnos es la carpeta a la que va a entrar para buscar la informacion

//index.js
Aqui es donde utilicé al libreria de ApolloServer y GraphQL

Primero, hice una constante la cual se llama typeDef la cual va a agarrar todas las definiciones que se le van a asignar a GraphQL lo cual son los enums la query y la type person

Los enums, los creé por el hecho de que las unicas variables que usan poco contenido son genero y campus.
El type Person basicamente hace un objeto llamado persona, en el cual declararemos el nombre de la variable que vamos a enviarle y el tipo de variable, siempre la primera en mayuscula(Int, Float, String) y se le agrega un signo de exclamacion al final '!' para decirle a GraphQL que ese dato se requiere pedir obligatoriamente
Despues, creé la Query, en el que podemos hacer un conteo de personas con la funcion personsCount, y realizar busquedas, creamos la funcion allPersons() y todo lo que este dentro del parentesis son los criterios que declararemos y que va a aceptar, despues, pondremos dos puntos y lo que nos va a devolver, en este caso, al enviarle las variables nos va a regresar un objeto que llame Person

Despues de todo esto, ahora si podemos ver los resolvers, los cuales nos ayudarán al funcionamiento del programa. Como antes ya había declarado la funcion allPersons, ahora la utilicé como funcion async la cual va a esperar y recibir argumentos de nuestro programa en el ApolloStudio, el cual por default está en el localhost:4000. 
Al momento de recibir los argumentos los guardamos en contantes y se los guardamos a MongoDB para que realice la busqueda, en caso de no haber ningun argumento, deja la busqueda vacia del criterio o criterios, y regresa unicamente las personas que cumplan con los valores pedidos en ApolloStudio.

Al pie de la pagina viene la conexion a ApolloStudio

// PROGRAMA_SERVICIO//models//persons.js
En este archivo hacemos la validacion a MongoDB, su unico proposito es que validar informacion que vayamos a agregar en caso de que queramos hacer una funcion para agregar algun alumno, que este tenga la informacion necesaria para poder ser valido en nuestra base de datos en MongoDB

// PROGRAMA_SERVICIO//react-graphql//src//main.jsx
Como ya tenemos un programa que puede funcionar bien, usando el ApolloStudio, ahora solo quedaba poder mostrarlo en una interfaz mas comoda, para ello utilicé React, que funciona muy bien con Apollo y GraphQL, para ello, importamos lo que utiliza ApolloStudio y lo declaramos en este archivo para poder utilizarlo

// PROGRAMA_SERVICIO//react-graphql//src//App.jsx
En este archivo, las peticiones funcionan un poco diferentes, porque a nuestra query, tenemos que decirle que vamos a hacer una peticion de datos dentro de los parentesis de la funcion AllPersons la cual nos va a realizar la busqueda en nuestra query de ApolloStudio llamada allPersons, con las mismas variables que declaramos en la funcion AllPersons y siguiente a esto, nos va a regresar nuestras variables ya filtradas 

Despues de ello unicamente desplegamos la informacion a la pantalla para ello, creé dos condicionales, en caso de que no encuentre exactamente la informacion pedida porque no hay criterios que lo cumplan o hay algun error, que muestre todos los alumnos de la base de datos, en caso de que si cumple, va a hacer un refetch de la informacion que se escribe en los inputs y va a ir haciendo el filtrado de las personas dependiendo de los inputs que se llenen, despues, estos los va a mostrar a manera de String 

// PROGRAMA_SERVICIO//react-graphql//src//Persons.jsx
Aqui solamente creamos la tabla para mostrar nuestra informacion

