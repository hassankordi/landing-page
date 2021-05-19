// build the nav
const navArr = document.querySelectorAll("section"); 

let navList = document.getElementById("navbar__list"); 




let t0 = performance.now(); 


// creat a navlist and set the name of links and put his "href" to scroll onclick
/*
 *1-loop on sections to creat a link for each one
 *2-get section id and give it at <a>
 *3-implement <a> with data attr of section
 *4-append <a> to li   and append li to fragment
 *5-append fragment to UL
 */
function creatNavList() {
    let frag = document.createDocumentFragment();

    for (let i = 0; i < navArr.length; i++) {


        let li = document.createElement("li"); 
        let link = document.createElement("a"); 

        let sectionId = navArr[i].getAttribute("id"); 

        link.setAttribute("href", `#${sectionId}`); 

        link.setAttribute("class", "menu__link")

        let content = navArr[i].getAttribute("data-nav"); 
        link.textContent = content; 

        li.appendChild(link) 

      
        frag.appendChild(li) 


    }

    navList.appendChild(frag) 
}

// call the function to start building
creatNavList();

let t1 = performance.now();
console.log("time is " + (t1 - t0))


const navLinks = document.querySelectorAll("a"); 


// put "your-active-class" on click at the link who refer to the section
for (link of navLinks) {

    link.addEventListener("click", scrollToSec)
}



// active section by click and scroll
/*
 *1-prevent <a>
 *2-remove from all sec "your-active-class"
 *3-set "your-active-class" for the section who i refere to by clicking on his link
 *4-make scroll smooth
 */

function scrollToSec(anchor) {
    anchor.preventDefault() // freez the default event
    // console.log(anchor)
    for (section of navArr) {
        section.classList.remove("your-active-class")

    }

    let mySec = document.querySelector(anchor.path[0].getAttribute("href"));
    // console.log(anchor.path[0].getAttribute("href"))

    mySec.setAttribute("class", "your-active-class")
    mySec.scrollIntoView({
        behavior: "smooth"
    })


}




// active section by scroll 
/*
 *1-loop on all sections to get who in the scope
 *2-set "your-active-class" to the section who in the scope and add "activeLink" to his link
 *3-remove this classes when the section out of scope
 */
document.addEventListener("scroll", () => {
    //  console.log(document.body.getBoundingClientRect())
    for (let i = 0; i < navArr.length; i++) {

        if (navArr[i].getBoundingClientRect().y <= 200 && navArr[i].getBoundingClientRect().y >= -50) {
            navArr[i].setAttribute("class", "your-active-class");
            //     navLinks[i].setAttribute("class", "activeLink");
            navLinks[i].classList.add("activeLink");
            // use "classList.add" because setAttr makes overwrite on default class 
        } else {
            navArr[i].classList.remove("your-active-class")
            navLinks[i].classList.remove("activeLink")


        }
    }

})