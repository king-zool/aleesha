/* Aleesha student transport — vanilla JavaScript */
const AUSU='Al-Istiqama University, Sumaila';
const KEY='aleesha-stitch-demo-bookings';
const CITIES=['Kano','Abuja','Kaduna','Jos','Katsina','Bauchi','Zaria','Lagos','Sokoto','Gombe','Maiduguri','Minna','Ilorin'];
const VEHICLES=[{id:'sienna',name:'Toyota Sienna Executive',seats:7,price:19500,time:'06:30 AM',image:'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=600&q=75'},{id:'hiace',name:'Toyota HiAce VIP Luxury',seats:14,price:22000,time:'07:15 AM',image:'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?auto=format&fit=crop&w=600&q=75'},{id:'suv',name:'Executive Toyota SUV',seats:4,price:34000,time:'08:00 AM',image:'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=75'},{id:'bus',name:'Campus Transit Bus',seats:30,price:16000,time:'06:00 AM',image:'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=75'}];
const RIDE_PHOTOS=["https://lh3.googleusercontent.com/aida-public/AB6AXuAaFsStSB1d0esXMvB_cWDeo1JJbUJR4VZ6JmQcmt_Qw5OJdTVdpl-ICprdZv6CBZYJ7TS9di0COYeHrUpCP0oWv60Ll9wLRmfX_A6OZJTKTFAg59RB7aJIMd3wi7F8plF3-77rj7vUJbrQ5bVaRcj-caY23k6gVLCI934B016TxwhbPTROKfLks3RMhBGtKWDUGUie_sLwgRL8mLTE12PFC_1m4AwuBcBPhVNAqhQ", "https://lh3.googleusercontent.com/aida-public/AB6AXuDg0iOxzque-iVqXrRl1T6xK6fUbIlAhosFeyKOSsu4s38aU9ww3W6xwx7yES7tfgDUU43_U1yNLElxCSJQc-AExgVdWpZU1KJq0nUOcxeHRSeENX4iylb4iMuy3El8jDZFinebaXJR1ZOCRD2GrZiMlrgmScoj-7KcIjUsRZ5lh9QOI0RxUaQ1y5C_YzFHpuBNOx1GbdWLdTcTHiY-VwSBkf1PEuJS5aYJ91FZSHc", "https://lh3.googleusercontent.com/aida-public/AB6AXuDOILS3UweLOYCitTStP8LdJtrOjy44Y4w4hYMxuIt3ui3B8r-d9EGrgUxSBffHsHG58L36xzb2alEZPlrZAqOheUEYYv7h55p3v1QXwnkvaqgIKqBzYM86rrqVgdDTyLo8ko8Fe2N7bcs1LFlySR535-cZ3Eqm2Tbm1UQltCmemtzt5Vj1C3bBmDFZAbUGlcRH3QEWKXCX-AdUYsTGn26_OKy2F9FSByRJwcsy-CY", "https://lh3.googleusercontent.com/aida-public/AB6AXuBlCmIIqYdhYNenYgW8yeboEAKKoaX2g-lWTNHIhRdXE-cXuR1VA5IdLV6mjRO67ketH1Z-IK1Tnc9mdPdDiURfjJ82kz5c67KLr2L1GP1ZvrfRnY_cclbg9zuCfWY2VcFn3VIbpEXVPB1YDEO6hEZub_d__y6526HPYkXr7KiuarGMSRChNxQ_oMEdoMsScgSaTiF-K9Maqh-YLl9iA1GkQy4rBPW_npBTHd68SkU"];
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const fmt=v=>new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(v);
const today=()=>{const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)};
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return []}};
const write=(v)=>localStorage.setItem(KEY,JSON.stringify(v));
const state=()=>{try{return JSON.parse(sessionStorage.getItem('aleesha-trip')||'null')}catch{return null}};
const setState=(v)=>sessionStorage.setItem('aleesha-trip',JSON.stringify(v));
let selection=[];
function modal(html){$('.aleesha-modal-backdrop')?.remove();let wrap=document.createElement('div');wrap.className='aleesha-modal-backdrop';wrap.innerHTML=`<section class="aleesha-modal" role="dialog" aria-modal="true"><button class="modal-close" type="button" aria-label="Close dialog">✕</button>${html}</section>`;document.body.append(wrap);$('.modal-close',wrap).onclick=()=>wrap.remove();wrap.addEventListener('click',e=>{if(e.target===wrap)wrap.remove()});return wrap;}
function bookingSearch(){const stored=state()||{from:AUSU,to:'Abuja',date:today(),passengers:1,type:'oneway'};const m=modal(`<h2 style="font-size:23px;font-weight:800;margin:0">Find your trip</h2><p style="color:#475569;margin:10px 0 20px">Search sample student routes and vehicle choices.</p><form id="aleesha-search"><div class="field-grid"><div><label for="aleesha-from">Departure</label><select id="aleesha-from"></select></div><div><label for="aleesha-to">Destination</label><select id="aleesha-to"></select></div><div><label for="aleesha-date">Departure date</label><input id="aleesha-date" type="date" required min="${today()}" value="${stored.date>=today()?stored.date:today()}"></div><div><label for="aleesha-count">Passengers</label><select id="aleesha-count">${Array.from({length:6},(_,i)=>`<option value="${i+1}">${i+1} passenger${i?'s':''}</option>`).join('')}</select></div><div><label for="aleesha-vehicle">Vehicle preference</label><select id="aleesha-vehicle"><option value="any">Any vehicle</option>${VEHICLES.map(v=>`<option value="${v.id}">${v.name}</option>`).join('')}</select></div><div><label for="aleesha-way">Trip type</label><select id="aleesha-way"><option value="oneway">One way</option><option value="round">Round trip</option></select></div></div><button style="margin-top:20px;width:100%" type="submit">Find available rides →</button><p style="margin-top:14px;font-size:12px;color:#64748b">Schedules and fares are indicative; operator confirmation is required.</p></form>`);
 const options=[AUSU,...CITIES];for(const id of ['#aleesha-from','#aleesha-to'])$(id,m).innerHTML=options.map(x=>`<option value="${x}">${x}</option>`).join('');
 $('#aleesha-from',m).value=stored.from;$('#aleesha-to',m).value=stored.to;$('#aleesha-count',m).value=stored.passengers||1;$('#aleesha-way',m).value=stored.type||'oneway';$('#aleesha-vehicle',m).value=stored.vehicle||'any';
 $('#aleesha-search',m).onsubmit=e=>{e.preventDefault();let from=$('#aleesha-from',m).value,to=$('#aleesha-to',m).value;if(from===to){alert('Choose two different locations.');return}setState({from,to,date:$('#aleesha-date',m).value,passengers:+$('#aleesha-count',m).value,type:$('#aleesha-way',m).value,vehicle:$('#aleesha-vehicle',m).value});location.href='rides.html'};
}
function toggleFaq(button){const panel=button.nextElementSibling;const open=panel.classList.toggle('hidden')===false;button.setAttribute('aria-expanded',String(open));const icon=$('.material-symbols-outlined',button);if(icon)icon.style.transform=open?'rotate(180deg)':'';}
function initHome(){
 let direction='home',passengers=1;
 const date=$('#home-date'),dest=$('#destinationSelect'),travellers=$('#traveller-selector');date.min=today();date.value=today();
 function renderCount(){const label=passengers+' traveller'+(passengers>1?'s':'');$('#traveller-summary').textContent=label;$('#traveller-count').textContent=passengers;$('#traveller-minus').disabled=passengers===1;$('#traveller-plus').disabled=passengers===6;}
 $('#traveller-minus').onclick=()=>{passengers=Math.max(1,passengers-1);renderCount();};$('#traveller-plus').onclick=()=>{passengers=Math.min(6,passengers+1);renderCount();};$('#traveller-done').onclick=()=>{travellers.open=false;travellers.querySelector('summary').focus();};
 document.addEventListener('click',e=>{if(!travellers.contains(e.target))travellers.open=false;});document.addEventListener('keydown',e=>{if(e.key==='Escape'){travellers.open=false;travellers.querySelector('summary').focus();}});
 [$('#tabGoingHome'),$('#tabReturning')].forEach((button,i)=>button.onclick=()=>{direction=i?'return':'home';[$('#tabGoingHome'),$('#tabReturning')].forEach((b,n)=>b.setAttribute('aria-pressed',String(i===n)));$('#station-label').textContent=i?'To':'From';$('#city-label').textContent=i?'From':'To';$('#depSub').textContent=i?'Campus arrival':'Campus departure';});
 $('#home-search').onsubmit=e=>{e.preventDefault();if(!date.reportValidity())return;setState({from:direction==='home'?AUSU:dest.value,to:direction==='home'?dest.value:AUSU,date:date.value,passengers,type:$('#home-trip').value,vehicle:$('#home-vehicle').value});location.href='rides.html';};
 $$('[onclick^="toggleFaq"]').forEach(b=>b.setAttribute('aria-expanded','false'));
 $$('a[data-path="vehicle-details"]').forEach((link,i)=>{link.href='rides.html';link.onclick=()=>setState({from:AUSU,to:dest.value,date:date.value||today(),passengers,type:'oneway',vehicle:['sienna','hiace','bus','suv'][i]});});
}
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dateText=value=>new Date(value+'T12:00:00').toLocaleDateString('en-NG',{day:'numeric',month:'long',year:'numeric'});
const vehicleFor=s=>VEHICLES.find(v=>v.id===s.vehicle)||VEHICLES[0];
const locationText=value=>value===AUSU?'AUSU, Sumaila':value;
const routeText=s=>locationText(s.from)+' → '+locationText(s.to);
const seatText=s=>(s.seats||[]).join(', ');
const tripDetails=s=>dateText(s.date)+' · '+vehicleFor(s).name+' · Seat'+(s.seats.length>1?'s ':' ')+seatText(s);
const SEAT_LAYOUTS = {
  bus: {
    name: "Standard coach", driverLabel: "Driver", rows: [
      [1, 2, "aisle", 3, 4], [5, 6, "aisle", 7, 8], [9, 10, "aisle", 11, 12],
      [13, 14, "aisle", 15, 16], [17, 18, "aisle", 19, 20], [21, 22, "aisle", 23, 24],
      [25, 26, "aisle", 27, 28], [29, 30],
    ], unavailable: [3, 4, 6, 7, 8, 10, 12, 14, 15, 16, 18, 20, 22, 24, 26, 27, 28, 29],
  },
  luxury: {
    name: "Luxury coach", driverLabel: "Driver", rows: [
      [1, "aisle", 2, 3], [4, "aisle", 5, 6], [7, "aisle", 8, 9],
      [10, "aisle", 11, 12], [13, "aisle", 14, 15], [16, "aisle", 17, 18],
      [19, "aisle", 20, 21], [22, "aisle", 23, 24], [25, "aisle", 26, 27],
    ], unavailable: [2, 4, 5, 6, 7, 8, 10, 11, 12, 14, 16, 17, 18, 20, 22, 23, 24, 26, 27],
  },
  sienna: {
    name: "Sienna", driverLabel: "Driver", rows: [[1], [2, 3, 4], [5, 6, 7]], unavailable: [4, 7],
  },
  hiace: {
    name: "Hiace", driverLabel: "Driver", rows: [
      [1, 2, "aisle"], [3, 4, "aisle"], [5, 6, "aisle"],
      [7, 8, "aisle"], [9, 10, "aisle"], [11, 12], [13, 14],
    ], unavailable: [2, 3, 5, 9, 10],
  },
  suv: {
    name: "SUV", driverLabel: "Driver", rows: [[1], [2, 3, 4]], unavailable: [2, 4],
  },
  executive: {
    name: "Executive car", driverLabel: "Driver", rows: [[1], [2, 3]], unavailable: [2, 3],
  },
};


