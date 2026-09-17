/* =====================================================
   EDUCA MÍDIA
   SCRIPT.JS
   ===================================================== */


/* =====================================================
   ELEMENTOS
   ===================================================== */

const body = document.body;

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

const themeToggle = document.getElementById("themeToggle");
const fontIncrease = document.getElementById("fontIncrease");

const backTop = document.getElementById("backTop");

const year = document.getElementById("year");


/* =====================================================
   ANO AUTOMÁTICO
   ===================================================== */

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =====================================================
   MENU MOBILE
   ===================================================== */

if (menuButton) {

    menuButton.addEventListener("click", () => {

        const active = nav.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            active
        );

        menuButton.innerHTML = active
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });

}


/* Fecha o menu quando clicar em um link */

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });

});


/* =====================================================
   TEMA CLARO / ESCURO
   ===================================================== */

const savedTheme = localStorage.getItem("educa-theme");

if (savedTheme === "dark") {

    body.classList.add("dark");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const isDark =
        body.classList.contains("dark");

    localStorage.setItem(
        "educa-theme",
        isDark ? "dark" : "light"
    );

    themeToggle.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

});


/* =====================================================
   AUMENTAR FONTE
   ===================================================== */

fontIncrease.addEventListener("click", () => {

    body.classList.toggle("large-text");

    const active =
        body.classList.contains("large-text");

    fontIncrease.setAttribute(
        "aria-label",
        active
            ? "Voltar ao tamanho normal"
            : "Aumentar tamanho do texto"
    );

});


/* =====================================================
   BOTÃO VOLTAR AO TOPO
   ===================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("visible");

    } else {

        backTop.classList.remove("visible");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================================
   ANIMAÇÕES AO ENTRAR NA TELA
   ===================================================== */

const revealElements = document.querySelectorAll(
    ".about-card, .concept-card, .step, .source-card, .rights-panel, .marco-civil"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});


const observer = new IntersectionObserver(
    (entries, observerInstance) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observerInstance.unobserve(
                    entry.target
                );

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    observer.observe(element);
});


/* =====================================================
   QUIZ
   ===================================================== */

const questions = [

    {
        question:
            "Você recebe uma notícia muito surpreendente em um grupo. O que deve fazer primeiro?",

        answers: [
            "Compartilhar rapidamente para alertar outras pessoas.",
            "Verificar autoria, data e procurar outras fontes.",
            "Acreditar porque veio de alguém conhecido.",
            "Observar apenas o número de curtidas."
        ],

        correct: 1
    },


    {
        question:
            "Uma publicação possui uma imagem chocante, mas não informa quando ou onde ela foi feita. O que fazer?",

        answers: [
            "Compartilhar porque a imagem parece verdadeira.",
            "Assumir que a imagem é atual.",
            "Investigar a origem e o contexto da imagem.",
            "Perguntar apenas para amigos."
        ],

        correct: 2
    },


    {
        question:
            "Qual afirmação é mais adequada sobre viralização?",

        answers: [
            "Se muitas pessoas compartilharam, então é verdade.",
            "Conteúdos virais sempre foram verificados.",
            "Popularidade não é prova de veracidade.",
            "Algoritmos garantem que informações falsas desapareçam."
        ],

        correct: 2
    },


    {
        question:
            "Qual atitude demonstra responsabilidade digital?",

        answers: [
            "Compartilhar antes de ler o conteúdo.",
            "Evitar fontes que discordam da sua opinião.",
            "Verificar informações importantes antes de divulgá-las.",
            "Publicar algo falso se for apenas uma brincadeira."
        ],

        correct: 2
    },


    {
        question:
            "O que significa desenvolver pensamento crítico na internet?",

        answers: [
            "Desconfiar de absolutamente tudo.",
            "Aceitar apenas informações que confirmam nossas opiniões.",
            "Analisar evidências, contexto, autoria e diferentes fontes.",
            "Nunca formar opiniões."
        ],

        correct: 2
    }

];


let currentQuestion = 0;
let score = 0;


const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const counterElement =
    document.getElementById("questionCounter");

const progressFill =
    document.getElementById("progressFill");

const quizContent =
    document.getElementById("quizContent");

const quizResult =
    document.getElementById("quizResult");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");

const restartQuiz =
    document.getElementById("restartQuiz");


/* Carrega pergunta */

function loadQuestion() {

    const question =
        questions[currentQuestion];

    questionElement.textContent =
        question.question;

    counterElement.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    const progress =
        ((currentQuestion + 1) /
        questions.length) * 100;

    progressFill.style.width =
        `${progress}%`;

    answersElement.innerHTML = "";

    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.className =
                "answer";

            button.type = "button";

            button.innerHTML = `
                <span class="answer-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span>${answer}</span>
            `;

            button.addEventListener(
                "click",
                () => selectAnswer(index, button)
            );

            answersElement.appendChild(button);

        }
    );
}


/* Resposta */

function selectAnswer(index, button) {

    const question =
        questions[currentQuestion];

    const allAnswers =
        document.querySelectorAll(".answer");

    allAnswers.forEach(
        answer => {
            answer.disabled = true;
        }
    );


    if (index === question.correct) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

        allAnswers[
            question.correct
        ].classList.add("correct");

    }


    setTimeout(() => {

        currentQuestion++;

        if (
            currentQuestion <
            questions.length
        ) {

            loadQuestion();

        } else {

            showResult();

        }

    }, 900);

}


/* Resultado */

function showResult() {

    quizContent.hidden = true;

    quizResult.hidden = false;

    progressFill.style.width = "100%";

    let title;
    let text;


    if (score === 5) {

        title = "Excelente!";

        text =
            "Você demonstrou domínio das principais práticas de educação midiática. Continue verificando e compartilhando informação com responsabilidade.";

    }

    else if (score >= 3) {

        title = "Bom caminho!";

        text =
            `Você acertou ${score} de 5 questões. Já possui boas práticas, mas ainda pode desenvolver mais atenção à autoria, contexto e verificação.`;

    }

    else {

        title = "Hora de investigar mais!";

        text =
            `Você acertou ${score} de 5 questões. O mais importante é que pensamento crítico pode ser desenvolvido. Volte às dicas do Educa Mídia e tente novamente.`;

    }


    resultTitle.textContent = title;
    resultText.textContent = text;

}


/* Reiniciar */

restartQuiz.addEventListener(
    "click",
    () => {

        currentQuestion = 0;

        score = 0;

        quizContent.hidden = false;

        quizResult.hidden = true;

        loadQuestion();

    }
);


/* Inicializa */

loadQuestion();


/* =====================================================
   LINKS EXTERNOS
   ===================================================== */

document.querySelectorAll(
    'a[target="_blank"]'
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            console.log(
                "Abrindo fonte externa:",
                link.href
            );

        }
    );

});


/* =====================================================
   CONSOLE
   ===================================================== */

console.log(
    "%cEduca Mídia",
    "font-size: 24px; font-weight: bold; color: #5b5ff0;"
);

console.log(
    "Projeto acadêmico sobre ética, diversidade, direitos humanos e educação midiática."
);