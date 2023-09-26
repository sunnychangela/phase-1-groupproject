fetch("http://localhost:3000/vacation-destinations")
    .then((resp) => resp.json())
    .then((data) =>renderDestinations(data))


    const newDestinationForm = document.querySelector('#create-vacation-form')
    newDestinationForm.addEventListener('submit', (e) => addNewDestination(e))
    
    function addNewDestination(e) {
        e.preventDefault()
        
        const newDestinationObj = {
            "name": e.target.name.value,
            "image": e.target.image.value,
            "activities": e.target.activities.value,
            "description": e.target.description.value
        }

        renderDestinations([newDestinationObj])
        newDestinationForm.reset()

        fetch('http://127.0.0.1:3000/vacation-destinations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(newDestinationObj)
            })
            .then((resp) => resp.json())
            .then((destinationObj) => {
                renderDestinations(destinationObj)
            });
    }

    function renderDestinations(destinationsArr) {

        const ul = document.querySelector('#list-destinations-here')
        
        destinationsArr.forEach((destinationObj) => {
           
            const destinationCard = document.createElement('li')
            destinationCard.classList = "list-li"
            
            const destinationName = document.createElement('h1')
            destinationName.textContent = destinationObj.name
            destinationCard.append(destinationName)
            
            
           

            const img = document.createElement('img')
            img.src = destinationObj.image
            img.alt = destinationObj.name
            destinationCard.appendChild(img)

            const activitiesInfo = document.createElement('h4')
            activitiesInfo.textContent = destinationObj.activities

            const descInfo = document.createElement('p')
            descInfo.textContent = destinationObj.description

            destinationCard.addEventListener('mouseover', (e) => onMouseOver(e))
            destinationCard.addEventListener('mouseout', (e) => onMouseOut(e))

            function onMouseOver(e){
                destinationCard.style.boxShadow = '10px 10px 10px rgb(255, 199, 179)'
                destinationCard.style.border = 'rgb(255, 199, 179) solid 1px'
                destinationName.style.textShadow = '1px 2px 2px rgb(255, 199, 179)'
                infoBtn.style.boxShadow = '2px 2px 2px 2px rgb(255, 199, 179)'
            }

            function onMouseOut(e){
                destinationCard.style.boxShadow = '4px 4px 10px #c9c8c8'
                destinationCard.style.border = 'rgb(255, 255, 255) solid 1px'
                destinationName.style.textShadow = 'none'
                infoBtn.style.boxShadow = '2px 2px 2px 2px rgb(255, 199, 179)'
            }

          
            
            const infoBtn = document.createElement('button')
            infoBtn.classList = 'collapsed'
            infoBtn.id = 'evnt-btn'
            infoBtn.textContent = 'LEARN MORE'
            destinationCard.append(infoBtn)

            const deleteBtn = document.createElement('button')
            deleteBtn.textContent = `Delete`
            deleteBtn.classList = "evnt-button"

            
            deleteBtn.addEventListener('click', (e) => deleteDestination(e))
                        


            infoBtn.addEventListener('click', (e) => renderInfo(e))
            
            

            function deleteDestination(e) {
                e.preventDefault() 
                fetch(`http://localhost:3000/vacation-destinations/${destinationObj.id}`,
             {

              method: 'DELETE'

            })
             .then((resp) => resp.json())
             .then((data) => (data))
        }

            function renderInfo(e){
                e.preventDefault()

                const infoHidden = infoBtn.classList.toggle('collapsed')
                

                if (infoHidden){
                    infoBtn.textContent = 'LEARN MORE'
                    activitiesInfo.remove()
                    descInfo.remove()
                    deleteBtn.remove()

                }
                else {
                    infoBtn.textContent = 'HIDE'
                    destinationCard.append(activitiesInfo)
                    destinationCard.append(descInfo)
                    destinationCard.append(deleteBtn)
                }
                
            }
             ul.append(destinationCard)
        })
    }

    const toggleFormButtom = document.querySelector('#create-button')
    const formContainer = document.getElementById('create-destination')
    

    document.addEventListener("DOMContentLoaded", function() {
        newDestinationForm.style.display = "none";
    })

    function handleFormButton(e) {
        e.preventDefault()
        const destinationFormHidden = newDestinationForm.classList.toggle('collapsed')
        if (destinationFormHidden){
            toggleFormButtom.textContent = 'Create a Destination!'
            newDestinationForm.style.display = "none";
        } else {
            toggleFormButtom.textContent = 'Hide'
            newDestinationForm.style.display = "block";
        }
    }
    
    toggleFormButtom.addEventListener('click', handleFormButton)

  

