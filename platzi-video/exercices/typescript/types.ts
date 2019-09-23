// Boolean
let muted: boolean = true
muted = false

// Números
let age = 6
let numerados: number = 42
let denominador: number = age
let resultado = numerados / denominador

// String
let nombre: string = 'Richard'
let saludo = `Me llamo ${nombre}`

// Arrays
let people: string[] = []
people = ['Isabel', 'Nicoles', 'Raul'] 
// people.push(90000) // error

let peopleAndNumbers: Array< string | number > = []
peopleAndNumbers.push('Ricardo')
peopleAndNumbers.push(69)

// Enums
enum Color {
  Rojo = 'Rojo',
  Verde = 'Verde',
  Azul = 'Azul'
}

let colorFavorito: Color = Color.Rojo
console.log(`Mi color favorito es ${colorFavorito}`)

// Any
let comodin: any = 'Joker'
comodin = {type: "Wildcard"}

// Object
let someObject: object = { type: 'Wildcard' }