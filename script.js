const container = document.getElementById('container') 
const input1 = document.getElementById('in')
const input2 = document.getElementById('put')
const btn =document.getElementById('btn')


btn.addEventListener('click', ()=>{

  const nameu = input1.value
  const nom = input2.value

if(nameu && nom){

  fetch(`https://67f25d30ec56ec1a36d2e46f.mockapi.io/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: nameu,
      age: nom
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      generator(data)
      input1.value='';
      input2.value='';
     });
  }else{
    console.log(`error`)
  }

})

function generator(data){
  const card = document.createElement('div')
  card.classList.add('card')
  card.innerHTML=`
  <h2>${data.name}</h2>
  <p>${data.age}</p>
  `
  const but = document.createElement('button')
  but.textContent=`✏️`
  card.appendChild(but)
  but.style.marginLeft='600px'

  const ton = document.createElement('button')
  ton.textContent=`🗑️`
  card.appendChild(ton)
  ton.style.marginLeft='16px'
  container.appendChild(card)

  ton.addEventListener('click', ()=>{
    fetch(`https://67f25d30ec56ec1a36d2e46f.mockapi.io/api/users/${data.id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        console.log(`Пользователь ${data.name} удален`);
        card.remove()
      });
  })


  but.addEventListener('click', ()=>{
    const prom = prompt(`Name`)
    const num = prompt(`Number`)
    fetch(`https://67f25d30ec56ec1a36d2e46f.mockapi.io/api/users/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: prom,
        age: num
      })
    })
      .then(res => res.json())
      .then(updated => {
        console.log(updated)
        card.querySelector('h2').textContent = updated.name;
        card.querySelector('p').textContent = updated.age;
        

      });

  })
  
}


