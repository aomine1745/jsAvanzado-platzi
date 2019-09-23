# JS Avanzado - Platzi
Ser un profesional es un duro camino lleno de experiencias
## ¿Qué forma a un profesional?
* Conocimiento del lenguaje
* Conocimiento de los entornos de programación
* Mejores Prácticas
* Versado en código
* Herramientas
* Ética / Profesionalismo
* Experiencia
## El lenguaje - JavaScript
* Fundamentos
* No fundamentos
* Cómo funciona
## No fundamentos
* Promesas (Nivel Pro)
* Getters, Setters
* Proxies
* Generadores
## Como funciona
* Javascript Engine
* Herencia prototipal
* Event Loop
## Entornos de programación
* Browse y el DOM Api
## Versado en código
* Hay que leer código
* Mucho
* Constantemente
## Mejores Practicas
* No reinventamos la rueda
* Probamos nuestro código
## Ética
* Ser responsable
* Entregar a tiempo
* Saber decir que no
* No hacer daño
## Experiencia
* Nada le gana a esto
* No se puede enseñar
* Está en ti
* Perseverancia
![infografia](./md/Infografia.jpg)
## Como llega un script al navegador
### DOM
Representacion de un archivo `<addr>` HTML en un objeto
![DOM](./md/dom.jpg)

Cuando el navegador recibe HTML, recibe todo esto y lo procesa, convirtiendola a una estructura de arbol
![Arbol](./md/arbol.jpg)

Cuando termina de procesarlo es que ocurre **DOMContentLoaded**
### Scripts externos o embebido
![Script](./md/script1.jpg)

Cuando el DOM se este procesando va a detener todo el procesamiento
![Script](./md/script2.jpg)

Donde ponemos los scripts son importantes
![Script](./md/script3.jpg)

Si corremos este codigo... PAMP

![Script](./md/script4.jpg)

Dijimos que el procesamiento de HTML se detiene y al ejecutarse el script la etiqueta form no existe por lo que genera un TyperError.
Solucion poner el form antes del script
![Script](./md/script5.jpg)

### Scripts Externos
Sucede lo mimo cuando se hace un fetching de datos, el DOM se detiene cuando llega al script y no es hasta que se cumpla que el HTMl se seguira procesando
![Script](./md/script6.jpg)

Ahora se le puede dar un atributo async a los fetching externos, con esto la peticion va a ocurrir asyncronamente sin interrumpir el proceso del DOM, so se detendra cuando se cumpla y se ejecute el script
![Script](./md/script7.jpg)

¿Qué pasa si yo tengo 2 scripts asincronos?
![Script](./md/script8.jpg)

Tenemos una 3ra forma para traer archivos externos - defer,
Similar al async, el fetching de datos no dentendra el proceso del DOM pero la ejecución ocurrira al final.
![Script](./md/script9.jpg)

## Scoped
EL scoped o ambito de una variable representa el tiempo de vida en el que esta existe.
## Closuers
Combinación del scope de una function y la funcion donde fue definida.
## this
this se refiere a un objeto. Ese objeto es el que actualmente está ejecutando un pedazo de código
### Metodos
* call(this, var1, var2, ...)
  * Ejecuta la función
* apply(this, [var1, var2, ...])
  * Ejecuta la función y recibe los parametros en un array
* bind(this, var1, var2, ...)
  * crea una nueva función

## Como funciona JavaScript
¿Qué es lo que sucede cuando un script llega al navegador?
### Hablemos de la web
La web no siempre ha sido igual, y cuando llego js llego con Netscape
JS es interpretado (linea por linea a la vez)
![Script](./md/comoFuncionaJS1.jpg)

Esto sigue siendo cierto pero de una manera totalmente nueva
### La web no es como antes
Y esta manera llego con Google Chrome
![Script](./md/comoFuncionaJS2.jpg)

Google tenia una serie de productos sumamente complejos como Google Maps y necesitaba un navegdor que fuera capaz de ejecutar las cosas mas eficientemente y por eso reinvento como funcionaban los motores de JS.
En resumen esto es lo que hace:

![Script](./md/comoFuncionaJS3.jpg)

Veamos un gráfico de este orden
![Script](./md/comoFuncionaJS4.jpg)

Que eventualmente va a producir el machine code, esto lo hace el optimizing compiler.
En algunas ocaciones esto puede fallar, y desoptimizamos el código.

Pero por ahora nos vamos a centrar en  el Parser y en el Abstract Syntax tree
### ¿Qué hace un parser?
![Script](./md/comoFuncionaJS5.jpg)

