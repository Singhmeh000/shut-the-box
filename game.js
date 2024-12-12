const startbtn = document.querySelector("#start");
const rollbtn = document.querySelector("#roll");
const tgrbtn = document.querySelector("#toget");
const sptbtn = document.querySelector("#split");
const resetbtn = document.querySelector("#reset");
const endbtn = document.querySelector("#end");
const firstdice = document.querySelector("#firstdice");
const seconddice = document.querySelector("#seconddice");
const restart = document.querySelector("#game-reset");
let onep = document.querySelector("#onepn");
let twop = document.querySelector("#twopn");
let box1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let pturn=document.querySelector("#pturn");
rollbtn.disabled = true;
tgrbtn.disabled = true;
sptbtn.disabled = true;
resetbtn.disabled = true;
endbtn.disabled = true;
let playerturn = 1;
let round = 1;
let point1 = 0;
let point2 = 0;
let d1 = 6;
let d2 = 6;
let p1Name = "";
let p2Name = "";
let sptortgr = "";
let btntext = "";
startbtn.addEventListener('click', function() {
    p1Name = onep.value.trim();
    p2Name = twop.value.trim();

    if (!p1Name || !p2Name) {
        alert(`You have not put name`);
    } else {
        rollbtn.disabled = false;
        startbtn.disabled = true;
        document.querySelector('.playerName').style.display = 'none';
    }
    let turn = "p1";
    pturn.textContent= p1Name+ "'s turn";
});


