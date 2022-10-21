const buttonPreviousPage = document.querySelector(".buttonPreviousPage");
const buttonNextPage = document.querySelector(".buttonNextPage");
page = 1;

buttonNextPage.addEventListener("click", () => {
  page = page + 1;
  try {
    fetch(`http://localhost:4567/users/${page}`).then((response) => {
      response.json().then((data) => {
        show(data);
        buttonPreviousPage.disabled = false;
        fetch(`http://localhost:4567/users/${page + 1}`).then((response) => {
          response.json().then((data) => {
            if (data.length <= 0) {
              buttonNextPage.disabled = true;
            }
          });
        });
      });
    });
  } catch (error) {
    console.error(error);
  }
});

buttonPreviousPage.addEventListener("click", () => {
  page = page - 1;
  try {
    fetch(`http://localhost:4567/users/${page}`).then((response) => {
      response.json().then((data) => {
        show(data);
        fetch(`http://localhost:4567/users/${page + 1}`).then((response) => {
          response.json().then((data) => {
            if (data.length > 0) {
              buttonNextPage.disabled = false;
            }
          });
        });
        fetch(`http://localhost:4567/users/${page - 1}`).then((response) => {
          response.json().then((data) => {
            if (data.length <= 0) {
              buttonPreviousPage.disabled = true;
            }
          });
        });
      });
    });
  } catch (error) {
    console.error(error);
  }
});

try {
  fetch(`http://localhost:4567/users/${page}`).then((response) => {
    response.json().then((data) => {
      show(data);
      if (data.length > 0) {
        buttonPreviousPage.disabled = true;
      }
    });
  });
} catch (error) {
  console.error(error);
}

function show(users) {
  let output = "";

  for (let user of users) {
    output += `
      <li>
        <img src="${user.picture}" alt="User icon">
        <div class="userHeader">
          <p class="name">${user.name}</p>
          <p class="email">${user.email}</p>
          <p class="gender">${user.gender}</p>
        </div>
      </li>
    `;
  }

  document.querySelector(".list").innerHTML = output;
}
