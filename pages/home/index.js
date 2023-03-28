function renderJobs(jobs) {

    const listJobs = document.querySelector('.ul__container')

    jobs.forEach(job =>{

        const cardJob = createCardJob(job)

        listJobs.appendChild(cardJob)
    })

}

function createCardJob(job){

    const containerCard = document.createElement('li')
    const containerDiv = document.createElement('div')
    const titleCard = document.createElement('h2')
    const containerDetail = document.createElement('div')
    const detailEnterprise = document.createElement('small')
    const detailCity = document.createElement('small')
    const description = document.createElement('p')
    const containerButtons = document.createElement('div')
    const btnNodality = document.createElement('button')
    const btnCandidate = document.createElement('button')

    containerCard.classList.add('container__card--li')
    containerDiv.classList.add('div__container--li')
    titleCard.classList.add('container--title')
    containerDetail.classList.add('div__container--detail')
    detailEnterprise.classList.add('detail--enterprise')
    detailCity.classList.add('detail--city')
    description.classList.add('detail--description')
    containerButtons.classList.add('container__buttons')
    btnNodality.classList.add('card__btn--modality', 'btn')
    btnCandidate.classList.add('card__btn--candidate', 'btn')

    titleCard.innerText = job.title
    detailEnterprise.innerText = job.enterprise
    detailCity.innerText = job.location
    description.innerText = job.descrition

    btnNodality.innerText = job.modalities[0]
    btnCandidate.innerText = 'Candidatar'
    btnCandidate.dataset.id = job.id
   
    containerCard.appendChild(containerDiv)

    containerDiv.append(titleCard, containerDetail, description, containerButtons)

    containerDetail.append(detailEnterprise, detailCity)

    containerButtons.append(btnNodality, btnCandidate)

    return containerCard
}


function renderCartJobs(jobsArray){
    const cartContainerUl = document.querySelector('.container__aside')

    cartContainerUl.innerHTML = ''

    if(jobsArray == null || jobsArray.length <= 0){
        const emptyCartJobs = createCartJobsEmpty()

        cartContainerUl.appendChild(emptyCartJobs)
    }else{
        jobsArray.forEach(job =>{
            const jobCart = createCartJobs(job)
            
            cartContainerUl.appendChild(jobCart)

            removeJobFromCart(jobsArray)
        }) 
       
    } 
    
}

function createCartJobsEmpty() {
    const containerCard = document.createElement('li')
    const message = document.createElement('p')

    containerCard.classList.add('card__job--empty')
    message.classList.add('detail--description')

    message.innerText = 'Você ainda não aplicou para nenhuma vaga'

    containerCard.appendChild(message)

    return containerCard
}

function createCartJobs(job){
    const containerCard = document.createElement('li')
    const containerDiv = document.createElement('div')
    const titleCard = document.createElement('h2')
    const containerDetail = document.createElement('div')
    const detailEnterprise = document.createElement('small')
    const detailCity = document.createElement('small')
    const containerTrash = document.createElement('div')
    const imgTrash = document.createElement('img')
   
    containerCard.classList.add('card__job')
    containerDiv.classList.add('card__job--detail')
    titleCard.classList.add('container--title', 'aside--title')
    containerDetail.classList.add('div__container--detail')
    detailEnterprise.classList.add('detail--enterprise')
    detailCity.classList.add('detail--city')
    containerTrash.classList.add('container__trash')
    imgTrash.classList.add('container__trash--remove')

    titleCard.innerText = job.title
    detailEnterprise.innerText = job.enterprise
    detailCity.innerText = job.location

    imgTrash.src = "/assets/img/trash.svg"
    imgTrash.alt = 'Lixeira'
    
    imgTrash.dataset.cartId = job.cartId
    

    containerCard.append(containerDiv, containerTrash)

    containerDiv.append(titleCard, containerDetail)

    containerDetail.append(detailEnterprise, detailCity)

    containerTrash.appendChild(imgTrash)

    return containerCard
}

function addJobToCart(){
    const btnsCandidate = document.querySelectorAll('.card__btn--candidate')

    btnsCandidate.forEach(btnCandidate =>{
        btnCandidate.addEventListener('click', (event) =>{
           
            const jobFound = jobsData.find(job => {
                return job.id === Number(event.target.dataset.id)
            })

            if(jobFound != null){
                btnCandidate.innerText == 'Candidatar'
            }else{
                btnCandidate.innerText = 'Remover Candidatura'
            }

            const jobToCart = {
                ...jobFound,
                cartId: cart.length + 1
            }
            cart.push(jobToCart)

            localStorage.setItem("cartJobs", JSON.stringify(cart))
            renderCartJobs(cart)
        })
    })
}


function removeJobFromCart(jobsArray){
   
    const removeJobsCart = document.querySelectorAll('.container__trash--remove')

    removeJobsCart.forEach( removeJob => {
        removeJob.addEventListener('click', (event) => {
            const jobInCart = jobsArray.find(job =>{
                
                return job.cartId === Number(event.target.dataset.cartId)
            })
            const jobIndex = jobsArray.indexOf(jobInCart)
            jobsArray.splice(jobIndex, 1)
            renderCartJobs(jobsArray)
        })
    })
}


renderJobs(jobsData)
renderCartJobs(JSON.parse(localStorage.getItem("cartJobs")))
addJobToCart()
// removeJobFromCart(JSON.parse(localStorage.getItem("cartJobs")))
// renderCartJobs(jobsArray)