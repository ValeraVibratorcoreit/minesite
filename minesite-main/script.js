// Функция для эффекта печатающегося текста
function typewriterEffect(element, text, speed = 50, callback = null) {
    let i = 0;
    element.innerHTML = '';
    element.classList.add('cursor');
    
    const typing = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            element.classList.remove('cursor');
            if (callback) callback();
        }
    }, speed);
}

// Добавление эффекта "глюка" к терминальным строкам
function addGlitchEffect() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    terminalLines.forEach(line => {
        // Случайно добавляем глюки к некоторым строкам
        if (Math.random() > 0.7) {
            setInterval(() => {
                const originalText = line.textContent;
                const glitchChars = '!@#$%^&*()_+-={}[]|;:,.<>?';
                
                // Заменяем случайный символ на глюк-символ
                if (Math.random() > 0.9) {
                    const position = Math.floor(Math.random() * originalText.length);
                    const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    
                    setTimeout(() => {
                        line.textContent = 
                            originalText.substring(0, position) + 
                            glitchChar + 
                            originalText.substring(position + 1);
                        
                        // Восстанавливаем оригинальный текст
                        setTimeout(() => {
                            line.textContent = originalText;
                        }, 100);
                    }, 0);
                }
            }, 3000);
        }
    });
}

// Эффект свечения при наведении на проекты
function addProjectHoverEffect() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Добавляем свечение
            const randomColor = Math.random() > 0.5 ? 'rgba(255, 0, 255, 0.2)' : 'rgba(0, 255, 0, 0.2)';
            card.style.boxShadow = `0 0 20px ${randomColor}`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Возвращаем обычное состояние
            card.style.boxShadow = '';
        });
    });
}

// Эффект перемещения фона при движении мыши
function addBackgroundParallax() {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX / window.innerWidth) * 5;
        const moveY = (e.clientY / window.innerHeight) * 5;
        
        document.body.style.backgroundPosition = `${moveX}px ${moveY}px, ${25 + moveX}px ${25 + moveY}px`;
    });
}

// Добавляем случайные "киберпанк" сообщения в консоль
function addConsoleMessages() {
    const messages = [
        '%c SYSTEM ERROR: Memory corruption detected',
        '%c NEURAL LINK ESTABLISHED',
        '%c ACCESS GRANTED: Welcome to the matrix',
        '%c DATA BREACH DETECTED: Firewalls compromised',
        '%c SYSTEM: Reality subroutines initialized'
    ];
    
    const styles = [
        'color: red; font-size: 14px; font-weight: bold;',
        'color: #00ff00; font-size: 14px; font-weight: bold;',
        'color: cyan; font-size: 14px; font-weight: bold;',
        'color: orange; font-size: 14px; font-weight: bold;',
        'color: magenta; font-size: 14px; font-weight: bold;'
    ];
    
    // Вывод случайного сообщения при загрузке
    const randomIndex = Math.floor(Math.random() * messages.length);
    console.log(messages[randomIndex], styles[randomIndex]);
    
    // Периодически выводим новые сообщения
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        console.log(messages[randomIndex], styles[randomIndex]);
    }, 30000); // Каждые 30 секунд
}

// Обработчик переключателя темы
function setupThemeToggle() {
    const themeToggle = document.querySelector('.checkbox');
    const body = document.body;
    
    // Проверка предпочтительной темы пользователя или сохраненной темы
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDarkMode)) {
        body.classList.add('light-mode');
        themeToggle.checked = true;
    }
    
    // Обработчик события изменения положения переключателя
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Добавление интерактивности к редакторам кода
function setupCodeEditors() {
    const codeEditors = document.querySelectorAll('.code-editor');
    
    codeEditors.forEach(editor => {
        // Найдем иконку в этом редакторе
        const icon = editor.querySelector('.icon');
        
        icon.addEventListener('click', () => {
            // Простая анимация "копирования" кода
            const content = editor.querySelector('.editor-content');
            content.style.opacity = '0.5';
            
            setTimeout(() => {
                // Уведомление о копировании
                const notification = document.createElement('div');
                notification.classList.add('notification');
                notification.textContent = 'Код скопирован';
                editor.appendChild(notification);
                
                // Возвращаем непрозрачность
                content.style.opacity = '1';
                
                // Удаляем уведомление через некоторое время
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            }, 200);
        });
    });
}

// Управление экраном загрузки
function handlePreloader() {
    const preloader = document.querySelector('.preloader');
    
    // Имитируем загрузку сайта
    setTimeout(() => {
        preloader.style.opacity = '0';
        
        // После исчезновения, удаляем элемент из DOM
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2500); // Показываем загрузчик на 2.5 секунды для лучшего отображения анимации куба
}

// Функция инициализации
function init() {
    // Управление загрузчиком
    handlePreloader();
    
    // Настройка переключателя темы
    setupThemeToggle();
    
    // Настройка редакторов кода
    setupCodeEditors();
}

// Запускаем после загрузки страницы
document.addEventListener('DOMContentLoaded', init); 