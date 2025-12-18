// /src/components/global/api.js


import axios from 'axios';

// Базовый URL API
const API_BASE_URL = 'http://localhost:8000/api';

// Создаем экземпляр axios с настройками
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления токена к запросам
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Токен истек или невалидный
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * API для работы с пользователями
 */
export const userApi = {
  /**
   * Получить информацию о пользователе по ID
   * @param {number} userId - ID пользователя
   * @returns {Promise<Object>} Данные пользователя
   */
  getUserInfo: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  },
};

/**
 * API для работы с турнирами
 */
export const tournamentApi = {
  /**
   * Получить список всех турниров
   * @param {Object} filters - Фильтры для турниров
   * @param {string} filters.status - Статус турнира (опционально)
   * @returns {Promise<Array>} Список турниров
   */
  getAllTournaments: async (filters = {}) => {
    try {
      const params = {};
      if (filters.status) {
        params.status = filters.status;
      }
      
      const response = await api.get('/tournaments', { params });
      console.log(response.data);
      return response.data.tournaments || [];
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      throw error;
    }
  },

  /**
   * Получить информацию о конкретном турнире
   * @param {number} tournamentId - ID турнира
   * @returns {Promise<Object>} Данные турнира
   */
  getTournamentById: async (tournamentId) => {
    try {
      const response = await api.get(`/tournaments/${tournamentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tournament ${tournamentId}:`, error);
      throw error;
    }
  },

  /**
   * Создать новый турнир
   * @param {Object} tournamentData - Данные для создания турнира
   * @param {string} tournamentData.name - Название турнира
   * @param {string} tournamentData.description - Описание турнира
   * @param {string} tournamentData.game - Игра
   * @param {string} tournamentData.format - Формат турнира
   * @param {number} tournamentData.max_participants - Максимальное количество участников
   * @param {string} tournamentData.start_date - Дата начала
   * @param {string} tournamentData.end_date - Дата окончания
   * @returns {Promise<Object>} Результат создания
   */
  createTournament: async (tournamentData) => {
    try {
      const response = await api.post('/tournaments/create', tournamentData);
      return response.data;
    } catch (error) {
      console.error('Error creating tournament:', error);
      throw error;
    }
  },

  /**
   * Зарегистрироваться на турнир
   * @param {number} tournamentId - ID турнира
   * @returns {Promise<Object>} Результат регистрации
   */
  joinTournament: async (tournamentId) => {
    try {
      const response = await api.post(`/tournaments/${tournamentId}/sign`);
      return response.data;
    } catch (error) {
      console.error(`Error joining tournament ${tournamentId}:`, error);
      throw error;
    }
  },

  /**
   * Отменить регистрацию на турнир
   * @param {number} tournamentId - ID турнира
   * @returns {Promise<Object>} Результат отмены
   */
  leaveTournament: async (tournamentId) => {
    try {
      const response = await api.delete(`/tournaments/${tournamentId}/sign`);
      return response.data;
    } catch (error) {
      console.error(`Error leaving tournament ${tournamentId}:`, error);
      throw error;
    }
  },

  /**
   * Получить список участников турнира
   * @param {number} tournamentId - ID турнира
   * @returns {Promise<Array>} Список участников
   */
  getTournamentParticipants: async (tournamentId) => {
    try {
      const response = await api.get(`/tournaments/${tournamentId}/participants`);
      return response.data.participants || [];
    } catch (error) {
      console.error(`Error fetching participants for tournament ${tournamentId}:`, error);
      throw error;
    }
  },

  /**
   * Обновить информацию о турнире
   * @param {number} tournamentId - ID турнира
   * @param {Object} updateData - Данные для обновления
   * @returns {Promise<Object>} Обновленный турнир
   */
  updateTournament: async (tournamentId, updateData) => {
    try {
      const response = await api.put(`/tournaments/${tournamentId}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating tournament ${tournamentId}:`, error);
      throw error;
    }
  },

  /**
   * Удалить турнир
   * @param {number} tournamentId - ID турнира
   * @returns {Promise<Object>} Результат удаления
   */
  deleteTournament: async (tournamentId) => {
    try {
      const response = await api.delete(`/tournaments/${tournamentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting tournament ${tournamentId}:`, error);
      throw error;
    }
  },

  /**
   * Начать турнир
   * @param {number} tournamentId - ID турнира
   * @returns {Promise<Object>} Результат
   */
  startTournament: async (tournamentId) => {
    try {
      const response = await api.post(`/tournaments/${tournamentId}/start`);
      return response.data;
    } catch (error) {
      console.error(`Error starting tournament ${tournamentId}:`, error);
      throw error;
    }
  },

  /**
   * Завершить турнир
   * @param {number} tournamentId - ID турнира
   * @returns {Promise<Object>} Результат
   */
  finishTournament: async (tournamentId) => {
    try {
      const response = await api.post(`/tournaments/${tournamentId}/finish`);
      return response.data;
    } catch (error) {
      console.error(`Error finishing tournament ${tournamentId}:`, error);
      throw error;
    }
  },
};

/**
 * API для аутентификации
 */
export const authApi = {
  /**
   * Вход в систему
   * @param {string} email - Email пользователя
   * @param {string} password - Пароль
   * @returns {Promise<Object>} Токен и данные пользователя
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      }
      
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  /**
   * Регистрация нового пользователя
   * @param {Object} userData - Данные пользователя
   * @returns {Promise<Object>} Результат регистрации
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  /**
   * Выход из системы
   */
  logout: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
  },

  /**
   * Получить текущего пользователя
   * @returns {Promise<Object>} Данные текущего пользователя
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  /**
   * Обновить токен
   * @returns {Promise<Object>} Новый токен
   */
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      }
      
      return response.data;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  },
};

/**
 * Вспомогательные функции
 */
export const apiUtils = {
  /**
   * Установить токен вручную
   * @param {string} token - JWT токен
   */
  setToken: (token) => {
    localStorage.setItem('token', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
  },

  /**
   * Проверить, авторизован ли пользователь
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Получить токен
   * @returns {string|null}
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Очистить все настройки
   */
  clear: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
  },

  /**
   * Обработчик ошибок API
   * @param {Error} error - Ошибка
   * @returns {string} Сообщение об ошибке
   */
  handleError: (error) => {
    if (error.response) {
      // Сервер ответил с ошибкой
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          return data.detail || 'Некорректный запрос';
        case 401:
          return 'Неавторизованный доступ. Пожалуйста, войдите в систему.';
        case 403:
          return 'Доступ запрещен';
        case 404:
          return 'Ресурс не найден';
        case 409:
          return data.detail || 'Конфликт данных';
        case 422:
          return 'Некорректные данные';
        case 500:
          return 'Внутренняя ошибка сервера';
        default:
          return data.detail || `Ошибка: ${status}`;
      }
    } else if (error.request) {
      // Запрос был сделан, но ответ не получен
      return 'Нет ответа от сервера. Проверьте подключение к интернету.';
    } else {
      // Ошибка при настройке запроса
      return error.message || 'Произошла ошибка';
    }
  },
};

// Экспорт по умолчанию для удобства
export default {
  user: userApi,
  tournament: tournamentApi,
  auth: authApi,
  utils: apiUtils,
  instance: api, // Для кастомных запросов
};