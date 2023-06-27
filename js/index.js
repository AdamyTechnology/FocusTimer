const buttonPlay = document.querySelector('.play')
const buttonStop = document.querySelector('.stop')
const buttonUp = document.querySelector('.up')
const buttonDown = document.querySelector('.down')
const buttonPause = document.querySelector('.pause')
const buttonFlorest = document.querySelector('.florest')
const buttonRain = document.querySelector('.rain')
const buttonCoffe = document.querySelector('.coffe')
const buttonFire = document.querySelector('.fire')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')

let minutes = 0

function updateTimerDisplay(minutes, seconds) {
  //Quando o updateTimer é utilizado, as duas funções são realizadas, e devem ser informadas contínuamente quando chamada
  //Este if precisa ser criado para os minutos informados abaixo no update não contar números negativos nos minutos no momento da chamada
  //Else if criada para funcionar a chamada da função no botão stop, quando ambos forem 0
  if (minutes > 0) {
    minutesDisplay.textContent = String(minutes - 1).padStart(2, '0')
  } else if (minutes === 0 && seconds === 0) {
    minutesDisplay.textContent = '00'
  }
  if (seconds > 0) {
    secondsDisplay.textContent = String(seconds - 1).padStart(2, '0')
  } else if (minutes === 0 && seconds === 0) {
    secondsDisplay.textContent = '00'
  }
}

function countdown() {
  // Função utilizada para fazer uma contagem regressiva dos segundos
  //setTimeout serve para chamar uma função callback depois de um  tempo. Função + Mil milisegundos

  setTimeout(function () {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)

    // Este if tem que vir antes dos decrementos para ele verificar se os números são iguais a zero, pra poder continuar a função caso não sejam. Senão o decremento seguirá negativo
    if (minutes === 0 && seconds === 0) {
      return
    }

    if (seconds <= 0) {
      seconds = 60

      // Código para fazer o decremento dos minutos, adicionando o 0 na frente de números menores que 10
      updateTimerDisplay(minutes, 0)
    }

    //Seconds foi transformado numa string com padStart para incluir o 0 na frente de números menores que 10
    // São dois númericos, depois uma string de preenchimento
    updateTimerDisplay(0, seconds)

    // if criado para função parar de executar quando o contador chegar no zero

    //contdown foi chamado de novo para o decremento dos segundos ocorrer novamente
    countdown()
  }, 1000)

  return
}

buttonPlay.addEventListener('click', function () {
  buttonPlay.classList.add('colorButton')

  //Função contdown chamada. Ela foi criada fora deste escopo
  if (minutesDisplay.textContent > 0 && secondsDisplay.textContent == 0) {
    countdown()
  }
  //buttonPlay.classList.remove('colorButton')

  // Esse minutes deve ser colocado como 0 após o contdown para a contagem começar correta quando o up for apertado novamente
  //Ou seja, toda vez que aperto o play, o botão up salva o minutes como +1 pelo textcontent, e isso precisa ser zerado para a função rodar novamente
  minutes = 0
})

buttonStop.addEventListener('click', function () {
  // código para resetar a aplicação toda do 0 novamente
  //minutes = 0
  buttonPlay.classList.remove('colorButton')
  updateTimerDisplay(0, 0)
  //código abaixo foi refatorado acima
  //secondsDisplay.textContent = '00'
  //minutesDisplay.textContent = '00'
  minutes = 0

  stopMusic()
})

buttonCoffe.addEventListener('click', function () {
  buttonCoffe.classList.add('colorSound')
  buttonFire.classList.remove('colorSound')
  buttonFlorest.classList.remove('colorSound')
  buttonRain.classList.remove('colorSound')
  stopMusic()
  audioCoffe.play()
})

buttonFire.addEventListener('click', function () {
  buttonFire.classList.add('colorSound')
  buttonCoffe.classList.remove('colorSound')
  buttonFlorest.classList.remove('colorSound')
  buttonRain.classList.remove('colorSound')
  stopMusic()
  audioFire.play()
})

buttonFlorest.addEventListener('click', function () {
  buttonFire.classList.remove('colorSound')
  buttonCoffe.classList.remove('colorSound')
  buttonFlorest.classList.add('colorSound')
  buttonRain.classList.remove('colorSound')

  stopMusic()
  audioFlorest.play()
})

buttonRain.addEventListener('click', function () {
  buttonFire.classList.remove('colorSound')
  buttonCoffe.classList.remove('colorSound')
  buttonFlorest.classList.remove('colorSound')
  buttonRain.classList.add('colorSound')

  stopMusic()
  audiorain.play()
})

buttonUp.addEventListener('click', function () {
  minutes += 1
  const minutosFormatados = minutes.toString().padStart(2, '0')
  minutesDisplay.textContent = minutosFormatados
})

buttonDown.addEventListener('click', function () {
  if (minutes > 0) {
    updateTimerDisplay((minutes -= 1), 0)
    //minutes -= 1
    const minutosFormatados = minutes.toString().padStart(2, '0')
    minutesDisplay.textContent = minutosFormatados
  }
})

// Este áudio foi hospedado no git hub, para ele poder funcionar sem erro de segurança, deve ser colocado no final do caminho "?raw=true"
const audioFlorest = new Audio(
  'https://github.com/AdamyTechnology/sounds_For_Projects/blob/main/Floresta.wav?raw=true'
)

const audiorain = new Audio(
  'https://github.com/AdamyTechnology/sounds_For_Projects/blob/main/Chuva.wav?raw=true'
)

const audioCoffe = new Audio(
  'https://github.com/AdamyTechnology/sounds_For_Projects/blob/main/Cafeteria.wav?raw=true'
)

const audioFire = new Audio(
  'https://github.com/AdamyTechnology/sounds_For_Projects/blob/main/Lareira.wav?raw=true'
)

//audioFlorest.addEventListener('canplay', function() {
// console.log('Áudio pronto para reprodução!');
//});*/

/*function stopMusic() {
  audiorain.pause()
  audioFlorest.pause()
  audioCoffe.pause()
  audioFire.pause()
}*/

function stopMusic() {
  var audios = [audiorain, audioFlorest, audioCoffe, audioFire]
  audios.forEach(function (audio) {
    audio.pause()
    audio.currentTime = 0
  })
}

function passMusic() {}
