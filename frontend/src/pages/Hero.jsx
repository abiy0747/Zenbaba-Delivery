import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


import burger from "../assets/burger.png";
import pizza from "../assets/pizza.png";
import tibs from "../assets/tibs.png";
import arusto from "../assets/arusto.png";
import beyaynet from "../assets/beyaynet.png";


import tomato from "../assets/tomato.png";
import cheese from "../assets/cheese.png";
import pepper from "../assets/pepper.png";
import mushroom from "../assets/mushroom.png";
import basil from "../assets/basil.png";


const foodImages = [
  burger,
  pizza,
  tibs,
  arusto,
  beyaynet
];


const ingredients = [

{
name:"tomato",
image:tomato,
position:"top-0 left-1/2"
},

{
name:"cheese",
image:cheese,
position:"top-1/2 right-0"
},

{
name:"pepper",
image:pepper,
position:"bottom-0 right-1/4"
},

{
name:"mushroom",
image:mushroom,
position:"bottom-0 left-1/4"
},

{
name:"basil",
image:basil,
position:"top-1/2 left-0"
}

];



const Hero =()=>{

const navigate = useNavigate();


const [currentFood,setCurrentFood]=useState(0);



useEffect(()=>{

const timer=setInterval(()=>{

setCurrentFood(prev=>
(prev+1)%foodImages.length
);

},3000);


return()=>clearInterval(timer);


},[]);



return(

<section

className="
min-h-[850px]
lg:min-h-screen
bg-white
dark:bg-[#0B0B0B]
flex
items-center
overflow-hidden
px-6
lg:px-20
py-20
lg:py-32
transition-colors
duration-500
"


>


<div

className="
max-w-7xl
mx-auto
w-full
grid
grid-cols-1
lg:grid-cols-2
gap-10
items-center
"


>



{/* LEFT */}

<motion.div

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:1
}}

className="
order-2
lg:order-1
text-center
lg:text-left
"

>


<p

className="
text-yellow-500
tracking-[5px]
uppercase
text-sm
mb-6
"

>

ZENBABA DELIVERY

</p>



<h1

className="
text-gray-900
dark:text-white
text-5xl
md:text-6xl
xl:text-7xl
font-extrabold
leading-tight
"

>

Delicious Food

<br/>

Delivered To Your Door

</h1>




<p

className="
text-gray-600
dark:text-gray-400
mt-6
max-w-lg
text-lg
leading-relaxed
"

>

Order Ethiopian and international meals from
the best restaurants in Bahir Dar.
Fast delivery, fresh food and trusted service.

</p>



<motion.button

whileHover={{
  scale:1.08
}}

whileTap={{
  scale:0.95
}}

onClick={() => navigate("/cart")}

className="
mt-8
bg-yellow-400
text-white
font-bold
px-10
py-4
rounded-full
shadow-[0_0_30px_rgba(250,204,21,0.4)]
cursor-pointer
"

>
Start Ordering 🍔

</motion.button>


</motion.div>






{/* RIGHT */}

<div

className="
order-1
lg:order-2
relative
flex
justify-center
items-center
h-[450px]
"

>




{/* GLOW */}

<motion.div

animate={{

scale:[1,1.15,1],

opacity:[0.3,0.6,0.3]

}}

transition={{

duration:4,

repeat:Infinity

}}

className="
absolute
w-[300px]
h-[300px]
bg-yellow-300
dark:background:#FFC107;
rounded-full
blur-[100px]
"

/>





{/* RING 1 */}

<motion.div

animate={{
rotate:360
}}

transition={{

duration:20,

repeat:Infinity,

ease:"linear"

}}

className="
absolute
w-[430px]
h-[430px]
rounded-full
border
border-yellow-400/30
"

/>





{/* RING 2 */}

<motion.div

animate={{
rotate:-360
}}

transition={{

duration:30,

repeat:Infinity,

ease:"linear"

}}

className="
absolute
w-[360px]
h-[360px]
rounded-full
border
border-yellow-300/20
"

/>





{/* INGREDIENTS */}

<motion.div

animate={{
rotate:360
}}

transition={{

duration:18,

repeat:Infinity,

ease:"linear"

}}

className="
absolute
w-[450px]
h-[450px]
rounded-full
"

>


{
ingredients.map(item=>(


<motion.img

key={item.name}

src={item.image}

alt={item.name}

className={`
absolute
w-12
h-12
rounded-full
object-cover
shadow-xl
${item.position}
`}


animate={{
rotate:-360
}}

transition={{

duration:18,

repeat:Infinity,

ease:"linear"

}}


/>


))
}



</motion.div>






{/* FOOD CIRCLE */}

<AnimatePresence mode="wait">


<motion.div

key={foodImages[currentFood]}


initial={{
opacity:0,
scale:0.8
}}


animate={{
opacity:1,
scale:1,
y:[0,-15,0]
}}


exit={{
opacity:0,
scale:0.8
}}


transition={{

duration:0.8,

y:{
duration:4,
repeat:Infinity,
ease:"easeInOut"
}

}}


className="
relative
z-10
my-10
w-[280px]
h-[280px]
sm:w-[330px]
sm:h-[330px]
md:w-[380px]
md:h-[380px]
lg:w-[420px]
lg:h-[420px]
rounded-full
overflow-hidden
bg-yellow-200/30
dark:background:#FFC107;/10
border-4
border-yellow-400/30
shadow-[0_0_50px_rgba(250,204,21,0.35)]
flex
items-center
justify-center
"

>


<img

src={foodImages[currentFood]}

alt="Zenbaba Food"

className="
w-full
h-full
object-contain
p-6
scale-125
"

/>


</motion.div>


</AnimatePresence>



</div>


</div>


</section>


);


};


export default Hero;