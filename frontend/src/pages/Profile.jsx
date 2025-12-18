// src/pages/Profile.jsx

import React, { useState } from 'react';
import DashboardLayout from "../layout/DashboardLayout";
import ProfileHeader from "../components/profile/ProfileHeader";
import AchievementsGrid from "../components/profile/AchievementsGrid";
// Добавим заглушки для других разделов
import ProfileProgress from "../components/profile/ProfileProgress"; 
import ProfileStats from "../components/profile/ProfileStats"; 

import { profileData } from "../global/mockData";

export default function Profile() {
    const [activeTab, setActiveTab] = useState('achievements'); // По умолчанию открываем Достижения, как на скриншоте

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <ProfileProgress />; // В вашем скриншоте Обзор - это те же прогресс-бары, что и на дашборде.
            case 'achievements':
                return <AchievementsGrid data={profileData.achievements} />;
            case 'stats':
                return <ProfileStats />; // Заглушка для статистики
            default:
                return <ProfileProgress />;
        }
    }

    return (
        <DashboardLayout>
            <div style={{ marginBottom: 32 }}>
                <ProfileHeader data={profileData.header} />
            </div>
            
            {/* Навигация по вкладкам на странице профиля */}
            <div className="profile-tabs" style={{marginBottom: 30}}>
                <button 
                    className={activeTab === 'overview' ? 'active' : ''} 
                    onClick={() => setActiveTab('overview')}
                >
                    ОБЗОР
                </button>
                <button 
                    className={activeTab === 'achievements' ? 'active' : ''} 
                    onClick={() => setActiveTab('achievements')}
                >
                    ДОСТИЖЕНИЯ
                </button>
                <button 
                    className={activeTab === 'stats' ? 'active' : ''} 
                    onClick={() => setActiveTab('stats')}
                >
                    СТАТИСТИКА
                </button>
            </div>
            
            {renderContent()}

        </DashboardLayout>
    );
}
