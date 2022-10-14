async function getContent() {
  try {
    const response = await fetch('http://localhost:4567/')
    const data = await response.json()
    show(data)
  } catch (error) {
    console.error(error)
  }
}

getContent()

function show(users) {
  let output = '';

  for (let user of users) {
    output += `<li>${JSON.stringify(user)}</li>`
  }

  document.querySelector('.list').innerHTML = output;
}