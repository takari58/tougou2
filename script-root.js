const map = L.map("map").setView(
    [37.94410134702021, 139.3350867139979],
    17
);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "© OpenStreetMap contributors"
    }
).addTo(map);

const goals = [
    //カテゴリー：観光、グルメ、交通、公共施設
    {
        name: "新発田城跡",
        lat: 37.954824724543,
        lng: 139.326001834219,
        category: "観光",
        icon: "🏯"
    },
    {
        name: "清水園",
        lat: 37.943791,
        lng: 139.328785,
        category: "観光",
        icon: "🏯"
    },
    {
        name: "蔵春閣",
        lat: 37.9438980727356,
        lng: 139.331714246757,
        category: "観光",
        icon: "🏯"
    },
    {
        name: "東公園のSL",
        lat: 37.9436724880776,
        lng: 139.332347529326,
        category: "観光",
        icon: "🚂"
    },
    {
        name: "諏訪神社",
        lat: 37.944214,
        lng: 139.332004,
        category: "観光",
        icon: "⛩️"
    },
    {
        name: "新発田市役所",
        lat: 37.947839,
        lng: 139.327160,
        category: "公共施設",
        icon: "🏛️"
    },
    {
        name: "王紋酒造",
        lat: 37.94436989072327,
        lng: 139.33066511399528,
        category: "観光",
        icon: "🍶"
    },
    {
        name: "五十公野公園",
        lat: 37.939869,
        lng: 139.356680,
        category: "観光",
        icon: "🌳"
    },
    {
        name: "カルチャーセンター",
        lat: 37.950246,
        lng: 139.338618,
        category: "公共施設",
        icon: "🏃"
    },
    {
        name: "新発田駅",
        lat: 37.94413,
        lng: 139.33510,
        category: "交通",
        icon: "🚉"
    },
    {
        name: "あやめの湯",
        lat: 37.953545,
        lng: 139.3549475,
        category: "公共施設",
        icon: "♨️"
    },
    {
        name: "イクネスしばた",
        lat: 37.944357,
        lng: 139.333388,
        category: "公共施設",
        icon: "📚"
    },
    {
        name: "市民文化会館",
        lat: 37.951722,
        lng: 139.326564,
        category: "公共施設",
        icon: "🏛️"
    },
    {
        name: "新発田歴史図書館",
        lat: 37.951279909157336,
        lng: 139.32774756292181,
        category: "公共施設",
        icon: "📚"
    },
    {
        name: "旧新発田市役所",
        lat: 37.950883,
        lng: 139.327898,
        category: "公共施設",
        icon: "🏛️"
    },
    {
        name: "新潟職能短大",
        lat: 37.956067,
        lng: 139.337938,
        category: "公共施設",
        icon: "🏫"
    },
    {
        name: "菊水",
        lat: 37.960376479226,
        lng: 139.35429135822383,
        category: "グルメ",
        icon: "🍴"
    },
    {
        name: "ボン・タケダ",
        lat: 37.94039,
        lng: 139.336,
        category: "グルメ",
        icon: "🍞"
    },
    {
        name: "藤倉メンチカツや",
        lat: 37.93682,
        lng: 139.34488,
        category: "グルメ",
        icon: "🍴"
    },
    {
        name: "いっぷく",
        lat: 37.9443765405075,
        lng: 139.340743962673,
        category: "グルメ",
        icon: "🍴"
    },
    {
        name: "文化洋食ino",
        lat: 37.9623641139771,
        lng: 139.334281893588,
        category: "グルメ",
        icon: "🍴"
    },
    {
        name: "やすけカレー",
        lat: 37.9377482726362,
        lng: 139.336158926512,
        category: "グルメ",
        icon: "🍛"
    },
    {
        name: "レストラン蒲城",
        lat: 37.9504968436357,
        lng: 139.339474708348,
        category: "グルメ",
        icon: "🍴"
    },
    {
        name: "コーヒーマリーナ 煉瓦屋",
        lat: 37.9491031178618,
        lng: 139.324669426051,
        category: "グルメ",
        icon: "☕"
    },
    {
        name: "パーラーやお屋",
        lat: 37.958499803976,
        lng: 139.342528211321,
        category: "グルメ",
        icon: "🍴"
    }
];

