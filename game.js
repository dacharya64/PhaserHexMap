// Manages the main game state

var game = new Phaser.Game(1200, 800, Phaser.AUTO);
var hexagonWidth = 80;
var hexagonHeight = 70;
var gridSizeX = 10;
var gridSizeY = 12;
var columns = [Math.ceil(gridSizeY/2),Math.floor(gridSizeY/2)];
var moveIndex;
var sectorWidth = hexagonWidth/4*3;
var sectorHeight = hexagonHeight;
var gradient = (hexagonWidth/4)/(hexagonHeight/2);
var marker;
var hexagonGroup;
var hexagonArray = [];
var hex;
var terrainArray = [];

var Play = function(game) {
};

Play.prototype = {
	preload: function() {
		game.load.image("hexagon", "hexagon.png");
		game.load.image("hexagon_selected", "hexagon-selected.png");
		game.load.image("hexagon_generated", "hexagon-filled.png");
		game.load.image("hexagon_desert", "hexagon-desert.png");
		game.load.image("hexagon_forest", "hexagon-forest.png");
		game.load.image("hexagon_hills", "hexagon-hills.png");
		game.load.image("hexagon_mountains", "hexagon-mountain.png");
		game.load.image("hexagon_water", "hexagon-ocean.png");
		game.load.image("hexagon_fields", "hexagon-plains.png");
		game.load.image("hexagon_swamp", "hexagon-swamp.png");
		game.load.image("hexagon_town", "hexagon-town.png");
		game.load.image("marker", "marker.png");
		game.load.image("button", "button_generate.png");
	},
	create: function() {
		// Define tile text
		tileText = game.add.text(40, 100, "");
		tileText.font = "arial";
		tileText.fontSize = 24;
		tileText.style.wordWrap = true;
		tileText.style.wordWrapWidth = 250;

		// Define types of tiles
		terrainArray = ["Water", "Swamp", "Desert", "Fields", "Forest", "Hills", "Mountains", "Town"];

		questArray = ["1 A farmer approaches the party and needs help. One of his chickens turns a strange neon green when placed in moonlight, and he needs help figuring out why.","2 Your party finds a list of 10 names including someone they are close to. The first 4 names are crossed out.","3 A courier catches up to the party. They have been left a run down mansion in the will of someone they have never met. The only condition? It be lived in for 5 days. It is of course... Haunted!","4 A well known constellation disappears from sight. The village is divided between people who remember it, and those who don t. The debates begin to spark an escalating series of feuds and fights.","5 A large river begins inexplicably stops for 1 hour before sunset.","6 You enter a clearing where 2 duelists lash out at one another. The clearing is in a time loop, repeating the duel over and over again.","7 Rumor reaches your ears of a traveling merchant peddling sets of cursed sewing needles.","8 Old Jeb the farmer claims his sheepdog had puppies, but they all have split tails and he doesn t know their sire.","9 The sawmill catches fire. The bucket brigade keeps it contained, but it refuses to extinguish after 2 days.","10 For exactly 1 round a day, everyone in town falls sway under the HOLD PERSON spell. Life continues, but everyone is on edge.  Protection  totems begin surfacing in every market shop.","11 Strange, mud-coated animate skeletons have risen in a nearby swamp. They won t attack unless attacked first and try to speak with anyone nearby, but the coating of mud makes their speech indecipherable.","12 Snowberry bushes only bloom before a blizzard. Collect five snowberry blooms for an alchemist before the storm hits.","13 A suit of enchanted armor with dozens of arms has been razing nearby villages. Watch out, each arm holds a hand crossbow, and each one can attack every turn.","14 A goblin comes running towards you and yells  he s coming!  and dies.","15 A small pack of wererats have taken up residence in the city sewers, and keep causing trouble for the locals.","16 A farmer says he s heard strange singing in the night in his corn field, but whenever he goes out to look, he doesn t find anyone. If that wasn t strange enough, one morning he found his scarecrows had been moved into a circle.","17 The party is told of a local merchant who specializes in Magical items. The merchant s name is Foezek and is described as an intelligent, compassionate Shedu. But, when the PCs seek out the shop, they find another being claiming to be Foezek and is more interested in them leaving the shop than dealing with them. In truth, this bandit killed Foezek and is dealing his magical items to an adversary of the DM s choosing. Foezek s body can be found in the shop (basement, or behind the counter, etc.).","18 The party is walking through a town when they meet an blind old man who is crawling on the ground looking for his ring. A guard watched him drop it and took it for himself.","19 The party finds a dagger on the body of an enemy that is much heavier than a dagger should be.","20 The party wakes up mixed up in each other s bodies after night of drinking at an inn.","21 A small chest from the spell Leomund s Secret Chest falls from the sky. When the party finds a wizard to open the chest is filled with their own equipment, along with a note book keeping track of their actions.","22 The party continues to wake up in the same inn, but different rooms each morning.","23 One of the party members is suddenly extremely allergic to cats, the rest of the party members clothes are suddenly made of cat fur. The change in clothing isn t immediately noticable.","24 The party is summoned by a king to be his friends for a day.","25 There is a bounty out on the dish breaking bandit.","26 One of the party members suddenly starts to sleepwalk, and breaks dishes in his sleep.","27 An angry gnome tinkers with the sleeping party s equipment. Everything now has combination locks.","28 Weird noises have been heard at night coming from an older resident s home in town. When investigated, you discover a worried old man attempting to disguise his worry at your interest in the noise and his business. If convinced that your aid is genuine, or if more discreet measures of observations are taken, you discover his wife is afflicted with lycanthropy despite having no bite marks.","29 The local towns people are complaining about a goblin tribe that has set up camp near by. They are acting strange and have begun constructing statues of a goblin with a pointy hat all over the area.","30 As the party is walking through a road they come across a beggar. He is crippled and asks for some money to help him buy food. As the party continues to walk down the road they find another beggar who looks exactly like the one they just met! When asked he says that he doesn t have a twin brother or anything of the sort. He doesn t know what the party is taking about and just wants some coin to buy food. As the party continues to walk they find the same man yet again. He to knows nothing. Upon further investigation they discoverer that the man was once an assistant to a local wizard. And the wizard is an expert in human cloning.","31 The daughter of a local politician/Noble person keeps getting kidnapped by local goblins. The party is hired to solve it once and for all.","32 A horse with no rider, but fully equipped is walking in the opposite direction of the party. There is a note pinned to it s saddlebags,  send help!","33 The party takes a shortcut through a friendly looking forest not shown on their map. It seems oddly silent, and soon notice all the wildlife is deep asleep - including insects and even flowers. As their eyes get heavier and heavier a wild man bursts out of the bushes, eyes propped open.","34 Traveling through the forest the party is stopped by the sound of a booming voice nearby  Your Wish has been granted! . Shortly after they come apon a clearing filled red mist and a goblin holding a brass lamp laughing maniacally. The party now has to deal with what stuipd thing he has wished for.","35 You are confronted by a party of identical adventurers, who seem more surprised than you. They have been tracking you down for a long time, following rumours of a party of adventurers giving them a bad name. Worst of all they seem to have been adventuring longer than you...","36 Construction of a new museum has been halted when its found that all the workers continue to forget what they re building, could the new exhibit be to blame?","37 You ve gotten word about a logging village up north that has put up a massive reward for any adventurers willing to travel to the village, investigate the rash of disappearances and locate any of the missing persons: dead or alive.","38 A cranky old man in town complains that his pocket watchers stolen, and he has his suspicions on who the thief is. The townsfolk say that he s a senile old man who probably lost it.","39 As your party steps through town, you suddenly start to feel the ground shake as a group of Monsterous Centipede s erupt from the dirt, attacking the party. As they are defeated, it becomes apparent that they were summoned creatures.","40 One of the party s magical or valued items has been stolen and is now held in a high security bank in a bustling city. The party must now break into the bank to retrieve their items.","41 A farmer asks for help. His crops are constantly getting trashed. He wants the group/player to keep watch over the night. It ends up being that the poor farmers  trusty scarecrow has been brought to life by dark magic. It is optional to buy or make a new scarecrow.","42 A PC gets bit by a werewolf. There is a cure for it, however they must convince the mad wizard to give it to you.","43 A passing man swears to you that he is a genie who will most definitely grant you three wishes if you return his stolen lamp to him.","44 Every town or settlement the party goes to has an outline of a fish stenciled on a main building. The first one is really big and noticeable; the rest are subtle enough that the party won t see them unless they announce that they re examining the place. The town where the quest will happen has the WORD  fish  stenciled on a building.","45 You come across a trail of blood (unicorn) leading to a spooky forest.","46 The party is followed by an owl, hooting softly, eyes glowing the gentle yellow that might be magic or might be simple reflection. Over the next several days more owls join, until when the group sets down to sleep at night all they can see are hundreds of owl eyes staring down at them. Then, one of the owls scratches a message into the dirt, before flying off into the night- FOLLOW.","47 An unknown NPC mage has dimension doored into the middle of a fight, after all healing spells have been used by the team. He/She is on death s door and carrying a note with his/hers killers name. He says a few words before dying.","48 Graffiti is scrawled on the walls of two buildings in town. It appears to be some sort of code. The messages are marked  1  and  3 . Message  2  is nowhere to be found.","49 A scrap of paper floats on the wind. It glides on the breeze. Eventually in a gust the paper catches on one of the adventures faces. Tearing it off their face, and looking at the parchment they see it is...","50 Gold! Adventure! Fame! Cries an elf on a soap box,  the faint of heart need not apply!  (For adventures who need more than obvious plot hooks.)","51 Looking off to the distance, they can see a flashing light (similar to a signal mirror). Someone is trying to signal far off. Whether it is aide, is indiscernible to the group as the light stops almost as soon as it starts. There is only one way to find out...","52 While passing by a pond, you hear a deep bellowing noise, only to see a fisherman trapped by a giant frog. He calls for help.","53 A paladin with the insignia of a lion s head on her shield asks you to solve the local pest problem. Turns out the  pests  are full sized orcs.","54 A house outside of town is being circled by hundreds of birds. Upon approaching, the party sees that their beaks are lined with teeth, and the birds are twitching as though trying to escape possession. From the sounds inside, someone is clambering to hide within the building.","55 Kobolds have been attacking the town. All wearing similar regalia and a matching symbol. a raving man claims to have escaped from the kobolds  lair. He describes a terrible dragon as the source of worship for the kobolds. The dragon is really a pseudodragon with delusions of grandeur, trained in illusion magic and has duped the kobolds into gathering a hoard for him.","56 In a large city, urchins are a regular problem. This trio of kidlets, however, has been luring travelers in to abandoned alleyways, where the deranged doppelganger among them eats the human and the other two children keep what was it his/her pockets.","57 A dryad clad in wooden armor leans against a tree his side torn wide open. He hands the party a pouch full of tiny leaves. Taking a pinch and blowing them into the air will lead the party to an ancient temple entrance almost over grown with vines. When close the pouch of leaves crumbles to dust along with the vines covering then entrance of the temple.","58 You find a small silver coin in the middle of a street and upon picking it up, in your mind you see a small hut deep in the forest. When you come back to reality, only you can see it but a small fae pixie glowing bright blue will show you the way.","59 The party encounters a man running out from the wood-line, coming towards then. He appears to be in shock over what he has seen, and tells the party that he was attacked while hunting. The man directs the party to the spot were he encounter the creature.","60 A local temple has reported strange events in the surrounding area: beasts attacking villagers, bandit lords more closer to the village, and mysterious lights and sounds that can only be observed from within the village.","61 A bounty hunter asks the party if they known any of the names on a list of his. The list contains about 20 names, roll a d20 for the characters knowing any of the names, 1-10 unknown and 11-20 known. The names on the list can be from characters backstory or names of NPCs the party has met throughout the campaign. The bounty hunter will known what each person on the list as done, and how much the reward is for the capture.","62 A seemingly exorbitant amount of gold is offered on the message board to get rid of a  house spider . It turns out that it s about a spider-like mimic in the shape of a house.","63 The moon stops traveling across the sky, and everyone s time pieces stop working. Word around the continent is a group of warlocks are attempting to gain power from a new patron - the god of Time","64 More than three people in a given town have all their teeth fall out at the same time","65 A nearby civil war is raging, and one of the high ranking officers of one side or the other holes up in a cave. If approached, they will act incredibly defensive. A child is crying somewhere deeper in the cave, and this person refuses to answer any questions about said child.","66 An allegedly crooked officer of the law is found dead in an alley way and only one person in the whole town seems to care about it at all.","67 The party is on a faire where a magician is performing tricks with a severed head that can talk. Throughout the show the head blinks in weird patterns. The party talks to the head to find out he is kidnapped and begs for help in finding his body back.","68 The party comes across an Inn in the middle of nowhere and they decide to stay. They wake up on the ground where the inn used to be and there s no sign of any building ever being there.","69 Walking through town, the party suddenly gets surrounded by the city guard. A respected captain was murdered. Witnesses say they saw someone looking similar to one of the party members. Upon looking through their things, said member appears to have lost an item easily traced back to him (one half of a pair of gloves/earrings/daggers, family insignia, one of a kind necklace etc.). Sure enough, said item was found at the scene of the crime. Someone is framing them. Not necessarily a doppelganger.","70 The party stumbles across a dead old man. Amongst his meagre belongings is a thick tome with extensive records about everything they ve done right up till today, with even more detail than they themselves knew.","71 The party finds various dead animals with missing pieces, almost torn and shred. As they approach the heart of the forest the number of dead creatures increases. Upon investigation they find out it s the guardian spirit of the forest who has been corrupted and it s confused.","72 A flyer appears in the sacks of each party member. A mid level demon has opened a store and invites all those with ambitions to visit to make deals.","73 A rumor reaches the party s ears of a group of brigands hiding out in the woods. They have a code that is the reverse of Robin Hood and his Merry Men: Steal from the poor, and give to the rich. None of the local nobles seem interested in the pillaged goods of their subjects, and are constantly giving back the loot they keep finding on their doorsteps.","74 The local apothecary is desperate due to the sudden absence of all the local medicinal plants in the area. All the groves and clearings appear to have been picked clean, and even the owner s secret garden is now empty. She had told no one of her hidden garden, and so has no idea who or what could have taken all of the plants in the brief period of time between her most recent check and her previous one.","75 A human peasant and a member of the fey came across each other in the woods and, over the course of multiple moonlit encounters, fell deeply in love. The peasant s family has a deep-rooted fear of the fey, and is actively trying to put a stop to the pair s relationship. The family is even more fearful that the peasant will leave for the Feywild and never return, and goes to the party to convince them to help break the two lovers up. The human is in love with the Fey s otherworldly allure and sharp wit; talking to them makes the peasant feel alive in a way that they ve never felt before. The Fey was originally only interested in the concept of a secretive human lover, but eventually came to love the peasant s dedication to their relationship despite the risk of alienating other loved ones.","76 While at the market waiting for another adventurer to arrive, you pass the time by idly counting the number of stone gargoyles mounted on the town hall. There are fourteen, all with a silly grin.","77 While at the blacksmith to repair your armour, you overhear the blacksmith explaining to his apprentice to not stray off to the hills to see his new sweetheart because he heard from the baker s cousin s stepmother that there are kobolds about.","78 While waiting patiently for your turn to see the Bishop, you get your ear bent by some local shopkeeper about how the town council is a bunch of idiots, and how they simply wasted all that money on getting 13 gargoyle statues erected on the town hall. Thirteen! That s an unlucky number!","79 A street urchin attempts to filch your purse, he runs off down an alley. The urchin escapes, but in the alley you found a homeless halfling bum. Clearly dead. Looks like he fell from a great height.","80 The price of that foreign wine you like so much has tripled in price. The barkeep mutters something about pirates. The barkeep explains it s just a euphemism for the wagoneers guild and their extortionate ways.","81 A dead homeless halfling found in an alley had a small bottle of very cheap whisky. The label has a brand mark you ve not seen before - 4 vertical slashes and 2 short slashes across the bottom.","82 The pommel of a sword you found on your last adventure rattled loose. Inside you a scrap of parchment with lots of scratchmarks, almost looks like writing.","83 A wanted poster has been nailed up - Wanted: Black Pete, for Brigandry.","84 The scribe you made inquiries with last week has got back to you. She says the Tomb of Three Chieftains can be found outside Millthorp.","85 While at market, you saw three wagons being carefully guarded by scruffy and shifty looking mercenaries. There are barrels of cheap rotgut in the wagon.","86 A pilgrim accosts you in the street. He asks if you ll be travelling east anytime soon.","87 The bakery has no cake. He explains it s because there s a shortage of milk.","88 A patrol of the Kings Guard rode fast down main street. They almost ran you over.","89 There s a parade of pilgrims on main street, heading for the commons. They appear somber and morose.","90 Southbridge, just outside town, has been closed to traffic due to disrepair. Merchants complain about the 2 hour detour they now incur by first heading east.","91 The town guard are seen practicing new drills on the common. Apparently a local bandit has enlisted a wizard, and so training in avoiding fireballs is called for.","92 The local priesthood is paying gold for water collected from the Opal Caves to treat a spreading fever","93 An apothecary will pay for certain herbs growing in the Frog Marches.","94 The local Stonecutters Guild are not petitioning for work contracts; labourers are grumbling.","95 A frost giant approaches the group. The giant politely asks for help. He lost his pet owlbear and needs help finding it. He promises a very handsome amount of gp as well as  a powerful ally  if you find the creature.","96 A goblin in noble clothes crashes through the window and rolls over the ground. The symbol of the king s guard is embroidered on his half-cape. As he gets up, he panics and looks around, fixing his eyes upon the party.  The Goat-Riders are coming! Please, hide me!","97 A large burly man has started a daily ritual of throwing a goat at the side of a local noble s house. He is not damaging the house, so he is not doing anything that will make the local law enforcement arrest him, but the noble wants him dealt with, and will pay you to get rid of him, however.","98 A sword in the stone can be sensed by all creatures in the land with  Detect Magic  but lately it seems that the presence is becoming overbearing. Magic users are worried that unless the true king draws the sword, proving his lineage, or the spell  Detect Magic  will become obsolete.","99 As the group walks through the forest, one member hears very quiet crying. The crying is coming from a lost juvenile harpy. It is the job of the group to protect this harpy. They can either keep and raise the creature, or return it to its mother.","100 The party finds a smouldering crater containing a metal wreck. Inside, they find an eccentric kobold who insists she has returned from the moon."];

		hexagonGroup = game.add.group();
		game.stage.backgroundColor = "#ffffff"
		for(var i = 0; i < gridSizeX/2; i ++){
			hexagonArray[i] = [];
			for(var j = 0; j < gridSizeY; j ++){
				if(gridSizeX%2==0 || i+1<gridSizeX/2 || j%2==0){
					var hexagonX = hexagonWidth*i*1.5+(hexagonWidth/4*3)*(j%2);
					var hexagonY = hexagonHeight*j/2;
					var hexagon = new Hexagon(this.game, 'hexagon', hexagonX, hexagonY);
					//var hexagon = game.add.sprite(hexagonX,hexagonY,"hexagon");
					hexagonGroup.add(hexagon);
					hexagonArray[i][j]=hexagon;
					var hexagonText = game.add.text(hexagonX+hexagonWidth/4+5,hexagonY+5,i+","+j);
					hexagonText.font = "arial";
					hexagonText.fontSize = 12;
					hexagonGroup.add(hexagonText);
				}
			}
		}
		hexagonGroup.y = (game.height-hexagonHeight*Math.ceil(gridSizeY/2))/2;
		if(gridSizeY%2==0){
			hexagonGroup.y-=hexagonHeight/4;
		}
		hexagonGroup.x = (game.width-Math.ceil(gridSizeX/2)*hexagonWidth-Math.floor(gridSizeX/2)*hexagonWidth/2)/2;
		if(gridSizeX%2==0){
			hexagonGroup.x-=hexagonWidth/8;
		}
		marker = game.add.sprite(0,0,"marker");
		marker.anchor.setTo(0.5);
		marker.visible=false;
		hexagonGroup.add(marker);
		moveIndex = game.input.addMoveCallback(checkHex, this);
		game.input.onDown.add(checkClickedHex, this);
	}
};


