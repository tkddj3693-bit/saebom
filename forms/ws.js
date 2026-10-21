// ws 제조사 서식 정의 (FORMS 에 추가) — WS Audiology: 시그니아 · 와이덱스
// 칸 번호: c = 템플릿(t/<id>.html) 안 체크박스(.cb) 순서, t 숫자 = 빈 <td> 순서, t 글자 = data-f 이름
// 템플릿 입력 자리는 apptools/patch_ws.py 로 넣음 (make_template.py 다시 돌린 뒤 patch_ws.py 실행)

const WS_FREQ = ['250', '500', '1K', '2K', '4K', '6K', '8K'];
const WS_HEAD = (extra) => ({ title: '기본 정보', items: [
  { type: 'date', label: '주문 접수일', parts: { y: 'rY', m: 'rM', d: 'rD' }, t: 'rDate', today: true },
  { type: 'date', label: '본사 출고 요청일', parts: { y: 'sY', m: 'sM', d: 'sD' }, t: 'sDate' },
  { type: 'text', label: '고객명', t: 'nm', key: 'name' },
  { type: 'text', label: '나이', t: 'age', numeric: true, suffix: '세' },
  { type: 'choice', label: '성별', c: [0, 1], o: ['남', '여'], single: true },
  { type: 'choice', label: '전화 상담 요청', c: [2], o: ['전화 상담을 원해요'], tip: '체크하면 제조사가 상담 요청 연락처(매장 번호)로 전화해요' },
  { type: 'choice', label: '보청기 사용 경험', c: [3, 4], o: ['유', '무'], single: true },
].concat(extra || []) });

