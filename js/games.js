// Lawn Mowing Game
let canvas = null;
let ctx = null;
let gameRunning = false;
let timeLeft = 60;
let mowedCells = new Set();
let timer = null;
let bestScore = localStorage.getItem('bestMowerScore') || 0;

const GRID_SIZE = 20; // Size of each mowable cell

// Initialize canvas when available
function initCanvas() {
    canvas = document.getElementById('mowerGame');
    if (!canvas) {
        console.error('Canvas element not found');
        return false;
    }
    
    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get canvas context');
        return false;
    }
    
    const setCanvasSize = () => {
        const maxWidth = Math.min(600, window.innerWidth - 40);
        canvas.width = maxWidth;
        canvas.height = 400;
        console.log('Canvas size set to:', canvas.width, 'x', canvas.height);
        if (!gameRunning) {
            drawGame();
        }
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Update best score display
    const bestScoreElement = document.getElementById('bestScore');
    if (bestScoreElement) {
        bestScoreElement.textContent = bestScore;
    }
    
    // Add click handler
    canvas.addEventListener('click', (e) => {
        if (!gameRunning) {
            console.log('Click ignored - game not running');
            return;
        }
        
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / GRID_SIZE);
        const y = Math.floor((e.clientY - rect.top) / GRID_SIZE);
        
        console.log('Mowing cell:', x, y);
        mowedCells.add(`${x},${y}`);
        drawGame();
        updateStats();
    });
    
    console.log('Canvas initialized successfully');
    return true;
}

