// const messageButton = document.getElementById('messageButton');

// messageButton.addEventListener('click',async(e)=>{
//     // e.preventDefault();
//     const message=document.getElementById('message').value;
//     console.log(message)
//     const token = localStorage.getItem('token')
//     await axios.post('http://localhost:3000/user/message',{message:message},{headers:{'Authorization':token}}).then(response=>{
//         console.log(response);
//     }).catch((err)=>{
//         console.log(err);
//     })
// });


document.addEventListener('DOMContentLoaded',async(e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    const local= localStorage.getItem('messages')
    let start=0;
    console.log(local)
    if(!local || JSON.parse(local).length===0){
        start=0;
    }else{
        let messageArrray=JSON.parse(local);
        let len=messageArrray.length;
        start = messageArrray[len-1].id;

    }
    console.log(localStorage.getItem('group'))
    const group=localStorage.getItem('group');
    console.log(group,typeof(group))
    console.log(start);
    setInterval(async()=>{
        if(group!=null){
        await axios.get(`http://localhost:3000/user/allreply?start=${start}&group=${group}`,{headers:{'Authorization':token}}).then(response=>{
            console.log(response);
            const backData=response.data.message;
            // let localMessage=localStorage.getItem('messages');
            // if(!localMessage  || JSON.parse(localMessage).length===0){
                localStorage.setItem('messages',JSON.stringify(backData));
            // }else{
            //     const arrayOflocalMessage=JSON.parse(localMessage);
            //     const totalMessges=arrayOflocalMessage.concat(backData);
            //     localStorage.setItem('messages',JSON.stringify(totalMessges));
            // }
            const replies = JSON.parse(localStorage.getItem('messages'));
            console.log(replies)
            const group=Number(localStorage.getItem('group'));
            console.log(group,typeof(group))
            
            for(reply of replies){
                if(reply.groupId===group){
                    show(reply);
                }
            }
        
        });
    }
    },5000)
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
    },4950);
}
// localStorage.setItem('group',0);

const groupname=document.getElementById('groupname');
groupname.addEventListener('click',(e)=>{
    e.preventDefault();
    const token=localStorage.getItem('token')
    window.open(`../groupcreate/groupCreate.html?token=${token}`,"_blank");
})

document.addEventListener('DOMContentLoaded',async(e)=>{
    e.preventDefault();
    const token=localStorage.getItem('token');
    await axios.get('http://localhost:3000/group/groups',{headers:{'Authorization':token}}).then(result=>{
        console.log(result.data);
        const groups = result.data;
        for(let group of groups){
            findGroup(group);
        }
    })
})

async function findGroup(group){
    let groups = document.getElementById('groups');
    let groupButton = document.createElement('button');
    groupButton.innerHTML=group.name + " id: " + group.id;
    const buttonid=group.id;
    groupButton.id=buttonid;
    groups.appendChild(groupButton);
    localStorage.setItem('group',0);
    groupButton.onclick=(event)=>{
        clearButtons();
        event.preventDefault();
        const clickedButtonId = event.target.id;
        localStorage.setItem('group',clickedButtonId);
        const tokenId = localStorage.getItem('token');
        const messageContainer=document.getElementById('adduserbuttonContainer');


        //add user button
        const adduserButton=document.createElement('button');
        adduserButton.innerHTML= 'Add-user in'+group.name;
        messageContainer.appendChild(adduserButton)
        adduserButton.onclick=(event)=>{
            event.preventDefault();
            const url = `../adduser/adduser.html?id=${clickedButtonId}&token=${tokenId}`;
            window.open(url);
        }

        // remove user button 
        const removeuserbutton=document.createElement('button')
        removeuserbutton.innerHTML='Romeove from'+group.name;
        removeuserbutton.style.background='red';
        messageContainer.appendChild(removeuserbutton);
        removeuserbutton.onclick=(event)=>{
            event.preventDefault();
            const removeUrl=`../removeuser/remove.html?id=${clickedButtonId}&token=${tokenId}`;
            window.open(removeUrl);
        }
        
        //can make another member admin
        // const adminbutton=document.createElement('button');
        // adminbutton.innerHTML='add admin '+group.id;
        // adminbutton.style.background='green';
        // messageContainer.appendChild(adminbutton);
        // adminbutton.onclick=(event)=>{
        //     event.preventDefault();
        //     const addAdminUrl=`../admin/admin.html?id=${clickedButtonId}&token=${tokenId}`;
        //     window.open(addAdminUrl);
        // };

        //message box to send messages to group
        const messageSenderForm=document.getElementById('footer-input');
        messageSenderForm.style.display='flex';
        sendmessage(group.id);
        
    }
}

async function clearButtons() {
    const buttonDiv = document.getElementById('adduserbuttonContainer');
    const buttons = buttonDiv.getElementsByTagName('button');

    // Remove each button from the div
    while (buttons.length > 0) {
        buttonDiv.removeChild(buttons[0]);
    }
}
  


async function sendmessage(groupid){
    const messageButton = document.getElementById('messageButton');

    messageButton.addEventListener('click',async(e)=>{
        // const sendergroupid=groupid;
        e.preventDefault();
        const message=document.getElementById('message').value;
        document.getElementById('message').value=null;
        console.log(message)
        const token = localStorage.getItem('token')
        await axios.post('http://localhost:3000/user/message',{message:message,groupid:groupid},{headers:{'Authorization':token}}).then(response=>{
            console.log(response);
        }).catch((err)=>{
            console.log(err);
        })
        
    });
}

