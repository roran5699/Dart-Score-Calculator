
			var fnStartCricket = function () {
				
				var fnWinner = function () {
					//hey, some comments
					if(oScore.score[oScore.activePlayer][8]==0)
					{
						var tmp=0;
						var tmp1=oScore.score[oScore.activePlayer][7];
						var tmp2=0;
						for(var i=0;i<7;i++)
						{
							if(oScore.score[oScore.activePlayer][i]==3)
								tmp++;
						}
						for(var i=0;i<oScore.numberPlayers;i++)
						{
							if(oScore.score[i][7]>oScore.score[oScore.activePlayer][7]&&oScore.score[i][8]==0)
								tmp1=oScore.score[i][7];
							if(oScore.score[i][8]>0)
								tmp2++;
						}
						if(tmp1==oScore.score[oScore.activePlayer][7] && tmp==7)
						{
							oScore.score[oScore.activePlayer][8]=(tmp2+1);
							tmp2++;
							if(tmp2!=oScore.numberPlayers)
								fnNextPlayer();
						}
					}
				};

				var fnCountHits = function(d,r,m,sc1) {
					switch(d)
					{
						case 3:
							if(oScore.numberPlayers>1)
							{
								var tmp = 0;
								for(var i=0;i<oScore.numberPlayers;i++)
								{
									if(oScore.score[i][r]==3)
										tmp++;
								}
								if(tmp!=oScore.numberPlayers)
									oScore.score[oScore.activePlayer][7]+=(sc1*m);
							}
							else
							{
								oScore.score[0][7]+=sc1*m;
							}
							break;
						case 2:
									if(oScore.numberPlayers>1)
									{
										var tmp = 0;
										for(var i=0;i<oScore.numberPlayers;i++)
										{
											if(oScore.score[i][r]==3)
												tmp++;
										}
										if(tmp!=oScore.numberPlayers)
										{
											oScore.score[oScore.activePlayer][r]++;
											tmp++;
											if(tmp!=oScore.numberPlayers)
												oScore.score[oScore.activePlayer][7]+=(sc1*(m-1));
										}
									}
									else
									{
										oScore.score[oScore.activePlayer][r]++;
										oScore.score[oScore.activePlayer][7]+=(sc1*(m-1));
									}
									break;
								case 1:
								if(oScore.numberPlayers>1)
									{
										var tmp = 0;
										for(var i=0;i<oScore.numberPlayers;i++)
										{
											if(oScore.score[i][r]==3)
												tmp++;
										}
										if(tmp!=oScore.numberPlayers)
										{
											if(m<3)
											{
												oScore.score[oScore.activePlayer][r]+=m;
											}
											else
											{
												oScore.score[oScore.activePlayer][r]+=2;
												tmp++;
												if(tmp!=oScore.numberPlayers)
												{
													oScore.score[oScore.activePlayer][7]+=sc1;
												}
											}
										}
									}
									else
									{
										if(m<3)
										{
											oScore.score[oScore.activePlayer][r]+=m;
										}
										else
										{
											oScore.score[oScore.activePlayer][r]+=2;
											oScore.score[oScore.activePlayer][7]+=sc1;
										}
									}
									break;
								case 0:
									oScore.score[oScore.activePlayer][r]+=m;
									break;
								default:
									break;
								}
								//fnBackup();
				};

				var fnBackup = function () {
					/*oBackup = {
							numberPlayers: 0,
							activePlayer: 0,
							throwNr: 0,
							score: []
						};
						var tmp = JSON.stringify(oScore);
						oBackup = JSON. parse(tmp);*/
					for(var i=0;i<49;i++)
					{
						oBackup[i] = oBackup[i+1]
					}
					oBackup[49] = JSON.stringify(oScore);
				};

				var fnResetOScore = function() {
					oScore = {
						numberPlayers: 2,
						activePlayer: 0,
						throwNr: 0,
						score: [],
						//round: 0
					};
						oScore.numberPlayers = parseInt($("#playerNr").val());
						for (var i = 0; i < oScore.numberPlayers; i++) {
							oScore.score.push([0,0,0,0,0,0,0,0,0]);
						}
				};

				var fnBuildTable = function () {
					var oDiv = $("#scoreTable");
					var oTable = document.createElement("table");
					var oTableRow = document.createElement("tr");
					
					fnWinner();

					oDiv.empty();
					//oDiv.append(playerNr);
					var oTH = document.createElement("th");
					$(oTH).addClass("header");
					oTableRow.append(oTH);
					for (var i = 1; i <= oScore.numberPlayers; i++) {
						var oTH = document.createElement("th");
						if(oScore.score[i-1][8]>0)
						{
							if(oScore.score[i-1][8]>3)
								$(oTH).addClass("Winner4");
							else
							{
								switch(oScore.score[i-1][8])
								{
									case 1:
										$(oTH).addClass("Winner1");
										break;
									case 2:
										$(oTH).addClass("Winner2");
										break;
									case 3:
										$(oTH).addClass("Winner3");
										break;
									default:
										break;
								}
							}
						}
						else
						{
							if(i==(oScore.activePlayer+1))
							{
								$(oTH).addClass("red");
							}
							$(oTH).addClass("header");
							$(oTH).attr("id","pId_"+(i-1))
							$(oTH).click(
								function (oEvent) {
									var aId = oEvent.target.id.split("_");
									if(aId[0]=="pId")
									{
										while(oScore.activePlayer!=aId[1])
											fnNextPlayer();
										fnBackup();
										fnBuildTable();
									}
								}
							);
						}
						$(oTH).text("T" + i);
						
						oTableRow.append(oTH);
						// oTableRow.append($("<th>P"+i+"</th>"));
					}
					oTable.append(oTableRow);
					var tmp1=0;
					for (var i = 20; i >= 14; i--) {
						oTableRow = document.createElement("tr");
						var oTH = document.createElement("td");
						var tmp = 0;
						for(var k=0;k<oScore.numberPlayers;k++)
						{
							if(oScore.score[k][20-i]==3)
								tmp++;
						}
						if(tmp==oScore.numberPlayers)
							$(oTH).addClass("closed");
						if (i > 14) {
							$(oTH).text(i);
							oTableRow.append(oTH);
						}
						else {
							$(oTH).text("BE");
							oTableRow.append(oTH);
						}
						for (var j = 1; j <= oScore.numberPlayers; j++) {
							oTH = document.createElement("td");
							var tmp = 0;
							for(var k=0;k<oScore.numberPlayers;k++)
							{
								if(oScore.score[k][20-i]==3)
									tmp++;
							}
							if(tmp==oScore.numberPlayers)
								$(oTH).addClass("closed");
							else
							{
								if(oScore.score[j-1][20-i]==3)
									$(oTH).addClass("opened");
								if(oScore.score[j-1][20-i]==2)
									$(oTH).addClass("nearlyOpen");
								if(oScore.score[j-1][20-i]==1)
									$(oTH).addClass("hit");
							}
							$(oTH).text(oScore.score[j-1][20-i]);
							if(i>14)
								$(oTH).attr("id","sId_"+(j-1)+"_"+(20-i)+"_"+i);
							else
								$(oTH).attr("id","sId_"+(j-1)+"_"+(20-i)+"_"+25);
							$(oTH).click(
								function(oEvent)
								{
									console.log(oEvent.target.id);
									var aId = oEvent.target.id.split("_");
									if(oScore.activePlayer==aId[1] && aId[0]=="sId" && oScore.score[oScore.activePlayer][8] == 0)
									{
										fnCountHits(oScore.score[oScore.activePlayer][parseInt(aId[2])],parseInt(aId[2]),1,parseInt(aId[3]));
										fnBackup();
									}
									fnBuildTable();
								}
							);
							oTableRow.append(oTH);
							// oTableRow.append($("<th>P"+i+"</th>"));
						}
						oTable.append(oTableRow);
					}
					oTableRow = document.createElement("tr");
					oTH = document.createElement("td");
					$(oTH).text("p.");
					oTableRow.append(oTH);
					for (var i = 1; i <= oScore.numberPlayers; i++) {
						oTH = document.createElement("td");
						$(oTH).text(oScore.score[i-1][7]);
						oTableRow.append(oTH);
					}
					oTable.append(oTableRow);
					oDiv.append(oTable);
				};

				var fnNextPlayer = function () {
					if(oScore.activePlayer==(oScore.numberPlayers-1))
					{	
						oScore.activePlayer=0;
						if(oScore.score[0][8]>0)
							fnNextPlayer();
					}
					else
					{
						oScore.activePlayer++;
						if(oScore.score[oScore.activePlayer][8]>0)
							fnNextPlayer();
					}
					oScore.throwNr=0;
				};

				fnResetOScore();
				oBackup=[];
				
				for(var i=0;i<50;i++)
				{
					oBackup.push(JSON.stringify(oScore));
				}
				
				$("#dartboard #areas g").children().off("click");
				$("#dartboard #areas g").children().click(
					function () 
					{
					//alert($(this).attr("id"));
					var score1 = parseInt($(this).attr("id").substr(1));
					var multiplicator=0;
					if($(this).attr("id").substr(0,1)=="s")
						multiplicator=1;
					if($(this).attr("id").substr(0,1)=="d")
						multiplicator=2;
					if($(this).attr("id").substr(0,1)=="t")
						multiplicator=3;
					if (oScore.numberPlayers != 0) 
					{
						if(score1 >= 15 && oScore.score[oScore.activePlayer][8]==0 && oScore.throwNr<3)
						{
							var row = 20-parseInt($(this).attr("id").substr(1));
							if(parseInt($(this).attr("id").substr(1))==25)
								row=6
							fnCountHits(oScore.score[oScore.activePlayer][row],row,multiplicator,score1);
						}	
						}
						oScore.throwNr++;
						if(oScore.throwNr==3)
						{
							fnNextPlayer();
						}
						fnBackup();
							/*if(oScore.throwNr==3)
							{
								if(oScore.activePlayer==(oScore.numberPlayers-1))
								{
									oScore.activePlayer=0;
								}
								else
								{
									oScore.activePlayer++;
								}
								oScore.throwNr=0;
								fnBackup();
								oBackup = {
									numberPlayers: 0,
									activePlayer: 0,
									throwNr: 0,
									score: []
								};
					var tmp = JSON.stringify(oScore);
					oBackup = JSON. parse(tmp);
							}*/
						fnBuildTable();
					}
				);
				
				$("#button2").off("click");
				$("#button2").click(
					function()
					{
						fnNextPlayer();
						fnBackup();
						/*if(oScore.activePlayer==(oScore.numberPlayers-1))
							oScore.activePlayer=0;
						else
							oScore.activePlayer++;
						oScore.throwNr=0;
						fnBackup();
						oBackup = {
							numberPlayers: 0,
							activePlayer: 0,
							throwNr: 0,
							score: []
						};
						var tmp = JSON.stringify(oScore);
						oBackup = JSON. parse(tmp);*/
						// alert(oScore.activePlayer+1);
						fnBuildTable();
					}
				);
				
				$("#button3").off("click");
				$("#button3").click(
					function()
					{
						oScore = {
							numberPlayers: 0,
							activePlayer: 0,
							throwNr: 0,
							score: []
						};
						oScore = JSON.parse(oBackup[48]);
						for(var i=49;i>0;i--)
						{
							oBackup[i] = oBackup[i-1];
						}
						fnBuildTable();
					}
				);
				// alert(oScore.activePlayer+1);
				fnBuildTable();
			};

			var fnNoScoreCricket = function () {
				var fnWinner = function () {
					if(oScore.score[oScore.activePlayer][7]==0)
					{
						var nrClosed=0;
						var nrWinner=0;
						for(var i=0;i<7;i++)
						{
							if(oScore.score[oScore.activePlayer][i]==3)
								nrClosed++;
						}
						for(var i=0;i<oScore.numberPlayers;i++)
						{
							if(oScore.score[i][7]>0)
								nrWinner++;
						}
						if(nrClosed==7)
						{
							oScore.score[oScore.activePlayer][7]=(nrWinner+1);
							nrWinner++;
							if(nrWinner!=oScore.numberPlayers)
								fnNextPlayer();
						}
					}
				};

				var fnCountHits = function(d,r,m) {
					switch(d)
							{
								case 2:
									oScore.score[oScore.activePlayer][r]++;
									break;
								case 1:
									if(oScore.numberPlayers>1)
									{
										if(m<3)
										{
											oScore.score[oScore.activePlayer][r]+=m;
										}
										else
										{
											oScore.score[oScore.activePlayer][r]+=2;
										}
									}
									break;
								case 0:
									oScore.score[oScore.activePlayer][r]+=m;
									break;
								default:
									break;
								}
								//fnBackup();
				};

				var fnBackup = function () {
					for(var i=0;i<49;i++)
					{
						oBackup[i] = oBackup[i+1]
					}
					oBackup[49] = JSON.stringify(oScore);
				};

				var fnResetOScore = function() {
					oScore = {
						numberPlayers: 2,
						activePlayer: 0,
						throwNr: 0,
						score: [],
						//round: 0
					};
						oScore.numberPlayers = parseInt($("#playerNr").val());
						for (var i = 0; i < oScore.numberPlayers; i++) {
							oScore.score.push([0,0,0,0,0,0,0,0]);
						}
				};

				var fnBuildTable = function () {
					var oDiv = $("#scoreTable");
					var oTable = document.createElement("table");
					var oTableRow = document.createElement("tr");
					
					fnWinner();

					oDiv.empty();
					//oDiv.append(playerNr);
					var oTH = document.createElement("th");
					$(oTH).addClass("header");
					oTableRow.append(oTH);
					for (var i = 1; i <= oScore.numberPlayers; i++) {
						var oTH = document.createElement("th");
						if(oScore.score[i-1][7]>0)
						{
							if(oScore.score[i-1][7]>3)
								$(oTH).addClass("Winner4");
							else
							{
								switch(oScore.score[i-1][7])
								{
									case 1:
										$(oTH).addClass("Winner1");
										break;
									case 2:
										$(oTH).addClass("Winner2");
										break;
									case 3:
										$(oTH).addClass("Winner3");
										break;
									default:
										break;
								}
							}
						}
						else
						{
							if(i==(oScore.activePlayer+1))
							{
								$(oTH).addClass("red");
							}
							$(oTH).addClass("header");
							$(oTH).attr("id","pId_"+(i-1))
							$(oTH).click(
								function (oEvent) {
									var aId = oEvent.target.id.split("_");
									if(aId[0]=="pId")
									{
										while(oScore.activePlayer!=aId[1])
											fnNextPlayer();
										fnBackup();
										fnBuildTable();
									}
								}
							);
						}
						$(oTH).text("P" + i);
						
						oTableRow.append(oTH);
						// oTableRow.append($("<th>P"+i+"</th>"));
					}
					oTable.append(oTableRow);
					var tmp1=0;
					for (var i = 20; i >= 14; i--) {
						oTableRow = document.createElement("tr");
						var oTH = document.createElement("td");
						var tmp = 0;
						for(var k=0;k<oScore.numberPlayers;k++)
						{
							if(oScore.score[k][20-i]==3)
								tmp++;
						}
						if(tmp==oScore.numberPlayers)
							$(oTH).addClass("closed");
						if (i > 14) {
							$(oTH).text(i);
							oTableRow.append(oTH);
						}
						else {
							$(oTH).text("BE");
							oTableRow.append(oTH);
						}
						for (var j = 1; j <= oScore.numberPlayers; j++) {
							oTH = document.createElement("td");
							if(oScore.score[j-1][20-i]==3)
								$(oTH).addClass("opened");
							if(oScore.score[j-1][20-i]==2)
								$(oTH).addClass("nearlyOpen");
							if(oScore.score[j-1][20-i]==1)
								$(oTH).addClass("hit");
							$(oTH).text(oScore.score[j-1][20-i]);
							if(i>14)
								$(oTH).attr("id","sId_"+(j-1)+"_"+(20-i)+"_"+i);
							else
								$(oTH).attr("id","sId_"+(j-1)+"_"+(20-i)+"_"+25);
							$(oTH).click(
								function(oEvent)
								{
									
									var aId = oEvent.target.id.split("_");
									if(oScore.activePlayer==aId[1] && aId[0]=="sId" && oScore.score[oScore.activePlayer][7] == 0)
									{
										console.log(oEvent.target.id);
										fnCountHits(oScore.score[oScore.activePlayer][parseInt(aId[2])],parseInt(aId[2]),1);
										fnBackup();
									}
									fnBuildTable();
								}
							);
							oTableRow.append(oTH);
							// oTableRow.append($("<th>P"+i+"</th>"));
						}
						oTable.append(oTableRow);
					}
					oDiv.append(oTable);
				};

				var fnNextPlayer = function () {
					if(oScore.activePlayer==(oScore.numberPlayers-1))
					{	
						oScore.activePlayer=0;
						if(oScore.score[0][7]>0)
							fnNextPlayer();
					}
					else
					{
						oScore.activePlayer++;
						if(oScore.score[oScore.activePlayer][7]>0)
							fnNextPlayer();
					}
					oScore.throwNr=0;
				};

				fnResetOScore();
				oBackup=[];

				for(var i=0;i<50;i++)
				{
					oBackup.push(JSON.stringify(oScore));
				}

				$("#dartboard #areas g").children().off("click");
				$("#dartboard #areas g").children().click(
					function () 
					{
					//alert($(this).attr("id"));
					var score1 = parseInt($(this).attr("id").substr(1));
					var multiplicator=0;
					if($(this).attr("id").substr(0,1)=="s")
						multiplicator=1;
					if($(this).attr("id").substr(0,1)=="d")
						multiplicator=2;
					if($(this).attr("id").substr(0,1)=="t")
						multiplicator=3;
					if (oScore.numberPlayers != 0) 
					{
						if(score1 >= 15 && oScore.score[oScore.activePlayer][7]==0)
						{
							var row = 20-parseInt($(this).attr("id").substr(1));
							if(parseInt($(this).attr("id").substr(1))==25)
								row=6
							fnCountHits(oScore.score[oScore.activePlayer][row],row,multiplicator);
						}	
						}
						oScore.throwNr++;
						if(oScore.throwNr==3)
						{
							fnNextPlayer();
						}
						fnBackup();
							/*if(oScore.throwNr==3)
							{
								if(oScore.activePlayer==(oScore.numberPlayers-1))
								{
									oScore.activePlayer=0;
								}
								else
								{
									oScore.activePlayer++;
								}
								oScore.throwNr=0;
								fnBackup();
								oBackup = {
									numberPlayers: 0,
									activePlayer: 0,
									throwNr: 0,
									score: []
								};
					var tmp = JSON.stringify(oScore);
					oBackup = JSON. parse(tmp);
							}*/
						fnBuildTable();
					}
				);
				
				$("#button2").off("click");
				$("#button2").click(
					function()
					{
						fnNextPlayer();
						fnBackup();
						/*if(oScore.activePlayer==(oScore.numberPlayers-1))
							oScore.activePlayer=0;
						else
							oScore.activePlayer++;
						oScore.throwNr=0;
						fnBackup();
						oBackup = {
							numberPlayers: 0,
							activePlayer: 0,
							throwNr: 0,
							score: []
						};
						var tmp = JSON.stringify(oScore);
						oBackup = JSON. parse(tmp);*/
						// alert(oScore.activePlayer+1);
						fnBuildTable();
					}
				);
				
				$("#button3").off("click");
				$("#button3").click(
					function()
					{
						oScore = {
							numberPlayers: 0,
							activePlayer: 0,
							throwNr: 0,
							score: []
						};
						oScore = JSON.parse(oBackup[48]);
						for(var i=49;i>0;i--)
						{
							oBackup[i] = oBackup[i-1];
						}
						fnBuildTable();
					}
				);
				fnBuildTable();
			};

			var fnGame301 = function (maxScore) {
				var fnWinner = function () {
					if(oScore.score[oScore.activePlayer][0]==0 && oScore.score[oScore.activePlayer][1]==0)
					{
						var nrWinner = 0;
						for(var i=0;i<oScore.numberPlayers;i++)
						{
							if(oScore.score[i][1]>0)
								nrWinner++;
						}
						oScore.score[oScore.activePlayer][1]=(nrWinner+1);
						nrWinner++;
						if(nrWinner!=oScore.numberPlayers)
								fnNextPlayer();
						oScore.throwNr=0;
					}
					else
					{
						if(oScore.score[oScore.activePlayer][0]<0)
						{
							oScore.score[oScore.activePlayer][0]+=oScore.throws[0]+oScore.throws[1]+oScore.throws[2];
							fnNextPlayer();
						}
					}
				};

				var fnCountHits = function (row,multiplicator) {
					switch(multiplicator)
					{
						case 's':
							multiplicator=1;
							break;
						case 'd':
							multiplicator=2;
							break;
						case 't':
							multiplicator=3;
							break;
						default:
							break;
					}
					oScore.throws[oScore.throwNr]=(row*multiplicator);
					oScore.score[oScore.activePlayer][0]-=(row*multiplicator);
					oScore.throwNr++;
					fnBuildTable();
				};

				var fnBackup = function () {
					for(var i=0;i<49;i++)
					{
						oBackup[i] = oBackup[i+1]
					}
					oBackup[49] = JSON.stringify(oScore);
				};

				var fnResetOScore = function() {
					oScore = {
						numberPlayers: 2,
						activePlayer: 0,
						throwNr: 0,
						score: [],
						throws: [0,0,0]
						//round: 0
					};
						oScore.numberPlayers = parseInt($("#playerNr").val());
						for (var i = 0; i < oScore.numberPlayers; i++) {
							oScore.score.push([maxScore,0]);
						}
				};

				var fnBuildTable = function () {
					var oDiv = $("#scoreTable");
					var oTable = document.createElement("table");
					var oTableRow = document.createElement("tr");
					
					fnWinner();

					oDiv.empty();
					//oDiv.append(playerNr);
					var oTH = document.createElement("th");
					$(oTH).addClass("header");
					oTableRow.append(oTH);
					for (var i = 1; i <= oScore.numberPlayers; i++) {
						var oTH = document.createElement("th");
						if(oScore.score[i-1][1]>0)
						{
							if(oScore.score[i-1][1]>3)
								$(oTH).addClass("Winner4");
							else
							{
								switch(oScore.score[i-1][1])
								{
									case 1:
										$(oTH).addClass("Winner1");
										break;
									case 2:
										$(oTH).addClass("Winner2");
										break;
									case 3:
										$(oTH).addClass("Winner3");
										break;
									default:
										break;
								}
							}
						}
						else
						{
							if(i==(oScore.activePlayer+1))
							{
								$(oTH).addClass("red");
							}
							$(oTH).addClass("header");
							$(oTH).attr("id","pId_"+(i-1));
							$(oTH).click(
								function (oEvent) {
									var aId = oEvent.target.id.split("_");
									if(aId[0]=="pId")
									{
										while(oScore.activePlayer!=aId[1])
											fnNextPlayer();
										fnBackup();
										fnBuildTable();
									}
								}
							);
						}
						$(oTH).text("P" + i);
						
						oTableRow.append(oTH);
						// oTableRow.append($("<th>P"+i+"</th>"));
					}
					oTable.append(oTableRow);
					oTableRow = document.createElement("tr");
					oTH = document.createElement("td");
					$(oTH).text("p.");
					oTableRow.append(oTH);
					for(var i=0;i<oScore.numberPlayers;i++)
					{
						oTH = document.createElement("td");
						$(oTH).text(oScore.score[i][0]);
						oTableRow.append(oTH);
					}
					oTable.append(oTableRow);
					oDiv.append(oTable);
				};

				var fnNextPlayer = function () {
					nrWinner=0;
					for(var i=0;i<oScore.numberPlayers;i++)
					{
						if(oScore.score[i][1]>0)
							nrWinner++;
					}
					if(oScore.activePlayer==(oScore.numberPlayers-1))
					{	
						oScore.activePlayer=0;
						if(oScore.score[0][1]>0)
							fnNextPlayer();
					}
					else
					{
						oScore.activePlayer++;
						if(oScore.score[oScore.activePlayer][1]>0 && nrWinner<oScore.numberPlayers)
							fnNextPlayer();
					}
					oScore.throwNr=0;
					oScore.throws=[0,0,0];
				};	

				fnResetOScore();
				oBackup=[];

				for(var i=0;i<50;i++)
				{
					oBackup.push(JSON.stringify(oScore));
				}

				$("#dartboard #areas g").children().off("click");
				$("#dartboard #areas g").children().click(
					function () 
					{
						//alert($(this).attr("id"));
						if (oScore.numberPlayers != 0) 
						{
							if(oScore.score[oScore.activePlayer][1]==0)
							{
								var row = parseInt($(this).attr("id").substr(1));
								fnCountHits(row,$(this).attr("id").substr(0,1));
								fnBackup();
								
							}	
						}
						if(oScore.throwNr==3)
						{
							fnBackup();
							fnNextPlayer();
						}
							/*if(oScore.throwNr==3)
							{
								if(oScore.activePlayer==(oScore.numberPlayers-1))
								{
									oScore.activePlayer=0;
								}
								else
								{
									oScore.activePlayer++;
								}
								oScore.throwNr=0;
								fnBackup();
								oBackup = {
									numberPlayers: 0,
									activePlayer: 0,
									throwNr: 0,
									score: []
								};
								var tmp = JSON.stringify(oScore);
								oBackup = JSON. parse(tmp);
										}*/
						fnBuildTable();
					}
				);
				
				$("#button2").off("click");
				$("#button2").click(
					function()
					{
						fnNextPlayer();
						fnBackup();
						/*if(oScore.activePlayer==(oScore.numberPlayers-1))
							oScore.activePlayer=0;
						else
							oScore.activePlayer++;
						oScore.throwNr=0;
						fnBackup();
						oBackup = {
							numberPlayers: 0,
							activePlayer: 0,
							throwNr: 0,
							score: []
						};
						var tmp = JSON.stringify(oScore);
						oBackup = JSON. parse(tmp);*/
						// alert(oScore.activePlayer+1);
						fnBuildTable();
					}
				);
				
				$("#button3").off("click");
				$("#button3").click(
					function()
					{
						oScore = JSON.parse(oBackup[48]);
						for(var i=49;i>0;i--)
						{
							oBackup[i] = oBackup[i-1];
						}
						fnBuildTable();
					}
				);
				fnBuildTable();	
			};

			var fnScram = function () {
				//finish later
				var fnWinner = function () {
					if(oScore.round == 1)
					{
						if(oScore.activePlayer == 1)
						{
							var nrClosedAreas=0;
							for(var i=0;i<7;i++)
							{
								if(oScore.score[1][i]==3)
									nrClosedAreas++;
							}
							if(nrClosedAreas==7)
							{
								if(oScore.score[0][7]>oScore.score[1][7])
								{
									oScore.score[0][8]=1;
									oScore.score[1][8]=2;
								}
								else
								{
									if(oScore.score[0][7]==oScore.score[1][7])
									{
										oScore.score[0][8]=4;
										oScore.score[1][8]=4;
									}
									else
									{
										oScore.score[0][8]=2;
										oScore.score[1][8]=1;
									}
								}
							}
						}
					}/**/
					else
					{

					}
				};
			};

			var fnCountUp = function (maxScore) {
				var fnWinner = function () {
					if(oScore.score[oScore.activePlayer][0]>=maxScore && oScore.score[oScore.activePlayer][1]==0)
					{
						var nrWinner = 1;
						for(var i=0;i<oScore.numberPlayers;i++)
						{
							if(oScore.score[i][1]>0)
								nrWinner++;
						}
						oScore.score[oScore.activePlayer][1]=nrWinner;
						if(nrWinner<oScore.numberPlayers)
							fnNextPlayer();
						oScore.throwNr=0;
					}
				};

				var fnCountHits = function (row,multiplicator) {
					switch(multiplicator)
					{
						case 's':
							multiplicator=1;
							break;
						case 'd':
							multiplicator=2;
							break;
						case 't':
							multiplicator=3;
							break;
						default:
							break;
					}
					oScore.score[oScore.activePlayer][0]+=(row*multiplicator);
					oScore.throwNr++;
					fnBuildTable();
				};

				var fnBackup = function () {
					for(var i=0;i<49;i++)
					{
						oBackup[i] = oBackup[i+1]
					}
					oBackup[49] = JSON.stringify(oScore);
				};
				
				var fnResetOScore = function() {
					oScore = {
						numberPlayers: 2,
						activePlayer: 0,
						throwNr: 0,
						score: []
						//round: 0
					};
						oScore.numberPlayers = parseInt($("#playerNr").val());
						for (var i = 0; i < oScore.numberPlayers; i++) {
							oScore.score.push([0,0]);
						}
				};

				var fnBuildTable = function () {
					var oDiv = $("#scoreTable");
					var oTable = document.createElement("table");
					var oTableRow = document.createElement("tr");
					
					fnWinner();

					oDiv.empty();
					//oDiv.append(playerNr);
					var oTH = document.createElement("th");
					$(oTH).addClass("header");
					oTableRow.append(oTH);
					for (var i = 1; i <= oScore.numberPlayers; i++) {
						var oTH = document.createElement("th");
						if(oScore.score[i-1][1]>0)
						{
							if(oScore.score[i-1][1]>3)
								$(oTH).addClass("Winner4");
							else
							{
								switch(oScore.score[i-1][1])
								{
									case 1:
										$(oTH).addClass("Winner1");
										break;
									case 2:
										$(oTH).addClass("Winner2");
										break;
									case 3:
										$(oTH).addClass("Winner3");
										break;
									default:
										break;
								}
							}
						}
						else
						{
							if(i==(oScore.activePlayer+1))
							{
								$(oTH).addClass("red");
							}
							$(oTH).addClass("header");
							$(oTH).attr("id","pId_"+(i-1));
							$(oTH).click(
								function (oEvent) {
									var aId = oEvent.target.id.split("_");
									if(aId[0]=="pId")
									{
										while(oScore.activePlayer!=aId[1])
											fnNextPlayer();
										fnBackup();
										fnBuildTable();
									}
								}
							);
						}
						$(oTH).text("P" + i);
						
						oTableRow.append(oTH);
						// oTableRow.append($("<th>P"+i+"</th>"));
					}
					oTable.append(oTableRow);
					oTableRow = document.createElement("tr");
					oTH = document.createElement("td");
					$(oTH).text("p.");
					oTableRow.append(oTH);
					for(var i=0;i<oScore.numberPlayers;i++)
					{
						oTH = document.createElement("td");
						$(oTH).text(oScore.score[i][0]);
						oTableRow.append(oTH);
					}
					oTable.append(oTableRow);
					oDiv.append(oTable);
				};

				var fnNextPlayer = function () {
					nrWinner=0;
					for(var i=0;i<oScore.numberPlayers;i++)
					{
						if(oScore.score[i][1]>0)
							nrWinner++;
					}
					if(oScore.activePlayer==(oScore.numberPlayers-1))
					{	
						oScore.activePlayer=0;
					}
					else
					{
						oScore.activePlayer++;
					}
					if(oScore.score[oScore.activePlayer][1]>0 && nrWinner<oScore.numberPlayers)
						fnNextPlayer();
					oScore.throwNr=0;
				};	

				fnResetOScore();
				oBackup=[];

				for(var i=0;i<50;i++)
				{
					oBackup.push(JSON.stringify(oScore));
				}

				$("#dartboard #areas g").children().off("click");
				$("#dartboard #areas g").children().click(
					function () {
						if (oScore.numberPlayers != 0) 
						{
							if(oScore.score[oScore.activePlayer][1]==0 && oScore.throwNr<3)
							{
								var row = parseInt($(this).attr("id").substr(1));
								fnCountHits(row,$(this).attr("id").substr(0,1));
								fnBackup();
							}	
						}
						if(oScore.throwNr>=3)
						{
							//fnBackup();
							fnNextPlayer();
						}
						fnBuildTable();
					}
				);

				$("#button2").off("click");
				$("#button2").click(
					function()
					{
						fnNextPlayer();
						fnBackup();
						fnBuildTable();
					}
				);

				$("#button3").off("click");
				$("#button3").click(
					function()
					{
						oScore = JSON.parse(oBackup[48]);
						for(var i=49;i>0;i--)
						{
							oBackup[i] = oBackup[i-1];
						}
						fnBuildTable();
					}
				);
				fnBuildTable();
			};

			var fnHighscore = function (maxRound) {
				var fnWinner = function () {
					if(oScore.round>=maxRound && oScore.score[oScore.activePlayer][1]==0)
					{
						var scoreBackup = $.extend(true, {}, oScore);
						scoreBackup.score.sort(function(a,b){return b[0]-a[0];});
						var positionsCounter=1;
						var tmpScore=scoreBackup.score[0][0];
						scoreBackup.score[0][1]=1;
						for(var j=1;j<oScore.numberPlayers;j++)
						{
							if(scoreBackup.score[j][0]!=tmpScore)
							{
								tmpScore=scoreBackup.score[j][0];
								positionsCounter++;
							}
							scoreBackup.score[j][1]=positionsCounter;
						}
						for(var i=0;i<oScore.numberPlayers;i++)
						{
							for(var j=0;j<oScore.numberPlayers;j++)
							{
								if(oScore.score[i][0]==scoreBackup.score[j][0])
								{
									oScore.score[i][1]=scoreBackup.score[j][1];
									break;
								}
							}
						}
					}
				};

				var fnCountHits = function (row,multiplicator) {
					switch(multiplicator)
					{
						case 's':
							multiplicator=1;
							break;
						case 'd':
							multiplicator=2;
							break;
						case 't':
							multiplicator=3;
							break;
						default:
							break;
					}
					oScore.score[oScore.activePlayer][0]+=(row*multiplicator);
					oScore.throwNr++;
					fnBuildTable();
				};

				var fnBackup = function () {
					for(var i=0;i<49;i++)
					{
						oBackup[i] = oBackup[i+1]
					}
					oBackup[49] = JSON.stringify(oScore);
				};

				var fnResetOScore = function() {
					oScore = {
						numberPlayers: 2,
						activePlayer: 0,
						throwNr: 0,
						score: [],
						round: 0
					};
						oScore.numberPlayers = parseInt($("#playerNr").val());
						for (var i = 0; i < oScore.numberPlayers; i++) {
							oScore.score.push([0,0]);
						}
				};

				var fnBuildTable = function () {
					var oDiv = $("#scoreTable");
					var oTable = document.createElement("table");
					var oTableRow = document.createElement("tr");
					
					fnWinner();

					oDiv.empty();
					//oDiv.append(playerNr);
					var oTH = document.createElement("th");
					$(oTH).addClass("header");
					oTableRow.append(oTH);
					for (var i = 1; i <= oScore.numberPlayers; i++) {
						var oTH = document.createElement("th");
						if(oScore.score[i-1][1]>0)
						{
							if(oScore.score[i-1][1]>3)
								$(oTH).addClass("Winner4");
							else
							{
								switch(oScore.score[i-1][1])
								{
									case 1:
										$(oTH).addClass("Winner1");
										break;
									case 2:
										$(oTH).addClass("Winner2");
										break;
									case 3:
										$(oTH).addClass("Winner3");
										break;
									default:
										break;
								}
							}
						}
						else
						{
							if(i==(oScore.activePlayer+1))
							{
								$(oTH).addClass("red");
							}
							$(oTH).addClass("header");
							$(oTH).attr("id","pId_"+(i-1));
							$(oTH).click(
								function (oEvent) {
									var aId = oEvent.target.id.split("_");
									if(aId[0]=="pId")
									{
										while(oScore.activePlayer!=aId[1])
											fnNextPlayer();
										fnBackup();
										fnBuildTable();
									}
								}
							);
						}
						$(oTH).text("P" + i);
						
						oTableRow.append(oTH);
						// oTableRow.append($("<th>P"+i+"</th>"));
					}
					oTable.append(oTableRow);
					oTableRow = document.createElement("tr");
					oTH = document.createElement("td");
					$(oTH).text("p.");
					oTableRow.append(oTH);
					for(var i=0;i<oScore.numberPlayers;i++)
					{
						oTH = document.createElement("td");
						$(oTH).text(oScore.score[i][0]);
						oTableRow.append(oTH);
					}
					oTable.append(oTableRow);
					oDiv.append(oTable);
				};

				var fnNextPlayer = function () {
					nrWinner=0;
					for(var i=0;i<oScore.numberPlayers;i++)
					{
						if(oScore.score[i][1]>0)
							nrWinner++;
					}
					if(oScore.activePlayer==(oScore.numberPlayers-1))
					{	
						oScore.activePlayer=0;
						oScore.round++;
					}
					else
					{
						oScore.activePlayer++;
					}
					if(oScore.score[oScore.activePlayer][1]>0 && nrWinner<oScore.numberPlayers)
						fnNextPlayer();
					oScore.throwNr=0;
				};	

				fnResetOScore();
				oBackup=[];

				for(var i=0;i<50;i++)
				{
					oBackup.push(JSON.stringify(oScore));
				}

				$("#dartboard #areas g").children().off("click");
				$("#dartboard #areas g").children().click(
					function () {
						if (oScore.numberPlayers != 0) 
						{
							if(oScore.score[oScore.activePlayer][1]==0 && oScore.throwNr<3)
							{
								var row = parseInt($(this).attr("id").substr(1));
								fnCountHits(row,$(this).attr("id").substr(0,1));
								fnBackup();
							}	
						}
						if(oScore.throwNr>=3)
						{
							//fnBackup();
							fnNextPlayer();
						}
						fnBuildTable();
					}
				);

				$("#button2").off("click");
				$("#button2").click(
					function()
					{
						fnNextPlayer();
						fnBackup();
						fnBuildTable();
					}
				);

				$("#button3").off("click");
				$("#button3").click(
					function()
					{
						oScore = JSON.parse(oBackup[48]);
						for(var i=49;i>0;i--)
						{
							oBackup[i] = oBackup[i-1];
						}
						fnBuildTable();
					}
				);
				fnBuildTable();
			};
		// we have jQuery at our disposal
		
		$(document).ready(function () {
			
			/*fnBackup();*/
			fnStartCricket();

			$("#dartboard #areas g").children().hover(
				function () {
					$(this).css("opacity", "0.6");
				},
				function () {
					$(this).css("opacity", "1");
				}
			);
			
			$("#button1").click(
				function () {
					if($("#gamemode").val()=="cricket")
					{
						fnStartCricket();
						//$("#button2").css("visibility","visible");
						//$("#button3").css("visibility","visible");
					}
					if($("#gamemode").val()=="noSCricket")
					{
						fnNoScoreCricket();
						//$("#button2").css("visibility","hidden");
						//$("#button3").css("visibility","hidden");
					}
					if($("#gamemode").val()=="game301")
					{
						fnGame301(301);
					}
					if($("#gamemode").val()=="game501")
					{
						fnGame301(501);
					}
					if($("#gamemode").val()=="countup300")
					{
						fnCountUp(300);
					}
					if($("#gamemode").val()=="countup500")
					{
						fnCountUp(500);
					}
					if($("#gamemode").val()=="highscore3")
					{
						fnHighscore(3);
					}
					if($("#gamemode").val()=="highscore5")
					{
						fnHighscore(5);
					}
				}
			);
			$(".buttons").hover(
				function () {
					$(this).css("opacity", "0.6");
				},
				function () {
					$(this).css("opacity", "1");
				}
			);
		});

			// TODO: implement! (potentially filling the div's 'content')