rollbtn.addEventListener('click', function() {
    d1 = roll();
    d2 = roll();
    firstdice.className = `bi bi-dice-${d1}-fill`;
    seconddice.className = `bi bi-dice-${d2}-fill`;
    //individual button
    if (d1 === d2 || box1[d1] === "X" || box1[d2] === "X") {
        sptbtn.disabled = true;
    } else {
        sptbtn.disabled = false;
    }

    //together button
    if (d1 + d2 >= 10 || box1[d1 + d2] === "X") {
        tgrbtn.disabled = true;
    } else {
        tgrbtn.disabled = false;
    }

    // end button
    if (sptbtn.disabled === true && tgrbtn.disabled === true) {
        endbtn.disabled = false;
    }
    rollbtn.disabled = true;
    resetbtn.disabled = true;
    // add for later - disable the roll button
});
restart.addEventListener('click', function() {

        box1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        document.querySelector('.playerName').style.display = 'block';
        startbtn.disabled = false;
        rollbtn.disabled = true;
        tgrbtn.disabled = true;
        sptbtn.disabled = true;
        resetbtn.disabled = true;
        endbtn.disabled = true;
        let playerturn = 1;
        let round = 1;
        let point1 = 0;
        let point2 = 0;
        let d1 = 0;
        let d2 = 0;
        let p1Name = "";
        let p2Name = "";
        let sptortgr = "";
        let btntext = "";
        const tbody=document.querySelector('tbody')
        tbody.textContent="";
        document.querySelector('.playerName').style.display = 'block';
        document.querySelector('.winner').style.display = 'none';
        });
        tgrbtn.addEventListener('click', function() {

            shut(d1 + d2);
            box1[0] = box1[0] + d1 + d2;
            tgrbtn.disabled = true;
            sptbtn.disabled = true;
            resetbtn.disabled = false;
            endbtn.disabled = false;
            rollbtn.disabled = true;

            let sptortgr = "tgr";
        }); sptbtn.addEventListener('click', function() {
            shut(d1);
            shut(d2);

            box1[0] = box1[0] + d1 + d2;
            sptbtn.disabled = true;
            tgrbtn.disabled = true;
            resetbtn.disabled = false;
            rollbtn.disabled = true;
            endbtn.disabled = false;
            let sptortgr = "spt";
        }); resetbtn.addEventListener('click', function() {
           if (sptortgr === "spt"){
            openbox(d1);
            openbox(d2);
            box1[0]= box1[0] - (d1+d2);
           }else{
            openbox(d1 + d2);
            box1[0]= box1[0] - (d1+d2);
           }
           if (d1 === d2 || box1[d1] === "X" || box1[d2] === "X") {
            sptbtn.disabled = true;
        } else {
            sptbtn.disabled = false;
        }

        //together button
        if (d1 + d2 >= 10 || box1[d1 + d2] === "X") {
            tgrbtn.disabled = true;
        } else {
            tgrbtn.disabled = false;
        }
        resetbtn.disabled = true;
        rollbtn.disabled= true;
        endbtn.disabled= true;
        });
        endbtn.addEventListener('click', function() {
            buildrow();
            if (playerturn === 1) {
                const row = buildrow(round, 45 - box1[0]);
                console.log(row);
                const tbody = document.querySelector('tbody');
                tbody.insertAdjacentElement('beforeend', row);
                point1= point1+box1[0];
                playerturn = 2;
                pturn.textContent= p2Name+ "'s turn";
            } else {
                const tdp2 = document.querySelector('#round' + round + ' .p2Pts');
                tdp2.textContent = 45 - box1[0];
                round = round + 1;
                playerturn = 1;
                point2= point2+box1[0];
                pturn.textContent= p1Name+ "'s turn";
            }
            for (i = 1; i < 10; i++) {
                box1[i] = "";
                let clear = document.querySelector("#box" + i);
                clear.textContent = i;
                clear.classList.remove('shut');
            }
            if (d1 + d2 >= 10 || box1[d1 + d2] === "X") {
                tgrbtn.disabled = true;
            } else {
                tgrbtn.disabled = false;
            }

            // end button
            if (sptbtn.disabled === true && tgrbtn.disabled === true) {
                endbtn.disabled = false;
            }
            box1[0] = 0;
            if (round > 5) {
                if (point1 === point2) {
                    rollbtn.disabled = false;
                    tgrbtn.disabled = true;
                    sptbtn.disabled = true;
                    resetbtn.disabled = true;
                    endbtn.disabled = true;
                } else {
                    document.querySelector('.winner').style.display = 'block';
                    rollbtn.disabled = true;
                    tgrbtn.disabled = true;
                    sptbtn.disabled = true;
                    resetbtn.disabled = true;
                    endbtn.disabled = true;
                    if (point1<point2){
                        const playerwinner = document.querySelector("#playerwinner");
                        playerwinner.textContent ="winner is" + p1Name;
                    }else{
                        const playerwinner = document.querySelector("#playerwinner");
                        playerwinner.textContent ="winner is" + p2Name;
                    }
                }

            } else {

                rollbtn.disabled = false;
                tgrbtn.disabled = true;
                sptbtn.disabled = true;
                resetbtn.disabled = true;
                endbtn.disabled = true;
            }
            box1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        });

        function shut(boxnum) {
            box1[boxnum] = "X";
            let box = document.querySelector("#box" + boxnum);
            box.textContent = "X";
            box.classList.add('shut');
        }

        function openbox(boxn) {
            box1[boxn] = boxn;
            let box = document.querySelector("#box" + boxn);
            box.textContent = boxn;
            box.classList.remove('shut');
        }

        function roll() {
            return Math.floor(Math.random() * 6) + 1;
        }

        function buildrow(roundNum, points) {
            const trtext = document.createElement("tr");
            const tdp1 = document.createElement("td");
            const tdp2 = document.createElement("td");
            const thtext = document.createElement("th");
            trtext.classList.add('chart');
            trtext.id = "round" + roundNum;
            thtext.textContent = "Round " + roundNum;
            tdp1.textContent = points;
            tdp1.classList.add("p1Pts");
            tdp2.classList.add("p2Pts");
            trtext.insertAdjacentElement('beforeend', thtext);
            trtext.insertAdjacentElement('beforeend', tdp1);
            trtext.insertAdjacentElement('beforeend', tdp2);
            return trtext;
        }
