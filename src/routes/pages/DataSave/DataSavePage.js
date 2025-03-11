// src/DataSavePage.js
import React, { useState } from "react";
import axios from "axios";

const DataSavePage = () => {
    const [content, setContent] = useState("");

    const handleInputChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/save", {
                content: content,
            });
            alert(response.data.message); // 성공 메시지 표시
        } catch (error) {
            alert("저장 실패: " + error.message); // 실패 메시지 표시
        }
    };

    return (
        <div>
            <h2>데이터 저장</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={handleInputChange}
                    placeholder="저장할 데이터를 입력하세요"
                />
                <button type="submit">저장</button>
            </form>
        </div>
    );
};

export default DataSavePage;