FORMS.ws_sig_ite = {
  brand: 'WSA · 시그니아', name: '시그니아 귓속형 주문서', template: 't/ws_sig_ite.html', file: '시그니아_귓속형_주문서',
  sections: [
    WS_HEAD(),
    { title: '청력', hint: 'dB 숫자만 넣으세요. 모르는 칸은 비워도 돼요.', items: [
      { type: 'aud', freqs: WS_FREQ, L: [2, 3, 4, 5, 6, 7, 8], R: [9, 10, 11, 12, 13, 14, 15] },
    ] },
    { title: '제품 선택', hint: '제품 줄 하나에서 등급(7~1) 하나만 고르세요.', items: [
      { type: 'choice', label: '방향', c: [5, 6], o: ['L(좌)', 'R(우)'] },
      { type: 'choice', label: '마이크 옵션', c: [7, 8], o: ['Omni', 'Twin (ITC만 가능)'], single: true },
      { type: 'choice', label: '무선 통신', c: [9, 10], o: ['유', '무'], single: true },
      { type: 'choice', label: 'INSIO IX C&G (충전형, CIC만)', c: [11, 12, 13, 14, 15], o: ['7', '5', '3', '2', '1'], single: true },
      { type: 'choice', label: 'INSIO IX', c: [18, 19, 20, 21, 22], o: ['7', '5', '3', '2', '1'], single: true },
      { type: 'choice', label: 'INSIO AX C&G (충전형 ITC)', c: [23, 24, 25, 26, 27], o: ['7', '5', '3', '2', '1'], single: true },
      { type: 'choice', label: 'INSIO Nx', c: [28, 29, 30, 31, 32], o: ['7', '5', '3', '2', '1'], single: true },
      { type: 'choice', label: 'Nx ITC 무선', c: [16, 17], o: ['비블루투스', '블루투스 (트윈마이크, MM/무선 기본 장착)'], single: true, tip: 'Nx ITC를 고를 때만' },
      { type: 'choice', label: '기타 제품', c: [33, 34], o: ['INTUIS 3', 'PROMPT'], single: true, tip: 'IIC, 트윈마이크, 무선통신 선택 불가' },
      { type: 'lrchoice', label: '크기·출력 (괄호 숫자)', o: ['IIC(50)', 'CIC(50)', 'CIC(55)', 'CIC(60/65)', 'ITC(50)', 'ITC(55)', 'ITC(60/65)'],
        L: [35, 37, 39, 41, 43, 45, 47], R: [36, 38, 40, 42, 44, 46, 48] },
    ] },
    { title: '쉘 옵션 — 색상·벤트', hint: '만드는 형태(IIC / CIC / ITC)에 맞는 줄에서 고르세요.', items: [
      { type: 'choice', label: '면판 색상 — IIC', c: [49, 50, 51], o: ['블랙', '다크브라운 (IX C&G CIC 포함)', '모카 (IX)'], single: true },
      { type: 'choice', label: '면판 색상 — CIC', c: [54, 55, 56], o: ['모카', '브라운', '블랙 (IX/Nx CIC)'], single: true },
      { type: 'choice', label: '면판 색상 — ITC', c: [57, 58, 59], o: ['베이지', '브라운', '블랙 (AX, IX ITC)'], single: true },
      { type: 'choice', label: '쉘 색상 — IIC', c: [60, 61, 62, 63], o: ['블랙', '다크브라운 (IX C&G CIC 포함)', '블루', '레드'], single: true },
      { type: 'choice', label: '쉘 색상 — CIC / ITC', c: [67, 68, 69, 70, 71], o: ['베이지', '파랑', '빨강', '블랙 (AX ITC, IX/Nx)', '모카 (IX C&G CIC)'], single: true },
      { type: 'choice', label: '벤트 위치', c: [52, 53], o: ['기본 벤트 (플레이트)', '측면 벤트 (쉘사이드)'], single: true },
      { type: 'choice', label: '벤트 — IIC', c: [64, 65, 66], o: ['벤트없음', '1.3mm', '외부벤트'], single: true },
      { type: 'choice', label: '벤트 — CIC / ITC', c: [72, 73, 74, 75, 76], o: ['벤트없음', '1.3mm', '1.6mm', '외부벤트', 'IROS'], single: true },
    ] },
    { title: '쉘 옵션 — 길이·귀지·방향', items: [
      { type: 'choice', label: '커널 길이', c: [77, 78, 79], o: ['짧게', '중간', '길게'], single: true },
      { type: 'choice', label: '손잡이 길이', c: [80, 81, 82, 83], o: ['5mm', '7mm', '10mm', '고리형'], single: true },
      { type: 'choice', label: '귀지 방지망', c: [84, 85], o: ['퀵가드', 'ERT (튜브연장)'], single: true },
      { type: 'choice', label: '방향점', c: [86, 87], o: ['방향점 (베이지만 가능)', '방향표시 L/R (색상쉘만 가능)'] },
    ] },
    { title: '선택 옵션 · 액세서리', items: [
      { type: 'choice', label: '선택 옵션', c: [88, 89, 90, 91], o: ['VC (볼륨)', 'MM (도어버튼, CIC만)', 'TC (텔레코일)', 'MM (기둥식 버튼, ITC·px CIC만)'] },
      { type: 'choice', label: '스트리밍 / 리모콘', c: [92, 93, 94], o: ['TV Sound', '스트림라인 마이크', '미니포켓'] },
      { type: 'choice', label: '충전기', c: [95, 96], o: ['포터블차저 인시오 IX CIC', '인시오 AX 차저'] },
      { type: 'choice', label: '크로스', c: [97], o: ['크로스 실크 Nx'] },
    ] },
    { title: '함께 보내는 물품 · 메모', hint: '상자에 넣은 것만 체크하고 수량을 적어요.', items: [
      { type: 'choice', label: '함께 보내는 물품', c: [98, 99, 100, 101], o: ['보청기', '부속품', '액세서리', '기타'] },
      { type: 'text', label: '보청기 수량', t: 'q1', numeric: true },
      { type: 'text', label: '부속품 수량', t: 'q2', numeric: true },
      { type: 'text', label: '액세서리 수량', t: 'q3', numeric: true },
      { type: 'text', label: '기타 수량', t: 'q4', numeric: true },
      { type: 'textarea', label: '메모', t: 16 },
    ] },
  ],
};

