const menu = document.querySelector('.menu ')
const contmenu = document.querySelector('.cont-menu')

menu.addEventListener('click', ()=>{
    contmenu.classList.toggle("spread")

})

window.addEventListener('click', e =>{
    if(contmenu.classList.contains('spread') 
        && e.target != contmenu && e.target != menu){
        console.log('cerrar')
        contmenu.classList.toggle("spread")
    }
})
