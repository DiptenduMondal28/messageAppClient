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
    await axios.get('http://localhost:3000/user/reply',{headers:{'Authorization':token}}).then(response=>{
        // const messageBox=document.getElementById('message-container');
        // const reply = document.createElement('')
        console.log(response.data.message);
        for(const reply of response.data.message){
            show(reply);
        }
    })
})

async function show(reply){
    const messageBox=document.getElementById('message-container');
    const mesageshow = document.createElement('div');
    mesageshow.innerHTML=`<h4>UserID:${reply.userId  }message:${reply.message}</h4>`
    messageBox.appendChild(mesageshow);
}

setTimeout(function() {
    location.reload();
  }, 50000); 
// setInterval('show',500)