FORMS.ws_sig_bte = {
  brand: 'WSA · 시그니아', name: '시그니아 오픈형·귀걸이형 / 이어몰드 주문서', template: 't/ws_sig_bte.html', file: '시그니아_오픈형_귀걸이형_주문서',
  sections: [
    WS_HEAD(),
    { title: '청력', hint: 'dB 숫자만 넣으세요. 모르는 칸은 비워도 돼요.', items: [
      { type: 'aud', freqs: WS_FREQ, L: [2, 3, 4, 5, 6, 7, 8], R: [9, 10, 11, 12, 13, 14, 15] },
    ] },
    { title: '제품', items: [
      { type: 'text', label: '제품명', t: 16 },
      { type: 'text', label: '제품 색상', t: 17 },
      { type: 'choice', label: '주문 수량', c: [5, 6, 7], o: ['L', 'R', '충전기 업그레이드'] },
      { type: 'text', label: 'L 수량', t: 'qL', numeric: true },
      { type: 'text', label: 'R 수량', t: 'qR', numeric: true },
    ] },
    { title: 'RIC(오픈형) — 리시버', hint: 'RIC(오픈형)을 주문할 때만 채우세요.', items: [
      { type: 'choice', label: '리시버 3.0 끝 (맞춤)', c: [8, 9], o: ['이어몰드 3.0', 'HP커스텀 (IX / AX 사용)'], single: true },
      { type: 'choice', label: '출력', c: [16, 17, 18], o: ['S', 'M', 'P'], single: true },
      { type: 'lrchoice', label: '방향 · 길이', o: ['0', '1', '2', '3', '4', '5'], L: [10, 11, 12, 13, 14, 15], R: [19, 20, 21, 22, 23, 24] },
    ] },
    { title: 'RIC(오픈형) — 귀에 끼우는 팁', hint: '팁 종류 하나를 골라 크기를 고르세요.', items: [
      { type: 'choice', label: '슬리브 3.0 종류', c: [25, 26, 27], o: ['벤트', '클로즈', '파워'], single: true },
      { type: 'choice', label: '슬리브 3.0 크기', c: [28, 29, 30, 31], o: ['XS', 'S', 'M', 'L'], single: true },
      { type: 'choice', label: '클릭 슬리브 2.0 종류', c: [32, 33], o: ['벤트', '클로즈'], single: true },
      { type: 'choice', label: '클릭 슬리브 2.0 크기', c: [34, 35, 36, 37], o: ['XS', 'S', 'M', 'L'], single: true },
      { type: 'choice', label: '이어팁 3.0 오픈', c: [38, 39, 40], o: ['5mm', '7mm', '10mm'], single: true },
      { type: 'choice', label: '이어팁 3.0 튤립', c: [50, 51], o: ['8mm', '12mm'], single: true },
      { type: 'choice', label: '클릭 돔 2.0 오픈', c: [41, 42, 43], o: ['4mm', '8mm', '10mm'], single: true },
      { type: 'choice', label: '클릭 돔 2.0 세미오픈', c: [44], o: ['세미오픈 (단일 사이즈)'] },
      { type: 'choice', label: '클릭 돔 2.0 클로즈', c: [45, 46, 47], o: ['6mm', '8mm', '10mm'], single: true },
      { type: 'choice', label: '클릭 돔 2.0 더블', c: [48, 49], o: ['8/10mm', '10/12mm'], single: true },
    ] },
    { title: 'RIC(오픈형) — 벤트·길이', items: [
      { type: 'choice', label: '벤트', c: [52, 53, 54, 55], o: ['벤트 없음', '1.3mm', '1.6mm', '제조사 권장'], def: 3, single: true },
      { type: 'choice', label: '커널 길이', c: [56, 57, 58], o: ['짧게', '중간', '길게'], single: true },
      { type: 'choice', label: '손잡이', c: [59, 60, 61], o: ['5mm', '7mm', '10mm'], single: true },
    ] },
    { title: 'BTE(귀걸이형) — 이어후크·몰드', hint: 'BTE(귀걸이형)을 주문할 때만 채우세요.', items: [
      { type: 'choice', label: '방향', c: [62, 63], o: ['왼쪽', '오른쪽'] },
      { type: 'choice', label: '재질', c: [67, 68], o: ['하드', '소프트'], single: true },
      { type: 'choice', label: '형태', c: [73, 74, 75, 76, 77, 78], o: ['ITC', 'half shell', 'full shell', 'skeleton', '스위밍', '귀마개'], single: true },
      { type: 'choice', label: '커널 길이', c: [64, 65, 66], o: ['짧게', '중간', '길게'], single: true },
      { type: 'choice', label: '벤트 (하드 재질만)', c: [69, 70, 71, 72], o: ['벤트없음', '1.3mm', '1.6mm', '제조사권장'], def: 3, single: true },
      { type: 'choice', label: '기타', c: [79, 80, 81], o: ['손잡이', 'L자 튜브 (하드만)', '커널락'] },
    ] },
    { title: 'BTE(귀걸이형) — 씬튜브', hint: '씬튜브는 별도 금액이 있어요 (모션 C&G X P, 인투이스4 P만).', items: [
      { type: 'choice', label: '씬튜브 3.0 굵기', c: [82, 83], o: ['0.9mm', '1.4mm'], single: true, tip: '안 고르면 기존 씬튜브로 나와요' },
      { type: 'lrchoice', label: '방향 · 길이', o: ['0', '1', '2', '3', '4'], L: [84, 85, 86, 87, 88], R: [89, 90, 91, 92, 93] },
      { type: 'choice', label: '이어팁 3.0 오픈', c: [94, 95, 96], o: ['5mm', '7mm', '10mm'], single: true },
      { type: 'choice', label: '이어팁 3.0 튤립', c: [104, 105], o: ['8mm', '12mm'], single: true },
      { type: 'choice', label: '슬리브 3.0 종류', c: [97, 98, 99], o: ['벤트', '클로즈', '파워'], single: true },
      { type: 'choice', label: '슬리브 3.0 크기', c: [100, 101, 102, 103], o: ['XS', 'S', 'M', 'L'], single: true },
    ] },
    { title: '액세서리', hint: '충전기 어댑터·케이블은 포함되지 않아요.', items: [
      { type: 'choice', label: '오디오 스트리밍 / 리모컨', c: [106, 107, 108], o: ['TV Sound', '스트림라인 마이크', '미니포켓'] },
      { type: 'choice', label: '충전기 — RIC · CIC', c: [109, 110, 111], o: ['포터블 충전기 (RIC)', '인시오 C&G IX (CIC)', '실크 C&G 차저 (CIC)'] },
      { type: 'choice', label: '충전기 — 스탠다드', c: [112, 113, 114], o: ['차저 RIC (퓨어 C&G IX/AX)', '차저 BTE P (모션 C&G P IX)', '차저 BTE SP (모션 C&G SP IX)'] },
      { type: 'choice', label: '충전기 — 드라이앤클린', c: [115, 116, 117], o: ['D&C차저 RIC (퓨어 C&G IX/AX)', 'D&C차저 BTE P (모션 C&G P IX)', 'D&C차저 BTE SP (모션 C&G SP IX)'] },
      { type: 'choice', label: '크로스', c: [118, 119, 120, 121, 122, 123], o: ['퓨어 C&G BCT IX (BCT 전용)', '퓨어 C&G IX', '스타일레토 IX', '실크 C&G IX', '퓨어 312 AX', '스타일레토 AX'] },
      { type: 'textarea', label: '특이사항 / 메모', t: 'memo' },
    ] },
  ],
};

