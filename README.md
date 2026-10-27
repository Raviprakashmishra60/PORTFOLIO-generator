# Student Portfolio Generator

## Run (Hinglish)
1. Zip extract karo, `index.html` browser me kholo. Install ya server ki zarurat nahi.
2. "Load sample" dabao, phir apna data bharo. Right side me live preview badalta rahega.
3. Template, Dark/Light, accent color chuno. Desktop/Tablet/Mobile se responsive check karo.
4. "Download HTML" ek standalone file dega. "Download PDF" ke liye internet chahiye (html2pdf CDN).
5. Online dalne ke liye downloaded HTML ko GitHub Pages / Netlify Drop / Vercel par upload karo.

## Files
- `index.html` : structure, form, preview area
- `styles.css` : generator ka dark/light UI
- `app.js` : state, localStorage, live preview, 4 templates ka CSS, HTML/PDF download

## Naya template jodna
1. `app.js` ke `TPL` object me naya key + CSS likho.
2. `index.html` me `<button class="btn tpl" data-t="naam">Naam</button>` jodo.
# PORTFOLIO-generator