Un parser va a agarrar un código fuente y lo va a leer, pero lo que tu estas escribiendo no es lo que la computadora entiene, primero lo va a descomponer y lo que salga de esa descomposicion se llaman  token.
Token identifican que let y new son palabras, que +, -, * son operadores etc, una vez tenemos esos tokens vamos a hacer el AST.
¿Qué pasa si el parser esta analizando tu programa y encuentra algo que no entiende?
Juto ahi ocurre un syntax error
![Script](./md/comoFuncionaJS6.jpg)

Recordemos que los lenguajes de programación son lenguajes formales, muy estrictos si violamos una regla no hay forma de saber que querias hacer.
El proceso de parcing es importante que se haga bien.
![Script](./md/comoFuncionaJS7.jpg)

Google nos dice que el parcing es 15% al 20% del proceso de ejecución. lo que quiere decir que mientras maás mgrande es tu proyecto más va a tardar el parcing.

### Parser de V8
Existen 2 modos de hacer paring, lo que hace el motor de google chrome o el de node que son los mismos V8
![Script](./md/comoFuncionaJS8.jpg)

Podemos ver [esprima](https://esprima.org/demo/parse.html) para ver como procesa la información el parser
![Script](./md/comoFuncionaJS10.jpg)

### AST
Es una estructura en forma de arbol, donde vamos a tener una raiz que va a ser nuestro programa y lo vamos a ir descomponiendo en partes, todo esto lo vamos a hacer siguiendo los tokens que produjo el parser.
* Ejemplos
 * Babel
 * Prettier
![Script](./md/comoFuncionaJS9.jpg)

Podemos entrar a [AST explorer](https://astexplorer.net) y crear una regla de Eslint usando AST
```javascript
export default function(context) {
  return {
    VariableDeclaration(node) {
      // tipo de variable const
      if(node.kind == "const") {
        const declaration = node.declarations[0];
        console.log(typeof declaration.init.value)
        // asegurarnos que el valor es un número
        if(typeof declaration.init.value === "number") {
        	if(declaration.id.name !== declaration.id.name.toUpperCase()) {
            	context.report({
                	node: declaration.id,
                  	message: "El nombre de la constante debe estar en mayúsculas",
                  	fix: function(fixer) {
                    	return fixer.replaceText(declaration.id, declaration.id.name.toUpperCase())
                    }
               	})
            }
        }
      }
    }
  };
};

```

![Script](./md/comoFuncionaJS11.jpg)

### JS Engine 
![Script](./md/comoFuncionaJS12.jpg)

Despues de que el parser hizo su trabajo y nos dio el AST continua el interpretador para tener código optimizado
![Script](./md/comoFuncionaJS13.jpg)

Ahora vamos a estar produciendo algo llamado bytecode, que sera lo que ejecuta el motor de JS y a su vez va a producir código optimizado.

![Script](./md/comoFuncionaJS14.jpg)

Cuando el bytecode se esta ejecutando, un observador estara tomando notas, y cuando tiene suficientes notas, tomara deciciones para optimizar tú código, si algunas de estas observaciones en el futuro resultan ser falsa tu código regresara una versión optimizada anterior.

Comparemos que es bytecode contra machinecode, que es lo que sucede cuando hacemos código optimizado
![Script](./md/comoFuncionaJS15.jpg)

Cuando el motor de JS V8 que son usados por chrome y node, produce este códigova a crearlo a machine code
![Script](./md/comoFuncionaJS16.jpg)

Veamos un prógrama que esta en medio del bytecode y del optimizador, el profiling toma observación de la ejecución del bytecode y cuando ve que las funciones se estan llamando igual una vez tras otra tras otra, puede hacer alguna optimizaciones
Un Ejemplo:

![Script](./md/comoFuncionaJS17.jpg)

Cuando la función ha sido usada 10 20 30 100 veces va a ponerse caliente
![Script](./md/comoFuncionaJS18.jpg)

Luego 100 ves más, mas caliente
![Script](./md/comoFuncionaJS19.jpg)

Luego super caliente

![Script](./md/comoFuncionaJS20.jpg)

y entonces ya esta listo para ser optimizado
![Script](./md/comoFuncionaJS21.jpg)

en terminos de v8 se le dice "is a hot function"
![Script](./md/comoFuncionaJS16.jpg)

Esto significa que el optimizador de código esta listo para optmizar esa parte a machinecode

### Motorores  de JS
#### V8 (Chorme)
![Script](./md/comoFuncionaJS16.jpg)

#### SpiderMonkey (Firefox)
tiene 2 capas de optimización

![Script](./md/comoFuncionaJS23.jpg)

#### Chakra (Edge)
![Script](./md/comoFuncionaJS24.jpg)

#### JavaScript Core (Safari)
Tiene 3 capaz de optimizacion

![Script](./md/comoFuncionaJS25.jpg)

Esto no quiere decir que safari sea más rapido que chrome

### Event Loop
![Script](./md/comoFuncionaJS26.jpg)

Es lo que hace parecer a JS Mutlihilo cuando realmente es un solo hilo.
Entonces como podemos hacer multiples eventos a la vez si solo tenemos un hilo

Tenemos que entender que JS se organiza usando 2 estructura de datos
![Script](./md/comoFuncionaJS27.jpg)

- El Stack es el que lleva rastro de donde esta el programa..
- Tambien tenemos el Memory Head que es una estructuta desorganizada

#### Stack
El stack comienza vacio

![Script](./md/comoFuncionaJS28.jpg)

Pero haciendo una opreación llamado push, imagines que cada push seria un plato
![Script](./md/comoFuncionaJS29.jpg)

Un puh tras otro push, un plato sobre otro plato
![Script](./md/comoFuncionaJS30.jpg)

Si deseas quitar algun plato, solo lo podras hacer quitando los que esten por encima, y ha este proceso se le llama Pop
![Script](./md/comoFuncionaJS31.jpg)

Se puede realizar hasta dejar el Stack vacio
![Script](./md/comoFuncionaJS32.jpg)

EL Stack es donde estan nuestras funciones, registro de como esta openando nuestro programa, apunta a variables como el scope

![Script](./md/comoFuncionaJS33.jpg)

Entonces si tenemos un programa como este podemos ver como va cambiando el stack, iniciamos con anonimous ya que el programa no tiene un nombre
![Script](./md/comoFuncionaJS34.jpg)

Lo primero que se ejecuta es main, por lo cual se suma al stack
![Script](./md/comoFuncionaJS35.jpg)

Y esta ejecuta primeramente a hello, por lo cual tambien se suma al stack
![Script](./md/comoFuncionaJS36.jpg)

Y este ejecuta un console log
![Script](./md/comoFuncionaJS37.jpg)

Una vez termina volvemos a main
![Script](./md/comoFuncionaJS35.jpg)

Y ahora se ejecta world con su console log

![Script](./md/comoFuncionaJS38.jpg)

Luego volvemos a main, que ya no tiene nada que ejecutar por lo que volvemos a anonymous y termina el programa
![Script](./md/comoFuncionaJS39.jpg)

Ahora veamos un prógrama asíncrono
![Script](./md/comoFuncionaJS40.jpg)

hasta el momento hemos ejecutado el programa hasta el setTimeout el cual es asincrono, asique se continua con  el console.log('world')

![Script](./md/comoFuncionaJS41.jpg)

Se acabo la función

![Script](./md/comoFuncionaJS42.jpg)

hacemos Pop de todo el Stack

![Script](./md/comoFuncionaJS43.jpg)

eventualuamente tenemos que volver al stack para ejecutar el setTimeout
![Script](./md/comoFuncionaJS44.jpg)

y volvemos a salir y a vaciarl el stack
![Script](./md/comoFuncionaJS43.jpg)

#### Queque
![Script](./md/comoFuncionaJS45.jpg)
Si en el stack lo primero que entra es lo ultimo que sale en el queue lo primero que entra es lo primero que sale, Como en una fila del banco el primero que llega es el primero en ser atendido y en irse, y es eso, una fila.

Hablempos de la cola de Tareas, volvamos al ejemplo asincrono.
![Script](./md/comoFuncionaJS46.jpg)

Cuando teniamos el setTimeout encolamos una tarea que se iba a hacer en 1 segundo
![Script](./md/comoFuncionaJS47.jpg)

Terminan las tareas restantes y espera a que pase 1 segundo
![Script](./md/comoFuncionaJS48.jpg)

Sacamos el evento de las tareas agendadas y lo pasamos al task queue
![Script](./md/comoFuncionaJS49.jpg)

Y eventualmente volvera al stack, para que el programa siga ejecutandose y veamos el hello que quedo retrasado, ya que era asincrono.
¿Cómo pasa esto? Event Loop
![Script](./md/comoFuncionaJS50.jpg)

El event loop es este script que esta entre medio del stack y la cola de tareas que todo el tiempo esta viendo si hay tareas. y la otra pregunta que se hace es si esta vacio el stack, si esta vacio agarra las tareas del task queue y las pondra en el stack, y se ejecutara la función.

![Script](./md/comoFuncionaJS51.jpg)
  
En este caso tenemos un setTimeout de 0(agendada ya que es asincrono) por lo que sera al instante
![Script](./md/comoFuncionaJS52.jpg)

Asi que tan pronto lo ponga sale del stack, se va a la agenda(scheduled tasks) y de inmeditato a la cola de tareas (task queue)

![Script](./md/comoFuncionaJS53.jpg)

Pero mi programa no a acabado y recordemos el event loop siempre esta pregintando si existe alguna tarea en la cola de tareas y si encuentra algo pregunta si el stack esta vacio, y si no lo estas pues espera que termine el stack se vacie(termine el programa).

![Script](./md/comoFuncionaJS53.jpg)

Event Loop: Esta vacio? Esta vacio? Esta vacio? Esta vacio?
Stack: Nope, awanta

![Script](./md/comoFuncionaJS54.jpg)

Event Loop: Esta vacio? Esta vacio? Esta vacio?
Stack: seeee

![Script](./md/comoFuncionaJS55.jpg)

Event Loop: Ahi te voy :V

![Script](./md/comoFuncionaJS56.jpg)

Se ejecuta y termina el programa
![Script](./md/comoFuncionaJS57.jpg)

Un ultimo ejemplo, ahora con 2 tareas agendadas
![Script](./md/comoFuncionaJS58.jpg)
![Script](./md/comoFuncionaJS59.jpg)
![Script](./md/comoFuncionaJS60.jpg)
![Script](./md/comoFuncionaJS61.jpg)
![Script](./md/comoFuncionaJS62.jpg)
![Script](./md/comoFuncionaJS63.jpg)
![Script](./md/comoFuncionaJS64.jpg)

#### Promesas
Son Promesas de que algo eventualemte sucedera (asincrono)
![Script](./md/comoFuncionaJS65.jpg)

Pues resulta que las tareas de promesas van en otra cola (cola de micro tareas)
![Script](./md/comoFuncionaJS66.jpg)

Ya que el setTimeout es inmediato, inmediatamente se va a al cola de tareas
![Script](./md/comoFuncionaJS67.jpg)

Se vacia el Stack

![Script](./md/comoFuncionaJS68.jpg)

Lo que hara event loop es agarran de las micro tareas
![Script](./md/comoFuncionaJS69.jpg)

Lo ejecutara y se vaciara el stack
![Script](./md/comoFuncionaJS70.jpg)

Agarra la segunda micro tarea

![Script](./md/comoFuncionaJS71.jpg)

Lo ejecutara y volvera a vaciar el stack
![Script](./md/comoFuncionaJS72.jpg)

Y ahora si vamos a la cola de tareas
![Script](./md/comoFuncionaJS73.jpg)

Lo ejecutara y volvera a vaciar el stack terminando asi el programa
![Script](./md/comoFuncionaJS74.jpg)

## Getters nad Setters
Uno de los featureds modernos que trae javascript se llaman getters and setter, que son funciones que podemos usar dentro de objetos que nos permiten tener propiedades virtuales, es decir no es una propiedad que exista directamente en el objeto pero atravez de un getter podemos tener una funcion que va a calcular estos valores, o travez de un setter va a usar un valor para establecer este nuevo valor.

Los getters y setters son funciones que podemos usar en un objeto para tener propiedades virtuales. Se usan los keywords set y get para crear estas propiedades.

Estas propiedades al ser funciones pueden llevar una validación de por medio y ser usadas con el operador de asignación como si fueran una variable más dentro del objeto.

## Proxy
Proxy también es un featured reciente del lenguaje, que igual que los getters y setter nos permite intersectar llamadas a un objeto, sin embargo mas alla de set y get podemos intersectar muchisimas otras cosas.

Documentancion de [Proxy!](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Proxy)

El proxy sirve para interceptar la lectura de propiedades de un objeto (los get, y set) entre muchas otras funciones. Así, antes de que la llamada llegue al objeto podemos manipularla con una lógica que nosotros definamos.

## Generators
Los generadores son funciones especiales, podemos comenzar su ejecución y detenerlo a la mitad, el programa continua y luego podemos regresar a esta función y continuar su ejecución donde la dejamos, lo que es interesante de los generadores es que cuando se detienen recuerdan su contexto, cuales era sus variables en su scope.

Los generadores son funciones especiales, pueden pausar su ejecución y luego volver al punto donde se quedaron recordando su scope.

Algunas de sus características:

* Los generadores regresan una función.
* Empiezan suspendidos y se tiene que llamar next para que ejecuten.
* Regresan un value y un boolean done que define si ya terminaron.
* yield es la instrucción que regresa un valor cada vez que llamamos a next y detiene la ejecución del generador.

## Abort Controller
Un nuevo featured que envia una señal a una petición fetch para que se detenga

La peticiones AJAX permitieron en su tiempo hacer peticiones asíncronas al servidor sin tener que detener la carga de la página. Hoy en día se utiliza la función fetch para esto.

Con fetch tenemos algo llamado AbortController que nos permite enviar una señal a una petición en plena ejecución para detenerla.

## Intersection Observer
Intersection Observer lo que hace es que se pone a observar un elemento y va a a estar viendo cual es su posicion, meidante un objeto de condiguración podemos definir unas marcas si el objeto esta en intersección de 25% (ejemplo) con respecto a la pantalla dejanos saberlo, ya sea cuando se este llendo o cuando este regresando. 

Sirve para observar elementos y si cruzan un umbral que nosotros definimos nos lo va a notificar para tomar acción.

El umbral se define por el porcentaje que tiene intersección con el viewport, con la parte visible de nuestra página.

## Visibility Change
Un nuevo evento que es parte del Page Visibility API del DOM 

El visibilityChange forma parte del API del DOM llamado Page Visibility y nos deja saber si el elemento es visible, pude ser usado para ejecutar una acción cuando cambiamos de pestaña. Así podemos ahorrar batería y mejorar la UX.

## Service Worker
Una de las tendencias en las aplicaciones web son las PWA, y dentro de las muchas cosas que ofrecen estan que funcionen offline,  esto es posible gracias a service worker, una capa que va a vivir entre medio del navegador y del internet y va a hacer algo parecido a los proxys  que es intersectar peticiones. Con esto logramos que una vez que las peticiones salgan y antes de que regresen intersectarlas y guardar la información en cache, la proxima vez que ocurra la petición en vez de ir a un servidor la traera desde la cache.

Sirven para hacer que nuestras aplicaciones funcionen Offline.

Muy usados en las Progressive Web Apps (PWA) los ServiceWorkers son una capa que vive entre el navegador y el Internet.

Parecido a como lo hacen los proxys van a interceptar peticiones para guardar el resultado en cache y la próxima vez que se haga la petición tomar del cache ese resultado.

## TypeScript
TypeScript es un superset de JavaScript, nos va a permitir añadir tipado a nuestras variables y funciones, en js no se hace esto, no decimos que una variables es un numero o una funcion regresa un objeto.

TypeScript es un superset de JavaScript que añade tipos a nuestras variables ayudando así a la detección de errores de forma temprana y mejorando el autocompletado.

Los navegadores no entienden TypeScript así que lo vamos a transpilar a JavaScript usando Parcel.

### Tipos Básicos:
* boolean. Valor verdadero o falso.
* number. Números.
* string. Cadenas de texto.
* string[]. Arreglo del tipo cadena de texto.
* Array. Arreglo multi-tipo, acepta cadenas de texto o números.
* enum. Es un tipo especial llamado enumeración.
* any. Cualquier tipo.
* object. Del tipo objeto.
### Funciones
En Typescript podemos ser explícitos con el tipo de los argumentos y el tipo de retorno de una función.
### Interfaces 
Las interfaces nos permiten declarar la forma de un objeto y esto nos puede ayudar al autocompletado y con algunos erroes, definiendo los tipos de sus propiedades y si son opcionales o no.

## Singlenton con TS
Uno de los patrones de diseño de creación más populares es el patrón Singleton que restringe la creación de instancias de una clase a un objeto.

## Patrones de diseño
![Patrón de diseño](./md/patronDiseño-1.jpg)

Los patrones de diseño son como recetas que resuelven probelmas que nos enfrentamos constantemente en diseño de software.

![Patrón de diseño](./md/patronDiseño-2.jpg)

Los patrones de diseño van a resolver problemas dentro de un contexto recurrente

![Patrón de diseño](./md/patronDiseño-3.jpg)

Este problema tiene que tener algunas limitaciones que existen dentro del contexto

![Patrón de diseño](./md/patronDiseño-4.jpg)

Y la solución debe ser generica, no podemos crear un patrón de diseño que solo atienda a un problema muy específico, es una solución pero no un patron de diseño.

![Patrón de diseño](./md/patronDiseño-5.jpg)

Patrón -> recurrente
De echo este ejemplo ya es un patrón llamado el observer Pattern

![Patrón de diseño](./md/patronDiseño-6.jpg)
 
Veamos algunos

![Patrón de diseño](./md/patronDiseño-7.jpg)

Esta pagina te describe distintos patrones(soluciones), y cada patron tiene un nombre, el problema, la solución

![Patrón de diseño](./md/patronDiseño-8.jpg)

Esta página te muestras distitnas páginas en distintas resoluciones, pero realmente no son patrones de diseño ya que no estan categorizados, son simplemente una galleria de soluciones

![Patrón de diseño](./md/patronDiseño-9.jpg)

History...
Su objetivo era ver los distintos patrones que repetian en la arquitectura no solo en la moderna, si no el la arquitectura de toda la historia, para asi poder construir un lenguaje, para referirse a una idea en particular.

![Patrón de diseño](./md/patronDiseño-10.jpg)

La ganga de 4, 4 autores que escribieron el famoso libro design Patterns, y de aqui parte todo, se coje nlas ideas y se empiezan a utilizar y a seguir desarrollandolas

![Patrón de diseño](./md/patronDiseño-11.jpg)

De que nos sirve usar patrones de diseño?

![Patrón de diseño](./md/patronDiseño-12.jpg)

Pero no todo es perfecto

![Patrón de diseño](./md/patronDiseño-13.jpg)

Los patrones como todo tipo de complejidad hay que evitarlos siempre y cuando sea necesario

![Patrón de diseño](./md/patronDiseño-14.jpg)

Bueno

![Patrón de diseño](./md/patronDiseño-15.jpg)

Recuerda no siempre estar pensando en patrones de diseño, deja que naturlmente surga la necesidad para usarlos, siemrpe vamos a querer que nuestro codigo sea simple y recordemos que los patrones de diseño van a añadir un nivel de complejidad

### Categorías de patrones de diseño
El libro design patterns definio la lista inicial de patrones de diseño del software

![Patrón de diseño](./md/patronDiseño-16.jpg)

Los dividio en 3 categorías

![Patrón de diseño](./md/patronDiseño-17.jpg)

Comencemos por 

![Patrón de diseño](./md/patronDiseño-18.jpg)

Y esta es la lista de los diferentes patrones qeu pertenecen a esta categoría

![Patrón de diseño](./md/patronDiseño-19.jpg)

El prototype ya lo hemos visto bastante asi que empezamos por builder

![Patrón de diseño](./md/patronDiseño-20.jpg)

Como JQuery lo usa

![Patrón de diseño](./md/patronDiseño-21.jpg)

Despues tenemos

![Patrón de diseño](./md/patronDiseño-22.jpg)

Y su lista

![Patrón de diseño](./md/patronDiseño-23.jpg)

Como JQuery usa el adapter

![Patrón de diseño](./md/patronDiseño-24.jpg)

Y por ultimo

![Patrón de diseño](./md/patronDiseño-25.jpg)

La lista es un poco más extensa 

![Patrón de diseño](./md/patronDiseño-26.jpg)

Como JQuery usa el composite

![Patrón de diseño](./md/patronDiseño-27.jpg)

#### Singleton
Singleton es un patron creacional, 

![Patrón de diseño](./md/patronDiseño-28.jpg)

que te ayudara a que una clase solo sea capaz de crear una sola instancia de si misma y esa instancia va a ser siempre la misma

![Patrón de diseño](./md/patronDiseño-29.jpg)

Para describir patrones de diseños siempre utilizamos una notación llamda UML, que se ve así

![Patrón de diseño](./md/patronDiseño-30.jpg)

Lo que esta arriba representa el nombre de la clase, en la primera seccion vamos a encontrar sus propiedades y en la segunda sus métodos, tenemos la propeidad instance y hay 2 cosas, una es el signo negativo que indica que es una propiedad privada y tambien vemos que esta subrayada que significa que es una propiedad o método estatico, podemos identificar un constructor por que tiene el mismo nombre que la clase, pero podemos notar algo muy curiuoso y que es poco usual, que este constructor es privado por lo que no podemos llamar a ' new Singleton ' luego tenemos un método publico getInstance, que va a ver si existe una instancia y si no existe la va a crear y la va a regresar y si la volvemos a llamar a getInstance vamos a tener siempre la instancia que creo la primera vez.

![Patrón de diseño](./md/patronDiseño-31.jpg)

Bien

![Patrón de diseño](./md/patronDiseño-32.jpg)

Caso de uso

![Patrón de diseño](./md/patronDiseño-33.jpg)

Por lo general no vamos a querer más de una instancia de mongoose ya que solo existe una base de datos, por lo que Singleton es la solución.
Podemos ver que lo que mongoose exporta es una instancia, ya que al momento de hacer un import este se cachea y si hacemos otro import en otro archivo obtendremos lo que estaba cacheado.
En este caso mongoose usa una alternativa al patron Singleton pero el resultado es el mismo esta exportando una instancia y como se cachea siempre se va a ofrecer la misma

![Patrón de diseño](./md/patronDiseño-34.jpg)

### Patron Observer

![Patrón de diseño](./md/patronDiseño-35.jpg)

Redux es una libreria muy popular para manejar estados, es muy común combinarla con react

![Patrón de diseño](./md/patronDiseño-36.jpg)

El api es algo parecido a esto, vamos a a importar una funcion createStore con la cual vamos a inicializar el estado y definir algunos reducer, ya que tenemos el store podemos suscribir componentes, funciones que vamos a notificar cada vez que haya un cambio de estado, que ocurren a travez de acciones que se despachan, por ejemplo si tuvieramos un estado para contador y llega la accion de incrementar el contador va a incrementar en uno y este cambio se notifica a todo mundo y los componentes, funciones que les interese este cambio van a pedir getState

![Patrón de diseño](./md/patronDiseño-37.jpg)

Si vemos el código fuente de redux, hay 2 seccion que estan en llaves que son importantes, la primera donde se reciven las acciones que se despachan, van a pasar a travez de reducer que van a tener una copia del estado y la acción, el reducer se va a encargar de modificar el estado produce un estado nuevo y luego se tiene que notificar a todos los que se suscribieron.
listener es otra palabra para observer

![Patrón de diseño](./md/patronDiseño-38.jpg)

Cada listener se va a suscribir a travez del metodo suscribe, subscribe va a añadirlos a la lista cuando hay cambios de estado se les notifica, y tambien se le va a dar una funcion unsubscribe asi que cuando ya no les interesa la informacion se desuscriben,
redux implementa el patron **Observer**

![Patrón de diseño](./md/patronDiseño-39.jpg)

En Node existe una libreria llamada EventEmitter en Standard Librarys.

![Patrón de diseño](./md/patronDiseño-40.jpg)

 Esta tiene 3 funciones on, off y emit, estan funciones son otros nombres para suscribe, unsuscribe y notify, una implementación de observer

![Patrón de diseño](./md/patronDiseño-41.jpg)

Algunas noticias...

![Patrón de diseño](./md/patronDiseño-42.jpg)

Pero aun estan en stage 1, en borrador

### Patron Decorador
El decorator forma parte de la categoria patrones estructurales

![Patrón de diseño](./md/patronDiseño-43.jpg)

Una analogia del mundo real
Imaginate que vas apple.com y quieres compara una mac, normalmente te encuentras 2 o 3 modelos 

![Patrón de diseño](./md/patronDiseño-44.jpg)

Pero te imaginas que tengas 2 con caracteristicas similares pero con pequelas variaciones

![Patrón de diseño](./md/patronDiseño-45.jpg)


y despues estas otras 2 que cuestan diferente son diferentes

![Patrón de diseño](./md/patronDiseño-46.jpg)

y luego otras

![Patrón de diseño](./md/patronDiseño-47.jpg)

y muchas otras

![Patrón de diseño](./md/patronDiseño-48.jpg)

Imaginate programar todo esto en código, crear una clase base y de ahi extender, tengo 8 modelos y son diferentes, esto se hace algo inmantenible

![Patrón de diseño](./md/patronDiseño-49.jpg)

O no...

![Patrón de diseño](./md/patronDiseño-50.jpg)

....

![Patrón de diseño](./md/patronDiseño-51.jpg)

Ahora vas a a tener que hacer 8 más

![Patrón de diseño](./md/patronDiseño-52.jpg)

Esto es una real pesadilla

![Patrón de diseño](./md/patronDiseño-53.jpg)


Si lo vemos en código se veria algo asi

![Patrón de diseño](./md/patronDiseño-54.jpg)

Hola, si, si

![Patrón de diseño](./md/patronDiseño-55.jpg)

Tendriamos que ir a cada clase a cambiar su comportamiento, y esto en contra de una buena practica

![Patrón de diseño](./md/patronDiseño-56.jpg)

Aqui es donde entra el decorator, patron estructural

![Patrón de diseño](./md/patronDiseño-57.jpg)

Asi es como se ve el uml del decorator

![Patrón de diseño](./md/patronDiseño-58.jpg)

Pero no soy fan de esto, hay mucho menos en JS, asi que

![Patrón de diseño](./md/patronDiseño-59.jpg)

ASi que vamos a verlo de la forma que lo hariamos en JS, Vamos a hacer con una tecnica llamada monkey patching, vamos a tener una  clase macbrook pro con una funcion withmemory y vamos a especificar la cantidad de memoria, y le vamos a pasar una instancia de una computadora que en este caso seria una macbook pro, en monkey patching lo que vamos a hacer es que a una instancia de una clase no a la clase en si, le vamos a remplazar su funcionalidad, el costo antes de cambiarlo cuando se calcula vamos a guardar el valor original del ocsto y vamos a decirle el costo ahora va a ser el costo de la memoria  y se lo vamos a sumar al costo original que tenemos guardado y esta va a ser nuestra nueva funcion

![Patrón de diseño](./md/patronDiseño-60.jpg)

Asi que vamos a tener una instancia de una computadora modificada

![Patrón de diseño](./md/patronDiseño-61.jpg)

Veamos otras formas

![Patrón de diseño](./md/patronDiseño-62.jpg)

Veamos como algunas librerias utilizan decorator para hacer sus implementaciones, aqui esta memoize que viene con loadsh, memoize lo que hace es recibe una función y regresa una función nueva, la funcion nueva trae una tecnica que va hacer que sea más eficiente las ejecuciones donde los argumentos no hayan cambiado es decir si tenemos una ejecucion donde pasamos un argumento y ese argumento lo estamos pasando por primera vez pues al funcion original va a tener que hacer todo el computo por primera vez para ver cual es el valor que va a regresar, las veces subsiguientes que llamemos estra funcion con los mismos argumentos ya tenemos los resultados que habiamos guardado en un tipo de cache, tomamos el resultado de cache y lo regresamos no hay que ejecutar la funcion completa

![Patrón de diseño](./md/patronDiseño-63.jpg)

Aqui esta el decorator de la funcion

![Patrón de diseño](./md/patronDiseño-64.jpg)

Si los argumentos ya estan en cache simplemente regresamos la respuesta de lo contrario calculamos el resultado, lo guardamos en cache y lo regresamos, asi las proximas veces seran más rapidas ¿Cuanto más rapidas?
Un pequeño ejemplo calculando números de fibonacci
Con esta funcion medimos el tiempo de ejecución y tenemos una implementacion que va a computar números de fibonacci, cuando decoro fibonacci obtengo una nuevo funcion que trae memoize, es decir la tecnica que mejora la eficiencia la primera vez que se ejecuto fue de 625ms y la segunda fue muy cercana a 0ms

![Patrón de diseño](./md/patronDiseño-65.jpg)

El decorator nos va a ayudar a extender la funcionaliad de clases sin tener que modificarla internamente

## Subir Libreria a npm
* Tener instalada la versión maás reciente de npm (recomendado)
* tener una cuenta en npm (si no la tienes te puedes registrar en el website oficial de [npm](https://www.npmjs.com) y no te olvides de verificar tu cuenta en tu email)
* Logearte en npm con `npm login` y podras saber que lo estas con `npm whoami`
* Configura bien tu package.json y ten tu carpeta de producción (ya sea dist o lib), un pequeño ejemplo
`{
  "name": "@aomine-/mediaplayer",
  "version": "1.0.0",
  "description": "mediaplayer by aomine",
  "main": "lib/MediaPlayer.js",
  "scripts": {
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "mediaplayerByAomine"
  ],
  "author": "aomine- Dev",
  "license": "MIT",
  "devDependencies": {
    "typescript": "^3.6.3"
  }
}`
* puedes subirlo a npm usando `npm publish --access=public`
* si es un proyecto con TS como es el caso, instala typescript de forma golbal y local (no se si algunoa de estas no es necesaria pero YOLO! :V) `npm i -g typescript` `npm i -D typescript`
* y puedes usar el comando `tsc --init` para iniciar un tsconfig.json
* yp uedes configuralo de manera similiara esta
`{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": false,
    "target": "es5",
    "outDir": "./lib",
    "rootDir": ".",
    "sourceMap": false,
    "strict": true,
    "esModuleInterop": true
  },
  "exclude": ["node_modules"]
}`
* Ahora ya puedes instalar tu libreria en tus proyectos :), en este caso con npm i @aomine-/mediaplayer