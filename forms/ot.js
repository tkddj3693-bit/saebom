// 오티콘(디만트) 제조사 서식 정의 (FORMS 에 추가)
// 칸 번호: c = 템플릿의 .cb 순서, t 숫자 = 빈 <td> 순서, t 글자 = 템플릿의 data-f 이름

// 공통 조각 — 귓속형·귀걸이형 주문서 머리(고객정보·청력)
const OT_HEAD = (o) => [
  { title: '고객 정보', items: [
    { type: 'date', label: '주문일', t: o.order, today: true },
    { type: 'date', label: '납품일 (받을 날)', t: o.deliver },
    { type: 'text', label: '고객명', t: o.name, key: 'name' },
    { type: 'text', label: '생년월일', t: o.birth, numeric: true, tip: '예: 1948.03.15' },
    { type: 'text', label: '고객 전화번호 (선택)', t: o.phone, numeric: true },
    { type: 'text', label: '고객 주소 (선택)', t: o.addr },
    { type: 'choice', label: '보청기 사용 경험', c: o.exp, o: ['유 (써 봤음)', '무 (처음)'], single: true },
  ] },
  { title: '청력검사표', hint: 'dB 숫자만 넣으세요. 모르는 칸은 비워도 돼요.', items: [
    { type: 'aud', freqs: ['125', '250', '500', '1K', '1.5K', '2K', '3K', '4K', '6K', '8K'], L: o.audL, R: o.audR },
    { type: 'lrtext', label: 'WRS (어음명료도) dB', L: 'wLdb', R: 'wRdb', same: false },
    { type: 'lrtext', label: 'WRS (어음명료도) %', L: 'wLpc', R: 'wRpc', same: false },
  ] },
];
const OT_SEND = (c, req) => [
  { title: '함께 보내는 물품', hint: '상자에 넣은 것만 체크하고 수량을 적어요. 체크 안 한 물건은 분실돼도 책임지지 않는대요.', items: [
    { type: 'choice', label: '보내는 물품', c: c, o: ['보청기', '부속품', '귓본', '기타'] },
    { type: 'text', label: '보청기 수량', t: 'q1', numeric: true },
    { type: 'text', label: '부속품 수량', t: 'q2', numeric: true },
    { type: 'text', label: '귓본 수량', t: 'q3', numeric: true },
    { type: 'text', label: '기타 수량', t: 'q4', numeric: true },
  ] },
  req,
];

