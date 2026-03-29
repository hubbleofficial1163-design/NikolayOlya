document.addEventListener('DOMContentLoaded', () => {
    // ========== МУЗЫКАЛЬНЫЙ ПЛЕЕР ==========
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');
    const audio = new Audio('111.mp3');
    audio.loop = true;
    let isPlaying = false;

    function updateMusicUI() {
        if (isPlaying) {
            musicIcon.src = 'music-off2.png';
            musicText.textContent = 'Выключить музыку';
        } else {
            musicIcon.src = 'music-on2.png';
            musicText.textContent = 'Включить музыку';
        }
    }

    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                updateMusicUI();
            } else {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        isPlaying = true;
                        updateMusicUI();
                    }).catch(error => {
                        alert('Нажмите кнопку еще раз, чтобы включить музыку');
                    });
                }
            }
        });
    }

    // ========== КАЛЕНДАРЬ ==========
    function generateCalendar() {
        const calendarDays = document.getElementById('calendarDays');
        if (!calendarDays) return;
        
        const firstDayOfAugust = new Date(2026, 7, 1);
        const startDayOfWeek = firstDayOfAugust.getDay();
        const daysInAugust = new Date(2026, 8, 0).getDate();
        let offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
        
        calendarDays.innerHTML = '';
        
        for (let i = 0; i < offset; i++) {
            const emptyCell = document.createElement('span');
            emptyCell.textContent = '';
            calendarDays.appendChild(emptyCell);
        }
        
        for (let day = 1; day <= daysInAugust; day++) {
            const dayCell = document.createElement('span');
            if (day === 27) {
                const dayNumber = document.createElement('div');
                dayNumber.textContent = day;
                dayNumber.className = 'wedding-day';
                dayCell.appendChild(dayNumber);
            } else {
                dayCell.textContent = day;
            }
            calendarDays.appendChild(dayCell);
        }
    }
    generateCalendar();

    // ========== ТАЙМЕР ==========
    function updateTimer() {
        const weddingDate = new Date(2026, 7, 27, 0, 0, 0);
        const now = new Date();
        const diff = weddingDate - now;
        
        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    updateTimer();
    setInterval(updateTimer, 1000);

    // ========== КНОПКА МАРШРУТ ==========
    const routeBtn = document.getElementById('routeBtn');
    if (routeBtn) {
        routeBtn.addEventListener('click', () => {
            window.open('https://yandex.ru/maps/org/usadba_valuyevo/235067855833?si=uq3bay3qjurv8vq6b5q2bn7n8c', '_blank');
        });
    }

    const routeBtn2 = document.getElementById('routeBtn2');
    if (routeBtn2) {
        routeBtn2.addEventListener('click', () => {
            window.open('https://t.me/+kpv0E9g78gU3MWQy', '_blank');
        });
    }

    // ========== ПРИСУТСТВИЕ (опрос) ==========
    // Аллергия: показ/скрытие поля
    const allergyRadios = document.querySelectorAll('.allergy-radio');
    const allergyDetails = document.querySelector('.allergy-details');
    
    if (allergyRadios.length && allergyDetails) {
        allergyRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const selectedAllergy = document.querySelector('input[name="allergy"]:checked');
                if (selectedAllergy && selectedAllergy.value === 'да') {
                    allergyDetails.style.display = 'block';
                } else {
                    allergyDetails.style.display = 'none';
                }
            });
        });
    }

    // ========== ОТПРАВКА ФОРМЫ (с изменением текста кнопки) ==========
    const surveyForm = document.getElementById('surveyForm');
    if (surveyForm) {
        surveyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('guestName')?.value.trim();
            const count = document.getElementById('guestCount')?.value.trim();
            const attendance = document.querySelector('input[name="attendance"]:checked')?.value;
            
            if (!name) {
                alert('Пожалуйста, укажите имя и фамилию');
                return;
            }
            
            if (!count) {
                alert('Пожалуйста, укажите количество гостей');
                return;
            }
            
            if (!attendance) {
                alert('Пожалуйста, подтвердите ваше присутствие');
                return;
            }
            
            // Собираем данные опроса
            const alcohol = Array.from(document.querySelectorAll('input[name="alcohol"]:checked')).map(cb => cb.value);
            const allergy = document.querySelector('input[name="allergy"]:checked')?.value;
            const allergyText = allergy === 'да' ? document.querySelector('.allergy-details')?.value : 'нет';
            const hot = document.querySelector('input[name="hot"]:checked')?.value;
            
            if (!hot) {
                alert('Пожалуйста, выберите предпочтения по горячему');
                return;
            }
            
            // Формируем сообщение с ответами
            let message = `Спасибо, ${name}!\n\n`;
            message += `Количество гостей: ${count}\n`;
            message += `Присутствие: ${attendance === 'точно буду' ? 'Точно буду' : 'К сожалению, не получится'}\n\n`;
            
            if (attendance === 'точно буду') {
                message += `Алкоголь: ${alcohol.length ? alcohol.join(', ') : 'не выбран'}\n`;
                message += `Аллергия: ${allergy === 'да' ? allergyText : 'нет'}\n`;
                message += `Горячее: ${hot}\n`;
            }
            
            // ========== ОТПРАВКА В ТАБЛИЦУ С ИЗМЕНЕНИЕМ ТЕКСТА КНОПКИ ==========
            const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_WHZ8GA4G3seUP5BT7ny1z2eYHKE4Wxcf2eKUIZH4y9zxMogsDYLWFjZdZXvu8_1i1A/exec';
            
            // Меняем текст кнопки
            const submitBtn = e.target.querySelector('.survey-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправляется...';
            submitBtn.disabled = true;
            
            // Отправляем данные
            const formData = new FormData();
            formData.append('name', name);
            formData.append('guestCount', count);
            formData.append('attendance', attendance);
            formData.append('alcohol', alcohol.join(', '));
            formData.append('allergy', allergy || 'нет');
            if (allergy === 'да' && allergyText && allergyText !== 'нет') {
                formData.append('allergyDetails', allergyText);
            }
            formData.append('hot', hot);
            
            try {
                await fetch(APPS_SCRIPT_URL, {
                    method: 'POST',
                    body: formData
                });
            } catch (err) {
                console.log('Ошибка отправки:', err);
            }
            
            // Возвращаем текст кнопки
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            // ========== КОНЕЦ ОТПРАВКИ ==========
            
            alert(message);
            
            // Сброс формы
            surveyForm.reset();
            if (allergyDetails) allergyDetails.style.display = 'none';
            
            // Сбрасываем выделение с радио-кнопок
            document.querySelectorAll('input[name="alcohol"]:checked').forEach(cb => cb.checked = false);
            document.querySelectorAll('input[name="allergy"]:checked').forEach(rb => rb.checked = false);
            document.querySelectorAll('input[name="hot"]:checked').forEach(rb => rb.checked = false);
        });
    }

    // ========== HERO ПЛАВНОЕ ПОЯВЛЕНИЕ ==========
    const heroImage = document.querySelector('.hero__image');
    if (heroImage && !heroImage.complete) {
        heroImage.style.opacity = '0';
        heroImage.addEventListener('load', () => {
            heroImage.style.transition = 'opacity 0.3s ease';
            heroImage.style.opacity = '1';
        });
    } else if (heroImage && heroImage.complete) {
        heroImage.style.opacity = '1';
    }

    console.log('Сайт-приглашение загружен');
});
