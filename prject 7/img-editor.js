let img = document.getElementById('img');
let upload = document.getElementById('upload');
let download =document.getElementById('download')

// --------pin filter---------
let saturate =document.getElementById('saturate')
let contrast =document.getElementById('contrast')
let brigtness =document.getElementById('brigtness')
let sepia = document.getElementById('sepia')
let grayscale =document.getElementById('grayscale')
let blur =document.getElementById('blur')
let huerotate =document.getElementById('hue-rotate')

let reset = document.querySelector('span')
let imgbox =document.querySelector('.img-box')

const canvas =document.getElementById('canvas');
const ctx = canvas.getContext('2d')



//************************************ */
function resetvalue(){
    img.style.filter ='none';
    saturate.value ='100'
    contrast.value ='100'
    brigtness.value ='100'
    sepia.value ='0'
    grayscale.value ='0'
    blur.value ='0'
    huerotate.value ='0'

}


//عند قبل  نحميل صوره اخفي زر التنزيل والاعاده
window.onload =function(){
    download.style.display='none';
    reset.style.display='none';
    imgbox.style.display='none';

}
// رفع الصوره 
upload.onchange =function(){
    resetvalue()
    download.style.display='block';
    reset.style.display='block';
    imgbox.style.display='block';
    // كلاس بقرا الملفات 
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload =function(){
        img.src = file.result;
    }


    img.onload =function(){
        canvas.width=img.width;
        canvas.height =img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        

       
        img.style.display = 'none'
        
        
    }


}


// ---------- عمل الفلاتر ----------------

let filters= document.querySelectorAll("ul li input");
filters.forEach(filter =>{
    filter.addEventListener('input' , function(){
        ctx.filter =`
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brigtness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${huerotate.value}deg)
       

        `
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    })
})


// ---------تنزيل الصوره ----------------
download.onclick =function(){
    download.href =canvas.toDataURL();

}