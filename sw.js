if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,d)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const c=e=>n(e,r),a={module:{uri:r},exports:o,require:c};i[r]=Promise.all(s.map((e=>a[e]||c(e)))).then((e=>(d(...e),o)))}}define(["./workbox-cd63daf5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"android-chrome-192x192.png",revision:"895c5dbf72110e3fe847ac93b85d1976"},{url:"android-chrome-512x512.png",revision:"493dddc3640477d036b2777351a0ca61"},{url:"apple-touch-icon.png",revision:"e6048a7e826f5cece0f7deec96781ee2"},{url:"assets/Home-ASMCmbc_.css",revision:null},{url:"assets/Home-ThiSPApl.js",revision:null},{url:"assets/index-DY967DUh.css",revision:null},{url:"assets/index-n-fHEHbC.js",revision:null},{url:"assets/Motus-E1LCK1Rb.css",revision:null},{url:"assets/Motus-RjmrIX8Q.js",revision:null},{url:"favicon-16x16.png",revision:"699cd5865fb1595163d4d9484769edb7"},{url:"favicon-32x32.png",revision:"adee59dbd884e0e73ca4046dd055ff82"},{url:"favicon.ico",revision:"24c7fad71abd1cc616f3cd2a9b55e8bf"},{url:"favicon.svg",revision:"8ac83156cbf31142e421457482d062ad"},{url:"index.html",revision:"6942cbf137c037ed38c833d8f79de989"},{url:"mstile-150x150.png",revision:"2b78b08cb79d1dba12f2d1cd42e99072"},{url:"safari-pinned-tab.svg",revision:"29884f7eedf1b4fa2da66bd76982108e"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"favicon-32x32.png",revision:"adee59dbd884e0e73ca4046dd055ff82"},{url:"apple-touch-icon.png",revision:"e6048a7e826f5cece0f7deec96781ee2"},{url:"favicon-16x16.png",revision:"699cd5865fb1595163d4d9484769edb7"},{url:"safari-pinned-tab.svg",revision:"29884f7eedf1b4fa2da66bd76982108e"},{url:"android-chrome-192x192.png",revision:"895c5dbf72110e3fe847ac93b85d1976"},{url:"android-chrome-512x512.png",revision:"493dddc3640477d036b2777351a0ca61"},{url:"manifest.webmanifest",revision:"ee6f6092696a47eec73b3e9ed99641b0"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
