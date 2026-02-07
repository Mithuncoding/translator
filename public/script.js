/**
 * GRAM-VOICE TRANSLATOR - Main Script
 * Premium voice translator with Google Translate API
 * 10+ Indian languages supported
 */

// Language codes mapping (100+ Supported Languages)
// Using Google Translate ISO codes
const LANG_CODES = {
  "af": "af", "sq": "sq", "am": "am", "ar": "ar", "hy": "hy", 
  "az": "az", "eu": "eu", "be": "be", "bn": "bn", "bs": "bs", 
  "bg": "bg", "ca": "ca", "ceb": "ceb", "ny": "ny", "zh-CN": "zh-CN", 
  "zh-TW": "zh-TW", "co": "co", "hr": "hr", "cs": "cs", "da": "da", 
  "nl": "nl", "en": "en", "eo": "eo", "et": "et", "tl": "tl", 
  "fi": "fi", "fr": "fr", "fy": "fy", "gl": "gl", "ka": "ka", 
  "de": "de", "el": "el", "gu": "gu", "ht": "ht", "ha": "ha", 
  "haw": "haw", "iw": "iw", "hi": "hi", "hmn": "hmn", "hu": "hu", 
  "is": "is", "ig": "ig", "id": "id", "ga": "ga", "it": "it", 
  "ja": "ja", "jw": "jw", "kn": "kn", "kk": "kk", "km": "km", 
  "ko": "ko", "ku": "ku", "ky": "ky", "lo": "lo", "la": "la", 
  "lv": "lv", "lt": "lt", "lb": "lb", "mk": "mk", "mg": "mg", 
  "ms": "ms", "ml": "ml", "mt": "mt", "mi": "mi", "mr": "mr", 
  "mn": "mn", "my": "my", "ne": "ne", "no": "no", "or": "or", 
  "ps": "ps", "fa": "fa", "pl": "pl", "pt": "pt", "pa": "pa", 
  "ro": "ro", "ru": "ru", "sm": "sm", "gd": "gd", "sr": "sr", 
  "st": "st", "sn": "sn", "sd": "sd", "si": "si", "sk": "sk", 
  "sl": "sl", "so": "so", "es": "es", "su": "su", "sw": "sw", 
  "sv": "sv", "tg": "tg", "ta": "ta", "te": "te", "th": "th", 
  "tr": "tr", "uk": "uk", "ur": "ur", "uz": "uz", "vi": "vi", 
  "cy": "cy", "xh": "xh", "yi": "yi", "yo": "yo", "zu": "zu"
};

const LANG_NAMES = {
  "af": "Afrikaans", "sq": "Albanian", "am": "Amharic", "ar": "Arabic", "hy": "Armenian", 
  "az": "Azerbaijani", "eu": "Basque", "be": "Belarusian", "bn": "Bengali", "bs": "Bosnian", 
  "bg": "Bulgarian", "ca": "Catalan", "ceb": "Cebuano", "ny": "Chichewa", "zh-CN": "Chinese (Simplified)", 
  "zh-TW": "Chinese (Traditional)", "co": "Corsican", "hr": "Croatian", "cs": "Czech", "da": "Danish", 
  "nl": "Dutch", "en": "English", "eo": "Esperanto", "et": "Estonian", "tl": "Filipino", 
  "fi": "Finnish", "fr": "French", "fy": "Frisian", "gl": "Galician", "ka": "Georgian", 
  "de": "German", "el": "Greek", "gu": "Gujarati", "ht": "Haitian Creole", "ha": "Hausa", 
  "haw": "Hawaiian", "iw": "Hebrew", "hi": "Hindi", "hmn": "Hmong", "hu": "Hungarian", 
  "is": "Icelandic", "ig": "Igbo", "id": "Indonesian", "ga": "Irish", "it": "Italian", 
  "ja": "Japanese", "jw": "Javanese", "kn": "Kannada", "kk": "Kazakh", "km": "Khmer", 
  "ko": "Korean", "ku": "Kurdish (Kurmanji)", "ky": "Kyrgyz", "lo": "Lao", "la": "Latin", 
  "lv": "Latvian", "lt": "Lithuanian", "lb": "Luxembourgish", "mk": "Macedonian", "mg": "Malagasy", 
  "ms": "Malay", "ml": "Malayalam", "mt": "Maltese", "mi": "Maori", "mr": "Marathi", 
  "mn": "Mongolian", "my": "Myanmar (Burmese)", "ne": "Nepali", "no": "Norwegian", "or": "Odia", 
  "ps": "Pashto", "fa": "Persian", "pl": "Polish", "pt": "Portuguese", "pa": "Punjabi", 
  "ro": "Romanian", "ru": "Russian", "sm": "Samoan", "gd": "Scots Gaelic", "sr": "Serbian", 
  "st": "Sesotho", "sn": "Shona", "sd": "Sindhi", "si": "Sinhala", "sk": "Slovak", 
  "sl": "Slovenian", "so": "Somali", "es": "Spanish", "su": "Sundanese", "sw": "Swahili", 
  "sv": "Swedish", "tg": "Tajik", "ta": "Tamil", "te": "Telugu", "th": "Thai", 
  "tr": "Turkish", "uk": "Ukrainian", "ur": "Urdu", "uz": "Uzbek", "vi": "Vietnamese", 
  "cy": "Welsh", "xh": "Xhosa", "yi": "Yiddish", "yo": "Yoruba", "zu": "Zulu"
};

