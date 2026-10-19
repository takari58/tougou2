// ランドマーク一覧
const spots = [
    {
        name: "新発田城跡",        //ランドマーク名称
        lat: 37.954824724542696,   //緯度
        lng: 139.326001834219947,  //経度
        radius: 50,                //leaflet-circle-radius[m] 有効範囲
        image:"image/城.png"         //イメージ画像
    },
    {
        name: "清水園",
        lat: 37.943791,
        lng: 139.328785,
        radius: 50,
        image:"image/清水園.jpg"
    },
    {
        name: "蔵春閣",
        lat: 37.94389807273562,
        lng: 139.3317142467578,
        radius: 20,
        image:"image/蔵春閣.png"
    },
    {
        name: "東公園のSL",
        lat: 37.94371455113034,
        lng: 139.33219327519282,
        radius: 20,
        image:"image/SL.jpg"
    },
    {
        name: "諏訪神社",
        lat: 37.944214,
        lng: 139.332004,
        radius: 20,
        image:"image/諏訪神社.jpg"
    },
    {
        name: "新発田市役所",
        lat: 37.947839,
        lng: 139.327160,
        radius: 30,
        image:"image/役所.jpg"
    },
    {
        name: "王紋酒造",
        lat: 37.94436989072327,
        lng: 139.33066511399528,
        radius: 30,
        image:"image/王紋.jpg"
    },
    {
        name: "五十公野公園",
        lat: 37.939869,
        lng: 139.356680,
        radius: 80,
        image:"image/五十公野公園.png",
    },
    {
        name: "カルチャーセンター",
        lat: 37.950246,
        lng: 139.338618,
        radius: 45,
        image:"image/カルチャー.jpg"
    },
    {
        name: "新発田駅",
        lat: 37.94413,
        lng: 139.33510,
        radius: 35,
        image:"image/駅.png",
    },
    {
        name: "あやめの湯",
        lat: 37.953545,
        lng: 139.3549475,
        radius: 50,
        image:"image/あやめの湯.jpg"
    },
    {
        name: "イクネスしばた",
        lat: 37.944357,
        lng: 139.333388,
        radius: 30,
        image:"image/イクネス.jpg"
    },
    {
        name: "市民文化会館",
        lat: 37.951722,
        lng:139.326564,
        radius: 30,
        image:"image/文化会館.jpg"
    },
    {
        name: "新発田歴史図書館",
        lat: 37.951279909157336,
        lng: 139.32774756292181,
        radius: 30,
        image:"image/歴史図書館.jpg"
    },
    {
        name: "旧新発田市役所",
        lat: 37.950883,
        lng: 139.327898,
        radius: 30,
        image:"image/旧役所.png"
    },
    {
        name: "新潟職能短大",
        lat: 37.956067,
        lng: 139.337938,
        radius:150,
        image:"image/短大.png",
    },
    {
        name: "菊水",
        lat: 37.960376479226,
        lng: 139.35429135822383,
        radius: 30,
        image:"image/菊水.jpg"
    },
    {
      name: "ボン・タケダ",
      lat: 37.94039, 
      lng: 139.33600,
      radius: 50,
      image:"image/タケダ.jpg"
    }, 
];

