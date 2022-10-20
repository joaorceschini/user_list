// async function getContent() {
//   try {
//     const response = await fetch("http://localhost:4567/");
//     const data = await response.json();
//     show(data);
//   } catch (error) {
//     console.error(error)
//   }
// }

// getContent();

try {
  fetch("http://localhost:4567/").then(response => {
    response.json().then(data => {
      show(data)
    })
  })
} catch {
  console.error(error);
}

function show(users) {
  let output = "";

  for (let user of users) {
    output += `
      <li>
        <img src="${user.picture}" alt="User icon">
        <div class="user_header">
          <p class="name">${user.name}</p>
          <p class="email">${user.email}</p>
          <p class="gender">${user.gender}</p>
        </div>
      </li>
    `;
  }

  document.querySelector(".list").innerHTML = output;
}
