const messageButton = document.getElementById('messageButton');

messageButton.addEventListener('click',async(e)=>{
    // e.preventDefault();
    const message=document.getElementById('message').value;
    console.log(message)
    const token = localStorage.getItem('token')
    await axios.post('http://localhost:3000/user/message',{message:message},{headers:{'Authorization':token}}).then(response=>{
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    })
});


document.addEventListener('DOMContentLoaded',async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    setInterval(async()=>{
        await axios.get('http://localhost:3000/user/reply',{headers:{'Authorization':token}}).then(response=>{
        console.log(response.data.message);
        for(const reply of response.data.message){
            show(reply);
        }
        });

    },1000)
})


async function show(reply){
    const messageBox=document.getElementById('message-container');
    const mesageshow = document.createElement('div');
    mesageshow.innerHTML=`<h3 id="reply">${reply.user.name}:${reply.message}</h3>`
    const { width } = mesageshow.getBoundingClientRect();
    mesageshow.style.width = width + 'px';
    messageBox.appendChild(mesageshow);
    setInterval(async()=>{
        mesageshow.innerHTML='';
    },950);
}

