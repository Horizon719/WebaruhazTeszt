QUnit.module("tesztestek", function () {
	QUnit.test("Léteznek-e a metódusok", function (assert) {
		assert.ok(megjelenit, "A 'megjelenit' metódus létezik");
		assert.ok(kever, "A 'kever' metódus létezik");
		assert.ok(leptetes, "A 'leptetes' metódus létezik");
		assert.ok(kosar, "A 'kosar' metódus létezik");
		assert.ok(vissza, "A 'vissza' metódus létezik");
		assert.ok(kosarba, "A 'kosarba' metódus létezik");
		assert.ok(mutat, "A 'mutat' metódus létezik");
		assert.ok(torles, "A 'torles' metódus létezik");
    });
    QUnit.test("Függvény e?", function (assert) {
		assert.ok(typeof(megjelenit) === "function", "A 'megjelenit' egy metódus");
		assert.ok(typeof(kever) === "function", "A 'kever' egy metódus");
		assert.ok(typeof(leptetes) === "function", "A 'leptetes' egy metódus");
		assert.ok(typeof(kosar) === "function", "A 'kosar' egy metódus");
		assert.ok(typeof(vissza) === "function", "A 'vissza' egy metódus");
		assert.ok(typeof(kosarba) === "function", "A 'kosarba' egy metódus");
		assert.ok(typeof(mutat) === "function", "A 'mutat' egy metódus");
		assert.ok(typeof(torles) === "function", "A 'torles' egy metódus");
    });
  
    QUnit.test("Adatok megjelenítése:", function (assert) {
      	assert.equal(megjelenit([{
				id: 1,
				nev: "Gamer billentyűzet", 
				kategoria: "billentyűzet",
				ar: 16000,
				eleres: "kepek/keyboard1.png",
			},
			{
				id: 2,
				nev: "Félbillentyűzet", 
				kategoria: "billentyűzet", 
				ar: 10000,
				eleres: "kepek/keyboard2.png",
			}], "fooldal"),
			`<div class=\"container mt-3 row\"><div class=\"card col-lg-3 col-md-4 col-sm-6 p-0\"><div class=\"card-header\"><h4>Gamer billentyűzet</h4><br>-billentyűzet</div><div class=\"card-body\"><img src=\"kepek/keyboard1.png\" alt=\"billentyűzet\"></div> <div class=\"card-footer\">16000 HUF<br><button class=\"show\" id=\"0\">Mutat</button>
                     <button class=\"kosar\" id=\"0\">Kosárba</button></div></div><div class=\"card col-lg-3 col-md-4 col-sm-6 p-0\"><div class=\"card-header\"><h4>Félbillentyűzet</h4><br>-billentyűzet</div><div class=\"card-body\"><img src=\"kepek/keyboard2.png\" alt=\"billentyűzet\"></div> <div class=\"card-footer\">10000 HUF<br><button class=\"show\" id=\"1\">Mutat</button>
                     <button class=\"kosar\" id=\"1\">Kosárba</button></div></div></div>`,
			"Megjelenít működik helyes adatokkal"
		);
		assert.equal(megjelenit([{
			asd: 1,
			das: "aaaa", 
			aaaaaaaa: "billentyűzet",
			bbbbbb: 16000,
			ccccc: "kepek/keyboard1.png",
		},], "fooldal"),
		``,
		"Megjelenít üres stringel tér vissza, ha hibás megjelenítési helyet kap"
		);
		assert.equal(megjelenit([{
				id: 1,
				nev: "Gamer billentyűzet", 
				kategoria: "billentyűzet",
				ar: 16000,
				eleres: "kepek/keyboard1.png",
			},
			{
				id: 2,
				nev: "Félbillentyűzet", 
				kategoria: "billentyűzet", 
				ar: 10000,
				eleres: "kepek/keyboard2.png",
			}], "valahol"),
			``,
			"Megjelenít működik helyes adatokkal"
		);
		assert.equal(megjelenit([{
			asd: 1,
			das: "aaaa", 
			aaaaaaaa: "billentyűzet",
			bbbbbb: 16000,
			ccccc: "kepek/keyboard1.png",
		},], "valami"),
		``,
		"Megjelenít üres stringel tér vissza, ha hibásak a paraméterek"
		);
      /* assert.deepEqual(); */
    });

	QUnit.test("Termék megjelenítése és léptetése:", function (assert) {
		assert.equal();
	  
	/* assert.deepEqual(); */
  });
  });