// ═══════════════════════════════════════════════════════════════
// GOOGLE TRANSLATE API (FREE - No API Key Required)
// ═══════════════════════════════════════════════════════════════

async function googleTranslate(text, sourceLang, targetLang) {
  const srcCode = LANG_CODES[sourceLang] || sourceLang.split('-')[0];
  const tgtCode = LANG_CODES[targetLang] || targetLang.split('-')[0];
  
  if (srcCode === tgtCode) return text;
  
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${srcCode}&tl=${tgtCode}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    // Extract translated text from response
    let translated = '';
    if (data && data[0]) {
      data[0].forEach(part => {
        if (part[0]) translated += part[0];
      });
    }
    return translated || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
}

// ═══════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initAnimations();
  if (document.body.classList.contains('app-page')) initApp();
});

// Create floating particles
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 20 + 's';
    p.style.animationDuration = (15 + Math.random() * 10) + 's';
    container.appendChild(p);
  }
}

// GSAP animations
function initAnimations() {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
  
  // Fade up elements
  document.querySelectorAll('.fade-up').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.8, delay: i * 0.1,
      ease: "power3.out",
      scrollTrigger: el.closest('section') ? { trigger: el, start: "top 85%" } : null
    });
  });

  // Magnetic Buttons
  const magnets = document.querySelectorAll('.btn-primary, .btn-outline, .btn-icon, .mic-btn');
  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP LOGIC
// ═══════════════════════════════════════════════════════════════

