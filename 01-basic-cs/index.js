'use strict';

console.log(`
1.
---

There is database of users and their hats at './database.json'.
Find the total sum of the top-3 most selling hats.
We don't care which hats are.
You can use lodash/underscore (recommended)

What is the complexity in O() notation of time and space?

IMPORTANT: Find a balance between performance and legibility (more important).

---
Example:
Imagine the following (taken from the real database):

Hat(7adbc650-2a5e-4e59-b88f-97377e0b7e34) sold 7.
Hat(872f5fc4-515f-416d-9ec6-3488da2bd74a) sold 6.
Hat(048d8fbf-7653-461f-a59c-68c73b8855e5) sold 7.
Hat(32266d28-5092-4a69-afb3-90fafd46e04a) sold 9.

-> Expected result: 7 + 7 + 9 => 23
`);

const _ = require('lodash'); // https://lodash.com/docs/4.17.4
const assert = require('assert');

const database = require('./database.json');


const total = calcular(); // TODO

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');


function calcular(){
    let listaSombreros = []; //lista que contendra solo los id de los sombreros
    database.filter(user=>user.hats.length>0).forEach(hats=>hats.hats.forEach(hat=>listaSombreros.push(hat.id))) //llenando lista con id de cada hat
    let contador = {}; //objeto que contendra los duplicados
    listaSombreros.forEach((obj)=> { contador[obj] = (contador[obj] || 0)+1; }); //sumando en caso de que exista añadiendo en caso contrario

    //como ya obtenemos los duplicados ahora solo se ordenan de menor a mayor y se suman los ultimos 3 y se retorna el resultado, se asume que estos
    //ultimos 3 son los mayores
    return Object.values(contador).sort().splice(Object.values(contador).length-3,Object.values(contador).length).reduce((a,b)=> a+b ,0)

}