function drawGame() {
    if (!ctx || !canvas) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grass background
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines (subtle)
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 1;
    
    for (let x = 0; x < canvas.width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    for (let y = 0; y < canvas.height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Draw mowed sections
    ctx.fillStyle = '#8B7355';
    mowedCells.forEach(cell => {
        const [x, y] = cell.split(',').map(Number);
        ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
    
    // Draw darker stripes on mowed sections for realism
    ctx.fillStyle = '#7A6347';
    mowedCells.forEach(cell => {
        const [x, y] = cell.split(',').map(Number);
        for (let i = 0; i < GRID_SIZE; i += 4) {
            ctx.fillRect(x * GRID_SIZE + i, y * GRID_SIZE, 2, GRID_SIZE);
        }
    });
}

function startGame() {
    if (gameRunning) return;
    
    gameRunning = true;
    timeLeft = 60;
    mowedCells.clear();
    
    updateStats();
    drawGame();
    
    timer = setInterval(() => {
        timeLeft--;
        updateStats();
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameRunning = false;
    clearInterval(timer);
    
    const score = calculateScore();
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestMowerScore', bestScore);
        const bestScoreEl = document.getElementById('bestScore');
        if (bestScoreEl) bestScoreEl.textContent = bestScore;
        
        alert(`🎉 New High Score! You mowed ${score}% of the lawn!\n\nGreat job! At Choppalawnz, our professionals can mow your entire lawn in no time!`);
    } else {
        alert(`⏰ Time's Up! You mowed ${score}% of the lawn.\n\nYour best score: ${bestScore}%\n\nWant us to handle the real thing? Get a quote from Choppalawnz!`);
    }
}

function resetGame() {
    gameRunning = false;
    clearInterval(timer);
    timeLeft = 60;
    mowedCells.clear();
    updateStats();
    drawGame();
}

function calculateScore() {
    if (!canvas) return 0;
    const totalCells = Math.floor(canvas.width / GRID_SIZE) * Math.floor(canvas.height / GRID_SIZE);
    return Math.round((mowedCells.size / totalCells) * 100);
}

function updateStats() {
    const percentMowedEl = document.getElementById('percentMowed');
    const timeLeftEl = document.getElementById('timeLeft');
    if (percentMowedEl) percentMowedEl.textContent = calculateScore();
    if (timeLeftEl) timeLeftEl.textContent = timeLeft;
}

// Initialize game display
function initGameDisplay() {
    if (canvas && ctx) {
        drawGame();
    }
}

// Lawn Care Quiz
const quizQuestions = [
    {
        question: "When was the first lawn mower invented?",
        options: ["1830", "1850", "1900", "1920"],
        correct: 0,
        fact: "The first lawn mower was invented by Edwin Beard Budding in 1830 in England. It was originally designed to cut grass on sports grounds and large gardens."
    },
    {
        question: "How often should you mow your lawn during peak growing season?",
        options: ["Every 2 weeks", "Once a week", "Twice a week", "Every 3 weeks"],
        correct: 1,
        fact: "During peak growing season (spring and early summer), lawns typically need mowing once a week to maintain optimal health and appearance."
    },
    {
        question: "What is the ideal mowing height for most lawn grasses?",
        options: ["1-2 cm", "3-5 cm", "6-8 cm", "9-10 cm"],
        correct: 1,
        fact: "Most lawn grasses thrive at 3-5 cm (1.2-2 inches). This height promotes deep root growth and helps shade out weeds."
    },
    {
        question: "What does the 'one-third rule' in lawn mowing mean?",
        options: [
            "Mow only one-third of your lawn at a time",
            "Never remove more than one-third of the grass blade length",
            "Water for one-third of the recommended time",
            "Fertilize one-third as often"
        ],
        correct: 1,
        fact: "The one-third rule means you should never cut more than one-third of the grass blade length in a single mowing. This prevents stress and keeps your lawn healthy."
    },
    {
        question: "Which country has the most lawns per capita?",
        options: ["United States", "United Kingdom", "Australia", "New Zealand"],
        correct: 0,
        fact: "The United States has approximately 40 million acres of lawn, making it the single largest irrigated crop in the country!"
    },
    {
        question: "What time of day is best for mowing your lawn?",
        options: ["Early morning", "Mid-morning to late afternoon", "Evening", "Night"],
        correct: 1,
        fact: "Mid-morning to late afternoon is ideal. The grass is dry (reducing disease risk), but it's not the hottest part of the day, which can stress the grass."
    },
    {
        question: "What is 'grasscycling'?",
        options: [
            "Riding a bike on grass",
            "Leaving grass clippings on the lawn after mowing",
            "Planting grass in cycles",
            "Rotating different grass types"
        ],
        correct: 1,
        fact: "Grasscycling means leaving grass clippings on the lawn. They decompose quickly and return valuable nutrients to the soil, reducing fertilizer needs by up to 25%."
    },
    {
        question: "How much of lawn grass is water?",
        options: ["50%", "65%", "80%", "95%"],
        correct: 2,
        fact: "Grass is approximately 80% water, which is why proper watering is crucial for lawn health."
    },
    {
        question: "What was the original purpose of lawns in medieval times?",
        options: [
            "Decoration",
            "To spot approaching enemies",
            "Growing herbs",
            "Animal grazing"
        ],
        correct: 1,
        fact: "Medieval castles maintained clear, short grass around their perimeters to easily spot approaching enemies. This was a defensive strategy!"
    },
    {
        question: "Which grass type is most common in New Zealand lawns?",
        options: ["Bermuda grass", "Ryegrass", "St. Augustine grass", "Zoysia grass"],
        correct: 1,
        fact: "Ryegrass (both perennial and annual varieties) is the most common lawn grass in New Zealand due to its adaptability to our climate."
    },
    {
        question: "How many blades of grass are in an average lawn?",
        options: ["1 million", "6 million", "60 million", "600 million"],
        correct: 2,
        fact: "An average-sized lawn contains approximately 60 million individual grass blades per 1,000 square feet!"
    },
    {
        question: "What should you do with your mower blades regularly?",
        options: ["Paint them", "Sharpen them", "Replace them weekly", "Soak them in oil"],
        correct: 1,
        fact: "Mower blades should be sharpened at least once per season (or every 25 hours of use). Sharp blades make clean cuts that help grass stay healthy."
    },
    {
        question: "Which direction should you mow your lawn?",
        options: [
            "Always north to south",
            "In circles",
            "Change direction each time",
            "Direction doesn't matter"
        ],
        correct: 2,
        fact: "You should change your mowing pattern each time to prevent soil compaction and grass from developing a 'grain' that leans in one direction."
    },
    {
        question: "What percentage of household water usage goes to lawns in summer?",
        options: ["10%", "30%", "50%", "70%"],
        correct: 2,
        fact: "In many households, up to 50% of water usage during summer months goes to lawn irrigation. Using efficient watering practices can save significant water and money."
    },
    {
        question: "What is the world record for the largest lawn mowing?",
        options: [
            "50 hectares",
            "100 hectares",
            "145 hectares",
            "200 hectares"
        ],
        correct: 2,
        fact: "The world record for the largest area cut by a lawn mower in 24 hours is 145 hectares (358 acres), set in 2018 in the UK!"
    }
];

function renderQuiz() {
    const container = document.getElementById('quizContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    quizQuestions.forEach((q, index) => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        questionCard.innerHTML = `
            <div class="question-number">Question ${index + 1} of ${quizQuestions.length}</div>
            <div class="question-text">${q.question}</div>
            <div class="answer-options">
                ${q.options.map((option, optIndex) => `
                    <div class="answer-option" data-question="${index}" data-answer="${optIndex}">
                        ${String.fromCharCode(65 + optIndex)}. ${option}
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(questionCard);
    });
    
    // Add click handlers
    document.querySelectorAll('.answer-option').forEach(option => {
        option.addEventListener('click', function() {
            const question = this.dataset.question;
            // Remove selected class from siblings
            document.querySelectorAll(`[data-question="${question}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });
}

function submitQuiz() {
    // Check if all questions are answered
    const unansweredQuestions = [];
    quizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`.answer-option[data-question="${index}"].selected`);
        if (!selectedOption) {
            unansweredQuestions.push(index + 1);
        }
    });
    
    if (unansweredQuestions.length > 0) {
        alert(`Please answer all questions before submitting!\n\nUnanswered questions: ${unansweredQuestions.join(', ')}`);
        // Scroll to first unanswered question
        const firstUnanswered = document.querySelector(`.question-card:nth-child(${unansweredQuestions[0]})`);
        if (firstUnanswered) {
            firstUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstUnanswered.style.border = '3px solid #ff6b9d';
            setTimeout(() => {
                firstUnanswered.style.border = '';
            }, 2000);
        }
        return;
    }
    
    let score = 0;
    const answers = [];
    
    // Check each question
    quizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`.answer-option[data-question="${index}"].selected`);
        if (selectedOption) {
            const answer = parseInt(selectedOption.dataset.answer);
            answers.push(answer);
            
            if (answer === q.correct) {
                score++;
                selectedOption.classList.add('correct');
            } else {
                selectedOption.classList.add('incorrect');
                // Highlight correct answer
                document.querySelector(`[data-question="${index}"][data-answer="${q.correct}"]`).classList.add('correct');
            }
        }
    });
    
    // Disable further clicking
    document.querySelectorAll('.answer-option').forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Show results
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const resultsDiv = document.getElementById('quizResults');
    
    let message = '';
    let emoji = '';
    if (percentage >= 90) {
        message = 'Lawn Care Expert! 🌟';
        emoji = '🏆';
    } else if (percentage >= 75) {
        message = 'Grass Guru!';
        emoji = '🎓';
    } else if (percentage >= 60) {
        message = 'Green Thumb in Training!';
        emoji = '🌱';
    } else if (percentage >= 40) {
        message = 'Getting There!';
        emoji = '🌿';
    } else {
        message = 'Keep Learning!';
        emoji = '📚';
    }
    
    let funFacts = '<div class="fun-fact"><strong>Did You Know?</strong><br>';
    quizQuestions.slice(0, 3).forEach((q, i) => {
        funFacts += `<br>${q.fact}`;
    });
    funFacts += '</div>';
    
    resultsDiv.innerHTML = `
        <div class="quiz-results">
            <h3>${emoji} ${message}</h3>
            <div class="score-display">${score}/${quizQuestions.length}</div>
            <p style="font-size: 1.5rem; margin: 1rem 0;">${percentage}% Correct!</p>
            <p>You answered ${score} out of ${quizQuestions.length} questions correctly.</p>
            ${funFacts}
            <div style="margin-top: 2rem;">
                <a href="contact.html" class="btn" style="background: white; color: var(--primary-color); padding: 1rem 2rem; font-weight: 600;">
                    Get Professional Lawn Care
                </a>
            </div>
        </div>
    `;
    
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize quiz on page load
function initQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        renderQuiz();
    }
}

// Initialize everything when DOM is ready
function initializeGames() {
    console.log('Initializing games...');
    const canvasInitialized = initCanvas();
    console.log('Canvas initialized:', canvasInitialized);
    initQuiz();
    console.log('Quiz initialized');
    
    // Draw initial game state
    if (canvasInitialized) {
        drawGame();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGames);
} else {
    initializeGames();
}
