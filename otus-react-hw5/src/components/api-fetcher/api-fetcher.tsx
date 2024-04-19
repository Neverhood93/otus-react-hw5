import React, { useState } from 'react';
import axios from 'axios';

const ApiFetcher: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [responseData, setResponseData] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    const handleSendClick = async () => {
        if (!url.trim()) {
            alert('Пожалуйста, введите URL перед отправкой запроса.');
            return;
        }

        try {
            const response = await axios.get(url);
            setResponseData(JSON.stringify(response.data, null, 2));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponseData(error.message);
            } else {
                setResponseData('Неизвестная ошибка');
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                value={url}
                onChange={handleInputChange}
                placeholder="Введите URL-адрес API"
            />
            <button onClick={handleSendClick}>Отправить</button>
            <div style={{ color: 'black', whiteSpace: 'pre-wrap' }}>
                {responseData}
            </div>
        </div>
    );
};

export default ApiFetcher;