const categoryColors = {
    "観光": "#f39c12",
    //"神社・寺": "#8e44ad",
    "グルメ": "#e74c3c",
    "交通": "#3498db",
    "公共施設": "#27ae60",
    //"温泉": "#00a8cc"

};

let currentMarker = null;
let routeLine = null;
let watchId = null;
let selectedGoal = null;
let currentPosition = null;

const markers = [];

// カスタムアイコンを作成
function createIcon(goal) {
    const color =
        categoryColors[goal.category] || "#777";
    return L.divIcon({
        className: "custom-marker",
        html: `
            <div
                class="marker-circle"
                style="background-color: ${color};"
            >
                ${goal.icon}
            </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -24]
    });
}

goals.forEach(goal => {
    const marker = L.marker(
        [goal.lat, goal.lng],
        {
            icon: createIcon(goal)
        }
    );

    marker.addTo(map);
    marker.bindPopup(`
        <div class="popup">
            <div class="popup-icon">
                ${goal.icon}
            </div>
            <div class="popup-name">
                ${goal.name}
            </div>
            <div class="popup-category">
                ${goal.category}
            </div>
            <button
                class="popup-button"
                onclick="selectGoal('${goal.name}')"
            >
                🚶 ここまで案内
            </button>
        </div>
    `);

    marker.on("click", function() {

    });
    markers.push({
        marker: marker,
        goal: goal
    });
});

// 目的地を選択
function selectGoal(name) {
    const goal = goals.find(
        item => item.name === name
    );
    if (!goal) {
        return;
    }
    selectedGoal = goal;
    startNavigation(goal);
}

//ナビ開始
function startNavigation(goal) {
    selectedGoal = goal;
    document
        .getElementById("info")
        .innerHTML = `
            <div class="destination-name">
                ${goal.icon}
                ${goal.name}
            </div>
            <div class="destination-category">
                ${goal.category}
            </div>
            <div class="loading-message">
                📍 現在地を取得しています...
            </div>
        `;

    // すでに位置情報取得中なら再利用
    if (watchId !== null) {
        if (currentPosition) {
            showRoute(
                currentPosition.lat,
                currentPosition.lng,
                goal
            );
        }
        return;
    }

    // 位置情報が使えるか確認
    if (!navigator.geolocation) {
        alert(
            "このブラウザでは位置情報を利用できません。"
        );
        return;
    }
    
    // 現在地を監視
    watchId = navigator.geolocation.watchPosition(
        function(position) {
            const myLat =
                position.coords.latitude;
            const myLng =
                position.coords.longitude;
            const accuracy =
                position.coords.accuracy;
            currentPosition = {
                lat: myLat,
                lng: myLng
            };
            updateCurrentMarker(
                myLat,
                myLng,
                accuracy
            );
            if (selectedGoal) {
                showRoute(
                    myLat,
                    myLng,
                    selectedGoal
                );
            }
        },

        function(error) {
            console.error(
                "位置情報エラー:",
                error
            );

            if (error.code === 1) {
                alert(
                    "位置情報の利用が許可されていません。"
                );
            }
            else if (error.code === 2) {
                alert(
                    "現在地を取得できませんでした。"
                );
            }
            else if (error.code === 3) {
                alert(
                    "現在地の取得がタイムアウトしました。"
                );
            }
        },

        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000
        }
    );
}

// 現在地マーカー
function updateCurrentMarker(
    lat,
    lng,
    accuracy
) {
    const currentIcon = L.divIcon({
        className: "current-marker",
        html: `
            <div class="current-location">
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });

    // 初回
    if (!currentMarker) {
        currentMarker = L.marker(
            [lat, lng],
            {
                icon: currentIcon
            }
        ).addTo(map);
        currentMarker.bindPopup(
           "📍 現在地"
        );
    }

    // 2回目以降
    else {
        currentMarker.setLatLng(
            [lat, lng]
        );
    }
}

