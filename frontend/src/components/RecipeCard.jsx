import React, { useState, useEffect } from 'react'

const RecipeCard = ({ recipe, isFavorite, toggleFavorite, missingIngredients = [] }) => {
  const { name, category, area, ingredients, instructions, youtubeLink, thumbnail, dietary } = recipe
  const [imgError, setImgError] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // State for interactive checkboxes
  const [servings, setServings] = useState(4)
  const [checkedIngredients, setCheckedIngredients] = useState({})
  const [checkedSteps, setCheckedSteps] = useState({})

  // Reset state when recipe changes
  useEffect(() => {
      setServings(4); 
      setCheckedIngredients({}); 
      setCheckedSteps({});
  }, [name]);

  const handleImgError = () => setImgError(true)
  const displayImage = !imgError && thumbnail ? thumbnail : null

  // Scales ingredient amounts based on servings
  const getScaledIngredient = (ingStr) => {
    const ratio = servings / 4;
    return ingStr.replace(/(\d+(\.\d+)?)/, (match) => parseFloat((parseFloat(match) * ratio).toFixed(2)));
  }

  const toggleIngCheck = (idx) => setCheckedIngredients(prev => ({...prev, [idx]: !prev[idx]}))
  const toggleStepCheck = (idx) => setCheckedSteps(prev => ({...prev, [idx]: !prev[idx]}))

  const copyToClipboard = () => {
    if (!ingredients) return;
    const text = `Shopping List for ${name}:\n\n- ${ingredients.map(i => getScaledIngredient(i)).join('\n- ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const shareRecipe = () => {
    if (navigator.share) navigator.share({ title: name, url: window.location.href }).catch(console.error);
    else alert("Sharing not supported on this device.");
  }

  // Check if an ingredient is in the "missing" list
  const isMissing = (ingStr) => {
    if (!missingIngredients.length) return false;
    // Simple check: does the ingredient string contain any of the missing keywords?
    return missingIngredients.some(missing => ingStr.toLowerCase().includes(missing.toLowerCase()));
  }

  return (
    <article className="recipe-card animate-in">
      {/* --- HERO SECTION --- */}
      <div className="recipe-hero">
        {displayImage ? (
          <img src={displayImage} alt={name} className="recipe-image" onError={handleImgError} loading="lazy" />
        ) : (
          <div className="recipe-placeholder"><span style={{fontSize: '4rem'}}>🍳</span></div>
        )}
        
        <div className="hero-actions">
          <button className={`icon-btn ${isFavorite ? 'loved' : ''}`} onClick={toggleFavorite}>
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <button className="icon-btn" onClick={shareRecipe}>🔗</button>
        </div>

        <div className="recipe-meta">
          <div className="tags">
            {category && <span className="tag category">{category}</span>}
            {area && <span className="tag area">{area}</span>}
            {dietary && dietary.map(tag => ( <span key={tag} className="tag dietary">{tag}</span> ))}
          </div>
          <h2 className="recipe-title">{name}</h2>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="recipe-content">
        
        {/* Left Column: Ingredients */}
        <div className="ingredients-column">
          <div className="section-header-row">
            <h3 className="section-title">Ingredients</h3>
            <div className="servings-control">
              <button onClick={() => setServings(s => Math.max(1, s-1))}>-</button>
              <span>{servings} servings</span>
              <button onClick={() => setServings(s => s+1)}>+</button>
            </div>
          </div>

          <div className="action-row">
             <button className="btn-copy" onClick={copyToClipboard}>{copied ? '✅ Copied' : '📋 Copy List'}</button>
          </div>

          <ul className="ingredients-list">
            {ingredients.map((it, i) => {
              const missing = isMissing(it);
              return (
                <li key={i} className={`ingredient-item ${checkedIngredients[i] ? 'checked' : ''} ${missing ? 'missing-item' : ''}`} onClick={() => toggleIngCheck(i)}>
                  <div className="checkbox-circle"></div>
                  <span>
                    {getScaledIngredient(it)}
                    {missing && <span className="missing-badge">MISSING</span>}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Right Column: Instructions */}
        <div className="instructions-column">
          <h3 className="section-title">Instructions</h3>
          {instructions && instructions.length > 0 ? (
            <div className="steps-list">
              {instructions.map((s, i) => (
                <div key={i} className={`step-item ${checkedSteps[i] ? 'step-done' : ''}`} onClick={() => toggleStepCheck(i)}>
                  <span className="step-number">{i + 1}</span>
                  <p>{s}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted">No instructions available.</p>
          )}
          
          <div className="action-area">
             <a className="btn-yt" href={youtubeLink} target="_blank" rel="noreferrer">
               📺 Watch Tutorial
             </a>
          </div>
        </div>

      </div>
    </article>
  )
}

export default RecipeCard