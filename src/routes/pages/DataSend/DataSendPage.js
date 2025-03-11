import React, { useState } from "react";
import axios from "axios";

const DataSendPage = () => {
    const [files, setFiles] = useState([]);  // 여러 파일 상태
    const [status, setStatus] = useState("");
    const [time, setTime] = useState("");  // 처리 시간 상태

    // 파일 선택 시 처리
    const handleFileChange = (e) => {
        setFiles(e.target.files);  // 여러 파일 저장
    };

    // 단일 스레드로 파일 전송
    const sendDataSingleThread = async () => {
        if (files.length === 0) {
            setStatus("파일을 선택하세요");
            return;
        }

        const fileNames = Array.from(files).map(file => file.name);  // 파일 이름만 추출

        try {
            const startTime = Date.now();
            const response = await axios.post("http://localhost:8080/api/data/send-single", fileNames, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const endTime = Date.now();
            setTime(endTime - startTime);
            setStatus(response.data);
        } catch (error) {
            setStatus("전송 실패: " + error.message);
        }
    };

    // 멀티 스레드로 파일 전송
    const sendDataMultiThread = async () => {
        if (files.length === 0) {
            setStatus("파일을 선택하세요");
            return;
        }

        const fileNames = Array.from(files).map(file => file.name);  // 파일 이름만 추출

        try {
            const startTime = Date.now();
            const response = await axios.post("http://localhost:8080/api/data/send-multiple", fileNames, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const endTime = Date.now();
            setTime(endTime - startTime);
            setStatus(response.data);
        } catch (error) {
            setStatus("전송 실패: " + error.message);
        }
    };

    return (
        <div>
            <h2>파일 전송</h2>
            <input type="file" multiple onChange={handleFileChange} />
            <div>
                <button onClick={sendDataSingleThread}>단일 스레드로 전송</button>
                <button onClick={sendDataMultiThread}>멀티 스레드로 전송</button>
            </div>
            <p>{status}</p>
            <p>처리 시간: {time} ms</p>
        </div>
    );
};

export default DataSendPage;