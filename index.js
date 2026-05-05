const STORAGE_KEY = 'aura_subscribers_v1';

function readCount(){
	const raw = localStorage.getItem(STORAGE_KEY);
	if(!raw) return 0; 
	const n = parseInt(raw,10);
	return Number.isNaN(n) ? 0 : n;
}

function saveCount(n){
	localStorage.setItem(STORAGE_KEY, String(n));
}

function formatNumber(n){
	return n.toLocaleString();
}

function bump(elem){
	elem.classList.add('bump');
	setTimeout(()=>elem.classList.remove('bump'),180);
}

document.addEventListener('DOMContentLoaded',()=>{
	const countEl = document.getElementById('subscriberCount');
	const lastUpdated = document.getElementById('lastUpdated');
	const subBtn = document.getElementById('subscribeBtn');
	const unsubBtn = document.getElementById('unsubscribeBtn');
	const resetBtn = document.getElementById('resetBtn');

	let count = readCount();

	function render(){
		countEl.textContent = formatNumber(count);
		lastUpdated.textContent = `Saved — ${new Date().toLocaleString()}`;
	}

	render();

	subBtn.addEventListener('click',()=>{
		count = count + 1;
		saveCount(count);
		render();
		bump(countEl);
	});

	unsubBtn.addEventListener('click',()=>{
		if(count>0) count = count - 1;
		saveCount(count);
		render();
		bump(countEl);
	});

	resetBtn.addEventListener('click',()=>{
		if(!confirm('Reset subscriber count to default?')) return;
		count = 0;
		saveCount(count);
		render();
		bump(countEl);
	});
});