function checkHex(){
	var candidateX = Math.floor((game.input.worldX-hexagonGroup.x)/sectorWidth);
	var candidateY = Math.floor((game.input.worldY-hexagonGroup.y)/sectorHeight);
	var deltaX = (game.input.worldX-hexagonGroup.x)%sectorWidth;
	var deltaY = (game.input.worldY-hexagonGroup.y)%sectorHeight;
	if(candidateX%2==0){
		if(deltaX<((hexagonWidth/4)-deltaY*gradient)){
			candidateX--;
			candidateY--;
		}
		if(deltaX<((-hexagonWidth/4)+deltaY*gradient)){
			candidateX--;
		}
	}
	else{
		if(deltaY>=hexagonHeight/2){
			if(deltaX<(hexagonWidth/2-deltaY*gradient)){
				candidateX--;
			}
		}
		else{
			if(deltaX<deltaY*gradient){
				candidateX--;
			}
			else{
				candidateY--;
			}
		}
	}
	placeMarker(candidateX,candidateY);
}


function checkClickedHex(){
	var candidateX = Math.floor((game.input.worldX-hexagonGroup.x)/sectorWidth);
	var candidateY = Math.floor((game.input.worldY-hexagonGroup.y)/sectorHeight);
	var deltaX = (game.input.worldX-hexagonGroup.x)%sectorWidth;
	var deltaY = (game.input.worldY-hexagonGroup.y)%sectorHeight;
	if(candidateX%2==0){
		if(deltaX<((hexagonWidth/4)-deltaY*gradient)){
			candidateX--;
			candidateY--;
		}
		if(deltaX<((-hexagonWidth/4)+deltaY*gradient)){
			candidateX--;
		}
	}
	else{
		if(deltaY>=hexagonHeight/2){
			if(deltaX<(hexagonWidth/2-deltaY*gradient)){
				candidateX--;
			}
		}
		else{
			if(deltaX<deltaY*gradient){
				candidateX--;
			}
			else{
				candidateY--;
			}
		}
	}
	colorHex(candidateX,candidateY);
}

