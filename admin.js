let usersList = document.querySelector('.user-list')
let state = document.querySelector('.state-heading')
let state2 = document.querySelector('.state2')
let adminForm = document.querySelector('.admin-form')

let users = []

let addUser = async () =>{
    try {
        state.textContent = "Please wait..."
        let res = await fetch (`http://localhost:4001/user/`, {method:"POST", body: new FormData(adminForm)})
    
        let json = await res.json()
        state2.textContent = json.message
        adminForm.reset()
        getUsers()
        setTimeout(()=>{
            state2.textContent = ""
        },3000)
    } catch (error) {
        state.textContent = error.message
        console.log(error);
        setTimeout(()=>{
            state.textContent = "Try update"
        },3000)
    }
}

let deleteUser = async (id) =>{
    try {
        state.textContent = "Please wait..."
        let res = await fetch (`http://localhost:4001/user/${id}`, {method:"DELETE"})
    
        let json = await res.json()
        state.textContent = json.message
        getUsers()
        setTimeout(()=>{
            state.textContent = ""
        },3000)
    } catch (error) {
        state.textContent = error.message
        console.log(error);
        setTimeout(()=>{
            state.textContent = "Try update"
        },3000)
    }
}

let display = () =>{
    usersList.innerHTML = ""
    users.reverse().forEach(user =>{
       let liElement = document.createElement('li')
       liElement.classList.add('user')
       liElement.innerHTML = `
           <img src=${user?.image?.url ? user.image.url: user.gender == "male" ? "./images/boy.png" : "./images/girl.png"} alt=${user.firstname} class="user-img">
           <h3 class="user-name">${user.firstname} ${user.lastname}</h3>
           <a href="mail-to" class="email-link">Email: ${user.email}</a>
           <div>
           <p class="user-gender">Gender: ${user.gender}</p>
           <button class="del-btn" id= ${user._id}>Delete</button>
           </div>
       `
       usersList.appendChild(liElement)
    })

    let delBtn  = document.querySelectorAll('.del-btn')
    delBtn.forEach(btn =>{
        btn.addEventListener('click', (e)=>{
            deleteUser(e.target.id)
        })
    })
}

let getUsers = async () =>{
    try {
        state.textContent = "Please wait..."
        let res = await fetch ("http://localhost:4001/user")
    
        let json = await res.json()
        state.textContent = ""
        users = json.users
        display()
    } catch (error) {
        state.textContent = error.message
        console.log(error);
        setTimeout(()=>{
            state.textContent = "Try update"
        },3000)
    }
}

getUsers()

adminForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    addUser()
    
})