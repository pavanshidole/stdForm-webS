const cl=console.log;

const stdForm=document.getElementById("stdForm");
const fnameControl=document.getElementById("fname");
const lnameControl=document.getElementById("lname");
const emailControl=document.getElementById("email");
const contactControl=document.getElementById("contact");
const stdContainer=document.getElementById("stdContainer");
const info=document.getElementById("info");
const card=document.getElementById("card");
const Addstd=document.getElementById("Addstd");
const updateStd=document.getElementById("updateStd");

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// let stdArr=[
//     {
//         fname:"pavan",
//         lname:"shidole",
//         email:"ps@gmail.com",
//         contact:123434343,
//         stdId:"120",
//     }
// ]

 
const onEdit=(ele)=>{
    let editId=ele.closest("tr").id;
   
    cl(editId);

    let getObj=stdArr.find(std=> std.stdId===editId);

    cl(getObj);

    fnameControl.value=getObj.fname;
    lnameControl.value=getObj.lname;
    emailControl.value=getObj.email;
    contactControl.value=getObj.contact;

    Addstd.classList.add("d-none");
    updateStd.classList.remove("d-none");
}


const tempArr=(arr)=>{
    let result="";

    arr.forEach((std,i)=> {
   result+=`<tr id="${std.stdId}">
                <td>${i+1}</td>
                <td>${std.fname}</td>
                <td>${std.lname}</td>
                <td>${std.email}</td>
                <td>${std.contact}</td>                 
                <td><i class="fa-solid editBtn fa-pen-to-square text-primary" onclick="onEdit(this)"></i></td>                 
                <td><i class="fa-solid removeBtn fa-trash text-danger" onclick="onRemove(this)"></i></td>                 
            </tr>`
    });

   stdContainer.innerHTML=result;

    console.log(result);

}

let stdArr=localStorage.getItem("stdArr")? JSON.parse(localStorage.getItem("stdArr")) : [];


const onmsg=()=>{
    if(stdArr.length===0){
        info.classList.remove("d-none");
        card.classList.add("d-none");
    }else{
        info.classList.add("d-none");
        card.classList.remove("d-none");
    }
}

onmsg();

if(stdArr.length > 0){
    tempArr(stdArr);
}


const onStdForm=(ele)=>{
    ele.preventDefault();

    let stdObj={
        fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:parseInt(contactControl.value),
        stdId:uuid(),
    }

    stdArr.push(stdObj);


    let tr=document.createElement("tr");
    tr.id=stdObj.stdId;

    tr.innerHTML=`
                <td>${stdArr.length}</td>
                <td>${stdObj.fname}</td>
                <td>${stdObj.lname}</td>
                <td>${stdObj.email}</td>
                <td>${stdObj.contact}</td>
                <td><i class="fa-solid editBtn fa-pen-to-square text-primary" onclick="onEdit(this)"></i></td>                 
                <td><i class="fa-solid removeBtn fa-trash text-danger" onclick="onRemove(this)"></i></td>      
    
    `

    stdContainer.append(tr);

    localStorage.setItem("stdArr", JSON.stringify(stdArr));

    onmsg();

    ele.target.reset();


}




stdForm.addEventListener("submit" , onStdForm);