
(function(){
 const pathRoutes={
  "enterprise-corporate":"index.html","employee-engagement":"home-2.html",
  "wellness-programs":"programs.html","admin-portal":"admin-dashboard.html",
  "employee-hub":"employee-dashboard.html","case-studies":"case-studies.html",
  "pricing-plans":"pricing.html","support-center":"contact.html",
  "privacy-policy":"about.html","terms-of-service":"about.html"
 };
 const routes={
   "home 1":"index.html","home 2":"home-2.html","home":"index.html",
  "employee dashboard":"employee-dashboard.html","employee wellness hub":"employee-dashboard.html",
  "dashboard":"employee-dashboard.html","wellness hub":"employee-dashboard.html",
  "pricing":"pricing.html","plans":"pricing.html","enterprise pricing":"pricing.html",
  "programs":"programs.html","wellness programs":"programs.html","catalog":"programs.html",
  "admin dashboard":"admin-dashboard.html","admin":"admin-dashboard.html","hr portal":"admin-dashboard.html",
  "case studies":"case-studies.html","clinical outcomes":"case-studies.html","roi":"case-studies.html",
  "clinics":"clinics.html","on site screenings":"clinics.html","workshops":"clinics.html",
  "about":"about.html","contact":"contact.html","get started":"pricing.html","request demo":"pricing.html",
  "login":"employee-dashboard.html"
 };
 const norm=s=>(s||"").replace(/\s+/g," ").trim().toLowerCase();
 function toast(msg){
  const t=document.getElementById("vp-toast");if(!t)return;
  t.textContent=msg;t.classList.add("show");clearTimeout(window.__vpToast);
  window.__vpToast=setTimeout(()=>t.classList.remove("show"),1500);
 }
 function notifications(){
  if(document.getElementById("vp-toast"))return;
  const t=document.createElement("div");t.id="vp-toast";document.body.appendChild(t);
 }
 function controls(){
  const header=document.querySelector("header");
  if(!header||document.getElementById("vp-nav-controls"))return;
  if(header.classList.contains("left-64"))header.classList.add("vp-dashboard-header");
  const nav=header.querySelector("nav");
  if(nav){nav.id=nav.id||"vp-main-nav";nav.classList.add("vp-main-nav")}
  const target=header.querySelector(":scope > div.h-20")||header;
  const group=document.createElement("div");group.id="vp-nav-controls";group.className="vp-nav-controls";
  group.innerHTML=(nav?'<button class="vp-nav-control vp-menu-toggle" id="vp-menu" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="vp-main-nav"><span class="material-symbols-outlined" aria-hidden="true">menu</span></button>':"")+'<button class="vp-nav-control" id="vp-theme" type="button"><span class="material-symbols-outlined" aria-hidden="true"></span></button><button class="vp-nav-control" id="vp-dir" type="button"><span class="material-symbols-outlined" aria-hidden="true">format_textdirection_r_to_l</span></button>';
  target.appendChild(group);
  if(nav)setupMobileNavigation(nav,document.getElementById("vp-menu"));
  document.getElementById("vp-theme").addEventListener("click",()=>{
   document.documentElement.dataset.theme=document.documentElement.dataset.theme==="dark"?"light":"dark";
   localStorage.setItem("vp-theme",document.documentElement.dataset.theme);
   updateControls();
  });
  document.getElementById("vp-dir").addEventListener("click",()=>{
   document.documentElement.dir=document.documentElement.dir==="rtl"?"ltr":"rtl";
   localStorage.setItem("vp-dir",document.documentElement.dir);
   updateControls();
  });
  updateControls();
 }
 function setupMobileNavigation(nav,menuButton){
  const isMobile=()=>window.matchMedia("(max-width: 1279px)").matches;
  function closeMenu(){
   nav.classList.remove("vp-mobile-open");
   menuButton.setAttribute("aria-expanded","false");
   menuButton.setAttribute("aria-label","Open navigation menu");
   menuButton.firstElementChild.textContent="menu";
   nav.querySelectorAll(".vp-submenu-open").forEach(group=>{
    group.classList.remove("vp-submenu-open");
    group.querySelector(":scope > button")?.setAttribute("aria-expanded","false");
   });
  }
  menuButton.addEventListener("click",()=>{
   if(nav.classList.contains("vp-mobile-open")){closeMenu();return}
   nav.classList.add("vp-mobile-open");
   menuButton.setAttribute("aria-expanded","true");
   menuButton.setAttribute("aria-label","Close navigation menu");
   menuButton.firstElementChild.textContent="close";
  });
  nav.querySelectorAll(":scope > .relative.group > button").forEach(button=>button.addEventListener("click",()=>{
   if(!isMobile())return;
   const group=button.parentElement;
   const expanded=group.classList.toggle("vp-submenu-open");
   button.setAttribute("aria-expanded",String(expanded));
  }));
  nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{if(isMobile())closeMenu()}));
  document.addEventListener("click",event=>{
   if(isMobile()&&!nav.contains(event.target)&&!menuButton.contains(event.target))closeMenu();
  });
  document.addEventListener("keydown",event=>{
   if(event.key==="Escape"&&nav.classList.contains("vp-mobile-open")){closeMenu();menuButton.focus()}
  });
  window.addEventListener("resize",()=>{if(!isMobile())closeMenu()});
 }
 function updateControls(){
  const themeButton=document.getElementById("vp-theme");
  const dirButton=document.getElementById("vp-dir");
  const dark=document.documentElement.dataset.theme==="dark";
  const rtl=document.documentElement.dir==="rtl";
  if(themeButton){
   themeButton.title=dark?"Switch to light theme":"Switch to dark theme";
   themeButton.setAttribute("aria-label",themeButton.title);
   themeButton.setAttribute("aria-pressed",String(dark));
   themeButton.firstElementChild.textContent=dark?"light_mode":"dark_mode";
  }
  if(dirButton){
   dirButton.title=rtl?"Switch to left-to-right layout":"Switch to right-to-left layout";
   dirButton.setAttribute("aria-label",dirButton.title);
   dirButton.setAttribute("aria-pressed",String(rtl));
    dirButton.firstElementChild.textContent=rtl?"format_textdirection_l_to_r":"format_textdirection_r_to_l";
  }
 }
 function removeNavSearch(){
  document.querySelectorAll("header input").forEach(input=>{
   const wrapper=input.parentElement;
   if(wrapper?.querySelector(".material-symbols-outlined")?.textContent.trim()==="search")wrapper.remove();
  });
 }
 function dashboardHeader(){
  const aside=document.querySelector("aside.fixed.left-0");
  const header=document.querySelector("header.vp-dashboard-header");
  if(!aside||!header)return;
  const employee=location.pathname.split("/").pop()==="employee-dashboard.html";
  const brand=aside.querySelector(":scope > div:first-child");
  if(brand&&!brand.closest("a")){
   const homeLink=document.createElement("a");
   homeLink.className="vp-dashboard-brand-link";
   homeLink.href="index.html";
   homeLink.setAttribute("aria-label","VitalPulse home");
   brand.before(homeLink);
   homeLink.append(brand);
  }
  const subtitle=brand?.querySelector(".font-label-sm");
  if(employee&&subtitle)subtitle.textContent="Wellness Hub";
  const context=header.querySelector(":scope > div:first-child .inline-flex");
  if(context){
   const indicator=context.querySelector("span");
   context.replaceChildren(indicator,document.createTextNode(employee?"My wellness":"Workforce health"));
  }
  header.querySelector(":scope > div:nth-child(2) > button")?.remove();
  if(employee){
   aside.querySelector('nav a[data-path="admin-portal"]')?.remove();
   header.querySelector(":scope > div:nth-child(2) > div.pl-2")?.remove();
  }
 }
 function reorderDashboardNav(){
  document.querySelectorAll("header nav").forEach(nav=>{
   let items=[...nav.children];
   let pricing=items.find(item=>norm(item.innerText).includes("pricing & plans"));
   const clinics=items.find(item=>norm(item.innerText)==="clinics");
   if(!clinics&&pricing){
    const link=document.createElement("a");
    link.href="clinics.html";
    link.className=pricing.className;
    link.textContent="Clinics";
    pricing.before(link);
    items=[...nav.children];
    pricing=items.find(item=>norm(item.innerText).includes("pricing & plans"));
   }
   const dashboard=items.find(item=>norm(item.innerText).startsWith("dashboards"));
   if(dashboard&&pricing&&pricing.nextElementSibling!==dashboard)pricing.after(dashboard);
  const sample=nav.querySelector(":scope > a")||nav.querySelector("a");
  const before=nav.querySelector(':scope > a[data-path="admin-portal"]')||nav.querySelector(':scope > a[href="pricing.html"]');
  [["About","about.html"],["Contact","contact.html"]].forEach(([label,href])=>{
   if(nav.querySelector(`:scope > a[href="${href}"]`))return;
   const link=document.createElement("a");
   link.href=href;
   link.className=sample?.className||"px-3 py-2.5 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors";
   link.textContent=label;
   if(before)nav.insertBefore(link,before);else nav.append(link);
  });
  });
 }
 function footerBrandLink(footer){
  const logo=footer.querySelector('img[alt="VitalPulse Wellness Logo"]');
  if(logo){
   const brand=logo.parentElement;
   if(brand.tagName!=="A"){
    const link=document.createElement("a");
    link.className="vp-footer-brand";
    link.href="index.html";
    link.setAttribute("aria-label","VitalPulse Wellness home");
    brand.before(link);
    link.append(brand);
   }
   return null;
  }
  const source=document.querySelector('aside img[alt="VitalPulse Wellness Logo"]')||document.querySelector('header img[alt="VitalPulse Wellness Logo"]');
  if(!source)return null;
  const link=document.createElement("a");
  link.className="vp-footer-brand";
  link.href="index.html";
  link.setAttribute("aria-label","VitalPulse Wellness home");
  const image=source.cloneNode(false);
  image.alt="";
  image.className="vp-footer-brand-image";
  const name=document.createElement("span");
  name.className="font-title-lg text-title-lg text-on-surface tracking-tight";
  name.textContent="VitalPulse Wellness";
  link.append(image,name);
  return link;
 }
 function socialFooter(){
  if(document.querySelector('meta[name="shell-type"][content="web_dashboard"]')){
   document.querySelectorAll("footer").forEach(footer=>footer.remove());
   return;
  }
  let footer=document.querySelector("footer");
  if(!footer){
   const main=document.querySelector("main");
   if(!main)return;
   footer=document.createElement("footer");
    footer.className="vp-social-footer-standalone vp-social-footer-host";
   main.appendChild(footer);
  }
    const footerBrand=footerBrandLink(footer);
  if(footer.querySelector(".vp-social-links"))return;
  const links=document.createElement("div");
  links.className="vp-social-footer";
  links.innerHTML='<nav class="vp-social-links" aria-label="Social media"><a class="vp-social-link" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.4v1.56h.05c.47-.89 1.63-1.83 3.35-1.83 3.59 0 4.25 2.36 4.25 5.43v6.29zM5.36 7.43c-1.14 0-2.06-.93-2.06-2.07S4.22 3.3 5.36 3.3s2.07.92 2.07 2.06-.93 2.07-2.07 2.07zM7.14 20.45H3.58V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/></svg></a><a class="vp-social-link" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.25" fill="currentColor"/></svg></a><a class="vp-social-link" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.4 21v-7.2h2.4l.36-2.8H13.4V9.2c0-.81.23-1.36 1.4-1.36h1.49V5.33c-.26-.03-1.17-.11-2.22-.11-2.2 0-3.7 1.34-3.7 3.81V11H7.9v2.8h2.47V21h3.03z"/></svg></a><a class="vp-social-link" href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="m10 9 5 3-5 3z"/></svg></a></nav>';
  const trustBadges=[...footer.querySelectorAll("div")].filter(el=>el.innerText.includes("HIPAA Compliant")&&el.innerText.includes("SOC2 Type II")).sort((a,b)=>a.innerText.length-b.innerText.length);
  if(trustBadges.length){trustBadges[0].after(links);return}
  links.classList.add("vp-social-footer-stack");
  links.insertAdjacentHTML("afterbegin",'<span class="vp-compliance-badge"><span class="material-symbols-outlined" aria-hidden="true">lock</span>HIPAA Compliant</span>');
  if(footerBrand)links.prepend(footerBrand);
  footer.classList.add("vp-social-footer-host");
  footer.appendChild(links);
 }
 function links(){
  document.querySelectorAll('a[href="#"]').forEach(a=>{
   const txt=norm(a.textContent);
   const match=Object.entries(routes).filter(([key])=>txt===key||txt.includes(key)).sort((a,b)=>b[0].length-a[0].length)[0];
    let target=pathRoutes[norm(a.dataset.path)]||match?.[1]||null;
   if(!target&&/pricing|plans|subscription/.test(txt))target="pricing.html";
   if(!target&&/program|wellness catalog/.test(txt))target="programs.html";
   if(!target&&/dashboard|portal/.test(txt))target="employee-dashboard.html";
   if(!target&&/case study|outcome|roi/.test(txt))target="case-studies.html";
   if(!target&&/clinic|screening|workshop/.test(txt))target="clinics.html";
   if(target)a.href=target;
  });
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(a=>a.addEventListener("click",e=>{
   const el=document.querySelector(a.getAttribute("href"));if(el){e.preventDefault();el.scrollIntoView({behavior:"smooth"})}
  }));
 }
 function markCurrentNav(){
  const current=location.pathname.split("/").pop()||"index.html";
  document.querySelectorAll("header nav.vp-main-nav a[href]").forEach(link=>{
   link.removeAttribute("aria-current");
   link.closest(".relative.group")?.classList.remove("vp-nav-current-parent");
    link.classList.remove("bg-secondary-container","text-on-secondary-fixed","font-semibold");
   if(new URL(link.href,location.href).pathname.split("/").pop()!==current)return;
   link.setAttribute("aria-current","page");
   link.closest(".relative.group")?.classList.add("vp-nav-current-parent");
  });
 }
 function forms(){
  document.querySelectorAll("form").forEach(f=>f.addEventListener("submit",e=>{
   e.preventDefault();
   const bad=[...f.querySelectorAll("[required]")].find(x=>!x.value.trim());
   if(bad){bad.focus();toast("Please complete the required fields");return}
   f.reset();toast("Your request was submitted successfully");
  }));
 }
 document.documentElement.dataset.theme=localStorage.getItem("vp-theme")||"light";
 document.documentElement.dir=localStorage.getItem("vp-dir")||"ltr";
 document.addEventListener("DOMContentLoaded",()=>{notifications();removeNavSearch();controls();dashboardHeader();links();reorderDashboardNav();markCurrentNav();socialFooter();forms()});
})();
