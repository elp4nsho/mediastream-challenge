'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?

Devuelve una funcion que realizara una peticion a una url determinada

- How it's used? Add different use-case examples that covers every functionality.

Esto es usado entregandole el verbo HTTP la URL y opcionalmente los headers, este por defecto viene con el header Accept con valor de *

- How it is called this design pattern or technique?

Esto podria ser el patron de diseño modulo, ya que al devolver una funcion que gatillara una determinada URL
permite asi generar objetos que devuelven este set de datos. generando asi un "modulo"

tambien podria ser el diseño de patron factory por la misma explicacion anterior, el hecho de crear objetos encerrados,
permite la reutilizacion de estos sin afectar sus datos que fueron usados para iniciarlo 


HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = {Accept: '*/*'}) {
    return (path = []) => fetch((base ? [base, ...path] : path).join('/'), {method, headers})
        .then(r => r.json());
}

let casos = []

casos.push(requester("GET", "https://api.github.com/users/mediastream")())   //Flujo feliz
casos.push(requester("POST", "https://api.github.com/users/mediastream")());  //usando otro verbo
casos.push(requester("GET", "https://api.github.com/users/mediastream", {"Content-type": "application/json"})()); //usando un header custom


Promise.all(casos)
    .then((values) => {
        values.forEach((data, index) => {
            console.log(`
                      CASO NUMERO ${index}
            `);
          console.log(data);

        });
    });