function placeMarker(posX,posY){
//	marker.visible=true;
	for(var i = 0; i < gridSizeX/2; i ++){
		for(var j = 0; j < gridSizeY; j ++){
			if(gridSizeX%2==0 || i+1<gridSizeX/2 || j%2==0){
				hexagonArray[i][j].tint = 0xffffff;
				//marker.visible=true;
			}
		}
	}
	if(posX<0 || posY<0 || posX>=gridSizeX || posY>columns[posX%2]-1){
		marker.visible=false;
	}
	else{
		marker.x = hexagonWidth/4*3*posX+hexagonWidth/2;
		marker.y = hexagonHeight*posY;
		if(posX%2==0){
			marker.y += hexagonHeight/2;
		}
		else{
			marker.y += hexagonHeight;
		}
		var markerX = Math.floor(posX/2);
		var markerY = posY*2+posX%2;
		hexagonArray[markerX][markerY].tint = 0xff8800;
		// up
		if(markerY-2>=0){
			//hexagonArray[markerX][markerY-2].tint = 0xff0000;
		}
		// down
		if(markerY+2<gridSizeY){
			//hexagonArray[markerX][markerY+2].tint = 0xff0000;
		}
		// right
		if(markerX+markerY%2<gridSizeX/2 && (gridSizeX%2==0 || markerX<Math.floor(gridSizeX/2))){
			//up
			if(markerY-1>=0){
				//hexagonArray[markerX+markerY%2][markerY-1].tint = 0xff0000;
			}
			// down
			if(markerY+1<gridSizeY){
				//hexagonArray[markerX+markerY%2][markerY+1].tint = 0xff0000;
			}
		}
		// left
		if(markerX-1+markerY%2>=0){
			// up
			if(markerY-1>=0){
				//hexagonArray[markerX-1+markerY%2][markerY-1].tint = 0xff0000;
			}
			// down
			if(markerY+1<gridSizeY){
				//hexagonArray[markerX-1+markerY%2][markerY+1].tint = 0xff0000;
			}
		}
	}
}

