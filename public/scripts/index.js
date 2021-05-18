const form = document.querySelector('form')
const infoContainer = document.querySelector('.info')
const editButton = document.querySelector('#editButton')
form.style.display = 'none'

editButton.addEventListener('click', () => {
  if (form.style.display === 'none') {
    infoContainer.style.display = 'none'
    form.style.display = 'block'
  } else {
    infoContainer.style.display = 'block'
    form.style.display = 'none'
  }
})
