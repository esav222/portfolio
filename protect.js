(function(){
  var KEY='es_site_auth';
  var PASSWORD='Placement2026';

  if(localStorage.getItem(KEY)==='1'){
    document.documentElement.style.visibility='visible';
    return;
  }

  var gate=document.createElement('div');
  gate.id='pw-gate';
  gate.style.cssText='position:fixed;inset:0;z-index:9999;background:#0c0c0c;color:#f0ede8;display:flex;align-items:center;justify-content:center;font-family:"DM Sans",sans-serif;padding:1.5rem;';
  gate.innerHTML =
    '<form id="pw-form" style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:280px">'+
      '<span style="font-family:\'DM Mono\',monospace;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:#999">This site is password protected</span>'+
      '<input id="pw-input" type="password" autocomplete="off" placeholder="Password" style="background:#1c1c1c;border:1px solid #242424;color:#f0ede8;padding:.85rem 1rem;font-size:1rem;font-family:inherit;outline:none">'+
      '<button type="submit" style="background:#f0ede8;color:#0c0c0c;border:none;padding:.85rem 1rem;font-weight:700;font-family:inherit;cursor:pointer;letter-spacing:.02em">Enter</button>'+
      '<span id="pw-err" style="display:none;font-family:\'DM Mono\',monospace;font-size:.7rem;letter-spacing:.05em;color:#e06060">Incorrect password</span>'+
    '</form>';

  document.body.appendChild(gate);
  document.documentElement.style.visibility='visible';

  var input=document.getElementById('pw-input');
  input.focus();

  document.getElementById('pw-form').addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value===PASSWORD){
      localStorage.setItem(KEY,'1');
      gate.remove();
    } else {
      document.getElementById('pw-err').style.display='block';
      input.value='';
      input.focus();
    }
  });
})();