FORMS.ot_ite = {
  brand: '오티콘 (디만트)', name: '귓속형 주문서', template: 't/ot_ite.html', file: '오티콘_귓속형_주문서',
  sections: [
    ...OT_HEAD({ order: 7, deliver: 9, name: 5, birth: 4, phone: 3, addr: 6, exp: [0, 1],
      audL: R(10, 19), audR: R(20, 29) }),
    { title: '제품 · 쉘 형태', items: [
      { type: 'lrtext', label: '제품명', L: 30, R: 31 },
      { type: 'choice', label: '쉘 형태', c: R(2, 10), o: ['IIC', 'IIC P', 'CIC', 'CIC P', 'ITC(312A)', 'ITC(13A)', 'ITE', 'ITE Half', 'ITE Full'], single: true, tip: 'P = 파워(출력 큰 것). 귀 모양에 따라 크기가 달라질 수 있어요' },
    ] },
    { title: '쉘 색 · 모양', items: [
      { type: 'choice', label: 'Faceplate (겉판 색)', c: R(11, 15), o: ['Beige', 'Light Brown', 'Medium Brown', 'Dark Brown', 'Black(IIC)'], single: true },
      { type: 'choice', label: 'Shell Color (몸통 색)', c: R(16, 24), o: ['Beige', 'Blue', 'Red', 'Clear', 'Black', 'Light Brown', 'Medium Brown*', 'Dark Brown*', 'White*'], single: true, tip: '* 표시 색은 2023 Q2부터 주문 가능' },
      { type: 'choice', label: 'Canal (카날 길이)', c: R(25, 27), o: ['Short', 'Standard', 'Long'], single: true },
      { type: 'choice', label: 'RH (손잡이)', c: R(28, 31), o: ['Short', 'Standard', 'Long', 'Ring'], single: true },
      { type: 'choice', label: 'Venting (벤트)', c: R(32, 36), o: ['No Vent', 'C.1.0mm', 'C.1.4mm', 'C.2.4mm', '제조사권장'], single: true },
    ] },
    { title: '세부선택사항 (모델별 옵션 표)', hint: '모델·형태 줄을 하나 고르고, 넣을 옵션을 누르세요. 그 줄에서 회색(N/A)이 아닌 칸에만 ✓가 찍혀요. 미리보기로 꼭 확인하세요.', items: [
      { type: 'choice', label: '모델 · 형태', c: R(58, 73), single: true,
        o: ['Own · IIC', 'Own · CIC', 'Own · ITC(312)', 'Opn·Siya · IIC', 'Opn·Siya · CIC', 'Opn·Siya · ITC(312)', 'Opn·Siya · ITC(13)',
          'Geno 1,2 · CIC', 'Geno 1,2 · ITC', 'Ria2 · CIC', 'Ria2 · CIC P', 'Ria2 · ITC', 'Ria2 Pro · IIC', 'Ria2 Pro · CIC', 'Ria2 Pro · CIC P', 'Ria2 Pro · ITC'] },
      { type: 'choice', label: '무선', c: [74, 75], o: ['N(NFMI) 양이조절·양이통신', 'WL 2.4GHz 블루투스·무선 액세서리'] },
      { type: 'choice', label: 'Fitting Level (피팅레벨)', c: R(76, 79), o: ['75', '85', '90', '100'], single: true },
      { type: 'choice', label: 'PB (프로그램 버튼)', c: [80, 81], o: ['L', 'R'] },
      { type: 'choice', label: 'VC (볼륨)', c: [82, 83], o: ['L', 'R'] },
      { type: 'choice', label: '자동전화 (Opn·Siya만)', c: [84, 85], o: ['L', 'R'] },
      { type: 'choice', label: 'Telecoil (텔레코일)', c: [86, 87], o: ['L', 'R'], tip: 'Telecoil은 PB 추가 필수 · 블루투스와 동시 사용 불가' },
    ] },
    { title: '액세서리', items: [
      { type: 'choice', label: '함께 주문', c: [37, 40, 43, 44, 45, 46, 47], o: ['스트리머프로 (FM호환)', 'TV 어댑터', '전화기 어댑터', '커넥라인 마이크', '커넥클립', '에듀마이크', '리모컨'] },
      { type: 'choice', label: '스트리머프로 색상', c: [38, 39], o: ['BK (검정)', 'WH (흰색)'], single: true },
      { type: 'choice', label: 'TV 어댑터 버전', c: [41, 42], o: ['2.0', '3.0'], single: true },
      { type: 'choice', label: '리모컨 버전', c: [48, 49], o: ['2.0', '3.0'], single: true },
    ] },
    ...OT_SEND([50, 51, 52, 53], { title: '의뢰사항', items: [
      { type: 'choice', label: '전화 요망', c: R(54, 57), o: ['전화 요망', '품질기술팀', 'CS팀 (청각 및 제품)', 'CS팀 (주문, 출고)'] },
      { type: 'text', label: '의뢰 내용 (첫째 줄)', t: 132 },
      { type: 'text', label: '의뢰 내용 (둘째 줄)', t: 133 },
    ] }),
  ],
};

