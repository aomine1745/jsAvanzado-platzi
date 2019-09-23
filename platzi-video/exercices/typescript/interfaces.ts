enum Color {
  Rojo = 'Rojo',
  Verde = 'Verde',
  Azul = 'Azul'
}

// Interfaces
interface Rectangulo {
 ancho: number
 alto: number
 color?: Color
}

let rect: Rectangulo = {
  ancho: 4,
  alto: 6,
  color: Color.Azul
}

function area (r: Rectangulo): number {
  return r.ancho * r.alto
}

const areaRect = area(rect)
console.log(areaRect)

rect.toString = function() {
  return this.color ? `Un rectangulo ${this.color}` : `Un rectangulo de ${this.alto} x ${this.ancho}`
}
console.log(rect.toString())
