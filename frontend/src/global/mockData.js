// src/global/mockData.js

export const dashboardData = {
  stats: [
    { title: "Всего турниров", value: "247", delta: "+12 за месяц", icon: "🏆", color: "purple" },
    { title: "Участников", value: "3.2К", delta: "+245 за неделю", icon: "👥", color: "pink" },
    { title: "Доход", value: "$60.6К", delta: "+18% за месяц", icon: "📈", color: "cyan" },
    { title: "Дней на платформе", value: "365", delta: "", icon: "⚡", color: "yellow" },
  ],
  streams: [
    { game: "CS:GO", teams: "Team A vs Team B", viewers: "1240" },
    { game: "Dota 2", teams: "Pro Team vs Elite Squad", viewers: "890" },
  ],
  notifications: [
    { text: "Спор по матчу CS:GO Finals", time: "5 мин назад", type: "open" },
    { text: "Подтверждение результата Dota 2", time: "15 мин назад", type: "confirm" },
  ],
  calendar: [
    { name: "CS:GO Finals", time: "Сегодня • 16:00", status: "today" },
    { name: "Dota 2 Qualifiers", time: "Завтра • 14:00", status: "tomorrow" },
    { name: "Valorant Masters Start", time: "25 янв • 12:00", status: "upcoming" },
  ],
  organizerAchievements: [
    { title: "Мастер", subtitle: "100+ турниров", progress: 100, icon: "🏆" },
    { title: "Быстрый", subtitle: "Без задержек", progress: 75, icon: "⚡" },
    { title: "Лидер", subtitle: "1К+ игроков", progress: 50, icon: "👥" },
  ],
};

export const tournamentsHistory = [
  { name: "CS:GO Championship", date: "15.01.2024", participants: "128", confirmed: "120 / 128", revenue: "$25 600" },
  { name: "Dota 2 Winter Cup", date: "20.01.2024", participants: "64", confirmed: "58 / 64", revenue: "$15 200" },
  { name: "Valorant Masters", date: "25.01.2024", participants: "96", confirmed: "89 / 96", revenue: "$19 800" },
];

export const profileData = {
    header: {
        nickname: "CYBER KING 2024",
        level: 12,
        pro: true,
        role: "Организатор-легенда • Мастер турниров",
        email: "cyber@ctrl+win.pro",
        location: "Москва, RU",
        daysOnline: 365,
        totalTournaments: 247,
        rating: 4.9,
        revenue: "$60K"
    },
    achievements: [
        {
            title: "МАСТЕР ТУРНИРОВ",
            description: "Провел 100+ турниров",
            date: "15.01.2024",
            icon: "🏆",
            color: "purple",
            unlocked: true
        },
        {
            title: "СКОРОСТНОЙ ЗАПУСК",
            description: "Запустил турнир за 5 минут",
            date: "10.01.2024",
            icon: "⚡",
            color: "yellow",
            unlocked: true
        },
        {
            title: "ЛИДЕР СООБЩЕСТВА",
            description: "Привлёк 1000+ игроков",
            date: "05.01.2024",
            icon: "👥",
            color: "cyan",
            unlocked: true
        },
        {
            title: "ЗОЛОТАЯ ЛИХОРАДКА",
            description: "Получено $25 000 дохода",
            date: "Не получено",
            icon: "💰",
            color: "pink",
            unlocked: false
        },
        {
            title: "СНАЙПЕР",
            description: "50+ успешных турниров",
            date: "Не получено",
            icon: "🎯",
            color: "purple",
            unlocked: false
        },
        {
            title: "ЛЕГЕНДА",
            description: "500 дней на платформе",
            date: "Не получено",
            icon: "🔥",
            color: "yellow",
            unlocked: false
        },
    ]
};