//激レアランドマーク
const spots2 =[
    {
        name: "テスト",
        //学校用 激レアスポット
        //lat: 37.958972,  
        //lng:139.339891,
        lat:37.95693480157634, 
        lng:139.3360638811011,
        radius: 80,
        unlockPoint:0,
        //image:"castle.png"
    },
    {
      name: "藤倉メンチカツや",
      lat: 37.93682,
      lng: 139.34488,
      radius:50,
      unlockPoint:480,
      image:"image/メンチカツ.jpg"
    },
    {
      name: "いっぷく",
      lat: 37.94437654050752, 
      lng: 139.3407439626735,
      radius: 50,
      unlockPoint:960,
      image:"image/いっぷく.jpg"
    },
    {
      name: "文化洋食ino",
      lat: 37.96236411397717, 
      lng: 139.33428189358867 ,
      radius: 50,
      unlockPoint:1440,
      image:"image/ino.jpg"
    },
    {
      name: "やすけカレー",
      lat: 37.93774827263629, 
      lng: 139.33615892651278 ,
      radius: 50,
      unlockPoint:1920,
      image:"image/やすけ.jpg"
    },
    {
      name: "お食事処 蒲城",
      lat: 37.95049684, 
      lng: 139.3394747,
      radius: 50,
      unlockPoint:2400,
      image:"image/蒲城.jpg"
    },
    {
      name: "コーヒーマリーナ 煉瓦屋",
      lat: 37.94901564395905,
      lng: 139.3243217255289,
      radius: 50,
      unlockPoint:3360,
      image:"image/煉瓦屋.png"
    },
    {
      name: "パーラーやお屋",
      lat: 37.9584998,
      lng: 139.3425282,
      radius: 50,
      unlockPoint:3360,
      image:"image/やおや.png"
    },
]
// 現在地用アイコン
const userIcon = L.icon({
    iconUrl: "current-pin.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

//地図初期化(新発田駅中心) 
const map = L.map('map').setView(
    [37.94410134702021, 139.3350867139979],17);

// 最初の現在地取得時だけ地図を現在地へ移動する
let firstLocation = true;

// 現在地を保存
let currentLat = null;
let currentLng = null;


// タイル
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

//配列で指定したランドマークにマーカー表示
spots.forEach(spot => {
    //マーカークリック時にランドマーク名称とイメージ画像表示
    const popupContent = `
        <div style="text-align:center;">
            <h3>${spot.name}</h3>
            <img
                src="${spot.image}"
                class="spot-image"
                alt><br>
        </div>
    `;
    L.marker([spot.lat, spot.lng]).addTo(map)
        .bindPopup(popupContent);

    //クイズ出題可能範囲の円
    L.circle([spot.lat, spot.lng], {
        radius: spot.radius,
        color: 'blue',
        fillOpacity: 0.2
    }).addTo(map);
});


// 激レアランドマークの解放・表示
function updateRareSpots() {

    const totalScore =
        Number(localStorage.getItem("totalScore")) || 0;

    const answeredSpots =
        JSON.parse(
            localStorage.getItem("answeredSpots")
        ) || [];

    spots2.forEach(spot => {

        // 必要得点未達
        if (totalScore < spot.unlockPoint) {
            return;
        }
        // すでにピンを作成済み
        if (spot.marker) {
            return;
        }
        // 回答済みかどうか
        const answered =
            answeredSpots.includes(spot.name);
        //激レアのピンは☆になってる
        const marker = L.marker([
            spot.lat,
            spot.lng
        ],{
            icon:L.icon({
                iconUrl:'rare-pin.png',
                iconSize:[40,40],
                iconAnchor:[20,40],
                popupAnchor:[0,-40]
            })
        }).addTo(map);

        //激レアの回答可能範囲
        L.circle([spot.lat, spot.lng], {
            radius: spot.radius,
            color: 'gold',
            fillColor: 'gold',
            fillOpacity: 0.2
        }).addTo(map);

        let popupContent;

        if (answered) {
            popupContent = `
                <div style="text-align:center;">
                    <h3>★ ${spot.name}</h3>
                    <p>回答済み</p>
                </div>
            `;
        } else {
            popupContent = `
            <div style="text-align:center;">
                <h3>★ ${spot.name}</h3>
                <img
                src="${spot.image}"
                class="spot-image"
                alt><br>
                <p>激レアスポット解放！</p>
            </div>
`;
        }

        marker.bindPopup(popupContent);

        // マーカーを保存
        spot.marker = marker;
    });
}

// ページ読み込み時に確認
updateRareSpots();

// ====== 距離計算 ======
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const toRad = x => x * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a = Math.sin(dLat/2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLng/2) ** 2;

    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ====== 現在地取得 ======

let answeredSpots =
    JSON.parse(localStorage.getItem("answeredSpots")) || [];

// ランドマーク到達ポイント用
let arrivalSpots =
    JSON.parse(localStorage.getItem("arrivalSpots")) || [];


// ====== 現在地取得 ======
navigator.geolocation.watchPosition(
    position => {

        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // 現在地を保存
        currentLat = userLat;
        currentLng = userLng;

        if (firstLocation) {
            map.setView(
                [userLat, userLng],
                17
            );
            firstLocation = false;
        }

        const coordsElement =
            document.getElementById("coords");

        if (coordsElement) {
            coordsElement.innerHTML = `
                緯度: ${userLat.toFixed(6)}<br>
                経度: ${userLng.toFixed(6)}
            `;

        }
        if (window.userMarker) {
            map.removeLayer(
                window.userMarker
            );
        }

        window.userMarker =
            L.marker(
                [userLat, userLng],
                {
                    icon: userIcon
                }
            )
            .addTo(map)
            .bindPopup("現在地");

        let found = false;

        spots.forEach(spot => {
            const distance =
                getDistance(
                    userLat,
                    userLng,
                    spot.lat,
                    spot.lng
                );

            if (
                !answeredSpots.includes(spot.name) &&
                distance <= spot.radius
            ) {
                found = true;
                document.getElementById(
                    "result"
                ).innerHTML = `
                    <div class="quiz-notice">
                        <div class="arrival">
                            🎉 スポット到着！
                        </div>
                        <div class="spot-name">
                            📍 ${spot.name}
                        </div>
                        <div class="message">
                            この場所についての
                            クイズに<br>
                            挑戦してみよう！
                            <br>
                            <strong>
                                正解するとポイントGET！
                            </strong>
                        </div>

                        <a
                            class="quiz-button"
                            href="quiz.html?spot=${encodeURIComponent(spot.name)}"
                        >
                            🧩 クイズに挑戦する！
                        </a>
                    </div>
                `;
            }
        });

        spots2.forEach(spot => {
            const totalScore =
                Number(
                    localStorage.getItem(
                        "totalScore"
                    )
                ) || 0;

            // 必要得点に達していない
            if (
                totalScore <
                spot.unlockPoint
            ) {
                return;
            }
            const distance =
                getDistance(
                    userLat,
                    userLng,
                    spot.lat,
                    spot.lng
                );
            if (
                !answeredSpots.includes(
                    spot.name
                ) &&
                distance <= spot.radius
            ) {
                found = true;
                document.getElementById(
                    "result"
                ).innerHTML = `
                    <div class="quiz-notice rare-notice">
                        <div class="arrival">
                            ✨ 激レアスポット発見！ ✨
                        </div>
                        <div class="spot-name">
                            ⭐ ${spot.name}
                        </div>
                        <div class="message">
                            激レアスポットの
                            クイズが解放されました！
                            <br>
                            <strong>
                                ボーナスポイントGETのチャンス！
                            </strong>
                        </div>
                        <a
                            class="quiz-button rare-button"
                            href="quiz.html?spot=${encodeURIComponent(spot.name)}"
                        >
                            ⭐ 特別クイズに挑戦！
                        </a>
                    </div>
                `;
            }
        });

        if (!found) {
            document.getElementById(
                "result"
            ).innerHTML =
                "新発田市内を移動してください";
        }
    },

    error => {
        console.error(
            "位置情報エラー:",
            error
        );
        alert(
            "位置情報が取得できません"
        );
    }
);


// 合計得点を表示

function updateTotalScore() {

    const totalScore =
        Number(localStorage.getItem("totalScore")) || 0;

    const scoreElement =
        document.getElementById("totalScore");

    if (scoreElement) {
        scoreElement.textContent =
            `現在の得点：${totalScore}点`;
    }

    // 激レアスポットの解放状況を更新
    updateRareSpots();
}

// ページ読み込み時に得点を表示
updateTotalScore();

// 開発用：得点・回答履歴をリセット
function resetGame() {

    const result =
        confirm(
            "得点と回答履歴をすべてリセットしますか？"
        );

    if (!result) {
        return;
    }

    // 得点を0にする
    localStorage.setItem(
        "totalScore",
        "0"
    );

    // 回答済み地点を空にする
    localStorage.setItem(
        "answeredSpots",
        JSON.stringify([])
    );

    alert("得点と回答履歴をリセットしました。");

    // 得点表示を更新
    updateTotalScore();

    // ページを再読み込み
    location.reload();
}