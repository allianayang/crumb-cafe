// Each food consumes max 1 of each ingredient
const recipes = [
  {
    id: 0, 
    name: 'Cookies', 
    ingredients: [10, 12, 13], 
    image: './assets/recipes/cookies.png',
    description: 'Where did the chocolate chips come from?'
  }, // egg, flour, butter
  {
    id: 1, 
    name: 'Pizza', 
    ingredients: [7, 13, 22], 
    image: './assets/recipes/pizza.png',
    description: 'Baked to perfection'
  }, // tomato, flour, cheese
  {
    id: 2, 
    name: 'Croissant', 
    ingredients: [10, 13], 
    image: './assets/recipes/croissant.png',
    description: 'Baked to perfection'
  }, // flour, butter
  {
    id: 3, 
    name: 'Fried Eggs', 
    ingredients: [12, 19], 
    image: './assets/recipes/fried_egg.png',
    description: 'Baked to perfection'
  }, // egg, salt
  {
    id: 4, 
    name: 'Pancakes', 
    ingredients: [12, 13, 14], 
    image: './assets/recipes/pancakes.png',
    description: 'Soft, sweet and fluffy'
  }, // flour, milk, egg
  {
    id: 5, 
    name: 'Jam Toast', 
    ingredients: [16, 25], 
    image: './assets/recipes/jam_toast.png',
    description: 'Easy breakfast on the go'
  }, // bread, jam
  {
    id: 6, 
    name: 'Sandwich', 
    ingredients: [8, 22, 25], 
    image: './assets/recipes/sandwich.png',
    description: 'Delicious and filling'
  }, // bread, lettuce, tomato
  {
    id: 7, 
    name: 'Pudding', 
    ingredients: [15, 20], 
    image: './assets/recipes/pudding.png',
    description: 'Baked to perfection'
  }, // sugar, cream
]

export default recipes