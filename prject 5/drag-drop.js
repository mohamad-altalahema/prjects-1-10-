let inp=document.getElementById('inp');
let btn =document.getElementById('btn');
let boxs = document.querySelectorAll('.box') ;// هنا بمسهم كلهم 
let drag =null;

//الخطوه الاولى :اضافه العناصر من المدخل الى اول صندوق
//الحطوه القانيه : اضافه سحب البياتات بين الصناديق

//function add() {
    btn.onclick =function(){
    // فجص وجود بيانات في المدخل
   // *-1-*

   if (inp.value !='') {                                //اضف هذه البيانات في صندوق رقم 0
    boxs[0].innerHTML +=`
    <p class="item" draggable="true">${inp.value}</p> 
    `;  
    inp.value='';  
     
  
   }
   

   // *-2-*
   dragitem()
   

    }
 
  


// *-2-*
function dragitem() {
    // مسك كل عناصر الصندوق
    let item = document.querySelectorAll('.item')
    for (let i = 0; i < item.length; i++) {
        // جمله مهمه لاضافه جدث على العتاصر 
        item,addEventListener('dragstart', function(){
            drag =item;
            
            
            
        });

        item,addEventListener("dragend", function(){
            drag =null
        });
      
       
      boxs.forEach(box => {
        box.addEventListener('dragover',function(){
            console.log('vv');
            
            
        })
        
      });
     }


    
        
    
}


