const button = document.querySelector('button');

console.log(button)
button.addEventListener('click',(event)=>{
    console.log(event.clientX,event.clientY)
    console.log(event.target)
    console.log(event.currentTarget)
    console.log(event.ctrlKey)
    console.log(event.shiftKey)
    console.log(event.altKey)
})


