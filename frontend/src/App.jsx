import React, { useState, useEffect, useRef } from 'react'
import Header from './components/Header.jsx'
import RecipeCard from './components/RecipeCard.jsx'
import WelcomeScreen from './components/WelcomeScreen.jsx'

// --- 1. LOCAL DATABASE (Updated with WORKING Images) ---
const localRecipes = {
  // FILIPINO MAINS
  "adobo": {
    name: "Chicken Pork Adobo",
    category: "Filipino", area: "Philippines",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Adobo_DSCF4391.jpg", 
    dietary: ["High-Protein"],
    ingredients: ["500g Pork", "500g Chicken", "Soy Sauce", "Vinegar", "Garlic", "Bay Leaves", "Peppercorn"],
    instructions: ["Marinate meat in soy sauce and garlic.", "Pan-fry meat until brown.", "Simmer with marinade, vinegar, and spices.", "Cook until tender and sauce reduces."],
    youtubeLink: "https://www.youtube.com/results?search_query=how+to+cook+filipino+adobo"
  },
  "sinigang": {
    name: "Sinigang na Baboy",
    category: "Soup", area: "Philippines",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Sinigang_na_Baboy_DSCF4234.jpg",
    dietary: ["Dairy-Free"],
    ingredients: ["1 kg Pork Belly", "Tamarind Mix", "Kangkong (Spinach)", "Radish", "Tomatoes", "Onion", "Eggplant", "Water"],
    instructions: ["Boil water, tomatoes, and onions.", "Add pork and simmer for 45 mins until tender.", "Add tamarind mix.", "Add radish and eggplant, cook 5 mins.", "Add kangkong and turn off heat."],
    youtubeLink: "https://www.youtube.com/results?search_query=how+to+cook+sinigang+na+baboy"
  },
  "karekare": {
    name: "Beef Kare-Kare",
    category: "Filipino", area: "Philippines",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/30/Kare-kare_01.jpg",
    dietary: ["Contains Nuts"],
    ingredients: ["1 kg Oxtail or Beef Shank", "Peanut Butter", "Annatto Powder", "String Beans", "Eggplant", "Bok Choy", "Bagoong (Shrimp Paste)"],
    instructions: ["Boil beef until tender.", "Sauté garlic and onion.", "Add beef, peanut butter, and annatto water.", "Simmer until thick.", "Add vegetables.", "Serve with bagoong."],
    youtubeLink: "https://www.youtube.com/results?search_query=how+to+cook+kare+kare"
  },
  "lumpia": {
    name: "Lumpia Shanghai",
    category: "Appetizer", area: "Philippines",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/2/23/Lumpia_shanghai_3.jpg",
    dietary: [],
    ingredients: ["500g Ground Pork", "Carrots", "Onion", "Garlic", "Egg", "Lumpia Wrapper", "Salt", "Pepper"],
    instructions: ["Mix pork, minced carrots, onion, garlic, egg, and spices.", "Wrap mixture in lumpia wrappers.", "Deep fry until golden brown."],
    youtubeLink: "https://www.youtube.com/results?search_query=how+to+cook+lumpia+shanghai"
  },
  "bulalo": {
    name: "Batangas Bulalo",
    category: "Soup", area: "Philippines",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Bulalo_ng_Batangas.jpg",
    dietary: ["High-Protein"],
    ingredients: ["1 kg Beef Shank (with bone marrow)", "Corn cob", "Cabbage", "Onion", "Whole Peppercorn", "Fish Sauce"],
    instructions: ["Boil beef shank with onion and peppercorns for 2-3 hours until tender.", "Add corn.", "Season with fish sauce.", "Add cabbage and serve hot."],
    youtubeLink: "https://www.youtube.com/results?search_query=how+to+cook+bulalo"
  },
  "pancit": {
    name: "Pancit Canton",
    category: "Noodles", area: "Philippines",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Pancit_Canton_01.jpg",
    dietary: [],
    ingredients: ["Pancit Canton Noodles", "Chicken Breast", "Shrimp", "Cabbage", "Carrots", "Snap Peas", "Soy Sauce", "Oyster Sauce"],
    instructions: ["Stir fry meat and seafood.", "Sauté vegetables.", "Add water, soy sauce, and oyster sauce.", "Add noodles and cook until liquid is absorbed."],
    youtubeLink: "https://www.youtube.com/results?search_query=how+to+cook+pancit+canton"
  },
  "tinola": {
    name: "Chicken Tinola",
    category: "Soup", area: "Philippines",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/6/62/Chicken_Tinola_with_Malunggay.jpg",
    dietary: ["Healthy"],
    ingredients: ["Whole Chicken", "Green Papaya or Sayote", "Chili Leaves (Dahon ng Sili)", "Ginger", "Onion", "Fish Sauce"],
    instructions: ["Sauté ginger, garlic, and onion.", "Add chicken and sear.", "Add water and simmer.", "Add papaya/sayote.", "Add leaves last."],
    youtubeLink: "https://www.youtube.com/results?search_query=chicken+tinola+recipe"
  },
  "sisig": {
    name: "Sizzling Tofu Sisig",
    category: "Vegetarian", area: "Philippines",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/d/df/Sisig01.jpg", 
    dietary: ["Vegetarian", "Vegan"],
    ingredients: ["Firm Tofu", "Soy sauce", "Onions", "Chili peppers", "Mayonnaise", "Calamansi"],
    instructions: ["Fry tofu cubes until crispy.", "Sauté onions and chili.", "Mix tofu with sauce and mayo.", "Serve sizzling."],
    youtubeLink: "https://www.youtube.com/results?search_query=tofu+sisig+recipe"
  },

  // ASIAN & INTERNATIONAL
  "bibimbap": {
    name: "Bibimbap",
    category: "Rice", area: "Korea",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/4/44/Dolsot-bibimbap.jpg",
    dietary: [],
    ingredients: ["Rice", "Spinach", "Bean Sprouts", "Carrots", "Ground Beef", "Egg", "Gochujang (Chili Paste)", "Sesame Oil"],
    instructions: ["Sauté vegetables separately.", "Cook beef with soy sauce.", "Fry an egg sunny side up.", "Place rice in bowl, top with veggies, meat, egg, and gochujang."],
    youtubeLink: "https://www.youtube.com/results?search_query=bibimbap+recipe"
  },
  "butterchicken": {
    name: "Indian Butter Chicken",
    category: "Curry", area: "India",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Chicken_makhani.jpg",
    dietary: [],
    ingredients: ["Chicken", "Yogurt", "Tomato Puree", "Cream", "Butter", "Garam Masala", "Cumin", "Ginger", "Garlic"],
    instructions: ["Marinate chicken in yogurt and spices.", "Cook chicken.", "Make sauce with butter, tomato, and cream.", "Simmer chicken in sauce."],
    youtubeLink: "https://www.youtube.com/results?search_query=easy+butter+chicken+recipe"
  },
  "carbonara": {
    name: "Authentic Carbonara",
    category: "Pasta", area: "Italy",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/33/Espaguetis_carbonara.jpg",
    dietary: [],
    ingredients: ["Spaghetti", "Bacon or Guanciale", "Eggs", "Parmesan Cheese", "Black Pepper"],
    instructions: ["Boil pasta.", "Fry bacon until crispy.", "Mix eggs and cheese in a bowl.", "Toss hot pasta with egg mixture (remove from heat first!).", "Add pepper."],
    youtubeLink: "https://www.youtube.com/results?search_query=authentic+carbonara+recipe"
  },
  "scrambledeggs": {
    name: "Creamy Scrambled Eggs",
    category: "Breakfast", area: "Universal",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/2/20/Scrambled_eggs.jpg",
    dietary: ["Vegetarian"],
    ingredients: ["Eggs", "Butter", "Salt", "Pepper", "Milk or Cream"],
    instructions: ["Whisk eggs with milk, salt, and pepper.", "Melt butter in a pan on low heat.", "Pour in eggs.", "Stir gently and continuously until soft curds form."],
    youtubeLink: "https://www.youtube.com/results?search_query=perfect+scrambled+eggs"
  },
  "mangofloat": {
    name: "Mango Graham Float",
    category: "Dessert", area: "Philippines",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Mango_float_2.jpg",
    dietary: ["Sweet"],
    ingredients: ["Ripe Mangoes", "Graham Crackers", "All-Purpose Cream", "Condensed Milk"],
    instructions: ["Whip cream and condensed milk.", "Layer graham crackers in a container.", "Add cream layer.", "Add mango slices.", "Repeat layers and chill overnight."],
    youtubeLink: "https://www.youtube.com/results?search_query=mango+graham+float+recipe"
  },
  "lecheflan": {
    name: "Leche Flan",
    category: "Dessert", area: "Philippines",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Leche_flan.jpg",
    dietary: ["Sweet", "Gluten-Free"],
    ingredients: ["10 Egg Yolks", "Condensed Milk", "Evaporated Milk", "Sugar (for caramel)"],
    instructions: ["Melt sugar in mold to make caramel.", "Mix egg yolks and milks gently.", "Pour into mold.", "Steam for 30-45 mins."],
    youtubeLink: "https://www.youtube.com/results?search_query=leche+flan+recipe"
  }
}

