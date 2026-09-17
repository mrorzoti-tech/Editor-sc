const $=s=>document.querySelector(s);
const fileInput=$("#fileInput"), drop=$("#drop"), canvas=$("#canvas"), status=$("#status");
const objectList=$("#objectList"), infoBox=$("#infoBox");
let loadedFile=null, transform={x:0,y:0,rot:0,sx:1,sy:1};

function fmt(n){return n<1024?`${n} B`:n<1048576?`${(n/1024).toFixed(1)} KB`:`${(n/1048576).toFixed(2)} MB`}
function loadFile(file){
  if(!file)return;
  loadedFile=file;
  drop.classList.add("hidden");
  status.textContent=`Loaded: ${file.name} · ${fmt(file.size)}`;
  infoBox.innerHTML=`<div class="row"><span>Name</span><b>${escapeHtml(file.name)}</b></div>
    <div class="row"><span>Type</span><b>${escapeHtml(file.type||"unknown")}</b></div>
    <div class="row"><span>Size</span><b>${fmt(file.size)}</b></div>
    <div class="row"><span>Modified</span><b>${file.lastModified?new Date(file.lastModified).toLocaleString():"-"}</b></div>`;
  objectList.innerHTML=`<div class="row"><span>File payload</span><button id="inspect">Inspect bytes</button></div>
    <div id="bytes" class="empty" style="margin-top:10px">Binary SC parsing requires the original Supercell parser; this web build shows file metadata and provides the editor UI.</div>`;
  $("#inspect").onclick=inspectBytes;
}
async function inspectBytes(){
  if(!loadedFile)return;
  const buf=await loadedFile.slice(0,256).arrayBuffer();
  const a=new Uint8Array(buf);
  let lines=[];
  for(let i=0;i<a.length;i+=16){
    let hex=[...a.slice(i,i+16)].map(x=>x.toString(16).padStart(2,"0")).join(" ");
    let ascii=[...a.slice(i,i+16)].map(x=>x>=32&&x<127?String.fromCharCode(x):".").join("");
    lines.push(i.toString(16).padStart(4,"0")+"  "+hex.padEnd(47)+"  "+ascii);
  }
  $("#bytes").innerHTML=`<div class="hex">${lines.join("\n")}</div>`;
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
fileInput.onchange=e=>loadFile(e.target.files[0]);
["dragenter","dragover"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add("drag")}));
["dragleave","drop"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove("drag")}));
drop.addEventListener("drop",e=>loadFile(e.dataTransfer.files[0]));
$("#clearBtn").onclick=()=>{loadedFile=null;fileInput.value="";drop.classList.remove("hidden");status.textContent="No file loaded";objectList.innerHTML='<div class="empty">Open a .sc/.sc2 file to inspect it.</div>';infoBox.textContent="No file loaded."};

document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");$("#"+b.dataset.tab).classList.add("active");
});
function sync(){
  transform.x=+$("#x").value||0; transform.y=+$("#y").value||0;
  transform.rot=+$("#rot").value; transform.sx=+$("#sx").value/100; transform.sy=+$("#sy").value/100;
  $("#rotVal").textContent=transform.rot+"°"; $("#sxVal").textContent=transform.sx.toFixed(2)+"×"; $("#syVal").textContent=transform.sy.toFixed(2)+"×";
}
["x","y","rot","sx","sy"].forEach(id=>$("#"+id).addEventListener("input",sync));
$("#reset").onclick=()=>{["x","y"].forEach(id=>$("#"+id).value=0);$("#rot").value=0;$("#sx").value=100;$("#sy").value=100;sync()};
sync();
