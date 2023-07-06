async function submitdata(event){
    event.preventDefault();
    let name=document.getElementById('password').value;
    let email=document.getElementById('password').value;
    let ph=document.getElementById('password').value;
    let password=document.getElementById('password').value;
    let confirm=document.getElementById('confirm').value;
    if(password!=confirm){
       document.querySelector('#small').innerHTML='password not match';
    }else{

        let details={
            name:name,
            email:email,
            ph:ph,
            password:password
        }
        let dataCreation = await axios.post('http://localhost:3000/createuser',details);
        if(dataCreation.request.status===409){
            alert('user already exist');
        }else if(dataCreation.request.status===200){
            alert('user creates successfully');
        }else{
            alert('something wrong');
        }
    }
}