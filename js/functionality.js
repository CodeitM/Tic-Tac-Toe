document.addEventListener('DOMContentLoaded',function(){
        //Global variables set
    const PLAYER_X_CLASS = 'X'
    const PLAYER_O_CLASS = 'O'
    const WINNING_COMBINATIONS=[
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ]

    //saving the functional parts
    const restartButton = document.getElementById('restart')
    const message = document.getElementById('message')
    const cells = document.querySelectorAll('[data-cell]')
    const board= document.getElementById('board')
    const playerx = document.getElementById('player-x')
    const playero = document.getElementById('player-o')
    let isPlayer_O_turn = false

    cells.forEach(cell=>{
        cell.addEventListener('click',handleCellClick)
    });

    board.addEventListener('mouseenter',setBoardHoverClass)
    board.addEventListener('mouseleave',resetBoardHoverClass)


   startGame()

    function startGame(){
        for(const cell of cells){
            if(cell.classList.contains(PLAYER_O_CLASS)){
                cell.classList.remove(PLAYER_O_CLASS)
            }else if(cell.classList.contains(PLAYER_X_CLASS)){
                cell.classList.remove(PLAYER_X_CLASS)
            }   
            cell.style.pointerEvents='auto';
        }
        message.innerHTML='';
        isPlayer_O_turn = false;
        playerx.classList.add('turn')

    }

    function setBoardHoverClass(event){ 
        let board = event.target  
        if(isPlayer_O_turn){
            board.classList.remove(PLAYER_X_CLASS)
            board.classList.add(PLAYER_O_CLASS)
        }else{
            board.classList.remove(PLAYER_O_CLASS)
            board.classList.add(PLAYER_X_CLASS)
        }
    }

    function resetBoardHoverClass(event){
        let board = event.target
        board.classList.remove(PLAYER_O_CLASS)
        board.classList.remove(PLAYER_X_CLASS)
    }

    function handleCellClick(event){
        const cell = event.target;
        const currentClass = isPlayer_O_turn? PLAYER_O_CLASS:PLAYER_X_CLASS
        placeMark(cell,currentClass);
        if(checkWin(currentClass)!=null){
            message.innerHTML = `${currentClass} Wins`; 
            board.style.pointerEvents='none';   
        }else if(isDraw()){
            message.innerHTML = "Draw!"
        }else{
            swapTurns();
            //setBoardHoverClass();
        }
        
    }

    function placeMark(cell,currentClass){
        if(!(cell.classList.contains(PLAYER_O_CLASS)||cell.classList.contains(PLAYER_X_CLASS))){
            cell.classList.add(currentClass)
            cell.classList.add('clicked')
            cell.style.pointerEvents = 'none';
            
        }
        
    }

    function checkWin(currentClass){
        for(const combination of WINNING_COMBINATIONS){
            let track=0;
            for(const element of combination){
                if(cells[element].classList.contains(currentClass)){
                    track++;
                    if(track == 3){
                        return currentClass;
                    }
                }
            }
        }
        return null;
    }

    function swapTurns(){
        isPlayer_O_turn = !isPlayer_O_turn
        if(isPlayer_O_turn){
            playero.classList.add('turn');
            if(playerx.classList.contains('turn')){
                playerx.classList.remove('turn')
            }
        }else{
            playerx.classList.add('turn');
            if(playero.classList.contains('turn')){
                playero.classList.remove('turn')
            }
        }
    }

    function isDraw(){
        for(const cell of cells){
            if(!(cell.classList.contains(PLAYER_O_CLASS)||cell.classList.contains(PLAYER_X_CLASS))){
                return false;
            }
        }
        return true;
    }

    restartButton.addEventListener('click',function(){
        startGame();
    })
})