function initApp() {
  // DOM Elements
  const modeTabs = document.querySelectorAll('.mode-tab');
  const voiceControls = document.getElementById('voice-controls');
  const textActions = document.getElementById('text-actions');
  const micBtn = document.getElementById('mic-btn');
  const micStatus = document.getElementById('mic-status');
  const sourceText = document.getElementById('source-text');
  const targetText = document.getElementById('target-text');
  const langSource = document.getElementById('lang-source');
  const langTarget = document.getElementById('lang-target');
  const swapBtn = document.getElementById('swap-lang');
  const translateBtn = document.getElementById('translate-btn');
  const visualizer = document.getElementById('visualizer');
  const toast = document.getElementById('toast');
  const themeToggle = document.getElementById('theme-toggle');
  const historyToggle = document.getElementById('history-toggle');
  const historySidebar = document.getElementById('history-sidebar');
  const sidebarClose = document.getElementById('sidebar-close');
  const historyList = document.getElementById('history-list');
  const clearHistoryBtn = document.getElementById('clear-history');
  const overlay = document.getElementById('overlay');

  let recognition = null;
  let isListening = false;
  let currentMode = 'voice';
  let vizInterval = null;
  let isTranslating = false;

  // Create visualizer bars
  for (let i = 0; i < 20; i++) {
    const bar = document.createElement('div');
    bar.className = 'viz-bar';
    visualizer.appendChild(bar);
  }
  const vizBars = visualizer.querySelectorAll('.viz-bar');

  // Populate Language Dropdowns
  function populateLanguages() {
    const selects = [langSource, langTarget];
    selects.forEach(select => {
        const currentVal = select.value;
        select.innerHTML = '';
        Object.entries(LANG_NAMES).sort((a, b) => a[1].localeCompare(b[1])).forEach(([code, name]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = name;
            select.appendChild(option);
        });
        // Restore selection or default
        if (Object.keys(LANG_NAMES).includes(currentVal)) {
            select.value = currentVal;
        } else {
            select.value = select.id === 'lang-source' ? 'en' : 'hi'; // Default En -> Hi
        }
    });
  }
  populateLanguages();

  // Auto-translate when language changes
  [langSource, langTarget].forEach(select => {
    select.addEventListener('change', () => {
        if (sourceText.value.trim()) {
            translateText(sourceText.value);
        }
    });
  });

  // Mode switching
  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentMode = tab.dataset.mode;
      voiceControls.style.display = currentMode === 'voice' ? 'flex' : 'none';
      textActions.style.display = currentMode === 'text' ? 'flex' : 'none';
    });
  });

  // Speech Recognition Setup (Enhanced for Mobile)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      isListening = true;
      micBtn.classList.add('listening');
      micStatus.textContent = 'Listening...';
      micStatus.classList.add('active');
      startVisualizer();
    };

    recognition.onresult = async (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      sourceText.value = transcript;
      
      // Only translate on final result
      if (e.results[e.results.length - 1].isFinal) {
        await translateText(transcript);
      }
    };

    recognition.onend = async () => {
      isListening = false;
      micBtn.classList.remove('listening');
      micStatus.textContent = 'Tap to Speak';
      micStatus.classList.remove('active');
      stopVisualizer();
      
      if (sourceText.value.trim() && targetText.value.trim()) {
        saveHistory(sourceText.value, targetText.value, langSource.value, langTarget.value);
        speakText(targetText.value, langTarget.value);
      }
    };

    recognition.onerror = (e) => {
      isListening = false;
      micBtn.classList.remove('listening');
      stopVisualizer();
      
      // Mobile-specific error handling
      const errorMessages = {
        'no-speech': 'No speech detected. Try again.',
        'audio-capture': 'Microphone not found. Check permissions.',
        'not-allowed': 'Microphone blocked. Allow in browser settings.',
        'network': 'Network error. Check connection.',
        'aborted': 'Stopped. Tap to try again.',
        'service-not-allowed': 'Speech service busy. Close other apps, then try again.',
        'language-not-supported': 'Language not supported for voice input.'
      };
      
      const msg = errorMessages[e.error] || `Error: ${e.error}. Tap to retry.`;
      micStatus.textContent = msg;
      
      // Show toast with helpful tip for mobile
      if (isMobile && (e.error === 'aborted' || e.error === 'service-not-allowed' || e.error === 'not-allowed')) {
        showToast('Tip: Close other voice apps & refresh page');
      }
      
      console.error('Speech Recognition Error:', e.error);
    };

    // Handle audio abort (common on mobile when switching apps)
    recognition.onaudioend = () => {
      if (isListening) {
        console.log('Audio stream ended - stopping recognition');
      }
    };
  } else {
    micBtn.disabled = true;
    micStatus.textContent = 'Speech not supported';
  }

  // Mic button with retry logic
  micBtn.addEventListener('click', async () => {
    if (!recognition) return;
    
    if (isListening) { 
      recognition.stop(); 
      return;
    }
    
    // On mobile, try to request microphone permission explicitly first
    if (isMobile && navigator.mediaDevices) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        micStatus.textContent = 'Mic permission denied';
        showToast('Allow microphone access in browser settings');
        return;
      }
    }
    
    recognition.lang = langSource.value;
    
    try {
      recognition.start();
    } catch (err) {
      // Handle "already started" error
      if (err.name === 'InvalidStateError') {
        recognition.stop();
        setTimeout(() => {
          recognition.lang = langSource.value;
          recognition.start();
        }, 100);
      } else {
        micStatus.textContent = 'Error starting. Try again.';
        console.error('Start error:', err);
      }
    }
  });

  // ═══════════════════════════════════════════════════════════════
  // REAL-TIME AUDIO VISUALIZER (Web Audio API)
  // ═══════════════════════════════════════════════════════════════
  
  let audioContext, analyser, dataArray, microphoneSource;

  async function initAudio() {
    try {
      if (!navigator.mediaDevices) return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 64; // Low FFT size for fewer bars (we have 20)
      
      microphoneSource = audioContext.createMediaStreamSource(stream);
      microphoneSource.connect(analyser);
      
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      updateVisualizer();
    } catch (err) {
      console.error('Audio access denied:', err);
    }
  }

  function startVisualizer() {
    if (!audioContext) initAudio();
    if (audioContext && audioContext.state === 'suspended') audioContext.resume();
    
    // Fallback if audio init failed (random viz)
    if (!analyser) {
        vizInterval = setInterval(() => {
            vizBars.forEach(bar => { bar.style.height = (Math.random() * 50 + 10) + 'px'; });
        }, 100);
        return;
    }

    function update() {
      if (!isListening) return;
      requestAnimationFrame(update);
      
      analyser.getByteFrequencyData(dataArray);
      
      // We have 20 bars, map frequency data to them
      vizBars.forEach((bar, col) => {
        // Simple mapping: use first 20 bins
        const value = dataArray[col] || 0;
        const percent = value / 255;
        const height = Math.max(10, percent * 80); // Min 10px, Max 90px
        
        gsap.to(bar, { 
          height: height + 'px', 
          backgroundColor: `hsl(${190 + (percent * 40)}, 100%, ${50 + (percent * 20)}%)`, // Dynamic Cyan Color
          duration: 0.1 
        });
      });
    }
    update();
  }

  function stopVisualizer() {
    clearInterval(vizInterval);
    if (audioContext && audioContext.state === 'running') {
        // We don't close context to reuse it, just stop animation loop logic
    }
    vizBars.forEach(bar => { 
        gsap.to(bar, { height: '20px', backgroundColor: 'var(--accent)', duration: 0.3 }); 
    });
  }

  // Translation using Google Translate API
  async function translateText(text) {
    if (!text.trim()) { targetText.value = ''; return; }
    if (isTranslating) return;
    
    isTranslating = true;
    targetText.placeholder = 'Translating...';
    
    try {
      const translated = await googleTranslate(text, langSource.value, langTarget.value);
      targetText.value = translated;
    } catch (error) {
      targetText.value = 'Translation failed. Check internet connection.';
    }
    
    targetText.placeholder = 'Translation will appear here...';
    isTranslating = false;
  }

  // Text mode translate button
  translateBtn.addEventListener('click', async () => {
    await translateText(sourceText.value);
    if (sourceText.value.trim() && targetText.value.trim()) {
      saveHistory(sourceText.value, targetText.value, langSource.value, langTarget.value);
      speakText(targetText.value, langTarget.value);
    }
  });

  // Auto-translate on typing (debounced)
  let typeTimer;
  sourceText.addEventListener('input', () => {
    clearTimeout(typeTimer);
    typeTimer = setTimeout(() => translateText(sourceText.value), 800);
  });

  // TTS with robust fallback (Browser -> Google API)
  async function speakText(text, lang) {
    if (!text) return;
    window.speechSynthesis.cancel();
    
    // 1. Try Browser Native TTS first
    const voices = window.speechSynthesis.getVoices();
    const langCode = lang.split('-')[0];
    
    let voice = voices.find(v => v.lang === lang && (v.name.includes('Google') || v.name.includes('Microsoft'))) ||
                voices.find(v => v.lang === lang) || 
                voices.find(v => v.lang.startsWith(langCode));

    if (voice) {
        console.log('Speaking with browser voice:', voice.name);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
        return;
    }

    // 2. Hybrid Backend Check (Localhost OR Vercel)
    const endpoints = [
        `http://localhost:5000/tts?text=${encodeURIComponent(text)}&lang=${langCode}`, // Local Dev
        `/api/tts?text=${encodeURIComponent(text)}&lang=${langCode}` // Vercel / Production
    ];

    for (const endpoint of endpoints) {
        try {
            console.log('Checking backend:', endpoint);
            const controller = new AbortController();
            const timeoutMs = endpoint.includes('localhost') ? 1000 : 8000; // Longer timeout for Vercel cold start
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
            
            const response = await fetch(endpoint, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (response.ok) {
                console.log('Backend TTS success:', endpoint);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const audio = new Audio(url);
                audio.play();
                return;
            }
        } catch (e) {
            console.log('Backend unavailable:', endpoint);
        }
    }

    // 3. Fallback Modal (If no backend & no voice)
    console.warn('Browser voice missing for', lang);
    
    // ... logic continues ...
    
    const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${langCode}&client=tw-ob`;
    
    // Create/Show Modal
    const modalId = 'voice-modal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal glass-strong';
        modal.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            padding: 2rem; border-radius: 1rem; border: 1px solid var(--border);
            z-index: 3000; width: 90%; max-width: 400px; text-align: center;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            display: none; flex-direction: column; gap: 1rem;
        `;
        document.body.appendChild(modal);
        
        // Overlay for modal
        const backdrop = document.createElement('div');
        backdrop.id = 'modal-backdrop';
        backdrop.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.7); z-index: 2999; backdrop-filter: blur(5px);
            display: none;
        `;
        document.body.appendChild(backdrop);
        
        backdrop.onclick = () => {
            modal.style.display = 'none';
            backdrop.style.display = 'none';
        };
    }
    
    const backdrop = document.getElementById('modal-backdrop');
    
    modal.innerHTML = `
        <h3 style="font-family:var(--font-display);color:var(--accent)">VOICE MISSING</h3>
        <p style="color:var(--text-muted);font-size:0.9rem">
            Your device doesn't have a <b>${LANG_NAMES[langCode] || lang}</b> voice installed.
        </p>
        <div style="display:grid;gap:0.5rem;margin-top:1rem">
            <button onclick="window.open('https://translate.google.com/?sl=${langCode}&tl=${langCode}&text=${encodeURIComponent(text)}&op=translate', '_blank')" class="btn btn-primary" style="width:100%">
                🌐 OPEN GOOGLE TRANSLATE (WEB)
            </button>
            <button onclick="window.open('ms-settings:speech', '_blank')" class="btn btn-outline" style="width:100%">
                ⚙️ INSTALL VOICE PACK (WINDOWS)
            </button>
            <button onclick="document.getElementById('${modalId}').style.display='none';document.getElementById('modal-backdrop').style.display='none'" class="btn btn-ghost" style="width:100%">
                CLOSE
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
    backdrop.style.display = 'block';
    
    showToast('Voice unavailable. Select an option.');
  }



  // Update showToast to handle action buttons
  function showToast(msg, isAction = false, url = null) {
    toast.textContent = msg;
    toast.className = 'toast show';
    
    if (isAction && url) {
        toast.style.cursor = 'pointer';
        toast.onclick = () => {
            window.open(url, '_blank');
            toast.className = 'toast'; // dismiss
        };
        setTimeout(() => {
             toast.className = 'toast';
             toast.onclick = null;
             toast.style.cursor = 'default';
        }, 8000); // Longer timeout for action
    } else {
        setTimeout(() => { toast.className = 'toast'; }, 3000);
    }
  }



  // Load voices
  if (window.speechSynthesis) {
    speechSynthesis.onvoiceschanged = () => {
        speechSynthesis.getVoices(); 
    };
    // Trigger initial load
    setTimeout(() => {
        const voices = speechSynthesis.getVoices();
        console.log('Loaded voices:', voices.length);
    }, 500);
  }

  // Toast notification
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show', 'success');
    setTimeout(() => toast.classList.remove('show', 'success'), 2000);
  }

  // Copy buttons
  document.getElementById('copy-source').addEventListener('click', () => {
    if (sourceText.value) {
      navigator.clipboard.writeText(sourceText.value).then(() => showToast('Copied!'));
    }
  });
  document.getElementById('copy-target').addEventListener('click', () => {
    if (targetText.value) {
      navigator.clipboard.writeText(targetText.value).then(() => showToast('Copied!'));
    }
  });
  
  // Speak buttons
  document.getElementById('speak-source').addEventListener('click', () => speakText(sourceText.value, langSource.value));
  document.getElementById('speak-target').addEventListener('click', () => speakText(targetText.value, langTarget.value));
  
  // Clear button
  document.getElementById('clear-source').addEventListener('click', () => { 
    sourceText.value = ''; 
    targetText.value = ''; 
  });

  // Swap languages
  swapBtn.addEventListener('click', () => {
    const tempLang = langSource.value;
    langSource.value = langTarget.value;
    langTarget.value = tempLang;
    const tempText = sourceText.value;
    sourceText.value = targetText.value;
    targetText.value = tempText;
  });

  // History Management
  function saveHistory(orig, trans, srcLang, tgtLang) {
    const history = JSON.parse(localStorage.getItem('gv_history') || '[]');
    history.unshift({
      id: Date.now(), 
      original: orig, 
      translated: trans,
      srcLang: LANG_NAMES[srcLang] || srcLang, 
      tgtLang: LANG_NAMES[tgtLang] || tgtLang,
      tgtLangCode: tgtLang,
      time: new Date().toLocaleTimeString(), 
      date: new Date().toLocaleDateString()
    });
    if (history.length > 50) history.pop();
    localStorage.setItem('gv_history', JSON.stringify(history));
    renderHistory();
  }

  function renderHistory() {
    const history = JSON.parse(localStorage.getItem('gv_history') || '[]');
    if (!history.length) {
      historyList.innerHTML = `
        <div class="history-empty">
          <p style="font-size:2rem;margin-bottom:1rem">📜</p>
          <p>No translations yet.</p>
          <p style="font-size:0.85rem;margin-top:0.5rem;color:var(--text-muted)">Start speaking or typing!</p>
        </div>`;
      return;
    }
    
    historyList.innerHTML = history.map((h, idx) => `
      <div class="history-item" data-idx="${idx}">
        <div class="history-meta">
          <span class="history-time">${h.time}</span>
          <span class="history-langs">${h.srcLang} → ${h.tgtLang}</span>
        </div>
        <div class="history-original">${escapeHtml(h.original)}</div>
        <div class="history-translated">${escapeHtml(h.translated)}</div>
        <div class="history-actions">
          <button class="history-action-btn copy-btn" data-text="${escapeAttr(h.translated)}">📋 Copy</button>
          <button class="history-action-btn speak-btn" data-text="${escapeAttr(h.translated)}" data-lang="${h.tgtLangCode || 'hi-IN'}">🔊 Speak</button>
        </div>
      </div>
    `).join('');
    
    // Add event listeners
    historyList.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(btn.dataset.text).then(() => showToast('Copied!'));
      });
    });
    
    historyList.querySelectorAll('.speak-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        speakText(btn.dataset.text, btn.dataset.lang);
      });
    });
  }
  
  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  
  function escapeAttr(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Clear all history?')) { 
      localStorage.removeItem('gv_history'); 
      renderHistory(); 
    }
  });

  // Sidebar toggle
  function toggleSidebar(show) {
    historySidebar.classList.toggle('open', show);
    overlay.classList.toggle('visible', show);
  }
  historyToggle.addEventListener('click', () => toggleSidebar(true));
  sidebarClose.addEventListener('click', () => toggleSidebar(false));
  overlay.addEventListener('click', () => toggleSidebar(false));

  // Theme toggle
  function setTheme(dark) {
    document.body.classList.toggle('light-mode', !dark);
    themeToggle.textContent = dark ? '🌙' : '☀️';
    localStorage.setItem('gv_theme', dark ? 'dark' : 'light');
  }
  if (localStorage.getItem('gv_theme') === 'light') setTheme(false);
  themeToggle.addEventListener('click', () => setTheme(document.body.classList.contains('light-mode')));

  // Initial render
  renderHistory();

  // Entry animations
  if (typeof gsap !== 'undefined') {
    // App Page Animations
    gsap.from('.mode-tabs', { opacity: 0, y: -20, duration: 0.6, delay: 0.1 });
    gsap.from('.lang-controls', { opacity: 0, y: -20, duration: 0.6, delay: 0.2 });
    gsap.from('.text-panel', { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, delay: 0.3 });
    gsap.from('.voice-controls', { opacity: 0, scale: 0.9, duration: 0.6, delay: 0.5 });

    // Landing Page Animations (ScrollTrigger)
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Batch animate fade-up elements
        gsap.utils.toArray('.fade-up').forEach(element => {
            ScrollTrigger.create({
                trigger: element,
                start: 'top 85%',
                onEnter: () => element.classList.add('visible'),
                once: true // Only animate once
            });
        });
    } else {
        // Fallback if ScrollTrigger fails to load
        document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    }
  }
}
