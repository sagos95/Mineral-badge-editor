// Function to save data to localStorage
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.warn('Не удалось сохранить данные в localStorage:', error);
    }
}

// Function to load data from localStorage
function loadFromStorage(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value !== null ? value : defaultValue;
    } catch (error) {
        console.warn('Не удалось загрузить данные из localStorage:', error);
        return defaultValue;
    }
}