// --- API HELPER: Normalizes TheMealDB data to our format ---
const normalizeApiRecipe = (apiData) => {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ing = apiData[`strIngredient${i}`]
    const measure = apiData[`strMeasure${i}`]
    if (ing && ing.trim()) {
      ingredients.push(`${measure ? measure : ''} ${ing}`.trim())
    }
  }

  return {
    name: apiData.strMeal,
    category: apiData.strCategory,
    area: apiData.strArea,
    thumbnail: apiData.strMealThumb, // The API gives us a nice image
    instructions: apiData.strInstructions ? apiData.strInstructions.split('\r\n').filter(s => s.length > 0) : ["No instructions provided."],
    ingredients: ingredients,
    youtubeLink: apiData.strYoutube || `https://www.youtube.com/results?search_query=${apiData.strMeal}`,
    source: 'api'
  }
}

function App() {
  const [view, setView] = useState('home') 
  const [query, setQuery] = useState('')
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  const [pantryInput, setPantryInput] = useState('')
  const [pantryIngredients, setPantryIngredients] = useState([])
  const [pantryResults, setPantryResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('myRecipeFavorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('myRecipeFavorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (currentRecipe) => {
    const exists = favorites.find(r => r.name === currentRecipe.name)
    if (exists) {
      setFavorites(favorites.filter(r => r.name !== currentRecipe.name))
    } else {
      setFavorites([...favorites, currentRecipe])
    }
  }

  // --- UPDATED SEARCH LOGIC (Local + API) ---
  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query) return;
    
    setLoading(true)
    setRecipe(null)
    setShowSuggestions(false)

    // 1. Local Search (Prioritize our manually added Filipino recipes)
    const localKey = Object.keys(localRecipes).find(k => 
      k.toLowerCase() === query.toLowerCase() || 
      localRecipes[k].name.toLowerCase().includes(query.toLowerCase())
    )
    
    if (localKey) {
      setRecipe(localRecipes[localKey])
      setLoading(false)
      return
    }

    // 2. API Search (Fallback to internet for international dishes)
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      const data = await response.json()
      if (data.meals) {
        setRecipe(normalizeApiRecipe(data.meals[0]))
      } else {
        alert("Sorry, recipe not found locally or online!")
      }
    } catch (err) {
      console.error(err)
      alert("Error fetching recipe.")
    } finally {
      setLoading(false)
    }
  }

  const fetchRandom = async () => {
    setLoading(true)
    setRecipe(null)
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      const data = await response.json()
      if (data.meals) {
        setRecipe(normalizeApiRecipe(data.meals[0]))
      }
    } catch (err) {
      alert("Could not fetch a random recipe.")
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestionClick = (key) => {
    setQuery(localRecipes[key].name)
    setRecipe(localRecipes[key])
    setShowSuggestions(false)
  }

  // --- PANTRY LOGIC ---
  const addPantryIngredient = (e) => {
    e.preventDefault()
    if (pantryInput.trim()) {
      setPantryIngredients([...pantryIngredients, pantryInput.trim().toLowerCase()])
      setPantryInput('')
    }
  }

  const removePantryIngredient = (idx) => {
    setPantryIngredients(pantryIngredients.filter((_, i) => i !== idx))
  }

  const normalize = (str) => {
      let s = str.toLowerCase().trim()
      if (s.endsWith('s') && s.length > 3) s = s.slice(0, -1)
      return s
  }

  const findRecipesByIngredients = () => {
    setHasSearched(true)
    if (pantryIngredients.length === 0) {
        setPantryResults([])
        return
    }

    const validRecipes = Object.values(localRecipes).filter(recipe => {
        const recipeIngs = recipe.ingredients.map(i => i.toLowerCase())
        return pantryIngredients.every(pantryItem => {
            const searchItem = normalize(pantryItem)
            return recipeIngs.some(rIng => rIng.includes(searchItem))
        })
    })

    const results = validRecipes.map(recipe => {
      const have = recipe.ingredients.filter(rIng => 
        pantryIngredients.some(pIng => rIng.toLowerCase().includes(normalize(pIng)))
      )
      const missing = recipe.ingredients.filter(rIng => 
        !pantryIngredients.some(pIng => rIng.toLowerCase().includes(normalize(pIng)))
      )
      const score = have.length / recipe.ingredients.length
      return { ...recipe, have, missing, score }
    })
    .sort((a, b) => b.score - a.score)

    setPantryResults(results)
  }

  if (view === 'home') {
    return <WelcomeScreen onStart={() => setView('search')} />
  }

  return (
    <div className="app-container">
      <Header />
      
      <main className="container">
        
        {/* NAV */}
        <nav className="nav-tabs">
          <button className={`nav-btn ${view === 'search' ? 'active' : ''}`} onClick={() => setView('search')}>🔍 Hanap ka na dyan, Nak</button>
          <button className={`nav-btn ${view === 'pantry' ? 'active' : ''}`} onClick={() => setView('pantry')}>🥕 Ano bang meron?</button>
          <button className={`nav-btn ${view === 'favorites' ? 'active' : ''}`} onClick={() => setView('favorites')}>❤️ My Palagi ({favorites.length})</button>
        </nav>

        {/* VIEW 1: SEARCH */}
        {view === 'search' && (
          <>
            <div className="search-container">
              <form onSubmit={handleSearch} className="search-form">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Ano ba ang nais, beh?"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setShowSuggestions(e.target.value.length > 0)
                  }}
                />
                <button type="submit" className="btn-search">Looking For</button>
              </form>

              {showSuggestions && (
                <ul className="dropdown-menu">
                  {Object.keys(localRecipes)
                    .filter(k => localRecipes[k].name.toLowerCase().includes(query.toLowerCase()))
                    .map(k => (
                      <li key={k} className="dropdown-item" onClick={() => handleSuggestionClick(k)}>
                        {localRecipes[k].name}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* Surprise Me Button */}
            {!recipe && !loading && (
               <div style={{textAlign: 'center', marginTop: '20px'}}>
                  <button className="btn-search" style={{background: '#3b82f6'}} onClick={fetchRandom}>
                     🎲 Kahit ano
                  </button>
               </div>
            )}

            {loading && (
                <div className="welcome-state">
                    <p>Searching the kitchen... 🍳</p>
                </div>
            )}

            {recipe && !loading && (
              <RecipeCard 
                recipe={recipe} 
                isFavorite={favorites.some(f => f.name === recipe.name)}
                toggleFavorite={() => toggleFavorite(recipe)}
              />
            )}

            {!recipe && !loading && (
              <div className="welcome-state" style={{marginTop: '40px'}}>
                <p>Ano nga ang nais ngani???</p>
              </div>
            )}
          </>
        )}

        {/* VIEW 2: PANTRY CHEF */}
        {view === 'pantry' && (
          <div className="pantry-view animate-in">
            <div className="pantry-input-area">
              <h3>Ano ba meron?</h3>
              <p className="muted text-center" style={{fontSize: '0.9rem', marginBottom: '1rem'}}>
                  (Hanap tayo pwedeng lutuin sa kung anong meron ka. Sagot kita!)
              </p>
              <form onSubmit={addPantryIngredient} className="search-form">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Ano bang meron sa ref?"
                  value={pantryInput}
                  onChange={(e) => setPantryInput(e.target.value)}
                />
                <button type="submit" className="btn-search">Ilagay</button>
              </form>
              
              <div className="chips-container">
                {pantryIngredients.map((ing, idx) => (
                  <span key={idx} className="chip" onClick={() => removePantryIngredient(idx)}>
                    {ing} ✕
                  </span>
                ))}
              </div>

              {pantryIngredients.length > 0 && (
                <div style={{textAlign: 'center', marginBottom: '40px'}}>
                  <button className="btn-search" onClick={findRecipesByIngredients}>
                    Find Recipes ({pantryIngredients.length} ingredients)
                  </button>
                </div>
              )}
            </div>

            <div className="pantry-results">
              {pantryResults.length > 0 ? (
                pantryResults.map((result, idx) => (
                  <div key={idx} className="pantry-result-wrapper">
                    <div className="match-bar">
                      <div className="match-fill" style={{width: `${result.score * 100}%`}}></div>
                      <span>{Math.round(result.score * 100)}% Complete</span>
                    </div>
                    <RecipeCard 
                      recipe={result}
                      isFavorite={favorites.some(f => f.name === result.name)}
                      toggleFavorite={() => toggleFavorite(result)}
                      missingIngredients={result.missing}
                    />
                  </div>
                ))
              ) : (
                  hasSearched && pantryIngredients.length > 0 && (
                      <div className="welcome-state" style={{borderColor: '#f87171'}}>
                          <p style={{color: '#f87171'}}>No recipes found containing ALL those ingredients.</p>
                          <p style={{fontSize: '0.9rem'}}>Try removing one ingredient to broaden your search.</p>
                      </div>
                  )
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: FAVORITES */}
        {view === 'favorites' && (
          <div className="favorites-grid animate-in">
            {favorites.length === 0 ? <p className="muted text-center">Walang palagi kawawi hahaha</p> : (
              favorites.map((fav, idx) => (
                <div key={idx} className="fav-card" onClick={() => { setRecipe(fav); setView('search'); }}>
                  <img src={fav.thumbnail} alt={fav.name} />
                  <h4>{fav.name}</h4>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <footer className="footer">Ginawa ni Villacoba</footer>
    </div>
  )
}

export default App
