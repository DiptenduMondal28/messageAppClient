const messageButton = document.getElementById('messageButton');

messageButton.addEventListener('click',async(e)=>{
    e.preventDefault();
    const message=document.getElementById('message').value;
    console.log(message)
    const token = localStorage.getItem('token')
    await axios.post('http://localhost:3000/user/message',{message:message},{headers:{'Authorization':token}}).then(response=>{
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    })
});

