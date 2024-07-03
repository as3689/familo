
        // Firebase 설정 객체
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
        import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

        const firebaseConfig = {
            apiKey: "AIzaSyCR57_j9OGbF0N8NxBXv6cpjDelq_QzAAg",
            authDomain: "familo-a992e.firebaseapp.com",
            projectId: "familo-a992e",
            storageBucket: "familo-a992e.appspot.com",
            messagingSenderId: "546611623632",
            appId: "1:546611623632:web:063980b4793673875e90d5"
        };

        // Firebase 초기화
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);

        // 폼 제출 이벤트 핸들러
        document.getElementById('cropForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const cropName = document.getElementById('cropName').value;
            const sowingDate = document.getElementById('sowingDate').value;
            const transplantingDate = document.getElementById('transplantingDate').value;
            const harvestDate = document.getElementById('harvestDate').value;

            const newCropKey = ref(database, 'crops').push().key;

            await set(ref(database, 'crops/' + newCropKey), {
                cropName: cropName,
                sowingDate: sowingDate,
                transplantingDate: transplantingDate,
                harvestDate: harvestDate
            });

            // 폼 초기화
            document.getElementById('cropForm').reset();

            // 데이터 업데이트
            loadData();
        });

        // 데이터 로드 함수
        async function loadData() {
            const dbRef = ref(database);
            const snapshot = await get(child(dbRef, 'crops'));
            const dataContainer = document.getElementById('data');
            dataContainer.innerHTML = '';

            if (snapshot.exists()) {
                const data = snapshot.val();
                for (let key in data) {
                    const crop = data[key];
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <h3>${crop.cropName}</h3>
                        <p>파종일: ${crop.sowingDate}</p>
                        <p>정식일: ${crop.transplantingDate}</p>
                        <p>수확일: ${crop.harvestDate}</p>
                    `;
                    dataContainer.appendChild(div);
                }
            } else {
                dataContainer.innerHTML = 'No data available';
            }
        }

        // 페이지 로드 시 데이터 로드
        window.onload = loadData;