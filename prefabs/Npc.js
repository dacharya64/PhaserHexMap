// NPC prefab

var nameList;

function Npc(game, name) {
	/* *** MAKE YOUR OWN CAMPAIGN ***
	* Use this section to modify the values below to customize your own campaign
	*/
	occupationList = ["Chef","Blacksmith","Colonist","Adventurer","Sellsword","Trader","Fisherperson","Politician","Guard","Bartender","Innkeeper","Bodyguard","Spy","Soldier","Baker","Courier","Sailor","Hunter", "Farmer","Whaler","Butcher"]

	//NPC stats
	this.name = name;
	this.occupation = occupationList[Math.floor(Math.random()*occupationList.length)];
	this.isAlive = true;
	this.faction = "Neutral";
	this.valence = "Neutral";
}

Npc.prototype = Object.create(Phaser.Sprite.prototype);
Npc.prototype.constructor = Npc;

// override Phaser.Sprite update
Npc.prototype.update = function() {
}