function colorHex(posX,posY){
	for(var i = 0; i < gridSizeX/2; i ++){
		for(var j = 0; j < gridSizeY; j ++){
			if(gridSizeX%2==0 || i+1<gridSizeX/2 || j%2==0){
				hexagonArray[i][j].tint = 0xffffff;
				if (hexagonArray[i][j].isGenerated) {
					if (hexagonArray[i][j].terrain == "Water") {
						hexagonArray[i][j].loadTexture('hexagon_water', 0);
					} else if (hexagonArray[i][j].terrain == "Swamp") {
						hexagonArray[i][j].loadTexture('hexagon_swamp', 0);
					} else if (hexagonArray[i][j].terrain == "Desert") {
						hexagonArray[i][j].loadTexture('hexagon_desert', 0);
					} else if (hexagonArray[i][j].terrain == "Fields") {
						hexagonArray[i][j].loadTexture('hexagon_fields', 0);
					} else if (hexagonArray[i][j].terrain == "Forest") {
						hexagonArray[i][j].loadTexture('hexagon_forest', 0);
					} else if (hexagonArray[i][j].terrain == "Hills") {
						hexagonArray[i][j].loadTexture('hexagon_hills', 0);
					} else if (hexagonArray[i][j].terrain == "Mountains") {
						hexagonArray[i][j].loadTexture('hexagon_mountains', 0);
					} else if (hexagonArray[i][j].terrain == "Town") {
						hexagonArray[i][j].loadTexture('hexagon_town', 0);
					} else {
						hexagonArray[i][j].loadTexture('hexagon_generated', 0);
					}
				} else {
					hexagonArray[i][j].loadTexture('hexagon', 0);
				}
			}
		}
	}
	if(posX<0 || posY<0 || posX>=gridSizeX || posY>columns[posX%2]-1){
		marker.visible=false;
	}
	else{
		marker.x = hexagonWidth/4*3*posX+hexagonWidth/2;
		marker.y = hexagonHeight*posY;
		if(posX%2==0){
			marker.y += hexagonHeight/2;
		}
		else{
			marker.y += hexagonHeight;
		}
		var markerX = Math.floor(posX/2);
		var markerY = posY*2+posX%2;
		var selectedHex = hexagonArray[markerX][markerY];
		selectedHex.loadTexture('hexagon_selected', 0);
		hex = selectedHex;
		if (selectedHex.isGenerated) {
			tileText.text = "Terrain: " + selectedHex.terrain + "\nQuests: " + selectedHex.quests + "\nLocations: " + selectedHex.locations;
		} else {
			tileText.text = "Terrain: [unknown]\nQuests: [unknown]\nLocations: [unknown]";
			button = game.add.button(40, 400, 'button', actionOnGenerate, this);
		}
	}
}