async function showRoute(
    myLat,
    myLng,
    goal
) {
    const url =
        `https://router.project-osrm.org/route/v1/walking/` +
        `${myLng},${myLat};${goal.lng},${goal.lat}` +
        `?overview=full&geometries=geojson`;

    try {
        const response =
            await fetch(url);

        const data =
            await response.json();

        // ルートが存在しない
        if (
            !data.routes ||
            data.routes.length === 0
        ) {

            document
                .getElementById("info")
                .innerHTML = `
                    <div class="destination-name">
                        ${goal.icon}
                        ${goal.name}
                    </div>
                    <div class="route-error">
                        ⚠️ ルートが見つかりません
                    </div>
                `;
            return;
        }

        const route =
            data.routes[0];

        // 古いルートを削除
        if (routeLine) {
            map.removeLayer(routeLine);
        }

        // GeoJSON → Leaflet形式
        const latlngs =
            route.geometry.coordinates.map(
                point => [
                    point[1],
                    point[0]
                ]
            );

        // 新しいルート
        routeLine = L.polyline(
            latlngs,
            {
                color: "#1976d2",
                weight: 7,
                opacity: 0.85,
                lineCap: "round",
                lineJoin: "round"
            }
        ).addTo(map);

        // 距離
        const distanceKm =
            (
                route.distance / 1000
            ).toFixed(2);

        // メートル
        const distanceMeter =
            route.distance;

        // 徒歩時間
        const minutes =
            Math.max(
                1,
                Math.round(
                    distanceMeter / 66.67
                )
            );

        // 情報表示
        document
            .getElementById("info")
            .innerHTML = `
                <div class="destination-name">
                    ${goal.icon}
                    ${goal.name}
                </div>
                <div class="destination-category">
                    ${goal.category}
                </div>
                <div class="route-information">
                    <div>
                        🚶
                        <strong>
                            約 ${minutes} 分
                        </strong>
                    </div>
                    <div>
                        📏
                        <strong>
                            ${distanceKm} km
                        </strong>
                    </div>
                </div>
                <div class="route-message">
                    🧭 青い線に沿って進んでください
                </div>
            `;
    }

    catch (error) {
        console.error(error);
        document
            .getElementById("info")
            .innerHTML = `
                <div class="route-error">
                    ⚠️ ルート検索に失敗しました
                </div>
            `;
    }
}

const categoryButtons =
    document.querySelectorAll(
        ".category-btn"
    );

categoryButtons.forEach(button => {
    button.addEventListener(
        "click",
        function() {
            const category =
                this.dataset.category;

            // ボタンの見た目を変更
            categoryButtons.forEach(
                btn => {
                    btn.classList.remove(
                        "active"
                    );
                }
            );

            this.classList.add(
                "active"
            );

            // マーカー表示切り替え
            markers.forEach(item => {
                const marker =
                    item.marker;
                const goal =
                    item.goal;

                if (
                    category === "all" ||
                    goal.category === category
                ) {
                    if (
                        !map.hasLayer(marker)
                    ) {
                        marker.addTo(map);
                    }
                }
                else {
                    if (
                        map.hasLayer(marker)
                    ) {
                        map.removeLayer(marker);
                    }
                }
            });
        }
    );
});

document
    .getElementById("locationButton")
    .addEventListener(
        "click",
        function() {

            // 現在地がすでに取得できている
            if (currentPosition) {
                map.setView(
                    [
                        currentPosition.lat,
                        currentPosition.lng
                    ],
                    17
                );
                return;
            }

            // GPSが使えない
            if (!navigator.geolocation) {
                alert(
                    "位置情報を利用できません。"
                );
                return;
            }

            // 現在地取得
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat =
                        position.coords.latitude;
                    const lng =
                        position.coords.longitude;
                    currentPosition = {
                        lat: lat,
                        lng: lng
                    };
                    updateCurrentMarker(
                        lat,
                        lng,
                        position.coords.accuracy
                    );
                    map.setView(
                        [lat, lng],
                        17
                    );
                },
                function(error) {
                    console.error(error);
                    alert(
                        "現在地を取得できませんでした。"
                    );
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        }
    );
