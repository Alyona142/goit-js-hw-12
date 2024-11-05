import{S as y,a as L}from"./assets/vendor-VL06bFbc.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const q=new y(".gallery a",{captionsData:"alt",captionDelay:250});function b(r,o){o.innerHTML=w(r),q.refresh()}function w(r){return!r||!Array.isArray(r)?(console.error("Invalid data format:",r),""):r.map(({webformatURL:o,largeImageURL:a,tags:n,likes:e,views:t,comments:l,downloads:h})=>`
      <li class="gallery-item hvr-grow">
        <a class="gallery-link" href="${a}">
          <img class="gallery-image" src="${o}" alt="${n}" loading="lazy">
          <figure class="gallery-figure">
            <ul class="img-content-wrapper">
              <li>Likes<span>${e}</span></li>
              <li>Views<span>${t}</span></li>
              <li>Comments<span>${l}</span></li>
              <li>Downloads<span>${h}</span></li>
            </ul>
          </figure>
        </a>
      </li>
    `).join("")}const S="46806668-35f52dba5a140225900df36e0",v="https://pixabay.com/api/",p=document.querySelector(".search-form"),I=p.querySelector('input[name="search"]'),m=document.querySelector(".gallery");document.querySelector(".loader-container");const i=document.querySelector(".load-more-btn");new y(".gallery a");let s=1,c="",d=0;function f(){const r=document.querySelector(".loader-container");r?r.style.display="flex":console.error("Element '.loader-container' not found.")}function u(){m.innerHTML="",s=1,i.style.display="none"}async function g(r,o){try{f();const a=await L.get(v,{params:{key:S,q:r,page:o,per_page:15}}),n=a.data.hits;d=a.data.totalHits,Array.isArray(n)&&n.length>0?(b(n,m),A(d)):(iziToast.info({title:"Info",message:"No images found for your search query."}),u())}catch(a){console.error("Error loading images:",a),iziToast.error({title:"Error",message:"Failed to load images."}),u()}finally{f()}}p.addEventListener("submit",r=>{r.preventDefault();const o=I.value.trim();o.length!==0&&(c=o,u(),g(c,s))});i.addEventListener("click",()=>{s+=1,g(c,s)});function A(r){r<=s*15?(i.style.display="none",iziToast.info({title:"Info",message:"No more images to load."})):i.style.display="block"}
//# sourceMappingURL=index.js.map
