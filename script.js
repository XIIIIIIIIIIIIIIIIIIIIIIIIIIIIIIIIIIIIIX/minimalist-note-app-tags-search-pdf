const LS = localStorage;
let notes = JSON.parse(LS.getItem('notes')||'[]');
function render(){
  const q=document.getElementById('search').value.toLowerCase();
  const list=document.getElementById('notesList');
  list.innerHTML='';
  notes
   .filter(n=>q===''||n.title.toLowerCase().includes(q)||n.body.toLowerCase().includes(q)||n.tags.some(t=>t.toLowerCase().includes(q)))
   .forEach((n,i)=>{
     const div=document.createElement('div');
     div.className='note';
     const h=document.createElement('h3');h.textContent=n.title;
     const p=document.createElement('p');p.textContent=n.body;
     const ts=document.createElement('div');
     n.tags.forEach(t=>{
       const s=document.createElement('span');s.className='noteTag';s.textContent=t;
       ts.appendChild(s);
     });
     const del=document.createElement('button');del.className='delBtn';del.innerHTML='×';
     del.onclick=()=>{notes.splice(i,1);save();};
     div.append(h,p,ts,del);
     list.appendChild(div);
   });
}
function addNote(){
  const t=document.getElementById('noteTitle').value.trim();
  const b=document.getElementById('noteBody').value.trim();
  const tags=document.getElementById('tagsInput').value.split(',').map(x=>x.trim()).filter(x=>x);
  if(!t||!b)return;
  notes.unshift({title:t,body:b,tags,timestamp:Date.now()});
  save();
  document.getElementById('noteTitle').value='';
  document.getElementById('noteBody').value='';
  document.getElementById('tagsInput').value='';
}
function save(){
  LS.setItem('notes',JSON.stringify(notes));
  render();
}
function exportPDF(){
  window.print();
}
render();
document.getElementById('search').addEventListener('input',render);