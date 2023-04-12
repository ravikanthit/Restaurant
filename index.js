const tableItems = document.querySelectorAll('.table-item'); 

let tableData = [];
tableItems.forEach(item => {
	const text = item.textContent;
	const matches = text.match(/Rs : (\d+) \| Total Items : (\d+)/);
	const price = parseInt(matches[1]);
	const totalItems = parseInt(matches[2]);
	const tableId = item.dataset.tableId;

	tableData.push({tableId, price, totalItems});
  });

  let listItemPrices = [];
  const listItems = document.querySelectorAll('#item-list li');

  listItems.forEach((item) => {
	const price = parseInt(item.getAttribute('data-value'));
	listItemPrices.push(price);
  });



  const modal = document.querySelector('.modal'); 
  const closeModalBtn = document.querySelector('.close-modal');
  const inputElems = document.querySelectorAll('input[type="number"]'); 
  const totalCostElem = document.querySelector('tfoot td:last-child'); 
  let currentTableId = null;
  
  inputElems.forEach(inputElem => {
	inputElem.addEventListener('input', () => {
	  const totalItems = handleInput();
	  updateTableItem(totalItems);
	});
  });
  
  function handleInput() {
	let sum = 0;
	let totalItems = 0;
	inputElems.forEach(inputElem => {
	  const price = parseFloat(inputElem.parentNode.previousElementSibling.textContent);
	  const servings = parseInt(inputElem.value);
	  sum += price * servings;
	  totalItems += servings;
	});
	totalCostElem.textContent = sum;
	return totalItems;
  }
  
  closeModalBtn.addEventListener('click', handleCloseModal);
  
  function handleCloseModal() {
	modal.style.display = 'none';
	if (currentTableId) {
	  const tableItem = document.querySelector(`li[data-table-id="${currentTableId}"]`);
	  const totalItems = handleInput();
	  tableItem.innerHTML = `Table ${currentTableId} <br> Rs : ${totalCostElem.textContent}| Total Items : ${totalItems}`;
	 console.log (`Table ${currentTableId} <br> Rs : ${totalCostElem.textContent}| Total Items : ${totalItems}`);
	  tableData[currentTableId-1]["totalItems"]=totalItems;
	  tableData[currentTableId-1]["price"]= parseInt(totalCostElem.textContent);

	}
	currentTableId = null;
  }
  
  tableItems.forEach(tableItem => {
	tableItem.addEventListener('click', () => {
	  const tableId = tableItem.dataset.tableId;
	  currentTableId = tableId;
  
	  modal.style.display = 'flex';
  
	  const tableOrdersDiv = document.querySelector('.table-orders');
	  tableOrdersDiv.innerHTML = `Table -  ${tableId} Order Details`;

	  if (currentTableId !== tableId) {
		inputElems.forEach(inputElem => {
		  inputElem.value = 0;
		});
		totalCostElem.textContent = 0;
	  }
	});
  });
  
  function updateTotalCost(rowNum, numServings) {
	var price = document.getElementsByTagName("table")[0].rows[rowNum].cells[2].innerHTML;
	var newCost = price * numServings;
	var totalCostCell = document.getElementById("total-cost");
	var currentTotalCost = parseInt(totalCostCell.innerHTML);
	var newTotalCost = currentTotalCost + newCost - (price * (document.getElementsByTagName("table")[0].rows[rowNum].cells[3].firstChild.value));
	totalCostCell.innerHTML = newTotalCost;
	document.getElementsByTagName("table")[0].rows[rowNum].cells[3].firstChild.value = numServings;
  }




  function filterMenuItems(menuSelector, filterSelector) {
	const menuList = document.querySelector(menuSelector);
	const filterSelect = document.querySelector(filterSelector);
  
	filterSelect.addEventListener('change', () => {
	  const filterOption = filterSelect.value;
	  
	  if (filterOption === 'vegetarian') {
		menuList.querySelectorAll('.vegetarian').forEach((item) => {
		  item.style.display = 'block';
		});
		menuList.querySelectorAll('.non-vegetarian').forEach((item) => {
		  item.style.display = 'none';
		});
	  } else if (filterOption === 'non-vegetarian') {
		menuList.querySelectorAll('.vegetarian').forEach((item) => {
		  item.style.display = 'none';
		});
		menuList.querySelectorAll('.non-vegetarian').forEach((item) => {
		  item.style.display = 'block';
		});
	  } else if (filterOption === 'all') {
		menuList.querySelectorAll('li').forEach((item) => {
		  item.style.display = 'block';
		});
	  }
	});

	function setupSearch(searchInput, searchButton, itemList) {
		const listItems = itemList.querySelectorAll("li");
		searchButton.addEventListener("click", handleSearch);
	  
		searchInput.addEventListener("keyup", handleSearch);
	  
		function handleSearch() {
		  const searchTerm = searchInput.value.toLowerCase();
		  listItems.forEach(function(item) {
			if (item.innerText.toLowerCase().includes(searchTerm)) {
			  item.classList.remove("hide");
			} else {
			  item.classList.add("hide");
			}
		  });
		}
	  }
	  
	  const searchInput = document.getElementById("search-input");
	  const searchButton = document.getElementById("search-button");
	  const itemList = document.getElementById("item-list");
	  setupSearch(searchInput, searchButton, itemList);
	  
	  const searchInput1 = document.getElementById("search-input1");
	  const searchButton1 = document.getElementById("search-button1");
	  const itemList1 = document.getElementById("item-list1");
	  setupSearch(searchInput1, searchButton1, itemList1);
	
	

  }

  filterMenuItems('#item-list', '#filter-select');

  update(inputElems,totalCostElem)
  function update(inputElems,totalCostElem){
  inputElems.forEach(inputElem => {
	inputElem.addEventListener('input', () => {
	  let sum = 0;
	  inputElems.forEach(inputElem => {
		const price = parseFloat(inputElem.parentNode.previousElementSibling.textContent);
		const servings = parseInt(inputElem.value);
		sum += price * servings;
	  });
	 
	  totalCostElem.textContent = sum;
	});
  });
}



  function filterMenuItems(menuSelector, filterSelector) {
	const menuList = document.querySelector(menuSelector);
	const filterSelect = document.querySelector(filterSelector);
  
	filterSelect.addEventListener('change', () => {
	  const filterOption = filterSelect.value;
	  
	  if (filterOption === 'vegetarian') {
		menuList.querySelectorAll('.vegetarian').forEach((item) => {
		  item.style.display = 'block';
		});
		menuList.querySelectorAll('.non-vegetarian').forEach((item) => {
		  item.style.display = 'none';
		});
	  } else if (filterOption === 'non-vegetarian') {
		menuList.querySelectorAll('.vegetarian').forEach((item) => {
		  item.style.display = 'none';
		});
		menuList.querySelectorAll('.non-vegetarian').forEach((item) => {
		  item.style.display = 'block';
		});
	  } else if (filterOption === 'all') {
		menuList.querySelectorAll('li').forEach((item) => {
		  item.style.display = 'block';
		});
	  }
	});

	function setupSearch(searchInput, searchButton, itemList) {
		const listItems = itemList.querySelectorAll("li");
		searchButton.addEventListener("click", handleSearch);
	  
		searchInput.addEventListener("keyup", handleSearch);
	  
		function handleSearch() {
		  const searchTerm = searchInput.value.toLowerCase();
		  listItems.forEach(function(item) {
			if (item.innerText.toLowerCase().includes(searchTerm)) {
			  item.classList.remove("hide");
			} else {
			  item.classList.add("hide");
			}
		  });
		}
	  }
	  
	  const searchInput = document.getElementById("search-input");
	  const searchButton = document.getElementById("search-button");
	  const itemList = document.getElementById("item-list");
	  setupSearch(searchInput, searchButton, itemList);
	  
	  const searchInput1 = document.getElementById("search-input1");
	  const searchButton1 = document.getElementById("search-button1");
	  const itemList1 = document.getElementById("item-list1");
	  setupSearch(searchInput1, searchButton1, itemList1);
	
	

  }

  filterMenuItems('#item-list', '#filter-select');







