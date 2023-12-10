// References
const quizdisplay = document.getElementById("display");
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let wrapper = document.getElementById("wrapper");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Question and Options array
// Add questions, options and correct option in below format
const quizArray = [
  {
    id: "0",
    question:
      "Ahlaki bir karar vermenin temelini aşağıdakilerden hangisi oluşturur?",
    options: [
      "Duygusal tepkiler",
      "Toplumsal beklentiler",
      " Mantıksal düşünme",
      "Rastgele seçim",
    ],
    correct: "Mantıksal düşünme",
  },
  {
    id: "1",
    question:
      "Ahlaki bir davranışın sürdürülebilir olması için aşağıdakilerden hangisi önemlidir?",
    options: [
      "Anlık memnuniyet",
      "Toplumun onayı",
      "Uzun vadeli sonuçlar",
      "İsteklerin tatmini",
    ],
    correct: "Uzun vadeli sonuçlar",
  },
  {
    id: "2",
    question: "Ahlaki bir liderin temel özellikleri nelerdir?",
    options: [
      "Manipülasyon ve güç kullanımı",
      "Şeffaflık ve dürüstlük",
      "Kibir ve otoriterlik",
      "Popülerlik ve yüzeysel iletişim",
    ],
    correct: "Şeffaflık ve dürüstlük",
  },
  {
    id: "3",
    question:
      "Ahlaki bir çatışma durumunda aşağıdakilerden hangisi çözüm için en uygun yaklaşımı temsil eder?",
    options: [
      "Güç kullanımı",
      "İletişim ve uzlaşma",
      "Kaçma ve sorunu görmezden gelme",
      "Diğerlerine baskı uygulama",
    ],
    correct: "İletişim ve uzlaşma",
  },
  {
    id: "4",
    question:
      "Ahlaki bir değer sistemini geliştirmek için hangi adım atılmalıdır?",
    options: [
      "Toplumun beklentilerini körü körüne kabul etmek",
      "Kişisel değerleri sorgulamak ve anlamak",
      "Sadece kâr hedeflemek",
      "Duygusal tepkilere dayalı kararlar almak",
    ],
    correct: "Kişisel değerleri sorgulamak ve anlamak",
  },
  {
    id: "5",
    question: "Ahlaki bir sorumluluğun gerektirdiği davranışlar nelerdir?",
    options: [
      "Sorunları başkalarına yüklemek",
      "Kişisel çıkarları her şeyin önünde tutmak",
      "Toplumsal etkileri göz ardı etmek",
      "Doğruluk ve dürüstlüğü benimsemek",
    ],
    correct: "Doğruluk ve dürüstlüğü benimsemek",
  },
  {
    id: "6",
    question: "Ahlaki bir karar verme sürecinde empati neden önemlidir?",
    options: [
      "Başkalarının duygularını manipüle etmek için",
      "Objektif bir perspektif kazanmak için",
      "Kişisel çıkarları korumak için",
      "Sorunları görmezden gelmek için",
    ],
    correct: "Objektif bir perspektif kazanmak için",
  },
  {
    id: "7",
    question:
      "Ahlaki bir liderin takipçileri üzerinde olumlu bir etki bırakabilmesi için hangi özelliklere sahip olması gerekir?",
    options: [
      "Sadece kendi çıkarlarını düşünmek",
      "İnsanları manipüle etmek",
      "Adalet ve eşitlik ilkesine bağlı olmak",
      "Otoriter bir liderlik tarzını benimsemek",
    ],
    correct: "Adalet ve eşitlik ilkesine bağlı olmak",
  },
  {
    id: "8",
    question:
      "Ahlaki bir liderin organizasyonunda ahlaki bir kültür oluşturmak için yapması gereken ilk adım nedir?",
    options: [
      "Güç kullanımını teşvik etmek",
      "Eğitim ve şeffaflığı vurgulamak",
      "Sadece performansa odaklanmak",
      "Değişime karşı direnmek",
    ],
    correct: "Eğitim ve şeffaflığı vurgulamak",
  },
  {
    id: "9",
    question:
      "Ahlaki bir sorunla karşılaşıldığında, aşağıdakilerden hangisi en önemli rehber olmalıdır?",
    options: [
      "Popüler görüşlere uymak",
      "Kişisel çıkarları korumak",
      "Etik ilkelere bağlı kalmak",
      "Kaçınma ve sorunları görmezden gelme",
    ],
    correct: "Etik ilkelere bağlı kalmak",
  },
  {
    id: "10",
    question:
      "Ahlaki bir karar alırken, aşağıdakilerden hangisi göz önünde bulundurulmalıdır?",
    options: [
      "Hızlı bir şekilde karar almak",
      "Alternatif çözümleri değerlendirmek",
      "Başkalarının fikirlerini yok saymak",
      "Kişisel çıkarları önceliklendirmek",
    ],
    correct: "Alternatif çözümleri değerlendirmek",
  },
  {
    id: "11",
    question: "Ahlaki bir liderin tutarlı olması neden önemlidir?",
    options: [
      "Manipülasyonu kolaylaştırmak için",
      "Takipçileri kafa karışıklığına düşürmek için",
      "Güven ve saygıyı güçlendirmek için",
      "Sadece kendi çıkarlarını korumak için",
    ],
    correct: "Güven ve saygıyı güçlendirmek için",
  },
  {
    id: "12",
    question:
      "Ahlaki bir zorlukla karşılaşıldığında, aşağıdaki yaklaşımlardan hangisi en etik olmayan bir davranışı temsil eder?",
    options: [
      "Sorunu çözmek için dürüst ve adil bir çözüm aramak",
      "Sorumluluğu başkalarına atmak ve sorunun üstesinden gelmemek",
      "Başkalarını manipüle ederek kendi çıkarlarını korumak",
      "Empati kurarak farklı perspektifleri anlamaya çalışmak",
    ],
    correct: "Başkalarını manipüle ederek kendi çıkarlarını korumak",
  },
  {
    id: "13",
    question: "Ahlaki bir sorumluluğun iş dünyasında nasıl uygulanabilir?",
    options: [
      "Sadece kâr hedeflemek",
      "Çalışanların haklarını ihmal etmek",
      "Çevresel etkileri göz ardı etmek",
      "Etik iş uygulamalarını benimsemek",
    ],
    correct: "Etik iş uygulamalarını benimsemek",
  },
  {
    id: "14",
    question:
      "Ahlaki bir liderin etik değerlere uygun bir karar alabilmesi için neden bilgi ve bilinç önemlidir?",
    options: [
      "Duygusal tepkilerle hareket etmek için",
      "Sorumluluktan kaçmak için",
      "Etik kuralları görmezden gelmek için",
      "Bilinçli ve bilgili bir şekilde hareket etmek için",
    ],
    correct: "Bilinçli ve bilgili bir şekilde hareket etmek için",
  },
];
// restart game
restart.addEventListener("click", () => {
  inital(); //call initial function
  wrapper.classList.remove("hide");
  scoreContainer.classList.add("hide");
});
// Next button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      wrapper.classList.add("hide");
      scoreContainer.classList.remove("hide");
      // user score
      userScore.innerHTML =
        "Puanınız " + questionCount + " üzerinden " + scoreCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " / " + quizArray.length + " Soru";
      //display Quiz
      quizDisplay(questionCount);
      //count=11 (so that it starts with 10)
      count = 11;
      //clear interval for next question
      clearInterval(countdown);
      //display timer (start countdown)
      timerDisplay();
    }
  })
);
// Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      //when countdown reaches 0 clearInterval and go to next question
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};
//display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container_mid");
  //hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};
// Quiz creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container_mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " / " + quizArray.length + " Soru";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
<button class="option-div" onclick="checker(this)">${i.options[0]}</button>
<button class="option-div" onclick="checker(this)">${i.options[1]}</button>
<button class="option-div" onclick="checker(this)">${i.options[2]}</button>
<button class="option-div" onclick="checker(this)">${i.options[3]}</button>

`;
    quizContainer.appendChild(div);
  }
}
// Check option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container_mid")[questionCount];
  let options = question.querySelectorAll(".option-div");
  //if user's clicked anaswer==correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    //green background and score increment
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    //red background
    userOption.classList.add("inCorrect");
    //for marking green(correct)
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  //clear interval(stop timer)
  clearInterval(countdown);
  //disabled all options
  options.forEach((element) => {
    element.disabled = true;
  });
}
//initial setup
function inital() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  clearInterval(countdown);
  count = 11;
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}
//Start Button Code
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  wrapper.classList.remove("hide");
  inital();
});

window.onload = () => {
  startScreen.classList.remove("hide");
  wrapper.classList.add("hide");
};