FORMS.ot_bte = {
  brand: '오티콘 (디만트)', name: '귀걸이형 주문서', template: 't/ot_bte.html', file: '오티콘_귀걸이형_주문서',
  sections: [
    { title: '주문 종류', items: [
      { type: 'choice', label: '무엇을 주문하나요', c: R(0, 5), o: ['BTE', 'RITE', '이어몰드', '수면몰드', '수영몰드', '소음방지몰드'] },
      { type: 'choice', label: '보장구 급여비 신청', c: [8], o: ['신청'] },
    ] },
    ...OT_HEAD({ order: 7, deliver: 9, name: 5, birth: 4, phone: 3, addr: 6, exp: [6, 7],
      audL: R(10, 19), audR: R(20, 29) }),
    { title: '보청기 (BTE · RITE)', items: [
      { type: 'lrtext', label: '제품명', L: 30, R: 32 },
      { type: 'lrtext', label: 'Ser No. (시리얼)', L: 31, R: 33, same: false },
      { type: 'lrchoice', label: 'Color (색상)', o: ['STG', 'CBE', 'DBL'], L: [9, 10, 11], R: [12, 13, 14] },
      { type: 'choice', label: '배터리', c: R(15, 18), o: ['10', '312', '13', '675'], single: true },
    ] },
    { title: 'BTE (귀걸이형)', hint: 'RITE(오픈형)이면 이 구역은 건너뛰세요.', items: [
      { type: 'choice', label: '튜브', c: [19], o: ['ㄱ자 튜브'] },
      { type: 'choice', label: '이어팁', c: R(20, 22), o: ['대', '중', '소'], single: true },
      { type: 'choice', label: 'BTE 이어몰드 귀', c: [23, 24], o: ['LT (왼쪽)', 'RT (오른쪽)'] },
      { type: 'choice', label: '몰드 재질', c: [25, 42], o: ['Hard (단단함)', 'Soft (말랑함)'], single: true },
      { type: 'choice', label: 'Hard 형태', c: R(26, 31), o: ['Canal', 'Canal lock', 'Half shell', 'Full shell', 'Skeleton', 'CI open'], single: true },
      { type: 'choice', label: 'Hard 벤트', c: R(32, 36), o: ['No vent', '1.0 mm', '1.4 mm', '2.4 mm', '제조사권장'], single: true },
      { type: 'choice', label: 'Hard 손잡이(PH)', c: R(37, 41), o: ['손잡이 넣기', 'Short', 'Standard', 'Long', 'Ring'] },
      { type: 'choice', label: 'Soft 형태', c: R(43, 45), o: ['Canal', 'Half shell', 'Full shell'], single: true },
      { type: 'choice', label: 'Soft 벤트', c: [46, 47], o: ['No vent', '1.0 mm'], single: true },
      { type: 'choice', label: 'Soft 옵션', c: [48], o: ['Gold Grip'] },
    ] },
    { title: '소음방지 · 수면 · 수영몰드', hint: '주문할 때만 고르세요.', items: [
      { type: 'choice', label: '소음방지몰드 귀', c: [49, 50], o: ['LT', 'RT'] },
      { type: 'choice', label: '소음방지몰드 종류', c: R(51, 53), o: ['HP 00 · Canal 형', 'HP 01 · Half shell 형', 'HP 02 · 뮤지션용'], single: true },
      { type: 'choice', label: '수면몰드 귀', c: [54, 55], o: ['LT', 'RT'] },
      { type: 'choice', label: '수영몰드 귀', c: [56, 57], o: ['LT', 'RT'] },
      { type: 'choice', label: '수영몰드 아쿠아가드 색상', c: R(58, 62), o: ['YELLOW', 'BLUE', 'RED', 'ORANGE', 'GREEN'], single: true },
      { type: 'choice', label: '수영몰드 케이스 색상', c: R(63, 66), o: ['YELLOW', 'BLUE', 'RED', 'WHITE'], single: true },
      { type: 'choice', label: '수영몰드 옵션', c: [67], o: ['분실방지용 줄'] },
    ] },
    { title: 'RITE (오픈형) 리시버', hint: 'BTE(귀걸이형)이면 건너뛰세요.', items: [
      { type: 'lrchoice', label: '리시버 출력', o: ['60', '85(M)', '100(P)', '105'], L: R(68, 71), R: R(76, 79) },
      { type: 'lrchoice', label: '리시버 길이', o: ['1', '2', '3', '4'], L: R(72, 75), R: R(80, 83) },
    ] },
    { title: 'miniBTE (Corda miniFit thin Tube 0.9)', hint: 'Thin tube 체크 시 Dome 필수 체크 · Hook(후크) 사용 시 이어몰드 필수 체크', items: [
      { type: 'lrchoice', label: '튜브 길이', o: ['0', '1', '2', '3', '4'], L: R(84, 88), R: R(89, 93) },
    ] },
    { title: 'DOME (돔)', items: [
      { type: 'choice', label: '돔 종류', c: [94, 98, 103, 110, 116], o: ['Open', 'Power', 'Bass', 'Open Bass', 'Grip Tip'], single: true },
      { type: 'choice', label: 'Open 크기', c: R(95, 97), o: ['6mm', '8mm', '10mm'], single: true },
      { type: 'choice', label: 'Power 크기', c: R(99, 102), o: ['6mm', '8mm', '10mm', '12mm'], single: true },
      { type: 'choice', label: 'Bass 종류·크기', c: [104, 105, 106, 107, 108, 109], o: ['S (싱글)', 'D (더블)', '6mm', '8mm', '10mm', '12mm'] },
      { type: 'choice', label: 'Open Bass 크기', c: R(111, 115), o: ['5mm', '6mm', '8mm', '10mm', '12mm'], single: true },
      { type: 'choice', label: 'Grip Tip 벤트', c: [117, 118], o: ['No vent', 'Vent[2.4mm]'], single: true },
      { type: 'choice', label: 'Grip Tip 방향', c: [119, 120], o: ['L', 'R'] },
      { type: 'choice', label: 'Grip Tip 크기', c: [121, 122], o: ['S', 'L'], single: true },
    ] },
    { title: 'RITE 이어몰드', items: [
      { type: 'choice', label: '몰드 귀', c: [123, 124], o: ['LT (왼쪽)', 'RT (오른쪽)'] },
      { type: 'choice', label: '재질', c: [125, 140, 144], o: ['Hard', 'Power', 'MicroShell Detect'], single: true, tip: 'MicroShell Detect는 인텐트 이상 제품, 리시버 100·105에만 가능' },
      { type: 'choice', label: 'Hard 세부', c: [126, 127], o: ['폐쇄형', '라이트팁'], single: true },
      { type: 'choice', label: 'Hard 형태', c: R(128, 131), o: ['Micro', 'Canal', 'Canal lock', 'Skeleton'], single: true },
      { type: 'choice', label: 'Hard 벤트', c: R(132, 134), o: ['No vent', '1.0 mm', '1.4 mm'], single: true },
      { type: 'choice', label: '손잡이(PH)', c: R(135, 139), o: ['손잡이 넣기', 'Short', 'Standard', 'Long', 'Ring'] },
      { type: 'choice', label: 'Power 형태·벤트', c: [141, 142, 143], o: ['Canal', 'No vent', '1.0 mm'] },
      { type: 'choice', label: 'MicroShell 형태·벤트', c: [145, 146, 147], o: ['Canal', 'No vent', '1.0 mm'] },
      { type: 'choice', label: '색상 (MicroShell Detect만)', c: R(148, 152), o: ['베이지', '빨강', '파랑', '검정', '투명'], single: true },
    ] },
    { title: 'Accessory (액세서리)', hint: '충전 전용 제품: 시리우스(Intent) / 폴라리스 R(Real) / 폴라리스(More, Zircon, Play PX) / 뷔룩스 S(Opn S, Ruby)', items: [
      { type: 'choice', label: '인텐트 전용 충전기', c: [153, 154], o: ['스마트충전기', '일반충전기'] },
      { type: 'choice', label: '그 밖의 충전기', c: [155, 156, 157, 158], o: ['스마트충전기', '일반충전기', 'miniRITE R', 'miniBTE R'] },
      { type: 'choice', label: '무선 액세서리', c: R(159, 162), o: ['TV 어댑터3.0', '커넥클립', '리모컨3.0', '에듀마이크'] },
      { type: 'choice', label: '배터리', c: R(163, 165), o: ['312A', '13A', '충전형 배터리'] },
    ] },
    ...OT_SEND([166, 167, 168, 169], { title: '의뢰사항', items: [
      { type: 'choice', label: '전화 요망', c: R(170, 173), o: ['전화 요망', '품질기술팀', 'CS팀 (청각 및 제품)', 'CS팀 (주문, 출고)'] },
      { type: 'text', label: '의뢰 내용 (첫째 줄)', t: 34 },
      { type: 'text', label: '의뢰 내용 (둘째 줄)', t: 35 },
    ] }),
  ],
};

