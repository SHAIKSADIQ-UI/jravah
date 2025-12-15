const products = [
  {
    "id": 1,
    "name": "Ginger Pickle",
    "category": "Pickles",
    "image": "images/Gingerpickle.jpeg",
    "description": "Fresh spicy ginger pickle that made from home with rich oils",
    "ingredients": "Gram flour, carom seeds, turmeric, and high-quality vegetable oil.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 2,
    "name": "Lemon Pickle",
    "category": "Pickles",
    "image": "images/lemon2.jpg",
    "description": "Its tangy taste can enhance appetite, especially in hot climates to your table",
    "ingredients": "Rice flour, roasted split gram, sesame seeds, ghee, and mild chili powder.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 3,
    "name": "karela pickle",
    "category": "Pickles",
    "image": "images/karela pickle.jpeg",
    "description": "Bitter gourd contains charantin and polypeptide-p, which help lower glucose levels",
    "ingredients": "Premium cashews, thin sev, poha (flattened rice), dried grapes, and unique seasoning.",
    "stock": "out",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 4,
    "name": "Mutton Boneless",
    "category": "Pickles",
    "image": "images/mutton boneless.jpg",
    "description": "Extra **spicy and flavorful** variety of boondi; great as a standalone snack with a cool beverage.",
    "ingredients": "Besan, red chili flakes, roasted peanuts, curry leaves, and a touch of ginger.",
    "stock": "in",
    "weights": {
      "250g": 550,
      "500g": 1100,
      "1kg": 2200
    }
  },
  {
    "id": 5,
    "name": "Fish pickle",
    "category": "Pickles",
    "image": "images/fishpickle.jpg",
    "description": "Fish pickle is rich in protein, omega-3 fatty acids, and essential minerals, making it a flavorful yet nutritious",
    "ingredients": "Thin sev, boondi, roasted chana dal, rice flakes, and sweet-sour seasoning.",
    "stock": "out",
    "weights": {
      "250g": 400,
      "500g": 800,
      "1kg": 1600
    }
  },
  {
    "id": 6,
    "name": "Mango pickle",
    "category": "Pickles",
    "image": "images/Mango3.jpg",
    "description": "Fermented mango and spices stimulate digestive enzymes and gut health.it is rich in vitaminC",
    "ingredients": "Ground rice and urad dal, combined with light butter and cumin for deep frying.",
    "stock": "in",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 7,
    "name": "Prawns pickle",
    "category": "Pickles",
    "image": "images/prawns pickle.jpg",
    "description": "Promotes heart health, reduces inflammation, and improves brain function.",
    "ingredients": "Fine chickpea noodles seasoned primarily with black pepper, turmeric, and rock salt.",
    "stock": "in",
    "weights": {
      "250g": 450,
      "500g": 900,
      "1kg": 1800
    }
  },
  {
    "id": 8,
    "name": "Pandu mirchi pickle",
    "category": "Pickles",
    "image": "images/Pandumirchi.jpeg",
    "description": "Ripe red chilies contain capsaicin and carotenoids that help fight oxidative stress.",
    "ingredients": "Gram flour, carom seeds, turmeric, and high-quality vegetable oil.",
    "stock": "in",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 9,
    "name": "Tomato pickle",
    "category": "Pickles",
    "image": "images/Tomato pickle.png",
    "description": "Its tangy and spicy profile enhances appetite, especially in hot climates.",
    "ingredients": "Rice flour, roasted split gram, sesame seeds, ghee, and mild chili powder.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 10,
    "name": "Naatukodi Chicken",
    "category": "Pickles",
    "image": "images/Naatukodi2.jpg",
    "description": "Naatukodi is typically raised in natural environments, making it safer and more nutritious",
    "ingredients": "Premium cashews, thin sev, poha (flattened rice), dried grapes, and unique seasoning.",
    "stock": "in",
    "weights": {
      "250g": 500,
      "500g": 1000,
      "1kg": 2000
    }
  },
  {
    "id": 11,
    "name": "Bellam Avakaya",
    "category": "Pickles",
    "image": "images/bellamavakaya.jpeg",
    "description": "Jaggery and mangoes contain polyphenols and vitamin C that help fight oxidative stress.",
    "ingredients": "Besan, red chili flakes, roasted peanuts, curry leaves, and a touch of ginger.",
    "stock": "in",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 12,
    "name": "Chicken Gongura Pickle",
    "category": "Pickles",
    "image": "images/edit Gongura-Chicken.jpg",
    "description": "Gongura chicken pickle is a spicy, tangy condiment made by blending cooked chicken with gongura leaves",
    "ingredients": "Thin sev, boondi, roasted chana dal, rice flakes, and sweet-sour seasoning.",
    "stock": "out",
    "weights": {
      "250g": 450,
      "500g": 900,
      "1kg": 1800
    }
  },
  {
    "id": 13,
    "name": "Mutton with gongura",
    "category": "Pickles",
    "image": "images/edit muttonwithgongura.jpg",
    "description": "Mutton with gongura pickle is a powerhouse of nutrition—offering high-quality protein, iron, antioxidants, and digestive benefits",
    "ingredients": "Gram flour, carom seeds, turmeric, and high-quality vegetable oil.",
    "stock": "in",
    "weights": {
      "250g": 600,
      "500g": 1200,
      "1kg": 2400
    }
  },
  {
    "id": 14,
    "name": "Amla pickle",
    "category": "Pickles",
    "image": "images/amla pickle.jpg",
    "description": "Traditional spiral snack with a delicate flavor; satisfyingly **crisp and savory**, perfect with chai.",
    "ingredients": "Rice flour, roasted split gram, sesame seeds, ghee, and mild chili powder.",
    "stock": "in",
    "weights": {
      "250g": 175,
      "500g": 350,
      "1kg": 700
    }
  },
  {
    "id": 15,
    "name": "Garlic pickle",
    "category": "Pickles",
    "image": "images/Garlic pickle.jpg",
    "description": "Garlic pickle boosts immunity, supports heart health, improves digestion, and offers powerful antioxidant protection.",
    "ingredients": "Premium cashews, thin sev, poha (flattened rice), dried grapes, and unique seasoning.",
    "stock": "out",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 16,
    "name": "Green Chilli",
    "category": "Pickles",
    "image": "images/Greenchillipickle.jpeg",
    "description": "Green chili pickle boosts metabolism, supports digestion, and enhances immunity",
    "ingredients": "Besan, red chili flakes, roasted peanuts, curry leaves, and a touch of ginger.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 17,
    "name": "Mullakada pickle",
    "category": "Pickles",
    "image": "images/mullakada pickle.jpeg",
    "description": "Mullakada pickle (drumstick pickle) is rich in iron, calcium, and antioxidants, supporting bone health, digestion, and immunity.",
    "ingredients": "Thin sev, boondi, roasted chana dal, rice flakes, and sweet-sour seasoning.",
    "stock": "out",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 18,
    "name": "Gongura Pickle",
    "category": "Pickles",
    "image": "images/Gongura pickle.png",
    "description": "Gongura is a good source of vitamin C, which strengthens immune function.",
    "ingredients": "Ground rice and urad dal, combined with light butter and cumin for deep frying.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 19,
    "name": "Prawns with gongura",
    "category": "Pickles",
    "image": "images/edit prawnswithgongura.jpeg",
    "description": "Prawns with gongura pickle offer a potent mix of lean protein, antioxidants, iron, and digestive-friendly spices—supporting heart health, immunity, and gut function.",
    "ingredients": "Rice flour, roasted split gram, sesame seeds, ghee, and mild chili powder.",
    "stock": "in",
    "weights": {
      "250g": 500,
      "500g": 1000,
      "1kg": 2000
    }
  },
  {
    "id": 20,
    "name": "Mushroom pickle",
    "category": "Pickles",
    "image": "images/Mushroom.jpg",
    "description": "Mushroom pickle is rich in fiber, B vitamins, antioxidants, and minerals like iron and manganese—supporting gut health, immunity, and heart function.",
    "ingredients": "Premium cashews, thin sev, poha (flattened rice), dried grapes, and unique seasoning.",
    "stock": "in",
    "weights": {
      "250g": 250,
      "500g": 500,
      "1kg": 1000
    }
  },
  {
    "id": 21,
    "name": "Chintakaya Pickle",
    "category": "Pickles",
    "image": "images/Chintakaya pickle.jpg",
    "description": "Tamarind is rich in tartaric acid and fiber, which stimulate digestive enzymes and relieve constipation.",
    "ingredients": "Besan, red chili flakes, roasted peanuts, curry leaves, and a touch of ginger.",
    "stock": "in",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 22,
    "name": "Bellam Sunundalu",
    "category": "Sweets",
    "image": "images/bellamsunundalu.png",
    "description": "Bellam Sunnundalu (jaggery urad dal laddus) are rich in protein, iron, calcium, and energy—making them excellent for bone strength, immunity, and overall vitality.",
    "ingredients": "Gram flour, carom seeds, turmeric, and high-quality vegetable oil.",
    "stock": "in",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 23,
    "name": "Dry fruit ladoo",
    "category": "Sweets",
    "image": "images/dryfruitladoo.jpeg",
    "description": "Dates, figs, and jaggery provide natural sugars for sustained energy—perfect for winter or post-workout recovery.",
    "ingredients": "Rice flour, roasted split gram, sesame seeds, ghee, and mild chili powder.",
    "stock": "in",
    "weights": {
      "250g": 300,
      "500g": 600,
      "1kg": 1200
    }
  },
  {
    "id": 24,
    "name": "Chalimidi",
    "category": "Sweets",
    "image": "images/chalimidi.jpg",
    "description": "High fiber content from dates, raisins, and figs promotes gut health and regularity.",
    "ingredients": "Premium cashews, thin sev, poha (flattened rice), dried grapes, and unique seasoning.",
    "stock": "out",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 25,
    "name": "Gavvalu",
    "category": "Sweets",
    "image": "images/Gavvalu2.png",
    "description": "Sweet Gavvalu (Bellam Gavvalu) are energy-rich, iron-packed traditional Andhra sweets made with rice flour and jaggery—supporting stamina, digestion, and festive nourishment.",
    "ingredients": "Besan, red chili flakes, roasted peanuts, curry leaves, and a touch of ginger.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 26,
    "name": "Honey Pure",
    "category": "Sweets",
    "image": "images/Honey.png",
    "description": "Raw honey can kill unwanted bacteria and fungi, making it useful for wound healing and sore throats.",
    "ingredients": "Thin sev, boondi, roasted chana dal, rice flakes, and sweet-sour seasoning.",
    "stock": "in",
    "weights": {
      "250g": 350,
      "500g": 700,
      "1kg": 1400
    }
  },
  {
    "id": 27,
    "name": "Ariselu",
    "category": "Sweets",
    "image": "images/Ariselu2.jpg",
    "description": "Jaggery helps improve hemoglobin levels and prevent anemia, especially beneficial for women and children.",
    "ingredients": "Ground rice and urad dal, combined with light butter and cumin for deep frying.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 28,
    "name": "Kajji Kaayalu",
    "category": "Sweets",
    "image": "images/kajikaayulu.jpg",
    "description": "Sweet Kajikayalu (also called Gujiya or Karanji) are rich in energy, iron, fiber, and healthy fats—making them ideal for festive nourishment, digestion, and immunity",
    "ingredients": "Fine chickpea noodles seasoned primarily with black pepper, turmeric, and rock salt.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 29,
    "name": "Nuvvula Laddu",
    "category": "Sweets",
    "image": "images/nuvvulaladdu.png",
    "description": "Nuvvula Laddu (Sesame Laddu) is rich in calcium, iron, healthy fats, and antioxidants—supporting bone strength, heart health, immunity, and energy.",
    "ingredients": "Gram flour, carom seeds, turmeric, and high-quality vegetable oil.",
    "stock": "in",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 30,
    "name": "Palli chikki",
    "category": "Sweets",
    "image": "images/Pallichikki.jpg",
    "description": "Peanuts provide plant-based protein that supports muscle repair and satiety.",
    "ingredients": "Rice flour, roasted split gram, sesame seeds, ghee, and mild chili powder.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 31,
    "name": "Kaju Chikki",
    "category": "Sweets",
    "image": "images/kaju chikki.png",
    "description": "Kaju Chikki (Cashew Brittle) is rich in healthy fats, protein, iron, and antioxidants—supporting heart health, energy, immunity, and brain function.",
    "ingredients": "Premium cashews, thin sev, poha (flattened rice), dried grapes, and unique seasoning.",
    "stock": "in",
    "weights": {
      "250g": 250,
      "500g": 500,
      "1kg": 1000
    }
  },
  {
    "id": 34,
    "name": "Biryani masala",
    "category": "Spices",
    "image": "images/biryanipodi.jpg",
    "description": "Biryani masala offers digestive, anti-inflammatory, and antioxidant benefits thanks to its blend of spices like cumin, cloves, cinnamon, and cardamom.",
    "ingredients": "Gram flour, carom seeds, turmeric, and high-quality vegetable oil.",
    "stock": "in",
    "weights": {
      "250g": 100,
      "500g": 200,
      "1kg": 400
    }
  },
  {
    "id": 35,
    "name": "Dhaniya powder",
    "category": "Spices",
    "image": "images/Dhaniya powder.jpg",
    "description": "Dhaniya powder (coriander powder) supports digestion, regulates blood sugar, reduces inflammation, and boosts immunity.",
    "ingredients": "Rice flour, roasted split gram, sesame seeds, ghee, and mild chili powder.",
    "stock": "in",
    "weights": {
      "250g": 125,
      "500g": 250,
      "1kg": 500
    }
  },
  {
    "id": 36,
    "name": "Garam masala",
    "category": "Spices",
    "image": "images/Garam masala.png",
    "description": "Garam masala boosts digestion, immunity, heart health, and metabolism thanks to its potent blend of antioxidant-rich spices.",
    "ingredients": "Premium cashews, thin sev, poha (flattened rice), dried grapes, and unique seasoning.",
    "stock": "out",
    "weights": {
      "250g": 250,
      "500g": 500,
      "1kg": 1000
    }
  },
  {
    "id": 37,
    "name": "Ginger garlic paste",
    "category": "Spices",
    "image": "images/Gingergarlicpaste.jpg",
    "description": "Ginger garlic paste improves digestion, boosts immunity, reduces inflammation, and supports heart health.",
    "ingredients": "Besan, red chili flakes, roasted peanuts, curry leaves, and a touch of ginger.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 38,
    "name": "kaakara kaya karam",
    "category": "Spices",
    "image": "images/kakarakayakaaram.jpg",
    "description": "Its bitter compounds stimulate digestive enzymes and relieve constipation and bloating.",
    "ingredients": "Thin sev, boondi, roasted chana dal, rice flakes, and sweet-sour seasoning.",
    "stock": "in",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 39,
    "name": "Kandhi kaaram",
    "category": "Spices",
    "image": "images/kandikaaram.jpg",
    "description": "Roasted lentils and cumin stimulate digestive enzymes and improve gut health.",
    "ingredients": "Ground rice and urad dal, combined with light butter and cumin for deep frying.",
    "stock": "in",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 40,
    "name": "Munagaku kaaram",
    "category": "Spices",
    "image": "images/munagaku kaaram.jpg",
    "description": "Helps prevent anemia and boosts hemoglobin levels—especially beneficial for women and children",
    "ingredients": "Fine chickpea noodles seasoned primarily with black pepper, turmeric, and rock salt.",
    "stock": "in",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 41,
    "name": "Nalla kaaram",
    "category": "Spices",
    "image": "images/nallakaaram.jpg",
    "description": "Nalla Kaaram (Andhra-style spicy podi) is rich in iron, antioxidants, fiber, and healthy fats—supporting digestion, immunity, heart health, and energy.",
    "ingredients": "Gram flour, carom seeds, turmeric, and high-quality vegetable oil.",
    "stock": "in",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 42,
    "name": "Guntur kaaram",
    "category": "Spices",
    "image": "images/Guntur kaaram.jpg",
    "description": "Stimulates digestive enzymes and helps reduce bloating and indigestion.",
    "ingredients": "Rice flour, roasted split gram, sesame seeds, ghee, and mild chili powder.",
    "stock": "in",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 43,
    "name": "Sambar podi",
    "category": "Spices",
    "image": "images/sambar podi.jpeg",
    "description": "Sambar podi is a traditional South Indian spice mix used to prepare sambar, a lentil-based vegetable stew.",
    "ingredients": "Premium cashews, thin sev, poha (flattened rice), dried grapes, and unique seasoning.",
    "stock": "out",
    "weights": {
      "250g": 100,
      "500g": 200,
      "1kg": 400
    }
  },
  {
    "id": 44,
    "name": "Karivepaku kaaram",
    "category": "Spices",
    "image": "images/karivepu kaaram.jpg",
    "description": "Karivepaku Kaaram (Curry Leaf Spice Mix) is rich in iron, calcium, antioxidants, and fiber—supporting digestion, immunity, hair growth, and heart health.",
    "ingredients": "Besan, red chili flakes, roasted peanuts, curry leaves, and a touch of ginger.",
    "stock": "in",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 45,
    "name": "Menthi powder",
    "category": "Spices",
    "image": "images/methipowder.jpg",
    "description": "Menthi powder (fenugreek seed powder) supports digestion, balances blood sugar, boosts hair and skin health, and reduces inflammation.",
    "ingredients": "Thin sev, boondi, roasted chana dal, rice flakes, and sweet-sour seasoning.",
    "stock": "out",
    "weights": {
      "250g": 75,
      "500g": 150,
      "1kg": 300
    }
  },
  {
    "id": 46,
    "name": "Turmeric powder",
    "category": "Spices",
    "image": "images/Turmeric.jpg",
    "description": "Turmeric powder is a powerful anti-inflammatory and antioxidant spice that supports immunity, digestion, heart health, brain function, and skin wellness.",
    "ingredients": "Gram flour, carom seeds, turmeric, and high-quality vegetable oil.",
    "stock": "in",
    "weights": {
      "250g": 100,
      "500g": 200,
      "1kg": 400
    }
  },
  {
    "id": 47,
    "name": "velluli kaarampodi",
    "category": "Spices",
    "image": "images/velluli kaaram podi.jpg",
    "description": "Neutralizes free radicals and boosts the body’s own antioxidant enzymes.",
    "ingredients": "Rice flour, roasted split gram, sesame seeds, ghee, and mild chili powder.",
    "stock": "in",
    "weights": {
      "250g": 200,
      "500g": 400,
      "1kg": 800
    }
  },
  {
    "id": 48,
    "name": "Rasam podi",
    "category": "Spices",
    "image": "images/Rasampodi.jpg",
    "description": "Rasam podi is a spice blend used to make rasam, a tangy South Indian soup made with tamarind, tomatoes, and lentils.",
    "ingredients": "Premium cashews, thin sev, poha (flattened rice), dried grapes, and unique seasoning.",
    "stock": "out",
    "weights": {
      "250g": 100,
      "500g": 200,
      "1kg": 400
    }
  },
  {
    "id": 49,
    "name": "Nuvvula kaaram",
    "category": "Spices",
    "image": "images/nuvvulakaarampodi.jpg",
    "description": "Nuvvula Kaaram (Sesame Spice Mix) is rich in calcium, iron, healthy fats, and antioxidants—supporting bone strength, heart health, digestion, and immunity.",
    "ingredients": "Besan, red chili flakes, roasted peanuts, curry leaves, and a touch of ginger.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },

  {
    "id": 55,
    "name": "Palli pakodi",
    "category": "Snacks",
    "image": "images/pallipakodi.jpg",
    "description": "Palli Pakodi (peanut fritters) offers plant-based protein, healthy fats",
    "ingredients": "Rice flour, roasted split gram, sesame seeds, ghee, and mild chili powder.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 56,
    "name": "Ribbonpakoda",
    "category": "Snacks",
    "image": "images/Ribbonpakoda.jpg",
    "description": "Ribbon Pakoda provides energy, plant-based protein, and digestive support—thanks to its blend of rice flour, gram flour, and spices.",
    "ingredients": "Premium cashews, thin sev, poha (flattened rice), dried grapes, and unique seasoning.",
    "stock": "out",
    "weights": {
      "250g": 125,
      "500g": 250,
      "1kg": 500
    }
  },
  {
    "id": 57,
    "name": "spicy Boondi",
    "category": "Snacks",
    "image": "images/spicy boondi.png",
    "description": "Spicy boondi provides plant-based protein, healthy fats, and digestive support",
    "ingredients": "Besan, red chili flakes, roasted peanuts, curry leaves, and a touch of ginger.",
    "stock": "in",
    "weights": {
      "250g": 125,
      "500g": 250,
      "1kg": 500
    }
  },
  {
    "id": 571,
    "name": "Kara Boondi",
    "category": "Snacks",
    "image": "images/Karam bundi.png",
    "description": "Kara Boondi provides plant-based protein, healthy fats, and digestive support",
    "ingredients": "Besan, red chili flakes, roasted peanuts, curry leaves, and a touch of ginger.",
    "stock": "in",
    "weights": {
      "250g": 125,
      "500g": 250,
      "1kg": 500
    }
  },
  {
    "id": 59,
    "name": "Chegodilu",
    "category": "Snacks",
    "image": "images/chegodilu2.jpg",
    "description": "Chegodilu are small, ring-shaped snacks made from rice flour, urad dal flour, cumin seeds, sesame seeds",
    "ingredients": "Ground rice and urad dal, combined with light butter and cumin for deep frying.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 60,
    "name": "Atukula mixture",
    "category": "Snacks",
    "image": "images/atukulu.jpg",
    "description": "Atukula Mixture (flattened rice snack mix) is rich in iron, fiber, protein.",
    "ingredients": "Fine chickpea noodles seasoned primarily with black pepper, turmeric, and rock salt.",
    "stock": "in",
    "weights": {
      "250g": 125,
      "500g": 250,
      "1kg": 500
    }
  },
  {
    "id": 61,
    "name": "Saggubiyam chekkalu",
    "category": "Snacks",
    "image": "images/Saggubiyamchekkalu.jpg",
    "description": "Sago is rich in carbohydrates—100g provides around 355 kcal and 94g of carbs, making it ideal for quick energy.",
    "ingredients": "Gram flour, carom seeds, turmeric, and high-quality vegetable oil.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },
  {
    "id": 62,
    "name": "kaara poosa",
    "category": "Snacks",
    "image": "images/kaarapoosa.jpg",
    "description": "Helps improve hemoglobin levels and supports energy metabolism.",
    "ingredients": "Rice flour, roasted split gram, sesame seeds, ghee, and mild chili powder.",
    "stock": "in",
    "weights": {
      "250g": 125,
      "500g": 250,
      "1kg": 500
    }
  },
  {
    "id": 63,
    "name": "Raagi Chekralu",
    "category": "Snacks",
    "image": "images/Raagichakralu.jpg",
    "description": "Raagi Chekralu (finger millet spirals) are rich in calcium, iron, fiber, and antioxidants",
    "ingredients": "Premium cashews, thin sev, poha (flattened rice), dried grapes, and unique seasoning.",
    "stock": "in",
    "weights": {
      "250g": 150,
      "500g": 300,
      "1kg": 600
    }
  },


  {
    "id": 69,
    "name": "Chekralu",
    "category": "Snacks",
    "image": "images/chakralu2.jpg",
    "description": "Cumin and sesame seeds stimulate digestive enzymes and help reduce bloating.",
    "ingredients": "Ground rice and urad dal, combined with light butter and cumin for deep frying.",
    "stock": "in",
    "weights": {
      "250g": 100,
      "500g": 200,
      "1kg": 400
    }
  },


];

if (typeof window !== 'undefined') {
  window.products = products;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = products;
}
