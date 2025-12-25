import React, { useState, useEffect } from 'react'; // Добавили useEffect
import DashboardLayout from "../layout/DashboardLayout";
import ProfileHeader from "../components/profile/ProfileHeader";
import AchievementsGrid from "../components/profile/AchievementsGrid";
import ProfileProgress from "../components/profile/ProfileProgress"; 
import ProfileStats from "../components/profile/ProfileStats"; 

// Импортируем API
import { userApi, apiUtils } from "../global/api";

export default function Profile() {
    const [activeTab, setActiveTab] = useState('achievements');
    const [userData, setUserData] = useState(null); // Стейт для данных с бэкенда
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true);
                const data = await userApi.getUserInfo();
                setUserData(data);
            } catch (err) {
                setError(apiUtils.handleError(err));
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const renderContent = () => {
        if (!userData) return null;
        console.log(userData);
        switch (activeTab) {
            case 'overview':
                // Передаем данные пользователя в компоненты, если они того требуют
                return <ProfileProgress user={userData} />; 
            case 'achievements':
                // Если достижения приходят в объекте пользователя
                return <AchievementsGrid data={userData.achievements || []} />;
            case 'stats':
                return <ProfileStats data={userData} />;
            default:
                return <ProfileProgress />;
        }
    }

    if (isLoading) {
        return (
            <DashboardLayout>
                <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Загрузка профиля...</div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div style={{ color: 'var(--pink)', textAlign: 'center', marginTop: '50px' }}>{error}</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div style={{ marginBottom: 32 }}>
                {/* Передаем реальные данные в хедер */}
                <ProfileHeader data={userData} />
            </div>
            
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