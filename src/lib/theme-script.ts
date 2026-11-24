export const THEME_STORAGE_KEY = "theme"

export const THEME_SCRIPT = `(function(){var root=document.documentElement;var dark=true;try{var stored=localStorage.getItem("${THEME_STORAGE_KEY}");if(stored==="light"||stored==="dark"){dark=stored==="dark"}}catch(error){}root.classList.toggle("dark",dark);root.style.colorScheme=dark?"dark":"light"})()`
