function initStorage() {
  if (!localStorage.getItem("db")) {
    localStorage.setItem("db", "[]");
  }
}
initStorage();
function getContactsFromLS() {
  const contacts = JSON.parse(localStorage.getItem("db"));
  return contacts;
}
function setContactsToLS(contacts) {
  localStorage.setItem("db", JSON.stringify(contacts));
}
let contacts = getContactsFromLS();
console.log(contacts);

const container = document.querySelector(".container");
const nameInp = document.querySelector("#name-inp");
const surNameInp = document.querySelector("#surName-inp");
const numberInp = document.querySelector("#number-inp");
const imageInp = document.querySelector("#image-inp");
const addBtn = document.querySelector("#add-contact-btn");
const saveBtn = document.querySelector("#edit-contact-btn");
const closeBtn = document.querySelector(".btn-close");
const searchInp = document.querySelector("#search-inp");
const addTriger = document.querySelector("#add");
const modalTitle = document.querySelector(".modal-title");

addTriger.addEventListener("click", () => {
  addBtn.style.display = "block";
  saveBtn.style.display = "none";
  modalTitle.innerText = "Add product";
  !nameInp.value.trim() ||
    !surNameInp.value.trim() ||
    !numberInp.value.trim() ||
    !imageInp.value.trim();
});
//!render
function render(data = getContactsFromLS()) {
  container.innerHTML = "";
  data.forEach((item, index) => {
    container.innerHTML += `
     <div class="card" >
  <img src="${item.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-name  style-font ">${item.name}</h5>
    <h6 class="card-SurName style-font ">${item.surName}</h6>
    <p class="card-number style-font">${item.number}</p>
    <div class = 'flex'>
    <a id=${index}  class="btn btn-primary btn-danger deleteBtn">Delete</a>
    <a id=${index}  data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary editBtn ">Edit</a>
  </div>
</div>
`;
    container.innerHTML += `

`;
  });
}
render();

// !creat

function creatContact() {
  if (
    !nameInp.value.trim() ||
    !surNameInp.value.trim() ||
    !numberInp.value.trim() ||
    !imageInp.value.trim()
  ) {
    alert("Некоторые поля не заполнены");
    return;
  }

  let newContact = {
    name: nameInp.value,
    surName: surNameInp.value,
    number: numberInp.value,
    image: imageInp.value,
  };

  let contacts = getContactsFromLS();
  contacts.push(newContact);
  setContactsToLS(contacts);
  console.log(contacts);
  nameInp.value = "";
  surNameInp.value = "";
  imageInp.value = "";
  numberInp.value = "";

  closeBtn.click();
  render();
}

addBtn.addEventListener("click", creatContact);

//! update
let id = null;
function getOneContactByIndex(index) {
  const contactObj = getContactsFromLS()[index];
  return contactObj;
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("editBtn")) {
    let fuondObj = getOneContactByIndex(e.target.id);
    nameInp.value = fuondObj.name;
    surNameInp.value = fuondObj.surName;
    numberInp.value = fuondObj.number;
    imageInp.value = fuondObj.image;
    id = e.target.id;
    modalTitle.innerText = "Edit product";
    saveBtn.style.display = "block";
    addBtn.style.display = "none";
  }
});

saveBtn.addEventListener("click", () => {
  if (
    !nameInp.value.trim() ||
    !surNameInp.value.trim() ||
    !numberInp.value.trim() ||
    !imageInp.value.trim()
  ) {
    alert("Some inputs era empty");
    return;
  }
  const editedObj = {
    name: nameInp.value,
    surName: surNameInp.value,
    number: numberInp.value,
    image: imageInp.value,
  };

  const contacts = getContactsFromLS();
  contacts.splice(id, 1, editedObj);
  setContactsToLS(contacts);

  nameInp.value = "";
  surNameInp.value = "";
  imageInp.value = "";
  numberInp.value = "";

  closeBtn.click();
  render();
});

//!delete
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    let ans = confirm("A you sure?");
    if (!ans) return;
    const contacts = getContactsFromLS();
    contacts.splice(e.target.id, 1);
    setContactsToLS(contacts);
    render();
  }
});

//!search
searchInp.addEventListener("input", (e) => {
  const contacts = getContactsFromLS();
  const filter = contacts.filter(
    (item) =>
      item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
  );
  render(filter);
});
