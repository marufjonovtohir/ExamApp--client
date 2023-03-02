let usersList = document.querySelector('.user-list')
let state = document.querySelector('.state-heading')

let users = []

let display = () =>{
    users.forEach(user =>{
       let liElement = document.createElement('li')
       liElement.classList.add('user')
       liElement.innerHTML = `
           <img src=${user?.image?.url ? user.image.url: user.gender == "male" ? "./images/boy.png" : "./images/girl.png"} alt=${user.firstname} class="user-img">
           <h3 class="user-name">${user.firstname} ${user.lastname}</h3>
           <a href="mail-to" class="email-link">${user.email}</a>
           <p class="user-gender">${user.gender}</p>
       `
       usersList.appendChild(liElement)
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

