//No subas tu API_KEY a github, es un secreto. Te pueden robar tu dinero e incluso tu cuenta.
const API_KEY = ''
let submitButton = document.querySelector('#submit')
let outPutElement = document.querySelector('#output')
let inputElement = document.querySelector('input')
let historyElement = document.querySelector('.history')
let buttonElement = document.querySelector('button')

function changeInput(value) {
    let inputElement = document.querySelector('input')
    inputElement.value = value
}

//La declaración de la función asíncrona declara una función asíncrona en la que se permite la palabra clave await dentro del cuerpo de la función. Las palabras clave async y await permiten que el comportamiento asincrónico basado en promesas se escriba en un estilo más claro, lo que evita la necesidad de configurar explícitamente cadenas de promesas
async function getMessage () {
    console.log('click')
    const options = { 
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens: 100,
        })
    }
    try {
        let response = await fetch('https://api.openai.com/v1/chat/completions', options) 
        let data = await response.json()
        console.log(data)
        outPutElement.textContent = data.choices[0].message.content
        if (data.choices[0].message.content && inputElement.value) {
            console.log('Hello!')
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }

    } catch (error){
        console.error(error)
    }
}

submitButton.addEventListener('click', getMessage)

function clearInput () {
    inputElement.value = ''
}

buttonElement.addEventListener('click', clearInput)