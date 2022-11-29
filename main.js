var toggle = 0;
var dragged;
var players = [];

function init(){
	getPlayers();
	createTable();
	createHamburger();
}

function getPlayers(){
	var keys = Object.keys(localStorage);
	for(let i = 0; i < keys.length; i++){
		if(keys[i] != 'debug'){
			players.push(JSON.parse(localStorage.getItem(keys[i])));
		}
	}
	
	for(let i = 0; i < players.length; i++){
		players[i].currentDeaths = 0;
		players[i].currentTK = 0;
	}
}

function createTable(){
	var tableDiv = document.getElementById('tableDiv');
	var table = document.createElement('table');
	table.className = "playerTable"
	table.id = 'playerTable';
	
	var row1 = table.insertRow(0);
	var row2 = table.insertRow(1);
	
	/*
	var player0 = createPlayer(row1, 'collin', 0);
	var player1 = createPlayer(row1, 'brock', 1);
	var player2 = createPlayer(row2, 'lex', 2);
	var player3 = createPlayer(row2, 'grant', 3);
	*/
	
	var player0 = createBlankPlayer(row1, 0);
	var player1 = createBlankPlayer(row1, 1);
	var player2 = createBlankPlayer(row2, 2);
	var player3 = createBlankPlayer(row2, 3);
	
	
	tableDiv.appendChild(table);
}

function updateTable(player = '', card = ''){
	var tableDiv = document.getElementById('tableDiv');
	var prevTable = document.getElementById('playerTable');
	
	
	var player0Name;
	var player1Name;
	var player2Name;
	var player3Name;
	
	let p = document.getElementById('player0');
	if(p.getElementsByClassName('playerName').length > 0){
		player0Name = p.getElementsByClassName('playerName')[0].innerHTML.toLowerCase();
	}else{
		player0Name = '';
	}
	
	p = document.getElementById('player1');
	if(p.getElementsByClassName('playerName').length > 0){
		player1Name = p.getElementsByClassName('playerName')[0].innerHTML.toLowerCase();
	}else{
		player1Name = '';
	}
	
	p = document.getElementById('player2');
	if(p.getElementsByClassName('playerName').length > 0){
		player2Name = p.getElementsByClassName('playerName')[0].innerHTML.toLowerCase();
	}else{
		player2Name = '';
	}
	
	p = document.getElementById('player3');
	if(p.getElementsByClassName('playerName').length > 0){
		player3Name = p.getElementsByClassName('playerName')[0].innerHTML.toLowerCase();
	}else{
		player3Name = '';
	}
	
	switch(card){
		case 'player0':
			player0Name = player.toLowerCase();
			break;
			
		case 'player1':
			player1Name = player.toLowerCase();
			break;
			
		case 'player2':
			player2Name = player.toLowerCase();
			break;
			
		case 'player3':
			player3Name = player.toLowerCase();
			break;
	}
	
	var names = [ player0Name, player1Name, player2Name, player3Name ];
	
	var num = card.substring(card.length-1);
	for(let i = 0; i < names.length; i++){
		if(names[num] == names[i] && num != i){
			console.log('procced');
			switch(i){
				case 0:
					player0Name = '';
					break;
				case 1:
					player1Name = '';
					break;
				case 2:
					player2Name = '';
					break;
				case 3:
					player3Name = '';
					break;
			}
		}
	}
		removeTable();
		
		var table = document.createElement('table');
		table.className = "playerTable"
		table.id = 'playerTable';
		
		var row1 = table.insertRow(0);
		var row2 = table.insertRow(1);
		
		var player0 = createPlayer(row1, player0Name, 0);
		var player1 = createPlayer(row1, player1Name, 1);
		var player2 = createPlayer(row2, player2Name, 2);
		var player3 = createPlayer(row2, player3Name, 3);
		
		tableDiv.appendChild(table);
}

function removeTable(){
	var table = document.getElementById('playerTable');
	table.remove();
}

function createHamburger(){
	var hamburger = document.createElement('p');
	hamburger.innerHTML = '<img src = "icons/hamburger.png" class = "hamburger" onClick = "openPlayers()">';
	hamburger.id = "hamburger";
	
	var hamburgerDiv = document.getElementById('hamburgerDiv');
	hamburgerDiv.appendChild(hamburger);
}

function removeHamburger(){
	var hamburger = document.getElementById('hamburger');
	hamburger.remove();
	
}