FORMS.ws_return = {
  brand: 'WSA', name: 'WSA 보청기 반품 요청서', template: 't/ws_return.html', file: 'WSA_반품요청서',
  sections: [
    { title: '기본 정보', items: [
      { type: 'date', label: '접수일자', t: 'rcv', today: true },
      { type: 'text', label: '고객명', t: 'nm', key: 'name' },
      { type: 'text', label: '모델명 및 타입', t: 'model' },
      { type: 'text', label: '시리얼 번호', t: 'sn' },
    ] },
    { title: '반품 사유', hint: '해당하는 것을 모두 고르세요.', items: [
      { type: 'choice', label: '기기 문제', c: [0, 1, 2], o: ['작동안됨', '충전불량', '프로그램 연결안됨'] },
      { type: 'choice', label: '쉘 관련 문제', c: [3, 4, 5, 6, 7, 8], o: ['통증', '큰사이즈', '착용힘듬', '피드백', '헐거움', '밀려나옴'] },
      { type: 'choice', label: '음질 만족도', c: [9, 10, 11], o: ['잡음', '소리울림', '소리끊김'] },
      { type: 'choice', label: '고객 변심', c: [12, 13], o: ['단순변심', '적응실패'] },
      { type: 'text', label: '기타 사유', t: 'etc' },
    ] },
    { title: '기타사항', items: [
      { type: 'textarea', label: '기타사항', t: 'memo' },
    ] },
  ],
};