const layoutFor=v=>SEAT_LAYOUTS[v.id]||SEAT_LAYOUTS.bus;
const availability=v=>v.seats-layoutFor(v).unavailable.length;
function initRides(){
 const s=state()||{from:AUSU,to:'Abuja',date:today(),passengers:1,vehicle:'any'};
 $('#results-route').textContent=routeText(s);$('#results-meta').textContent=dateText(s.date)+' · '+s.passengers+' passenger'+(s.passengers>1?'s':'');
 $('#modify-search-btn').addEventListener('click',bookingSearch);
 if(s.vehicle&&s.vehicle!=='any')$$('.filter-category').forEach(c=>c.checked=c.value===s.vehicle);
 function draw(){
  const categories=$$('.filter-category:checked').map(c=>c.value),limit=+$('#price-slider').value;
  $('#price-display').textContent=fmt(limit);
  let rides=VEHICLES.map((v,i)=>({...v,photo:RIDE_PHOTOS[i]})).filter(v=>categories.includes(v.id)&&v.price<=limit);
  const sort=$('#ride-sort').value;rides.sort((a,b)=>sort==='lowest'?a.price-b.price:sort==='highest'?b.price-a.price:a.time.localeCompare(b.time));
  $('#results-count').textContent=rides.length+' ride option'+(rides.length===1?'':'s');$('#no-rides').hidden=rides.length>0;
  $('#rides-container').innerHTML=rides.map(v=>`<article class="journey-ride"><img src="${v.photo}" alt="${escapeHTML(v.name)}" loading="lazy"><div class="ride-description"><h2>${escapeHTML(v.name)}</h2><p>${v.seats} passenger seats · Air conditioning</p><div class="ride-departure"><strong>${v.time}</strong><span>Sample departure</span></div><p class="ride-availability">${availability(v)} sample seats available</p></div><div class="ride-price"><strong>${fmt(v.price)}</strong><span>per passenger</span><a class="ride-detail-link text-button" href="vehicle-details.html" data-detail="${v.id}">Vehicle details</a><button class="button-primary" data-ride="${v.id}" ${availability(v)<s.passengers?'disabled':''}>${availability(v)<s.passengers?'Not enough seats':'Choose seats →'}</button></div></article>`).join('');
  $$('[data-detail]').forEach(link=>link.onclick=()=>setState({...s,vehicle:link.dataset.detail,seats:[]}));
  $$('[data-ride]').forEach(button=>button.onclick=()=>{setState({...s,vehicle:button.dataset.ride,seats:[]});location.href='seats.html';});
 }
 const reset=()=>{$$('.filter-category').forEach(c=>c.checked=true);$('#price-slider').value=35000;$('#ride-sort').value='earliest';draw();};
 $$('.filter-category,#price-slider,#ride-sort').forEach(el=>el.addEventListener('input',draw));$('#clear-all-filters').onclick=reset;$('#reset-filter-btn').onclick=reset;draw();
}
function initSeats(){
 const s=state()||{from:AUSU,to:'Abuja',date:today(),passengers:1,vehicle:'sienna'};const v=vehicleFor(s),needed=s.passengers||1;
 const layout=layoutFor(v),occupied=layout.unavailable;selection=(s.seats||[]).filter(n=>n>=1&&n<=v.seats&&!occupied.includes(n)).slice(0,needed);
 $('#deck-vehicle').textContent=v.name;$('#deck-capacity').textContent=v.seats+' passenger seats';$('#seat-route').textContent=routeText(s);$('#seat-date').textContent=dateText(s.date)+' · '+v.time;$('#seat-vehicle').textContent=v.name;$('#seat-passengers').textContent=needed;$('#seat-fare').textContent=fmt(v.price);
 const grid=$('#seat-grid');grid.classList.toggle('wide-cabin',v.seats>7);
 grid.className='seat-map-rows';
 grid.innerHTML=layout.rows.map(row=>`<div class="seat-map-row" style="--seat-columns:${row.length}">${row.map(n=>n==='aisle'?'<span class="seat-aisle" aria-hidden="true"></span>':`<button type="button" class="cabin-seat" data-seat="${n}" id="seat-node-${n}" aria-label="Seat ${n}${occupied.includes(n)?', unavailable':''}" aria-pressed="false" ${occupied.includes(n)?'disabled':''}>${String(n).padStart(2,'0')}</button>`).join('')}</div>`).join('');
 function update(){
  $$('[data-seat]').forEach(b=>b.setAttribute('aria-pressed',String(selection.includes(+b.dataset.seat))));$('#selected-seats').textContent=selection.length?selection.join(', '):'None yet';$('#seat-total').textContent=fmt(v.price*selection.length);$('#seat-message').textContent=selection.length+' of '+needed+' seat'+(needed>1?'s':'')+' selected.';$('#seat-continue').disabled=selection.length!==needed;
 }
 $$('[data-seat]').forEach(b=>b.onclick=()=>{const n=+b.dataset.seat;if(selection.includes(n))selection=selection.filter(x=>x!==n);else if(selection.length<needed)selection.push(n);else{$('#seat-message').textContent='Unselect a seat first to choose a different one.';return;}update();});
 $('#seat-continue').onclick=()=>{if(selection.length!==needed)return;setState({...s,seats:selection});location.href='passenger.html';};update();
}
function fillSummary(prefix,s){$('#'+prefix+'-trip').textContent=routeText(s);$('#'+prefix+'-details').textContent=tripDetails(s);$('#'+prefix+'-price').textContent=fmt(vehicleFor(s).price*s.seats.length);}
function initPassenger(){
 const s=state();if(!s?.seats?.length){location.href='rides.html';return;}fillSummary('p',s);
 if(s.person)for(const key of ['name','phone','email'])$('#passenger-'+key).value=s.person[key]||'';
 $('#p-form').onsubmit=e=>{e.preventDefault();const name=$('#passenger-name');name.setCustomValidity(name.value.trim()?'':'Please enter your name.');if(!e.currentTarget.reportValidity())return;setState({...s,person:{name:name.value.trim(),phone:$('#passenger-phone').value.trim(),email:$('#passenger-email').value.trim()}});location.href='confirm.html';};
 $('#passenger-name').oninput=e=>e.target.setCustomValidity('');
}
function initConfirm(){
 const s=state();if(!s?.person){location.href='rides.html';return;}fillSummary('c',s);$('#c-name').textContent=s.person.name;$('#c-phone').textContent=s.person.phone;$('#c-email').textContent=s.person.email||'Not provided';
 $('#c-confirm').onclick=()=>{
  const button=$('#c-confirm');button.disabled=true;
  const record={...s,ref:'ALE-'+Date.now().toString(36).toUpperCase(),status:'Pending operator confirmation',amount:vehicleFor(s).price*s.seats.length};
  try{write([...read(),record]);setState({...s,ref:record.ref});location.href='success.html';}catch{$('#save-error').textContent='This browser could not save your request. Please allow local storage and try again.';button.disabled=false;}
 };
}
function initSuccess(){const s=state();if(!s?.ref){location.href='index.html';return;}$('#s-ref').textContent=s.ref;fillSummary('s',s);}
function initBookings(){
 const list=$('#saved-list');
 function draw(){
  const bookings=read().slice().reverse();
  list.innerHTML=bookings.length?bookings.map(b=>`<article class="saved-request"><div class="saved-request-top"><p class="request-status ${b.status==='Cancelled'?'is-cancelled':''}">${b.status==='Cancelled'?'Cancelled':'Awaiting operator confirmation'}</p><span class="reference-code">${escapeHTML(b.ref)}</span></div><h2>${escapeHTML(routeText(b))}</h2><p class="trip-meta">${escapeHTML(tripDetails(b))}</p><div class="saved-request-bottom"><span>${escapeHTML(b.person?.name||'Passenger')}</span><strong>${fmt(b.amount||0)}</strong>${b.status==='Cancelled'?'<span class="small-note">Request cancelled on this device</span>':`<button class="cancel-button" data-cancel="${escapeHTML(b.ref)}">Cancel request</button>`}</div></article>`).join(''):'<section class="empty-state"><h2>No journeys saved yet</h2><p>Once you save a reservation, you’ll find the details here.</p><a class="button-primary" href="index.html">Find your first ride →</a></section>';
  $$('[data-cancel]').forEach(button=>button.onclick=()=>{const bookings=read();const booking=bookings.find(b=>b.ref===button.dataset.cancel);if(booking)booking.status='Cancelled';try{write(bookings);draw();}catch{button.textContent='Could not save. Try again.';}});
 }draw();
}
const VEHICLE_DESCRIPTIONS={sienna:'A small-group passenger minivan for shared road travel.',hiace:'A high-roof passenger minibus for students travelling together.',bus:'A practical, shared coach option for longer student journeys.',suv:'A compact vehicle option for a small group.'};
function initVehicleDetails(){
 const s=state()||{from:AUSU,to:'Abuja',date:today(),passengers:1,vehicle:'sienna'};const v=vehicleFor(s);setState({...s,vehicle:v.id});
 $('#vehicle-name').textContent=v.name;$('#vehicle-photo').src=RIDE_PHOTOS[VEHICLES.indexOf(v)];$('#vehicle-photo').alt=v.name;$('#vehicle-description').textContent=VEHICLE_DESCRIPTIONS[v.id];$('#vehicle-capacity').textContent=v.seats+' seats';$('#vehicle-available').textContent=availability(v);$('#vehicle-departure').textContent=v.time;$('#v-trip').textContent=routeText(s);$('#v-details').textContent=dateText(s.date)+' · '+s.passengers+' traveller'+(s.passengers>1?'s':'');$('#v-price').textContent=fmt(v.price);
}
function initReturn(){
 $('#return-from').innerHTML+=[...new Set(CITIES)].map(city=>`<option value="${city}">${city}</option>`).join('');$('#return-count').innerHTML=Array.from({length:6},(_,i)=>`<option value="${i+1}">${i+1} traveller${i?'s':''}</option>`).join('');$('#return-date').min=today();$('#return-date').value=today();
 const previous=state();if(previous?.to===AUSU){$('#return-from').value=previous.from;$('#return-count').value=previous.passengers;$('#return-vehicle').value=previous.vehicle||'any';if(previous.date>=today())$('#return-date').value=previous.date;}
 $('#return-search-form').onsubmit=e=>{e.preventDefault();setState({from:$('#return-from').value,to:AUSU,date:$('#return-date').value,passengers:+$('#return-count').value,vehicle:$('#return-vehicle').value,type:'oneway'});location.href='rides.html';};
}

