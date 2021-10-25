const input = document.querySelector('.list-tag .input-tag');
const suggestion = document.querySelector('.suggestion');
const listTagWrapper = document.querySelector('.list-tag');
const lengthTag = document.querySelector('.bottom .num');
let listTag = [];



listCountries.forEach(item=> {
	const li = document.createElement('li');
	const liText = document.createTextNode(item.name.toLowerCase());
	li.appendChild(liText);
	suggestion.appendChild(li);
});


if(input.value !== '') {
	const countriesFilter = listCountries.filter(item=> {
		return item.name.toLowerCase().includes(input.value.toLowerCase());
	})

	suggestion.querySelectorAll('li').forEach(item=> item.remove());
	countriesFilter.forEach(item=> {
		const li = document.createElement('li');
		const liText = document.createTextNode(item.name.toLowerCase());
		li.appendChild(liText);
		suggestion.appendChild(li);
	});

	if(countriesFilter.length === 0) {
		const li = document.createElement('li');
		li.className = 'not-found';
		const liText = document.createTextNode('Not found');
		li.appendChild(liText);
		suggestion.appendChild(li);
	}
}


input.addEventListener('input', function () {
	const countriesFilter = listCountries.filter(item=> {
		return item.name.toLowerCase().includes(this.value.toLowerCase());
	})

	suggestion.querySelectorAll('li').forEach(item=> item.remove());
	countriesFilter.forEach(item=> {
		const li = document.createElement('li');
		const liText = document.createTextNode(item.name.toLowerCase());
		li.appendChild(liText);
		suggestion.appendChild(li);
	});

	if(countriesFilter.length === 0) {
		const li = document.createElement('li');
		li.className = 'not-found';
		const liText = document.createTextNode('Not found');
		li.appendChild(liText);
		suggestion.appendChild(li);
	}

	if(this.value.includes(',')) {
		const text = this.value.replace(/ +/g, ' ').split(',');
		text.forEach(str=> {
			const string = str.trim();
			if(!listTag.includes(string) && string !== '' && string !== ' ') {
				listTag.push(string);
				const li = document.createElement('li');
				const liText = document.createTextNode(string);
				const iconX = document.createElement('i');
				iconX.className = 'bx bx-x';
				li.appendChild(liText);
				li.appendChild(iconX);
				listTagWrapper.insertBefore(li, input);
				lengthTag.textContent = listTag.length;
				this.focus();
			}
		})
		this.value = '';
	}

	const allSuggestion = suggestion.querySelectorAll('li');
	allSuggestion.forEach(item=> {
		item.addEventListener('click', function () {
			if(!listTag.includes(this.textContent)) {
				listTag.push(this.textContent);
				const li = document.createElement('li');
				const liText = document.createTextNode(this.textContent);
				const iconX = document.createElement('i');
				iconX.className = 'bx bx-x';
				li.appendChild(liText);
				li.appendChild(iconX);
				listTagWrapper.insertBefore(li, input);
				lengthTag.textContent = listTag.length;
				input.focus();
			}
			input.value = '';

			const allRmBtn = document.querySelectorAll('.list-tag > li .bx');
			allRmBtn.forEach(item=> {
				item.addEventListener('click', function () {
					listTag = listTag.filter(i=> {
						return i !== this.parentElement.textContent;
					})
					this.parentElement.remove();
					lengthTag.textContent = listTag.length;
					input.focus();
				})
			})
		})
	})

	const allRmBtn = document.querySelectorAll('.list-tag > li .bx');
	allRmBtn.forEach(item=> {
		item.addEventListener('click', function () {
			listTag = listTag.filter(i=> {
				return i !== this.parentElement.textContent;
			})
			this.parentElement.remove();
			lengthTag.textContent = listTag.length;
			input.focus();
		})
	})
})


input.addEventListener('keydown', function (e) {
	if(e.key === 'Backspace') {
		if(listTag.length >= 1) {
			if(this.value === '') {
				const li = document.querySelectorAll('.list-tag > li');
				input.value = li[li.length - 1].textContent + " ";
				li[li.length - 1].remove();
				listTag.pop();
				lengthTag.textContent = listTag.length;
			}
		}
	}
})

function removeAll() {
	document.querySelectorAll('.list-tag > li').forEach(item=> item.remove());
	listTag = [];
	lengthTag.textContent = listTag.length;
	input.value = '';
	input.focus();
}