const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");
const countryInput = document.getElementById("country-input");
const genderInput = document.getElementById("gender");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
const updateNameInput = document.getElementById("update-name-input");
const updateEmailInput = document.getElementById("update-email-input");
const updatPhoneInput = document.getElementById("update-phone-input");
const updateCountryInput = document.getElementById("update-country-input");
const updateGenderInput = document.getElementById("update-gender-input");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUserId = "#";
const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
function renderTable() {
  tableBody.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const tr = document.createElement("tr");
    const idTd = document.createElement("td");
    const nameTd = document.createElement("td");
    const emailTd = document.createElement("td");
    const phoneTd = document.createElement("td");
    const countryTd = document.createElement("td");
    const genderTd = document.createElement("td");
    const actionsTd = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    idTd.innerText = user.id;
    nameTd.innerText = user.name;
    emailTd.innerText = user.email;
    phoneTd.innerText = user.phone;
    countryTd.innerText = user.country;
    genderTd.innerText = user.gender;
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    editBtn.addEventListener("click", () => {
      showUpdateForm(user.id);
    });
    deleteBtn.addEventListener("click", () => {
      deleteUser(user.id);
    });
    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);
    tr.appendChild(idTd);
    tr.appendChild(nameTd);
    tr.appendChild(emailTd);
    tr.appendChild(phoneTd);
    tr.appendChild(countryTd);
    tr.appendChild(genderTd);
    tr.appendChild(actionsTd);
    tableBody.appendChild(tr);
  }
}

function addUser() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const country = countryInput.value.trim();
  const gender = genderInput.value;
  if (email.match(validRegex) && phone.match(regexPhoneNumber)) {
    if (name && email != null && country != null) {
      let id = 1;
      let val = users
        .map(function (x) {
          return x.id;
        })
        .indexOf(id);
      while (val != -1) {
        id++;
        val = users
          .map(function (x) {
            return x.id;
          })
          .indexOf(id);
      }
      const user = {
        id: id,
        name: name,
        email: email,
        phone: phone,
        country: country,
        gender: gender,
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      nameInput.value = "";
      emailInput.value = "";
      phoneInput.value = "";
      countryInput.value = "";
      genderInput.value = "";
      renderTable();
    } else {
      alert("Không được để trống");
    }
  } else {
    alert(
      "sai định dạng số điện thoại, vui lòng nhập 0 hoặc +84 và 9 số còn lại, hoặc sai định dạng/chưa nhập email"
    );
  }
}

function updateUser() {
  const name = updateNameInput.value;
  const email = updateEmailInput.value;
  const phone = updatPhoneInput.value;
  const country = updateCountryInput.value;
  const gender = updateGenderInput.value;
  if (email.match(validRegex) && phone.match(regexPhoneNumber)) {
    const index = users.findIndex((user) => user.id === currentUserId);
    if (index !== -1) {
      users[index].name = name;
      users[index].email = email;
      users[index].phone = phone;
      users[index].country = country;
      users[index].gender = gender;
      localStorage.setItem("users", JSON.stringify(users));
      hideUpdateForm();
      renderTable();
    }
  } else {
    alert("sai định dạng email hoặc số điện thoại!");
  }
}

function showUpdateForm(userId) {
  const user = users.find((user) => user.id === userId);
  if (user) {
    updateNameInput.value = user.name;
    updateEmailInput.value = user.email;
    updatPhoneInput.value = user.phone;
    updateCountryInput.value = user.country;
    updateGenderInput.value = user.gender;
    currentUserId = user.id;
    updateBtn.addEventListener("click", updateUser);
    cancelBtn.addEventListener("click", hideUpdateForm);
    updateBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
    updateNameInput.style.display = "inline-block";
    updateEmailInput.style.display = "inline-block";
    document.getElementById("update-container").style.display = "block";
  }
}

function hideUpdateForm() {
  updateNameInput.value = "";
  updateEmailInput.value = "";
  updatPhoneInput.value = "";
  updateCountryInput.value = "";
  updateGenderInput.value = "";
  currentUserId = null;
  updateBtn.removeEventListener("click", updateUser);
  cancelBtn.removeEventListener("click", hideUpdateForm);
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  updateNameInput.style.display = "none";
  updateEmailInput.style.display = "none";
  document.getElementById("update-container").style.display = "none";
}

function deleteUser(userId) {
  users = users.filter((user) => user.id !== userId);
  localStorage.setItem("users", JSON.stringify(users));
  if (users.length == 0) {
    hideUpdateForm();
  }
  renderTable();
}

// Event Listeners
addBtn.addEventListener("click", addUser);

// Initialize table
renderTable();

sort();
// function sort() {
//   // let table = JSON.parse(localStorage.getItem("users")) || [];
//   let table, rows, switching, i, x, y, shouldSwitch;
//   table = document.querySelector("#my-table");
//   switching = true;
//   /*Make a loop that will continue until
//   no switching has been done:*/
//   while (switching) {
//     //start by saying: no switching is done:
//     switching = false;
//     rows = table.rows;
//     /*Loop through all table rows (except the
//     first, which contains table headers):*/
//     for (i = 1; i < rows.length - 1; i++) {
//       //start by saying there should be no switching:
//       shouldSwitch = false;
//       /*Get the two elements you want to compare,
//       one from current row and one from the next:*/
//       x = rows[i].getElementsByTagName("td")[0];
//       y = rows[i + 1].getElementsByTagName("td")[0];
//       //check if the two rows should switch place:
//       if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//         //if so, mark as a switch and break the loop:
//         shouldSwitch = true;
//         break;
//       }
//     }
//     if (shouldSwitch) {
//       /*If a switch has been marked, make the switch
//       and mark that a switch has been done:*/
//       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//       switching = true;
//     }
//   }
// }
