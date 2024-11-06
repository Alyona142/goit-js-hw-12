import{a as m,S as g,i as u}from"./assets/vendor-CNWo8HCU.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const h="46806668-35f52dba5a140225900df36e0",L="https://pixabay.com/api/?";document.querySelector(".list");async function w(t,n=1,a=15){try{return(await m.get(L,{params:{key:h,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:n,per_page:a}})).data}catch{throw new Error("Failed to fetch images")}}const b=new g(".gallery a",{captionsData:"alt",captionDelay:250});function S(t,n,a=!1){const r=q(t);a?n.insertAdjacentHTML("beforeend",r):n.innerHTML=r,b.refresh()}function q(t){return t.map(({webformatURL:n,largeImageURL:a,tags:r,likes:e,views:o,comments:s,downloads:y})=>`
      <li class="gallery-item hvr-grow">
        <a class="gallery-link" href="${a}">
          <img class="gallery-image" src="${n}" alt="${r}" loading="lazy">
          <figure class="gallery-figure">
            <ul class="img-content-wrapper">
              <li>Likes<span>${e}</span></li>
              <li>Views<span>${o}</span></li>
              <li>Comments<span>${s}</span></li>
              <li>Downloads<span>${y}</span></li>
            </ul>
          </figure>
        </a>
      </li>
    `).join("")}function v(){const t=document.querySelector(".loader-container");t.style.display="flex"}function I(){const t=document.querySelector(".loader-container");t.style.display="none"}const d=document.querySelector(".search-form"),M=d.querySelector('input[name="search"]'),f=document.querySelector(".gallery"),c=document.querySelector(".load-more-btn");let i=1,l="";d.addEventListener("submit",t=>{t.preventDefault(),l=M.value.trim(),l&&($(),p(l,i))});c.addEventListener("click",()=>{i++,p(l,i,!0)});async function p(t,n,a=!1){try{v();const r=await w(t,n),e=r.hits;e.length?(S(e,f,a),P(r.totalHits)):u.info({title:"Info",message:"No images found."})}catch(r){u.error({title:"Error",message:r.message})}finally{I()}}function P(t){t<=i*15?c.style.display="none":c.style.display="block"}function $(){f.innerHTML="",i=1,c.style.display="none"}
//# sourceMappingURL=index.js.map
