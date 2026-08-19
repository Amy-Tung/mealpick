window.DINNER_WHEEL_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDYBsLduV9Du78PaN6tXDsX09MN-7z_4hA",
  authDomain: "dinner-wheel-61c2a.firebaseapp.com",
  projectId: "dinner-wheel-61c2a",
  storageBucket: "dinner-wheel-61c2a.firebasestorage.app",
  messagingSenderId: "624209509587",
  appId: "1:624209509587:web:efafd7b68cc504c9de6826"
};

// MealPick confirmed UI updates, 2026-08-19
(function(){
  const START_LABEL = '😋 開抽美食';
  const LINES = [
    '如果還是不知道吃什麼，就再來一次 🎰',
    '今天也辛苦了，晚餐要好好吃 😋',
    '願你今天抽到想吃的那一口 🍜',
    '選擇困難的時候，就交給選餐小幫手 ✨',
    '吃飯這件事，今天就不要想太久 😌'
  ];
  function $(id){ return document.getElementById(id); }
  function addStyle(){
    if($('mealpickConfirmedUiStyle')) return;
    const style=document.createElement('style');
    style.id='mealpickConfirmedUiStyle';
    style.textContent=`
      .slotActions{margin-top:18px;display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap}
      .slotActions .slotBtn{margin-top:0!important;border-radius:14px!important;font-size:16px!important;padding:12px 16px!important;min-width:135px!important;min-height:48px!important}
      .slotMapBtn{display:none;border-radius:14px;background:var(--main,#0ABAB5);color:#fff;border:0;text-decoration:none;font-weight:900;padding:12px 16px;min-width:135px;min-height:48px;align-items:center;justify-content:center}
      .slotMapBtn.show{display:inline-flex}
      @media(max-width:560px){.slotActions{display:grid;grid-template-columns:1fr 1fr;width:100%}.slotActions .slotBtn,.slotActions .slotMapBtn{min-width:0!important;width:100%}}
      .funFooter{margin:28px auto 96px;padding:22px 12px 84px;text-align:center;color:#6b7c80;border-top:1px solid var(--line,#d8eeee);font-weight:800;line-height:1.7}
      .funFooter .footerLine{font-size:15px;min-height:26px;transition:opacity .5s ease, transform .5s ease}.funFooter .footerLine.switching{opacity:0;transform:translateY(-6px)}
      .funFooter .footerBrand{font-size:13px;color:#8aa;margin-top:4px}
      .backTopBtn{position:fixed;right:18px;bottom:18px;z-index:80;width:46px;height:46px;border-radius:999px;border:0;background:var(--main,#0ABAB5);color:#fff;box-shadow:0 12px 28px rgba(0,80,80,.25);font-weight:1000;font-size:20px;display:flex;align-items:center;justify-content:center;gap:6px;opacity:0;pointer-events:none;transform:translateY(10px);transition:.22s ease;white-space:nowrap;padding:0 14px}
      .backTopBtn.show{opacity:1;pointer-events:auto;transform:translateY(0)}.backTopBtn.nearBottom{width:auto;min-width:128px;font-size:15px}.backTopBtn .backTopText{display:none;font-size:15px}.backTopBtn.nearBottom .backTopText{display:inline}
      @media(max-width:860px){.funFooter{margin-top:22px;padding-bottom:104px}.backTopBtn{right:16px;bottom:18px}}
    `;
    document.head.appendChild(style);
  }
  function ensureFooter(){
    if(!$('funFooter')){
      const footer=document.createElement('footer');
      footer.className='funFooter'; footer.id='funFooter';
      footer.innerHTML='<div class="footerLine" id="footerLine"></div><div class="footerBrand">MealPick｜選餐小幫手</div>';
      const wrap=document.querySelector('.wrap')||document.body;
      wrap.appendChild(footer);
    }
    if(!$('backTopBtn')){
      const btn=document.createElement('button');
      btn.className='backTopBtn'; btn.id='backTopBtn'; btn.type='button'; btn.setAttribute('aria-label','回到頂端');
      btn.innerHTML='<span>↑</span><span class="backTopText">回到頂端</span>';
      document.body.appendChild(btn);
      function update(){ const y=window.scrollY||document.documentElement.scrollTop, doc=document.documentElement.scrollHeight, near=(window.innerHeight+y)>(doc-260); btn.classList.toggle('show',y>260); btn.classList.toggle('nearBottom',near); }
      window.addEventListener('scroll',update,{passive:true}); window.addEventListener('resize',update); btn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'}); update();
    }
    const line=$('footerLine');
    if(line && !line.dataset.rotating){
      line.dataset.rotating='1'; let i=0; line.textContent=LINES[i];
      setInterval(()=>{ line.classList.add('switching'); setTimeout(()=>{ i=(i+1)%LINES.length; line.textContent=LINES[i]; line.classList.remove('switching'); },500); },3000);
    }
  }
  function currentResult(){ const t=$('resultText')?.textContent?.trim()||''; return (!t||t==='還沒決定')?'':t; }
  function mapUrl(name){ return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(name); }
  function shouldHideMap(name){ return ['家裡煮','不吃','不吃晚餐'].includes(name); }
  function ensureSlotActions(){
    const spin=$('spinBtn'), center=$('centerText'); if(!spin||!center) return;
    if(center.textContent.trim()==='開始決定') center.textContent=START_LABEL;
    if(!spin.parentElement.classList.contains('slotActions')){
      const wrap=document.createElement('div'); wrap.className='slotActions';
      const parent=spin.parentElement; parent.insertBefore(wrap,spin); wrap.appendChild(spin);
    }
    const wrap=spin.parentElement;
    let map=$('slotMapSearch');
    if(!map){ map=document.createElement('a'); map.className='slotMapBtn'; map.id='slotMapSearch'; map.target='_blank'; map.textContent='🔎 搜尋地圖'; wrap.insertBefore(map,spin); }
    const name=currentResult();
    if(name && !shouldHideMap(name)){ map.href=mapUrl(name); map.classList.add('show'); } else { map.classList.remove('show'); }
    if(center.textContent.trim()==='再來一次') center.textContent='▶ 再來一次';
    document.querySelectorAll('#mapSearch').forEach(a=>{ a.textContent='🔎 搜尋地圖'; });
  }
  function fixSlotRepeatVisual(){
    if(window.__mealpickRepeatPatch) return; window.__mealpickRepeatPatch=true;
    const target=$('slotReel'); if(!target) return;
    new MutationObserver(()=>{
      const items=[...target.querySelectorAll('.slotItem')];
      const win=items.findIndex(x=>x.classList.contains('win'));
      if(win>=0){
        for(const n of [win-1,win+1]){
          if(items[n] && items[n].textContent.trim()===items[win].textContent.trim()){
            const alt=items.find(x=>x.textContent.trim() && x.textContent.trim()!==items[win].textContent.trim());
            if(alt) items[n].textContent=alt.textContent;
          }
        }
      }
    }).observe(target,{childList:true,subtree:true});
  }
  function apply(){ addStyle(); ensureFooter(); ensureSlotActions(); fixSlotRepeatVisual(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply); else apply();
  setInterval(apply,700);
})();
