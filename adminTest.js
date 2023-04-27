QUnit.module("tesztestek", function () {
    
    /*Adatok megjelenítése*/
    QUnit.test('üres lista', function(assert) {
        OBJECTS =  [];
        assert.equal(getTableWithItems(OBJECTS), '<table class=\"table table-hover\"><tr><th id=\"id\">id</th><th id=\"nev\">nev</th><th id=\"kategoria\">kategoria</th><th id=\"ar\">ar</th></tr></table>');
    });

    QUnit.test('1 elemű lista', function(assert) {
        OBJECTS =  [
            {
                id: 1,
                nev: "Gamer billentyűzet", 
                kategoria: "billentyűzet",
                ar: 16000,
                eleres: "kepek/keyboard1.png",
            },
        ];
        assert.equal(getTableWithItems(OBJECTS), '<table class=\"table table-hover\"><tr><th id=\"id\">id</th><th id=\"nev\">nev</th><th id=\"kategoria\">kategoria</th><th id=\"ar\">ar</th><tr><tr><td>1</td><td>Gamer billentyűzet</td><td>billentyűzet</td><td>16000</td><td><button id=\"Item-1\">X</button></td></tr></table>');
    });

    QUnit.test('n elemű lista', function(assert) {
        OBJECTS =  [
            {
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
            },
            {
                id: 3,
                nev: "Szilikon billentyűzet", 
                kategoria: "billentyűzet", 
                ar: 30000,
                eleres: "kepek/keyboard3.png",
            },
            {
                id: 4,
                nev: "Hajlított monitor", 
                kategoria: "monitor", 
                ar: 56000,
                eleres: "kepek/monitor1.jpg",
            },
            {
                id: 5,
                nev: "Multi screen monitor", 
                kategoria: "monitor", 
                ar: 50000,
                eleres: "kepek/monitor2.jpg",
            },
        ];
        assert.equal(getTableWithItems(OBJECTS), '<table class=\"table table-hover\"><tr><th id=\"id\">id</th><th id=\"nev\">nev</th><th id=\"kategoria\">kategoria</th><th id=\"ar\">ar</th><tr><tr><td>1</td><td>Gamer billentyűzet</td><td>billentyűzet</td><td>16000</td><td><button id=\"Item-1\">X</button></td></tr><tr><td>2</td><td>Félbillentyűzet</td><td>billentyűzet</td><td>10000</td><td><button id=\"Item-2\">X</button></td></tr><tr><td>3</td><td>Szilikon billentyűzet</td><td>billentyűzet</td><td>30000</td><td><button id=\"Item-3\">X</button></td></tr><tr><td>4</td><td>Hajlított monitor</td><td>monitor</td><td>56000</td><td><button id=\"Item-4\">X</button></td></tr><tr><td>5</td><td>Multi screen monitor</td><td>monitor</td><td>50000</td><td><button id=\"Item-5\">X</button></td></tr></table>');
    });

    /*Adatok rendezése*/
    
  });