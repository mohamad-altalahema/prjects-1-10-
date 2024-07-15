// function get totle
// function create product
// save data on localstorge
// clear inpet after creat
// red
//count
// delete
// update
//search
//clean data

let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let mood ='create';
let tmp;


//***************************************************** */

// function get totle
function getTotle()  
{
    
    if (price.value != '') {
        let result= (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML = result;
        total.style.background='#040'
        
    }
    else{
        total.innerHTML ='';
        total.style.background='#a00d02';
    }

}
//***************************************************** */



// function create product

let datapro;
if (localStorage.product !=null) {
    datapro = JSON.parse (localStorage.product)
    
}
else{
    datapro =[];
}
//let datapro= [];      // كل بياناتي موجوده هنا في مصفوفه

submit.onclick = function(){
    let newpro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,



    }

    //count هتا انشاء المنتج حسب الرقم البحطو عدد مرات الانشاء
    if (mood ==='create') {
        if (newpro.count >1) {
            for (let i = 0; i < newpro.count; i++) {
                datapro.push(newpro); 
                
            }
    
            
        }else{ datapro.push(newpro); }
        
    }else{ 
        datapro[tmp]=newpro;
        mood = 'create';
        submit,this.innerHTML = 'create';
        count.style.display = 'block';
        

    }
   
     
   // datapro.push(newpro);  // جمله مهمه لاجتفاظ البيانات المدحله قديماواضافه عنصر في نهايه المصفوفه
    // save data on localstorge
    localStorage.setItem( 'product', JSON.stringify(datapro)  );
    console.log(datapro);  
   
    cleardata()
    showData()
    
    

}


/******************************************************* */
// clear inpet after creat
function cleardata(){
    title.value ='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';

}


/******************************************************* */
// red
function showData()
{
    getTotle();// لتشغيل فنكشن الحمع
    let table ='';
    for (let i = 0; i < datapro.length; i++) {
        
        
      table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick= "updatedata(${i})"id="update">update</button></td>
        <td><button onclick="delatedata(${i}) " id="delate">delate</button></td>
     </tr>
    `
        
        
   
       
    }
   

 document.getElementById('tbody').innerHTML = table; // فظيت الحدول بشكل كامل 
 // عمل زرار لجذف كل البيانات وشرط وجود بيانات لكي يظهر الزرار
let btndelete = document.getElementById('deleteAll');
if (datapro.length > 0) {
    btndelete.innerHTML = `
    <button onclick="deleteAll()" >delate All (${datapro.length})</button>
    `
    
}else{
    btndelete.innerHTML = '';

}
}
showData()



/******************************************************* */
// delete
function delatedata(i)
{
   datapro.splice(i,1); //مسجنا من الاري فقط
   localStorage.product = JSON.stringify(datapro);// عاودتا ضفنا الاري الجديده في محزن الموقع
   showData()

}

/******************************************************* */
// deleteall
// هاذ الفنكشت تابع لكود فوق
function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData();

}

/******************************************************* */
// update
function updatedata(i){
    console.log(i)
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotle();
  count.style.display = 'none'
    category.value = datapro[i].category;
    submit.innerHTML = 'update';
   mood ='update';
   tmp=i;
   scroll({  // رفع الشاشه عند الضغط على تحديث
    top:0,
    behavior:'smooth',  // الرفع بالنعومه
   })


}

/******************************************************* */
// search
// id = عنوان الامر 
let searchmood ='title';
function getsearch(id){  //html هنا احذ عنوان البتن السيرش في ملف 

    let search =document.getElementById('search');

    if (id == 'searchtitle') {
        searchmood ='title';
        search.placeholder ='search by title';

        
    }else {
        searchmood ='category';
        search.placeholder ='search by category';
    }
    
    search.focus()
    search.value ='';
    showData();
  

}

function seachdata(value) {
    let  table = '';
    
    if(searchmood== 'title'){
        for (let i = 0; i < datapro.length; i++) {
            if(datapro[i].title.includes(value)){
                table += `
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick= "updatedata(${i})"id="update">update</button></td>
                <td><button onclick="delatedata(${i}) " id="delate">delate</button></td>
             </tr>
            `
                
            }
            
        }



    }else{
        for (let i = 0; i < datapro.length; i++) {
            if(datapro[i].category.includes(value)){
                table += `
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick= "updatedata(${i})"id="update">update</button></td>
                <td><button onclick="delatedata(${i}) " id="delate">delate</button></td>
             </tr>
            `
                
            }
            
        }
    

    }
    document.getElementById('tbody').innerHTML = table;

    
}



