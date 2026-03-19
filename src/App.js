import { Routes, Route } from 'react-router-dom';
import PinDetail from './pages/PinDetail';       
import React, { useState, useEffect } from 'react'; 
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import AddPinForm from './components/AddPinForm';
import './App.css';

const initialPins = [
  // --- ART ---
  { id: 1, image: "https://i.pinimg.com/736x/68/94/85/6894859d5577ce7f6c4c5d0cc420a544.jpg", title: "Figure Drawing", category: "art" },
  { id: 2, image: "https://i.pinimg.com/736x/af/bb/4d/afbb4da4beb36f5fadb6894f2726fd73.jpg", title: "Sketch", category: "art" },
  { id: 3, image: "https://i.pinimg.com/1200x/1d/b8/ec/1db8ec26d5da93337e5834e41b6e6bc2.jpg", title: "Modern Art", category: "art" },
  { id: 4, image: "https://i.pinimg.com/1200x/50/47/b3/5047b3a13d01dbea37f97876e9c97c7a.jpg", title: "Watercolor", category: "art" },
  { id: 5, image: "https://i.pinimg.com/736x/d0/2a/ba/d02aba583d058b81257ee7b7b593b5eb.jpg", title: "Oil Painting", category: "art" },
  { id: 6, image: "https://i.pinimg.com/736x/66/db/03/66db038d54c1d4f99f804cd948a0d88f.jpg", title: "Digital Art", category: "art" },
  { id: 7, image: "https://i.pinimg.com/1200x/7c/db/3d/7cdb3dc143c0f0ca65496bd9750ee7a9.jpg", title: "Sculpture", category: "art" },
  { id: 8, image: "https://i.pinimg.com/736x/eb/e7/59/ebe759bfa5403bf871c57f8e350f63a8.jpg", title: "Abstract Art", category: "art" },

  // --- OUTFIT ---
  { id: 9, image: "https://i.pinimg.com/736x/34/69/77/346977eaa36683afe66ef3fcf96d3e2b.jpg", title: "Modest Outfit", category: "outfit" },
  { id: 10, image: "https://i.pinimg.com/736x/56/63/3e/56633eb11dd84ee46928a3bbba9ab406.jpg", title: "Street Style", category: "outfit" },
  { id: 11, image: "https://i.pinimg.com/1200x/4e/55/08/4e550887536db8efe255526b4afd29f6.jpg", title: "Winter Coat", category: "outfit" },
  { id: 12, image: "https://i.pinimg.com/736x/ee/eb/ae/eeebae14eedce08fa3f95d22415e6ea0.jpg", title: "Summer Dress", category: "outfit" },
  { id: 13, image: "https://i.pinimg.com/1200x/0e/4d/d4/0e4dd463984c3d9d178120869d9f7eaa.jpg", title: "Vintage Look", category: "outfit" },
  { id: 14, image: "https://i.pinimg.com/736x/c2/bc/7a/c2bc7aa7d0b9a42c40ad3caf4c0abe53.jpg", title: "Casual Wear", category: "outfit" },
  { id: 15, image: "https://i.pinimg.com/736x/6a/fa/8c/6afa8c474450e9bc544ec3192413de7b.jpg", title: "Formal Suit", category: "outfit" },
  { id: 16, image: "https://i.pinimg.com/736x/4f/83/1a/4f831a507eaa776c889f2d97e306c96e.jpg", title: "Sneakers Fashion", category: "outfit" },

  // --- HOME ---
  { id: 17, image: "https://i.pinimg.com/736x/e3/41/fc/e341fc979ba0c6545c1582b0c2223eee.jpg", title: "Cozy Bedroom", category: "home" },
  { id: 18, image: "https://i.pinimg.com/736x/e8/3d/8f/e83d8fe43da6a60d570794dc130069d8.jpg", title: "Living Room", category: "home" },
  { id: 19, image: "https://i.pinimg.com/736x/45/f5/97/45f597f29c9d32eb46c99ba659b052c8.jpg", title: "Kitchen Design", category: "home" },
  { id: 20, image: "https://i.pinimg.com/736x/99/80/bb/9980bb9e0a70db62dfae9bea68a778e6.jpg", title: "Bathroom Decor", category: "home" },
  { id: 21, image: "https://i.pinimg.com/736x/ad/f2/16/adf216b8e267b837cc9730ad55b834f4.jpg", title: "Home Office", category: "home" },
  { id: 22, image: "https://i.pinimg.com/1200x/c8/57/53/c85753bd98e05db0a52a11446e6784f4.jpg", title: "Minimalist Space", category: "home" },
  { id: 23, image: "https://i.pinimg.com/1200x/8c/9c/f8/8c9cf8ad59b98314a900de501f081fa7.jpg", title: "Garden Setup", category: "home" },
  { id: 24, image: "https://i.pinimg.com/1200x/dd/d7/aa/ddd7aa204727507137d9cf1ba534c530.jpg", title: "Balcony View", category: "home" },

  // --- AESTHETIC ---
  { id: 25, image: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=400", title: "Abstract Light", category: "aesthetic" },
  { id: 26, image: "https://i.pinimg.com/1200x/38/44/ad/3844aded3d65c3f49c5698d4798b9718.jpg", title: "Mountain Vibe", category: "aesthetic" },
  { id: 27, image: "https://i.pinimg.com/736x/9b/89/e8/9b89e85a3e6d9620e264b6fabd143811.jpg", title: "Neon City", category: "aesthetic" },
  { id: 28, image: "https://i.pinimg.com/736x/f3/56/59/f3565938a74dffad34103837416f664f.jpg", title: "Vintage Coffee", category: "aesthetic" },
  { id: 29, image: "https://i.pinimg.com/736x/9e/4f/81/9e4f81e717b6030830a5ee052ea5f683.jpg", title: "Sunset Glow", category: "aesthetic" },
  { id: 30, image: "https://i.pinimg.com/736x/69/f4/58/69f458eac1e37e72a4d7d8c68e910e96.jpg", title: "Dark Academia", category: "aesthetic" },
  { id: 31, image: "https://i.pinimg.com/736x/7b/47/ef/7b47ef693df00c3d1737b2d5af9d2e9e.jpg", title: "Soft Pastel", category: "aesthetic" },
  { id: 32, image: "https://i.pinimg.com/1200x/cb/24/91/cb249194e1e0eee23df2b69c1637e780.jpg", title: "Retro Tech", category: "aesthetic" },

  // --- WALL ---
  { id: 33, image: "https://i.pinimg.com/1200x/1d/3a/9b/1d3a9b1a69cc6965b9480fb82a3d284e.jpg", title: "Interior Wall", category: "wall" },
  { id: 34, image: "https://i.pinimg.com/736x/25/a9/88/25a988fac80ae78871e08163383f9458.jpg", title: "Brick Wall", category: "wall" },
  { id: 35, image: "https://i.pinimg.com/736x/56/09/d5/5609d556b31ec17778356b2f78e75205.jpg", title: "Poster Design", category: "wall" },
  { id: 36, image: "https://i.pinimg.com/736x/54/c6/0b/54c60be445d963225319483045a83d15.jpg", title: "Gallery Wall", category: "wall" },
  { id: 37, image: "https://i.pinimg.com/736x/a6/e1/55/a6e15550fb0f4ee2fe1653c93384bd8e.jpg", title: "Graffiti", category: "wall" },
  { id: 38, image: "https://i.pinimg.com/736x/56/50/8f/56508fa91ba8fe464ff3e926f4f779d8.jpg", title: "Wallpaper Pattern", category: "wall" },
  { id: 39, image: "https://i.pinimg.com/736x/dd/37/32/dd37326070229ea15baa549430f51a6a.jpg", title: "Textured Wall", category: "wall" },
  { id: 40, image: "https://i.pinimg.com/1200x/24/68/45/2468450c066632acc6e0d80c34d8f893.jpg", title: "Mirror Decor", category: "wall" },

  // --- CAR ---
  { id: 41, image: "https://i.pinimg.com/736x/bb/e4/a4/bbe4a49014927cf85bd8236289fa8c19.jpg", title: "Classic Porsche", category: "car" },
  { id: 42, image: "https://i.pinimg.com/736x/36/ec/b0/36ecb0a43827181b0df1941e5bea226c.jpg", title: "JDM Drifting", category: "car" },
  { id: 43, image: "https://i.pinimg.com/1200x/38/c3/2a/38c32a2396a0a8c3519a059017788fc9.jpg", title: "Luxury Sedan", category: "car" },
  { id: 44, image: "https://i.pinimg.com/736x/9f/ba/c1/9fbac1fa8ffd5e7cfd517a1812b53f14.jpg", title: "Vintage Mustang", category: "car" },
  { id: 45, image: "https://i.pinimg.com/736x/07/8e/0d/078e0dbae86ae8f33520e7d14bd241e7.jpg", title: "Supercar Night", category: "car" },
  { id: 46, image: "https://i.pinimg.com/1200x/6c/96/d8/6c96d884ee5b287231373813766969e9.jpg", title: "Offroad Jeep", category: "car" },
  { id: 47, image: "https://i.pinimg.com/736x/b5/5c/cc/b55ccca56db2a1fac9ea6d9f32da9f21.jpg", title: "Rally Racing", category: "car" },
  { id: 48, image: "https://i.pinimg.com/1200x/82/df/46/82df46b9d79170e714354deecc16f325.jpg", title: "Concept EV", category: "car" },

  // --- FOOD ---
  { id: 49, image: "https://i.pinimg.com/736x/3d/ba/5e/3dba5ed2c9404b548ff911d9b6aa5ee5.jpg", title: "Aesthetic Pasta", category: "food" },
  { id: 50, image: "https://i.pinimg.com/1200x/29/46/85/294685132aaaafdf717f5644ba8d4197.jpg", title: "Matcha Latte", category: "food" },
  { id: 51, image: "https://i.pinimg.com/736x/3b/e7/cb/3be7cb1d5a65c76ad5975e3e580b52ee.jpg", title: "Avocado Toast", category: "food" },
  { id: 52, image: "https://i.pinimg.com/736x/51/84/d0/5184d0ee9c432cf6cf74e3e4c1d0bc97.jpg", title: "Sushi Roll", category: "food" },
  { id: 53, image: "https://i.pinimg.com/736x/21/c6/fa/21c6fadcba18810df01a0e9736fb07c5.jpg", title: "Street Tacos", category: "food" },
  { id: 54, image: "https://i.pinimg.com/1200x/84/32/8f/84328f20624333c7839a8874f8271402.jpg", title: "Fresh Croissant", category: "food" },
  { id: 55, image: "https://i.pinimg.com/736x/e9/ea/fc/e9eafc0914d89ce51683ad45a5ffe192.jpg", title: "Smoothie Bowl", category: "food" },
  { id: 56, image: "https://i.pinimg.com/736x/a3/9f/fb/a39ffb674d7da51ddb97bb4bd60609a3.jpg", title: "Burger & Fries", category: "food" },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const shuffledPins = shuffleArray(initialPins);

function App() {
  // МАГИЯ №1: При запуске проверяем, есть ли сохраненные данные в браузере
  const [pins, setPins] = useState(() => {
    const savedData = localStorage.getItem('pinterest_data');
    if (savedData) {
      return JSON.parse(savedData); // Если есть - берем их
    } else {
      return shuffledPins; // Если нет - берем наши картинки
    }
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  // МАГИЯ №2: Каждый раз, когда массив pins меняется (добавили, удалили, сохранили), записываем его в память!
  useEffect(() => {
    localStorage.setItem('pinterest_data', JSON.stringify(pins));
  }, [pins]);

  // Создание (Create)
  const handleAddPin = (newPin) => {
    // По умолчанию новые пины не сохранены
    const pinToAdd = { ...newPin, saved: false };
    setPins([pinToAdd, ...pins]);
  };

  // Удаление (Delete)
  const handleDeletePin = (idToRemove) => {
    const updatedPins = pins.filter((pin) => pin.id !== idToRemove);
    setPins(updatedPins);
  };

  // Обновление (Update) - переключение статуса "Сохранить"
  const handleToggleSave = (idToToggle) => {
    const updatedPins = pins.map((pin) => {
      if (pin.id === idToToggle) {
        return { ...pin, saved: !pin.saved };
      }
      return pin;
    });
    setPins(updatedPins);
  };

 return (
    <div className="app-container">
      <Sidebar onOpenForm={() => setIsFormOpen(true)} />
      
      {/* Контент меняется в зависимости от пути в браузере */}
      <Routes>
        {/* ГЛАВНАЯ СТРАНИЦА - здесь используем Home и handleDeletePin */}
        <Route 
          path="/" 
          element={
            <Home 
              pins={pins} 
              onDeletePin={handleDeletePin} // Использование функции (исправит Line 118)
              onToggleSave={handleToggleSave}
            />
          } 
        />
        
        {/* СТРАНИЦА ДЕТАЛЕЙ */}
        <Route 
          path="/pin/:id" 
          element={<PinDetail pins={pins} onToggleSave={handleToggleSave} />} 
        />
      </Routes>
      
      {isFormOpen && (
        <AddPinForm 
          onClose={() => setIsFormOpen(false)} 
          onAdd={handleAddPin} 
        />
      )}
    </div>
  );
}

export default App;