FORMS.ot_gov = {
  brand: '오티콘 (디만트)', name: '정부지원 주문서', template: 't/ot_gov.html', file: '오티콘_정부지원_주문서',
  note: '귓속형·귀걸이형·골도형 중 해당하는 구역만 채우면 돼요.',
  sections: [
    { title: '고객 정보', items: [
      { type: 'date', label: '주문일', t: 6, today: true },
      { type: 'date', label: '납품일 (받을 날)', t: 8 },
      { type: 'text', label: '고객명', t: 4, key: 'name' },
      { type: 'text', label: '생년월일', t: 3, numeric: true, tip: '예: 1948.03.15' },
      { type: 'text', label: '고객 전화번호 (선택)', t: 5, numeric: true },
      { type: 'text', label: '고객 주소 (선택)', t: 7 },
      { type: 'choice', label: '보청기 사용 경험', c: [0, 1], o: ['유 (써 봤음)', '무 (처음)'], single: true },
      { type: 'choice', label: '보장구 급여비 신청', c: [2], o: ['신청'] },
    ] },
    { title: '청력검사표', hint: 'dB 숫자만 넣으세요. 모르는 칸은 비워도 돼요.', items: [
      { type: 'aud', freqs: ['125', '250', '500', '1K', '1.5K', '2K', '3K', '4K', '6K', '8K'], L: R(9, 18), R: R(19, 28) },
      { type: 'lrtext', label: 'WRS (어음명료도) dB', L: 'wLdb', R: 'wRdb', same: false },
      { type: 'lrtext', label: 'WRS (어음명료도) %', L: 'wLpc', R: 'wRpc', same: false },
    ] },
    { title: '귓속형 — 제품 · 쉘', hint: '귀걸이형·골도형이면 건너뛰세요.', items: [
      { type: 'lrtext', label: '제품명', L: 29, R: 30 },
      { type: 'choice', label: '쉘 형태', c: R(3, 7), o: ['IIC', 'IIC P', 'CIC', 'CIC P', 'ITC(312A)'], single: true, tip: 'P = 파워. 귀 모양에 따라 크기가 달라질 수 있어요' },
      { type: 'choice', label: 'Faceplate (겉판 색)', c: R(8, 12), o: ['Beige', 'Light Brown*', 'Medium Brown*', 'Dark Brown*', 'Black(IIC)'], single: true },
      { type: 'choice', label: 'Shell Color (몸통 색)', c: R(13, 21), o: ['Beige', 'Blue', 'Red', 'Clear', 'Black', 'Light Brown*', 'Medium Brown*', 'Dark Brown*', 'White*'], single: true, tip: '* 특수 색상은 맞춤 제작으로 유상, 영업일 7일 소요' },
      { type: 'choice', label: 'Canal (카날 길이)', c: R(22, 24), o: ['Short', 'Standard', 'Long'], single: true },
      { type: 'choice', label: 'RH (손잡이)', c: R(25, 28), o: ['Short', 'Standard', 'Long', 'Ring'], single: true },
      { type: 'choice', label: 'Venting (벤트)', c: R(29, 33), o: ['No vent', 'C.1.0mm', 'C.1.4mm', 'C.2.4mm', '제조사권장'], single: true },
    ] },
    { title: '귓속형 — 세부선택사항 표', hint: '형태 줄을 하나 고르고 넣을 옵션을 누르세요. 회색(N/A)이 아닌 칸에만 ✓가 찍혀요.', items: [
      { type: 'choice', label: '형태 줄', c: [170, 171, 172], o: ['IIC', 'CIC', 'ITC(312)'], single: true },
      { type: 'choice', label: '무선', c: [173, 174], o: ['NFMI (양이통신)', 'WL (무선통신)'] },
      { type: 'choice', label: 'Fitting Level (피팅레벨)', c: [175, 176, 177], o: ['75', '90', '100'], single: true },
      { type: 'choice', label: 'PB (프로그램 버튼)', c: [178, 179], o: ['L', 'R'] },
      { type: 'choice', label: 'VC (볼륨)', c: [180, 181], o: ['L', 'R'] },
      { type: 'choice', label: '텔레코일 (TC)', c: [182, 183], o: ['L', 'R'], tip: '텔레코일은 PB 추가 필수 · 블루투스와 동시 사용 불가' },
    ] },
    { title: '귀걸이형 — 제품', hint: '귓속형·골도형이면 건너뛰세요.', items: [
      { type: 'lrtext', label: '제품명', L: 49, R: 51 },
      { type: 'lrtext', label: '시리얼 번호', L: 50, R: 52, same: false },
      { type: 'lrchoice', label: '색상', o: ['진회색', '베이지색', '검정색'], L: [34, 35, 36], R: [37, 38, 39] },
    ] },
    { title: 'RITE (오픈형) — 리시버', items: [
      { type: 'choice', label: '리시버 귀', c: [44, 45], o: ['LT (왼쪽)', 'RT (오른쪽)'] },
      { type: 'lrchoice', label: '리시버 출력', o: ['85', '100', '105'], L: [46, 47, 48], R: [54, 55, 56] },
      { type: 'lrchoice', label: '리시버 길이', o: ['1', '2', '3', '4', '5*'], L: R(49, 53), R: R(57, 61), tip: '5*는 B시리즈만 가능' },
    ] },
    { title: 'RITE — 이어돔', items: [
      { type: 'choice', label: '이어돔 귀', c: [40, 41], o: ['L', 'R'] },
      { type: 'choice', label: '돔 종류', c: [62, 82, 87, 98, 108], o: ['Open', 'Power', 'Bass', 'Open Bass', 'Grip Tip'], single: true },
      { type: 'choice', label: 'Open 크기', c: R(63, 65), o: ['6mm', '8mm', '10mm'], single: true },
      { type: 'choice', label: 'Power 크기', c: R(83, 86), o: ['6mm', '8mm', '10mm', '12mm'], single: true },
      { type: 'choice', label: 'Bass 종류·크기', c: [88, 89, 90, 91, 92, 93], o: ['S (싱글)', 'D (더블)', '6mm', '8mm', '10mm', '12mm'] },
      { type: 'choice', label: 'Open Bass 크기', c: R(99, 103), o: ['5mm', '6mm', '8mm', '10mm', '12mm'], single: true },
      { type: 'choice', label: 'Grip Tip 방향', c: [109, 110], o: ['L', 'R'] },
      { type: 'choice', label: 'Grip Tip 크기', c: [111, 112], o: ['S', 'L'], single: true },
      { type: 'choice', label: 'Grip Tip 벤트', c: [113, 114], o: ['No vent', 'Vent[2.4mm]'], single: true },
    ] },
    { title: 'RITE — 이어몰드', items: [
      { type: 'choice', label: '이어몰드 귀', c: [42, 43], o: ['L', 'R'] },
      { type: 'choice', label: '재질', c: [66, 67, 94, 104], o: ['OtoTherm (유상)', 'Hard', 'Power', 'MicroShell Detect'], single: true, tip: 'MicroShell Detect는 B500 제품만, 리시버 100·105만 가능' },
      { type: 'choice', label: 'Hard 세부', c: [68, 69], o: ['폐쇄형', '라이트 팁'], single: true },
      { type: 'choice', label: '형태 (OtoTherm·Hard)', c: R(70, 73), o: ['Micro', 'Canal', 'Canal lock', 'Skeleton(only Hard)'], single: true },
      { type: 'choice', label: '벤트 (OtoTherm·Hard)', c: R(74, 76), o: ['No vent', '1.0mm', '1.4mm'], single: true },
      { type: 'choice', label: '손잡이(RH)', c: R(77, 81), o: ['손잡이 넣기', 'Short', 'Standard', 'Long', 'Ring'] },
      { type: 'choice', label: 'Power 형태·벤트', c: [95, 96, 97], o: ['Canal', 'No vent', '1.0mm'] },
      { type: 'choice', label: 'MicroShell 형태·벤트', c: [105, 106, 107], o: ['Canal', 'No vent', '1.0mm'] },
      { type: 'choice', label: '몰드 색상 (MicroShell Detect만)', c: R(115, 119), o: ['베이지', '빨강', '파랑', '검정', '투명'], single: true },
    ] },
    { title: 'BTE (귀걸이형)', items: [
      { type: 'choice', label: '튜브', c: [120], o: ['ㄱ자 튜브'] },
      { type: 'choice', label: '이어팁', c: R(121, 123), o: ['대', '중', '소'], single: true },
      { type: 'choice', label: '몰드 재질', c: [124, 125, 142], o: ['OtoTherm (유상)', 'Hard', 'Soft'], single: true },
      { type: 'choice', label: '형태 (OtoTherm·Hard)', c: R(126, 131), o: ['Canal', 'Canal lock', 'Half Shell', 'Full Shell', 'Skeleton(only Hard)', 'CI open(only Hard)'], single: true },
      { type: 'choice', label: '벤트 (OtoTherm·Hard)', c: R(132, 136), o: ['No vent', '1.0mm', '1.4mm', '2.4mm', '제조사 권장'], single: true },
      { type: 'choice', label: '손잡이(RH)', c: R(137, 141), o: ['손잡이 넣기', 'Short', 'Standard', 'Long', 'Ring'] },
      { type: 'choice', label: 'Soft 형태', c: R(143, 145), o: ['Canal', 'Half Shell', 'Full Shell'], single: true },
      { type: 'choice', label: 'Soft 벤트·옵션', c: [146, 147], o: ['No vent', 'Gold Grip (유상)'] },
    ] },
    { title: '골도형', hint: '골도형일 때만 채우세요.', items: [
      { type: 'text', label: '제품명', t: 53 },
      { type: 'text', label: '시리얼 번호', t: 54 },
      { type: 'choice', label: '색상', c: R(148, 150), o: ['진회색', '베이지색', '검정색'], single: true },
      { type: 'choice', label: '배터리', c: [151], o: ['312A (일반형)'] },
      { type: 'choice', label: '착용 옵션', c: [152, 153], o: ['소프트밴드', '사운드커넥터'] },
      { type: 'text', label: '소프트밴드 ( ) 안에 적을 내용', t: 'sband', tip: '짧게 (예: 크기·색)' },
    ] },
    { title: '급여제품 전용 액세서리', items: [
      { type: 'choice', label: '충전기', c: R(154, 157), o: ['일반충전기', '일반충전기(B500 전용)', '스마트충전기', '스마트충전기(B500 전용)'] },
      { type: 'choice', label: '무선 액세서리', c: R(158, 162), o: ['TV 어댑터 3.0', '커넥클립', '리모컨 3.0', '에듀마이크', '크로스'] },
    ] },
    ...OT_SEND([163, 164, 165, 166], { title: '의뢰사항 (전화 요망)', items: [
      { type: 'choice', label: '전화 받을 곳', c: [167, 168, 169], o: ['품질기술팀', 'CS팀 (청각 및 제품)', 'CS (주문, 출고)'] },
    ] }),
  ],
};