function initFleet(){
 $$('[data-fleet-vehicle]').forEach(link=>link.addEventListener('click',()=>{
  const previous=state()||{from:AUSU,to:'Abuja',date:today(),passengers:1,type:'oneway'};
  setState({...previous,date:previous.date>=today()?previous.date:today(),vehicle:link.dataset.fleetVehicle,seats:[]});
 }));
}
const mobile=$('#mobileNavToggle');if(mobile)mobile.onclick=()=>{const header=mobile.closest('header');const opened=header.classList.toggle('mobile-open');mobile.setAttribute('aria-expanded',String(opened));};
const page=location.pathname.split('/').pop()||'index.html';if(page==='index.html')initHome();if(page==='vehicle-details.html')initVehicleDetails();if(page==='return-to-campus.html')initReturn();if(page==='fleet.html')initFleet();if(page==='rides.html')initRides();if(page==='seats.html')initSeats();if(page==='passenger.html')initPassenger();if(page==='confirm.html')initConfirm();if(page==='success.html')initSuccess();if(page==='bookings.html')initBookings();

// Close the mobile navigation consistently with pointer and keyboard input.
function closeNavigation(){ $('#site-header')?.classList.remove('mobile-open');mobile?.setAttribute('aria-expanded','false'); }
$$('.aleesha-nav-link').forEach(link=>link.addEventListener('click',closeNavigation));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeNavigation();$('.aleesha-modal-backdrop')?.remove();}});
document.addEventListener('click',event=>{if(!event.target.closest('.aleesha-header'))closeNavigation();});