function actionOnGenerate() {
	hex.isGenerated = true;


	var terrain = terrainArray[Math.floor(Math.random()*terrainArray.length)];
	var quest = questArray[Math.floor(Math.random()*questArray.length)];


	// change the hex color to generated color
	if (terrain == "Water") {
		hex.loadTexture('hexagon_water', 0);
	} else if (terrain == "Swamp") {
		hex.loadTexture('hexagon_swamp', 0);
	} else if (terrain == "Desert") {
		hex.loadTexture('hexagon_desert', 0);
	} else if (terrain == "Fields") {
		hex.loadTexture('hexagon_fields', 0);
	} else if (terrain == "Forest") {
		hex.loadTexture('hexagon_forest', 0);
	} else if (terrain == "Hills") {
		hex.loadTexture('hexagon_hills', 0);
	} else if (terrain == "Mountains") {
		hex.loadTexture('hexagon_mountains', 0);
	} else if (terrain == "Town") {
		hex.loadTexture('hexagon_town', 0);
	} else {
		hex.loadTexture('hexagon_generated', 0);
	}

	// generate and set the field values
	hex.terrain = terrain;
	hex.quests = quest;
	hex.locations = "[To do -- add list of features]";

	// update the text on the screen
	tileText.text = "Terrain: " + hex.terrain + "\nQuests: " + hex.quests + "\nLocations: " + hex.locations;
}

// define and start states
game.state.add('Play', Play);
game.state.start('Play');