FORMS.ot_return = {
  brand: '오티콘 (디만트)', name: '반품 의뢰 신청서', template: 't/ot_return.html', file: '오티콘_반품의뢰신청서',
  note: '반품할 보청기와 구성품을 이 신청서와 함께 꼭 같이 보내야 해요.',
  sections: [
    { title: '제품 정보', items: [
      { type: 'choice', label: '브랜드', c: [0, 1, 2], o: ['오티콘', '버나폰', '필립스'], single: true },
      { type: 'text', label: '고객명', t: 'cname', key: 'name' },
      { type: 'text', label: '모델명', t: 0 },
      { type: 'text', label: '제품 S/N (시리얼)', t: 1 },
      { type: 'date', label: '구입일', parts: { y: 'bY', m: 'bM', d: 'bD' }, yy: true, t: 'buyDate' },
      { type: 'date', label: '반품 신청일', parts: { y: 'rY', m: 'rM', d: 'rD' }, yy: true, t: 'retDate', today: true },
    ] },
    { title: '급여지원금 청구 여부', hint: '공단 급여지원금 청구가 이미 끝난 보청기는 반품이 안 돼요. 먼저 청구를 취소해야 해요.', items: [
      { type: 'choice', label: '청구 상태', c: [3, 4], o: ['미청구', '청구 취소 완료'], single: true },
    ] },
    { title: '반품 사유', items: [
      { type: 'textarea', label: '반품 사유', t: 'reason' },
    ] },
  ],
};

