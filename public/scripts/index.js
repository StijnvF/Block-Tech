// work around om form te editen zonder database
const form = document.querySelector('form')
const infoContainer = document.querySelector('.info')
const editButton = document.querySelector('#editButton')
form.style.display = 'none'

// if else om te switchen tussen wel eniet editen van form met een button
editButton.addEventListener('click', () => {
  if (form.style.display === 'none') {
    infoContainer.style.display = 'none'
    form.style.display = 'block'
  } else {
    infoContainer.style.display = 'block'
    form.style.display = 'none'
  }
})