FORMS.ws_repair = {
  brand: 'WSA', name: 'WSA 보청기 서비스 / 수리 요청서', template: 't/ws_repair.html', file: 'WSA_수리요청서',
  initC: [0],
  sections: [
    { title: '센터 정보', items: [
      { type: 'date', label: '접수일자', t: 'rcv', today: true },
      { type: 'text', label: '사용자 이름', t: 'nm', key: 'name' },
      { type: 'text', label: 'HP (선택)', t: 'hp', numeric: true, tip: '보통 비워 둬요. Tel에는 매장 번호가 이미 들어가 있어요' },
      { type: 'choice', label: '전화 요망', c: [0, 1], o: ['수리비 관련', '증상 문의 관련'], tip: '수리비 관련은 처음부터 체크돼 있어요' },
      { type: 'date', label: '본사 출고 요청일', t: 'ship' },
      { type: 'choice', label: '배송 방법', c: [2, 3, 4], o: ['일반 택배', '지하철 택배', '고속 택배'], single: true, tip: '지하철·고속은 추가 비용이 있어요' },
      { type: 'textarea', label: '특이사항 (2줄)', t: 'noteA', init: REPAIR_NOTE },
    ] },
    { title: '제품 정보', items: [
      { type: 'text', label: '제품명', t: 'prod' },
      { type: 'text', label: '시리얼 번호', t: 'sn' },
      { type: 'choice', label: '방향', c: [5, 6], o: ['L', 'R'] },
      { type: 'choice', label: '보청기 형태', c: [7, 8, 9, 10, 11, 12, 13, 14, 15], o: ['IIC', 'CIC', 'ITC', 'BTE', 'RIC', 'SLIM RIC', 'Instant ITE', '포켓티오', '기타 (예: 액세서리)'], single: true },
      { type: 'text', label: '기타 형태 (기타를 골랐을 때)', t: 'typeEtc' },
      { type: 'choice', label: '보증기간 내', c: [16, 17], o: ['Yes', 'No'], single: true },
    ] },
    { title: '문제 사항', hint: '해당하는 것을 모두 고르세요.', items: [
      { type: 'choice', label: '수리 (Repair)', c: [18, 19, 20, 21, 22, 23, 24, 25], o: ['소리안남/약함', '소리왜곡', '배터리 소모큼', '연결안됨 (프로그램)', '잡음', '피드백', '소리끊김', '기타'] },
      { type: 'text', label: '수리 기타 내용', t: 'repEtc' },
      { type: 'choice', label: '쉘 재제작 (Remake)', c: [26, 27, 28, 29, 30, 31], o: ['헐거움', '벤트', '크기문제', '꽉 끼임 (통증)', '파손', '기타'] },
      { type: 'text', label: '재제작 기타 내용', t: 'remEtc' },
      { type: 'textarea', label: '특이사항 (증상, 2줄)', t: 'noteB' },
    ] },
  ],
};

FORMS.ws_widex_repair = {
  brand: 'WSA · 와이덱스', name: '와이덱스 보청기 수리 의뢰서', template: 't/ws_widex_repair.html', file: '와이덱스_수리의뢰서',
  sections: [
    { title: '기본 정보', items: [
      { type: 'text', label: '고객명', t: 0, key: 'name' },
      { type: 'text', label: '생년월일', t: 1, numeric: true, tip: '예: 450312' },
      { type: 'choice', label: '성별', c: [0, 1], o: ['남', '여'], single: true },
      { type: 'date', label: '의뢰일', parts: { y: 'qY', m: 'qM', d: 'qD' }, yy: true, t: 'qDate', today: true },
      { type: 'date', label: '도착예정일', parts: { y: 'aY', m: 'aM', d: 'aD' }, yy: true, t: 'aDate' },
      { type: 'text', label: '주문 담당자', t: 2 },
    ] },
    { title: '제품', items: [
      { type: 'text', label: '모델명', t: 3 },
      { type: 'text', label: '제품번호 (SN)', t: 4 },
      { type: 'choice', label: '방향', c: [2, 3], o: ['R', 'L'] },
    ] },
    { title: '수리 항목', hint: '해당하는 것을 모두 고르세요.', items: [
      { type: 'choice', label: '수리 항목', c: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        o: ['작동 안됨', '기기 점검', 'FITTING 불량', 'DOOR 불량', '간헐적 중단', '귀지 막힘', 'HOOK 불량', '잡음', '침수', '피드백 발생', '손잡이', '소리 약함', '코팅', '기타'] },
      { type: 'choice', label: 'SHELL', c: [18, 19, 20, 21, 22, 23, 24, 25], o: ['통증', '파손', '헐거움', 'VENT', '방향 교체', '피드백 발생', '사용자 변경', '기타'] },
    ] },
    { title: '비고', items: [
      { type: 'textarea', label: '비고', t: 5, init: REPAIR_NOTE },
    ] },
  ],
};
