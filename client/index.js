
const listForm = document.querySelector(".name-form");
const listList = document.querySelector(".name-list");
const listForm_update = document.querySelector(".name-form-update");
const listForm_delete = document.querySelector(".name-form-delete");



const refreshAllLists = () => {
    fetch("http://localhost:8000/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        return response.json();
      })
      .then((data) => {
        console.log(data)
        const html = data
          .map(
            (post) =>
              `<li class="post">
                <p>${post.id}</p>
                <p>${post.name}</p>
                <p>${post.email}</p>
              </li>`
          )
          .join("");
  
        listList.innerHTML = html;
      });
  };

  const insertSinglePost = (newPost) => {
    const htmlElement = `<li class="post">
          <p>${newPost.id}</p>
          <p>${newPost.name}</p> 
          <p>${newPost.email}</p>
        </li>`;
    listList.insertAdjacentHTML("afterbegin", htmlElement);
  };

    listForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPost = {
      name: e.currentTarget.name.value,
      email: e.currentTarget.email.value,

    };

    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      e.target.reset();
      insertSinglePost(newPost);
    })
    .catch((error) => {
      console.error("Error:". error);
    });
  });

  const updatePost = (newPost) => {
    const htmlElement = `<li class="post">
          <p>${newPost.id}</p>
          <p>${newPost.name}</p> 
          <p>${newPost.email}</p>
        </li>`;
    listList.insertAdjacentHTML("afterbegin", htmlElement);
  };

  listForm_update.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPost = {
      id: e.currentTarget.id.value,
      name: e.currentTarget.name_update.value,
      email: e.currentTarget.email_update.value,

    };

    fetch("http://localhost:8000/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      e.target.reset();
      insertSinglePost(newPost);
    })
    .catch((error) => {
      console.error("Error:". error);
    });
  });

  const deleteSinglePost = (newPost) => {
    const htmlElement = "This Id has been removed"
    listList.insertAdjacentHTML("afterbegin", htmlElement);
  };

    listForm_delete.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPost = {
      id: e.currentTarget.id_toDelete.value,

    };

    fetch("http://localhost:8000/delete", {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      e.target.reset();
      insertSinglePost(newPost);
    })
    .catch((error) => {
      console.error("Error:". error);
    });
  });

refreshAllLists();