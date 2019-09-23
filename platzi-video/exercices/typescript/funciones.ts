// funciones
function add(a: number, b: number): number {
  return a + b
}

const result = add(4, 6)

function createAdder (a: number): (number) => number {
  return function (b: number) {
    return a + b
  }
}

const addFour = createAdder(4)

const fourPlus6 = addFour(6)
console.log(fourPlus6)

function fullName (firstName: string, lastName: string = 'last name'): string {
  return `${firstName} ${lastName}`
}

const aomine = fullName('aomine')

console.log(aomine)