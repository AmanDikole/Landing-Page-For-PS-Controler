import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion' 
import './App.css' 
import Menu from "./assets/menu.png"
import Logo from "./assets/PlayStation-Logo.wine.svg"

// Import your images
import WhiteCtrl from "./assets/const3.png" 
import RedCtrl from "./assets/cont2.png" 
import BlackCtrl from "./assets/cont3.png" 

// Enhanced Data Structure
const controllers = [
  {
    id: 0,
    name: "DualSense™ Wireless",
    price: "$69.99",
    description: "Discover a deeper, highly immersive gaming experience that brings the action to life in the palms of your hands.",
    img: WhiteCtrl,
    theme: "bg-amber-300",
    shadow: "shadow-amber-500/50",
    font: "text-gray-900" // Changed to dark text for visibility on yellow
  },
  {
    id: 1,
    name: "Cyberpunk 2077 Edition",
    price: "$85.00",
    description: "The Cyberpunk DualSense™ Wireless Controller for PS5 gives you what you want in your gaming from precision control.",
    img: RedCtrl, 
    theme: "bg-gray-800", // Made background darker for "Cyberpunk" feel
    shadow: "shadow-yellow-400/50",
    font: "text-white"
  },
  {
    id: 2,
    name: "Call of Duty Edition",
    price: "$95.00",
    description: "The Call of Duty DualSense™ provides haptic feedback, dynamic adaptive triggers and a built-in microphone.",
    img: BlackCtrl,
    theme: "bg-gray-200",
    shadow: "shadow-white-500/50",
    font: "text-gray-900" // Changed to dark text for visibility on light gray
  },
];

function App() {
  const [active, setActive] = useState(0);

  return (
    
    <div className={`min-h-screen transition-colors duration-700 ease-in-out ${controllers[active].theme} font-sans overflow-hidden relative`}>
      <header className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto relative z-20">
        <div className="w-16">
           <img src={Logo} alt="PS5 Logo" className="w-full object-contain"/>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-semibold text-gray-700 uppercase tracking-wider mix-blend-multiply">
            {['PS5', 'Games', 'Accessories', 'Support'].map((item) => (
              <a key={item} href="#" className="hover:text-black transition-colors">{item}</a>
            ))}
        </nav>
        <div className="flex items-center gap-6">
            <span className="cursor-pointer text-xl">🔍</span>
            <img className='w-6 cursor-pointer md:hidden' src={Menu} alt="Menu"/>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 min-h-[80vh] flex flex-col md:flex-row items-center relative z-10">
        <div className="flex-1 text-center md:text-left mt-10 md:mt-0 z-20">
          <AnimatePresence mode='wait'>
            <motion.div
              key={active} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h4 className={`font-bold uppercase tracking-widest mb-2 opacity-70 ${controllers[active].font}`}>
                Accessories
              </h4>
              
              <h1 className={`text-5xl md:text-7xl font-black leading-tight mb-4 ${controllers[active].font}`}>
                {controllers[active].name}
              </h1>

              {/* FIXED: Dynamic ClassName Syntax */}
              <h2 className={`text-4xl font-bold mb-6 ${controllers[active].font}`}>
                {controllers[active].price}
              </h2>

              <p className={`text-lg max-w-md leading-relaxed mb-8 mx-auto md:mx-0 opacity-80 ${controllers[active].font}`}>
                {controllers[active].description}
              </p>

              <button className="bg-white text-black px-10 py-4 rounded-xl font-bold uppercase tracking-wide hover:scale-105 transition transform shadow-xl">
                Add to Cart
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex-1 flex justify-center items-center relative h-[400px] md:h-[600px]">
             <AnimatePresence mode='wait'>
                <motion.img 
                  key={active}
                  src={controllers[active].img} 
                  alt={controllers[active].name}
                  initial={{ opacity: 0, x: 100, rotate: 0 }}
                  animate={{ opacity: 1, x: 0, rotate: -15 }}
                  exit={{ opacity: 0, x: -100, rotate: -30 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className={`w-[80%] md:w-full max-w-xl object-contain drop-shadow-2xl ${controllers[active].shadow}`}
                />
             </AnimatePresence>
        </div>

      </main>

      {/* --- Bottom: Circle Rotation Selector --- */}
      <div className="absolute bottom-0 left-0 w-full h-48 flex items-end justify-center overflow-hidden z-30 pointer-events-none">
        
        <div className="relative w-full max-w-3xl flex justify-center items-end h-full pb-10">
          
          {controllers.map((item, index) => {
            const offset = index - active;
            return (
              <motion.div
                key={item.id}
                onClick={() => setActive(index)}
                layout 
                initial={false}
                animate={{
                  rotate: offset * 20, 
                  y: Math.abs(offset) * 30, 
                  x: offset * 60,
                  scale: offset === 0 ? 1.3 : 0.9,
                  opacity: offset === 0 ? 1 : 0.6,
                  zIndex: 10 - Math.abs(offset) 
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformOrigin: "50% 150%" }} 
                className="absolute bottom-4 cursor-pointer pointer-events-auto p-2"
              >
                <img 
                  src={item.img} 
                  className="w-24 md:w-28 object-contain drop-shadow-lg" 
                  alt={item.name}
                />
                
                {active === index && (
                   <motion.div 
                     layoutId="active-glow"
                     className="w-2 h-2 bg-white rounded-full mx-auto mt-2 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                   />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  )
}

export default App