const menuItems = document.querySelectorAll('.list li');

const tables = document.querySelectorAll('.table-item');

menuItems.forEach((item) => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

tables.forEach((table) => {
  table.addEventListener('dragover', dragOver);
  table.addEventListener('dragenter', dragEnter);
  table.addEventListener('dragleave', dragLeave);
  table.addEventListener('drop', drop);
});

let draggedItem = null;

function dragStart() {
  draggedItem = this;
  setTimeout(() => {
    this.style.display = 'none';
  }, 0);
}

function dragEnd() {
  draggedItem = null;
  setTimeout(() => {
    this.style.display = 'block';
  }, 0);
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {
}
function drop() {
	const menuItemId = draggedItem.getAttribute('id');
	const table_Id = this.getAttribute('id');

    console.log("hii ",menuItemId);
	const tableDataItem = tableData[table_Id-1];
	if (tableDataItem) {
	  console.log(tableDataItem.price);
	}
    const totalItems=tableData[table_Id-1]["totalItems"];

  
    var x= tableDataItem.price + listItemPrices[menuItemId-11];
	console.log("Value of x ",x);
   const tableItem=document.getElementById(`${table_Id}`)
	tableItem.innerHTML = `Table ${table_Id} <br> Rs : ${x}| Total Items : ${totalItems+1}`;
	tableData[table_Id-1]["totalItems"]=totalItems+1;
	tableData[table_Id-1]["price"]=x;

	console.log(`This is Dropped ${listItemPrices[table_Id]}`);
  
	console.log(`Dragged element ID: ${menuItemId}`);
	console.log(`Dropped element ID: ${table_Id}`);
  }
