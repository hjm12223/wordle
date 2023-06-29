const 정답 = "ADIOS";


let attempts = 0;
let index =0;



function appStart() {
    const displayGameover= () => {
        const div = document.createElement("div");
        div.innerText = "게임이 종료되었습니다.";
        div.style = "display:flex; justify-content : center; align-items : center; position:absolute; top:40vh ; left:45vw; background-color : white; width : 200px; height : 100px; border : 2px solid #dee1e9" ; 
        document.body.appendChild(div);
    }
    const nextLine = () => {
        if(attempts === 6) return gameover(); 
        attempts += 1;
        index = 0;
    };

    const gameover = () => {
        window.removeEventListener("keydown", handleKeyDown)
        displayGameover();
    };
    const handleEnterKey = () => {
        let 맞은_갯수 = 0;
        for(let i = 0 ; i < 5 ; i++){
            const blcok = document.querySelector(
                `.board-blcok[data-index='${attempts}${i}']`
                ); 
            const 입력한_글자 = blcok.innerText;
            const 정답_글자 = 정답[i];
            if(정답_글자 === 입력한_글자) {맞은_갯수 += 1; blcok.style.background = "#6AAA64";}
            else if(정답.includes(입력한_글자)) blcok.style.background = "#C9B458";
            else blcok.style.background = "#787C7E";

            blcok.style.color = "white"; 
        }
        if(맞은_갯수 === 5) gameover();
        else nextLine(); 
    }; 

    
    const handleBackspace= () => {
        if(index > 0){
        const preBlock = document.querySelector(
            `.board-blcok[data-index='${attempts}${index-1}']`
          );
        preBlock.innerText ="";}
        if(index !== 0 ) index -= 1;
    }

    const handleKeyDown = (event) => {
        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(
          `.board-blcok[data-index='${attempts}${index}']`
        );

        if (event.key === 'Backspace') handleBackspace(thisBlock);
        else if (index === 5) {
          if (event.key === "Enter") {
            handleEnterKey();
            return; // Enter 키 처리 후 함수를 종료합니다.
          } else {
            return;
          }
        } else if (65 <= keyCode && keyCode <= 90) {
          thisBlock.innerText = key;
          index += 1;
        }
      };
    window.addEventListener("keydown", handleKeyDown);
}

appStart();
