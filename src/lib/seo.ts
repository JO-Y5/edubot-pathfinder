export function setSEO(title:string, desc:string){
  document.title = title;
  let m = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  if (!m) { m = document.createElement('meta'); m.setAttribute('name','description'); document.head.appendChild(m); }
  m.setAttribute('content', desc);
}
