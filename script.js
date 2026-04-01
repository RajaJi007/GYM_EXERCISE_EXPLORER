const apiKey = CCBJD23xJBcF0Ozq8jX7yZ6wigQ1ABPGqPWXy2MZ;
const container = document.getElementById('exercise-container');
const loadingIndicator = document.getElementById('loading');

async function fetchExercises(muscle = 'biceps') {
    loadingIndicator.style.display = 'block';
    container.innerHTML = '';

    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
            headers: { 'X-Api-Key': apiKey }
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        displayExercises(data);
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p>Failed to load exercises. Please try again later.</p>';
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function displayExercises(exercises) {
    if (exercises.length === 0) {
        container.innerHTML = '<p>No exercises found.</p>';
        return;
    }

    exercises.map(exercise => {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        card.innerHTML = `
            <h3>${exercise.name}</h3>
            <p><strong>Muscle:</strong> ${exercise.muscle}</p>
            <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
            <p>${exercise.instructions.substring(0, 150)}...</p>
        `;
        container.appendChild(card);
    });
}
fetchExercises();
