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
    const local= localStorage.getItem('messages')
    let start=0;
    console.log(local)
    if(!local){
        start=0;
    }else{
        let messageArrray=JSON.parse(local);
        let len=messageArrray.length;
        start = messageArrray[len-1].id;

    }
    
    console.log(start);
    // setInterval(async()=>{
        await axios.get(`http://localhost:3000/user/reply?start=${start}`,{headers:{'Authorization':token}}).then(response=>{
            console.log(response.data.message);
            const backData=response.data.message;
            let localMessage=localStorage.getItem('messages');
            if(!localMessage){
                localStorage.setItem('messages',JSON.stringify(backData));
            }else{
                const arrayOflocalMessage=JSON.parse(localMessage);
                const totalMessges=arrayOflocalMessage.concat(backData);
                localStorage.setItem('messages',JSON.stringify(totalMessges));
            }
            const replies = JSON.parse(localStorage.getItem('messages'));
            
            for(reply of replies){
                show(reply);
        }
        
        });

    // },1000)
})


  

async function show(reply){
    const messageBox=document.getElementById('message-container');
    const mesageshow = document.createElement('div');
    mesageshow.innerHTML=`<h3 id="reply">${reply.user.name}:${reply.message}</h3>`
    const { width } = mesageshow.getBoundingClientRect();
    mesageshow.style.width = width + 'px';
    messageBox.appendChild(mesageshow);
    // setInterval(async()=>{
    //     mesageshow.innerHTML='';
    // },950);
}