FORMS.ot_repair = {
  brand: '오티콘 (디만트)', name: '수리의뢰서', template: 't/ot_repair.html', file: '오티콘_수리의뢰서',
  sections: [
    { title: '고객 · 제품 정보', items: [
      { type: 'text', label: '고객명', t: 0, key: 'name' },
      { type: 'text', label: '주민번호', t: 1, tip: '꼭 필요한지 담당자 확인 중 — 모르면 비워 두세요' },
      { type: 'text', label: '고객 주소 (선택)', t: 2 },
      { type: 'text', label: '고객 전화번호 (선택)', t: 3, numeric: true },
      { type: 'date', label: '주문일', t: 4, today: true },
      { type: 'date', label: '납품일 (받을 날)', t: 5 },
      { type: 'date', label: '구입일', t: 6 },
      { type: 'text', label: '모델', t: 7 },
      { type: 'text', label: '제품번호 (시리얼)', t: 8 },
    ] },
    { title: '보청기 상태', hint: '해당하는 증상을 모두 누르세요.', items: [
      { type: 'choice', label: '증상', c: R(0, 13), o: ['소리 안남', '소리 끊김(간헐적 중단)', '배터리 소모량 많음', '볼륨 조절 불량', '소리 약함', '스위치/프로그램버튼 불량', '소리가 울림', 'HOOK 불량', '소리가 찢어짐', '프로그램 연결 불량', '내부 피드백 발생', '배터리 도어 불량', '잡음', '점검'] },
    ] },
    { title: 'Shell 상태', items: [
      { type: 'choice', label: '쉘 문제', c: R(14, 23), o: ['Shell 파손', 'Wax Filter 빠짐', 'Shell 통증', 'Face Plate 분리', 'Shell 헐거움', 'Vent 빠짐', 'Canal 짧음', 'Canal 김', '손잡이 끊어짐', 'REC Tube 빠짐'] },
    ] },
    { title: '특이사항', hint: '기본 문구가 들어가 있어요. 필요하면 고치거나 덧붙이세요.', items: [
      { type: 'textarea', label: '특이사항', t: 'note', init: REPAIR_NOTE },
    ] },
    { title: '함께 보내는 물품', hint: '상자에 넣은 것만 체크하고 수량을 적어요.', items: [
      { type: 'choice', label: '보내는 물품', c: R(24, 27), o: ['보청기', '귓본', '부속품', '기타'] },
      { type: 'text', label: '보청기 수량', t: 'q1', numeric: true },
      { type: 'text', label: '귓본 수량', t: 'q2', numeric: true },
      { type: 'text', label: '부속품 수량', t: 'q3', numeric: true },
      { type: 'text', label: '기타 수량', t: 'q4', numeric: true },
    ] },
    { title: '기타 의뢰 사항', items: [
      { type: 'textarea', label: '기타 의뢰 사항', t: 'etc' },
    ] },
  ],
};