function createPlayer(row, name, num){
	
	if(name != ''){
		var index = 0;
		
		for(let i = 0; i < players.length; i++){
			if(players[i].name == name){
				index = i;
			}
		}
		
		var player = row.insertCell(-1);
		player.className = "player";
		player.id = 'player'+num;
		player.addEventListener("dragover", (event) => {
			event.preventDefault();
		});
		player.addEventListener("drop", (event) => {
			event.preventDefault();
			if (event.target.className === "player"){
				updateTable(dragged.getElementsByClassName('hamburgerName')[0].innerHTML, event.target.id);
			}
		});
		
		var playerIcon = document.createElement('img');
		playerIcon.src = players[index].icon;
		playerIcon.className = 'playerIcon';
		playerIcon.setAttribute('draggable', 'false');
		player.appendChild(playerIcon);
		
		var playerName = document.createElement('p');
		playerName.className = 'playerName';
		playerName.innerHTML = players[index].name.toUpperCase();
		player.appendChild(playerName);
		
		var statsTable = document.createElement('table');
		statsTable.className = 'statsTable';
		player.appendChild(statsTable);
		
		var statsRow = statsTable.insertRow(0);
		statsRow.className = 'statsRow';
		
		var deathStats = statsRow.insertCell(-1);
		deathStats.className = 'statsColumn';
		var tkStats = statsRow.insertCell(-1);
		tkStats.className = 'statsColumn';
		
		var deathTitle = document.createElement('p');
		deathTitle.className = 'deathTitle';
		deathTitle.innerHTML = 'DEATHS';
		deathStats.appendChild(deathTitle);
		
		var deathTable = document.createElement('table');
		deathTable.className = "deathTable";
		var deathRow = deathTable.insertRow(0);
		var minus = deathRow.insertCell(-1);
		var count = deathRow.insertCell(-1);
		var plus = deathRow.insertCell(-1);
		deathStats.appendChild(deathTable);
		
		minus.innerHTML = '<img src = "icons/minus.png" class = "minus" onClick = "subDeath(' + "'" + name + "'" + ')">';
		count.innerHTML = '<input type = "number" class = "count" value = "' + players[index].currentDeaths + '">';
		plus.innerHTML = '<img src = "icons/plus.png" class = "plus" onClick = "addDeath(' + "'" + name + "'" + ')">';
		
		var totalDeaths = document.createElement('p');
		totalDeaths.className = 'totalDeaths';
		totalDeaths.innerHTML = 'TOTAL: ' + players[index].totalDeaths;
		deathStats.appendChild(totalDeaths);
		
		var tkTitle = document.createElement('p');
		tkTitle.className = 'deathTitle';
		tkTitle.innerHTML = 'TEAM KILLS';
		tkStats.appendChild(tkTitle);
		
		var tkTable = document.createElement('table');
		tkTable.className = "deathTable";
		var tkRow = tkTable.insertRow(0);
		var minus2 = tkRow.insertCell(-1);
		var count2 = tkRow.insertCell(-1);
		var plus2 = tkRow.insertCell(-1);
		tkStats.appendChild(tkTable);
		
		minus2.innerHTML = '<img src = "icons/minus.png" class = "minus" onClick = "subTK(' + "'" + name + "'" + ')">';
		count2.innerHTML = '<input type = "number" class = "count" value = "' + players[index].currentTK + '">';
		plus2.innerHTML = '<img src = "icons/plus.png" class = "plus" onClick = "addTK(' + "'" + name + "'" + ')">';
		
		var totalTK = document.createElement('p');
		totalTK.className = 'totalDeaths';
		totalTK.innerHTML = 'TOTAL: ' + players[index].totalTK;
		tkStats.appendChild(totalTK);
		
		return player;
	}else{
		return createBlankPlayer(row, num);
	}
}

function createBlankPlayer(row, num){
	var player = row.insertCell(-1);
	player.className = "player";
	player.id = "player"+num;
	player.addEventListener("dragover", (event) => {
		event.preventDefault();
	});
	
	player.addEventListener("drop", (event) => {
		event.preventDefault();
		if (event.target.className === "player"){
			updateTable(dragged.getElementsByClassName('hamburgerName')[0].innerHTML, event.target.id);
		}
	});
	
	return player;
}

function subDeath(name){
	var index = 0;
	
	for(let i = 0; i < players.length; i++){
		if(players[i].name == name){
			index = i;
		}
	}
	
	players[index].currentDeaths = players[index].currentDeaths - 1;
	players[index].totalDeaths = players[index].totalDeaths - 1;
	
	updateTable();
	
	savePlayers()
}

function addDeath(name){
	var index = 0;
	
	for(let i = 0; i < players.length; i++){
		if(players[i].name == name){
			index = i;
		}
	}
	
	players[index].currentDeaths = players[index].currentDeaths + 1;
	players[index].totalDeaths = players[index].totalDeaths + 1;
	
	updateTable();
	
	savePlayers();
}

function subTK(name){
	var index = 0;
	
	for(let i = 0; i < players.length; i++){
		if(players[i].name == name){
			index = i;
		}
	}
	
	players[index].currentTK = players[index].currentTK - 1;
	players[index].totalTK = players[index].totalTK - 1;
	
	updateTable();
	
	savePlayers()
}

function addTK(name){
	var index = 0;
	
	for(let i = 0; i < players.length; i++){
		if(players[i].name == name){
			index = i;
		}
	}
	
	players[index].currentTK = players[index].currentTK + 1;
	players[index].totalTK = players[index].totalTK + 1;
	
	updateTable();
	
	savePlayers()
}

function openPlayers(){
	if( toggle == 0){
		var hamburgerTable = document.createElement('table');
		hamburgerTable.className = 'hamburgerTable';
		hamburgerTable.id = 'hamburgerTable';
		var hamburgerDiv = document.getElementById('hamburgerDiv');
		
		for( let i = 0; i < players.length; i++){
			var player = hamburgerTable.insertRow(i);
			var playerCard = player.insertCell(-1);
			playerCard.className = 'hamburgerCard';
			playerCard.draggable = 'true';
			playerCard.addEventListener("dragstart", (event) => {
			  dragged = event.target;
			});
			
			var playerTable = document.createElement('table');
			var playerRow = playerTable.insertRow(0);
			var icon = playerRow.insertCell(-1);
			var name = playerRow.insertCell(-1);
			
			icon.innerHTML = '<img src = "' + players[i].icon +'" class = "hamburgerIcon" draggable = "false">' 
			name.innerHTML = '<p class =  "hamburgerName">' + players[i].name.toUpperCase() + '</p>';
			
			playerCard.appendChild(playerTable);
		}
		
		hamburgerDiv.appendChild(hamburgerTable);
		
		toggle = 1;
	}else{
		removeHamburgerTable()
		toggle = 0;
	}
	
}

function removeHamburgerTable(){
	var table = document.getElementById('hamburgerTable');
	table.remove();
}

function savePlayers(){
	for(let i = 0; i < players.length; i++){
		localStorage.setItem(players[i].name, JSON.stringify(players[i]))
	}
}