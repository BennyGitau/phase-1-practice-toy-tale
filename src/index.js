let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  //fetching all toys and rendering to on the DOM
  const toyUrl = "http://localhost:3000/toys";
    fetch(toyUrl)
    .then((response)=> response.json())
    .then((toyData) => toyData.forEach((toy) =>{handleToy(toy)}))
    .catch((error) => console.log(error))

  //function to handle toys
  function handleToy(toy) {
    const card = document.createElement('div')
      card.className = 'card'
      card.innerHTML =`
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class = "toy-avatar">
      <p>${toy.likes} likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
      `
  document.getElementById('toy-collection').appendChild(card);
  card.querySelector(".like-btn").addEventListener('click', ()=> {
    toy.likes++;
    card.querySelector("p").textContent = toy.likes;
    updateToy(toy)
  })

  }
///adding submit function
  document.querySelector(".add-toy-form").addEventListener('submit', handleSubmit)

  //handle submit function
  function handleSubmit(e) {
    e.preventDefault()

    let newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
  
    handleToy(newToy)
    addNewToy(newToy)

  }
  ///adding a new toy
  function addNewToy(newToy) {
      fetch(toyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newToy),

      })
      .then(res => res.json())
      .then(toy => console.log(toy));

    }

  ///making a patch request
  function updateToy (toy) {
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(response => response.json())
    .then(toy => console.log(toy))
  }


});
