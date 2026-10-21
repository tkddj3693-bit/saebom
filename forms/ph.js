// ph 제조사 서식 정의 (FORMS 에 추가) — 포낙 / 유니트론 (소노바)

FORMS.ph_ite = {
  brand: '포낙 / 유니트론', name: '귓속형(ITE) 주문서', template: 't/ph_ite.html', file: '포낙_귓속형_주문서',
  note: '제품 칸(①~⑤)은 주문할 제품 하나만 채우세요. 나머지는 비워 두면 돼요.',
  sections: [
    { title: '고객 정보', items: [
      { type: 'text', label: '고객명', t: 'nm', key: 'name' },
      { type: 'text', label: '나이', t: 'age', numeric: true },
      { type: 'text', label: '직업', t: 'job' },
      { type: 'choice', label: '성별', c: [4, 5], o: ['남', '여'], single: true },
      { type: 'date', label: '주문일', t: 'oDate', parts: { y: 'oY', m: 'oM', d: 'oD' }, today: true },
      { type: 'date', label: '도착일 (받고 싶은 날)', t: 'aDate', parts: { y: 'aY', m: 'aM', d: 'aD' } },
      { type: 'choice', label: '유상배송', c: [6, 7, 8], o: ['지하철', '퀵서비스', '고속버스'], single: true, tip: '택배로 받을 거면 비워 두세요' },
      { type: 'choice', label: '보청기 보증기간 연장 (유상)', c: [9], o: ['1년 추가'] },
      { type: 'choice', label: '상담 요청', c: [10, 11], o: ['CS상담 (주문, 배송)', '쉘 상담'] },
    ] },
    { title: '청력 (Hearing Level)', hint: 'dB 숫자만 넣으세요. 모르는 칸은 비워도 돼요.', items: [
      { type: 'aud', freqs: ['250', '500', '1000', '1500', '2000', '3000', '4000', '6000', '8000'], L: [1, 2, 3, 4, 5, 6, 7, 8, 9], R: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
    ] },
    { title: '제품', items: [
      { type: 'text', label: '제품명', t: 19 },
      { type: 'choice', label: '보장구 바코드 신청 (공단 청구 고객)', c: [12], o: ['신청'] },
    ] },
    { title: '① 10A 티타늄 (IIC·CIC)', hint: '이 제품이 아니면 건너뛰세요.', items: [
      { type: 'choice', label: '쉘 타입', c: [13, 14], o: ['IIC', 'CIC'], single: true },
      { type: 'choice', label: '방향', c: [24, 25], o: ['L (왼쪽)', 'R (오른쪽)'] },
      { type: 'choice', label: '출력', c: [34, 35, 36], o: ['M (IIC 권장)', 'P', 'SP'], single: true },
      { type: 'choice', label: '프로그램 버튼', c: [52], o: ['넣기'] },
      { type: 'choice', label: '페이스 플레이트', c: [59, 60, 61], o: ['검정', '갈색', '살색'], single: true },
    ] },
    { title: '② 10A (IIC·CIC·MC)', hint: '이 제품이 아니면 건너뛰세요. 프로그램 버튼은 기본으로 들어가요.', items: [
      { type: 'choice', label: '쉘 타입', c: [15, 16, 17], o: ['IIC', 'CIC', 'MC (볼륨 선택 시)'], single: true },
      { type: 'choice', label: '방향', c: [26, 27], o: ['L (왼쪽)', 'R (오른쪽)'] },
      { type: 'choice', label: '출력', c: [37, 38, 39], o: ['M', 'P', 'SP'], single: true },
      { type: 'choice', label: '볼륨조절기', c: [53, 54], o: ['L', 'R'] },
      { type: 'choice', label: '페이스 플레이트', c: [62, 63], o: ['검정', '갈색'], single: true },
    ] },
    { title: '③ 312A (MC)', hint: '이 제품이 아니면 건너뛰세요. 쉘은 MC, 페이스 플레이트는 살색으로 정해져 있어요.', items: [
      { type: 'choice', label: '방향', c: [28, 29], o: ['L (왼쪽)', 'R (오른쪽)'] },
      { type: 'choice', label: '출력', c: [40, 41, 42], o: ['M', 'P', 'SP'], single: true },
      { type: 'choice', label: '볼륨조절기', c: [55, 56], o: ['L', 'R'] },
    ] },
    { title: '④ 312A 무선 (ITC·HS·FS)', hint: '이 제품이 아니면 건너뛰세요. 무선·프로그램 버튼은 기본이에요.', items: [
      { type: 'choice', label: '쉘 타입', c: [18, 19, 20], o: ['ITC', 'HS (하프쉘)', 'FS (풀쉘)'], single: true },
      { type: 'choice', label: '방향', c: [30, 31], o: ['L (왼쪽)', 'R (오른쪽)'] },
      { type: 'choice', label: '출력', c: [43, 44, 45, 46], o: ['M', 'P', 'SP', 'UP'], single: true },
      { type: 'choice', label: '볼륨조절기', c: [57, 58], o: ['L', 'R'] },
      { type: 'choice', label: '페이스 플레이트', c: [64, 65], o: ['살색', '검정'], single: true },
    ] },
    { title: '⑤ 충전식 (ITC·HS·FS)', hint: '이 제품이 아니면 건너뛰세요. 무선·프로그램 버튼은 기본이에요.', items: [
      { type: 'choice', label: '쉘 타입', c: [21, 22, 23], o: ['ITC', 'HS (하프쉘)', 'FS (풀쉘)'], single: true },
      { type: 'choice', label: '방향', c: [32, 33], o: ['L (왼쪽)', 'R (오른쪽)'] },
      { type: 'choice', label: '출력', c: [47, 48, 49, 50, 51], o: ['RightFit (AOR+AOV)', 'M', 'P', 'SP', 'UP'], single: true, tip: 'RightFit = 음향최적화 리시버 + 음향최적화 벤트. 아니면 M~UP 중 하나' },
      { type: 'choice', label: '페이스 플레이트', c: [66, 67], o: ['살색', '검정'], single: true },
    ] },
    { title: '무선 액세서리', items: [
      { type: 'text', label: '무선 액세서리 (있으면)', t: 'wacc', tip: '예) 리모트 컨트롤' },
    ] },
    { title: '세부 선택', hint: '고르지 않은 칸은 제조사 기본으로 만들어요.', items: [
      { type: 'choice', label: '쉘 색상', c: [68, 69, 70, 71, 72], o: ['살색', '파랑(좌)', '빨강(우)', '검정 (312 듀얼만)', '방향표시점'] },
      { type: 'choice', label: '쉘 크기', c: [73, 74, 75], o: ['최소', '기본', '크게'], single: true, def: 1 },
      { type: 'choice', label: '귀지 방지 옵션', c: [76, 77, 78], o: ['왁스가드', 'ERT (튜브연장)', '스프링 가드'], single: true },
      { type: 'choice', label: '코팅 종류', c: [79, 80], o: ['일반코팅', '무코팅'], single: true },
      { type: 'choice', label: '손잡이 길이', c: [81, 82, 83, 84, 85], o: ['U형태', '짧게', '중간', '길게', '없음'], single: true },
      { type: 'text', label: '손잡이 길이 요청 (mm)', t: 'rhLen', numeric: true },
      { type: 'choice', label: '외이도 길이', c: [86, 87, 88, 89], o: ['추가 길게', '길게', '중간', '짧게'], single: true },
    ] },
    { title: '벤트', hint: '디지털쉘은 1.0~5.0mm까지 고를 수 있어요.', items: [
      { type: 'choice', label: '벤트 종류', c: [90, 91, 92, 93], o: ['일반형 (스탠다드)', '레귤러', 'IROS', 'Trench (트렌치)'], single: true },
      { type: 'choice', label: '벤트 크기', c: [94, 95, 96, 97], o: ['AOV (오디오그램 필수)', '왼쪽 mm 지정', '오른쪽 mm 지정', '벤트 없음'] },
      { type: 'text', label: '왼쪽 벤트 크기 (mm)', t: 'vL', numeric: true },
      { type: 'text', label: '오른쪽 벤트 크기 (mm)', t: 'vR', numeric: true },
    ] },
    { title: '함께 보내는 물품', items: [
      { type: 'choice', label: '보내는 물품', c: [0, 1, 2, 3], o: ['보청기', '부속품', '귓본', '기타'], tip: '체크 안 한 물품은 분실돼도 책임지지 않는다고 적혀 있어요' },
      { type: 'text', label: '보청기 수량', t: 'qHA', numeric: true },
      { type: 'text', label: '부속품 수량', t: 'qAcc', numeric: true },
      { type: 'text', label: '귓본 수량', t: 'qImp', numeric: true },
      { type: 'text', label: '기타 수량', t: 'qEtc', numeric: true },
    ] },
    { title: '특이사항', items: [
      { type: 'textarea', label: '특이사항', t: 'memo' },
    ] },
  ],
};

FORMS.ph_ricbte = {
  brand: '포낙 / 유니트론', name: 'RIC·BTE 주문서', template: 't/ph_ricbte.html', file: '포낙_RIC_BTE_주문서',
  sections: [
    { title: '고객 정보', items: [
      { type: 'choice', label: '브랜드', c: [4, 5], o: ['포낙', '유니트론'], single: true },
      { type: 'text', label: '고객명', t: 'nm', key: 'name' },
      { type: 'text', label: '나이', t: 'age', numeric: true },
      { type: 'text', label: '직업', t: 'job' },
      { type: 'choice', label: '성별', c: [6, 7], o: ['남', '여'], single: true },
      { type: 'date', label: '주문일', t: 'oDate', parts: { y: 'oY', m: 'oM', d: 'oD' }, today: true },
      { type: 'date', label: '도착일 (받고 싶은 날)', t: 'aDate', parts: { y: 'aY', m: 'aM', d: 'aD' } },
      { type: 'choice', label: '유상배송', c: [8, 9, 10], o: ['지하철', '퀵서비스', '고속버스'], single: true, tip: '택배로 받을 거면 비워 두세요' },
      { type: 'choice', label: '상담 요청', c: [11, 12], o: ['CS상담 (주문, 배송)', '쉘 상담'] },
      { type: 'choice', label: '보청기 보증기간 연장 (유상)', c: [13], o: ['1년 추가'] },
    ] },
    { title: '청력 (Hearing Level)', hint: 'dB 숫자만 넣으세요. 모르는 칸은 비워도 돼요.', items: [
      { type: 'aud', freqs: ['250', '500', '1000', '1500', '2000', '3000', '4000', '6000', '8000'], L: [1, 2, 3, 4, 5, 6, 7, 8, 9], R: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
    ] },
    { title: '제품', items: [
      { type: 'choice', label: '제품 타입', c: [14, 15], o: ['RIC (오픈형)', 'BTE (귀걸이형)'], single: true },
      { type: 'text', label: '제품명 ①', t: 19 },
      { type: 'text', label: '색상 ①', t: 20 },
      { type: 'text', label: '수량 ①', t: 21, numeric: true },
      { type: 'text', label: '제품명 ② (다른 제품이 있으면)', t: 22 },
      { type: 'text', label: '색상 ②', t: 23 },
      { type: 'text', label: '수량 ②', t: 24, numeric: true },
      { type: 'text', label: '합계 수량', t: 25, numeric: true },
      { type: 'lrtext', label: '리시버 (길이·출력 × 갯수)', L: 'rcvL', R: 'rcvR', same: false, tip: '예) 1M X 4 → 길이 1, 출력 M, 4개' },
      { type: 'text', label: '돔 (종류·크기·갯수)', t: 'dome', tip: '예) 벤티드 S X 1개' },
    ] },
    { title: 'RIC용 옵션', hint: 'RIC(오픈형)일 때만 채우세요.', items: [
      { type: 'choice', label: '제작 쉘', c: [16, 17, 18], o: ['cShell', 'SlimTip (SP/SP+/UP 불가)', 'CROSTip'], single: true },
      { type: 'lrtext', label: '리시버 (제작 쉘용, 길이·출력 × 갯수)', L: 'ricL', R: 'ricR', same: false, tip: '예) 1M X 4' },
      { type: 'choice', label: '귀지방지 (cShell만)', c: [19, 20, 21], o: ['왁스가드', '스프링가드', 'ERT (튜브연장)'], single: true },
      { type: 'choice', label: '쉘 사이즈', c: [22, 23, 24], o: ['최소', '기본', '크게'], single: true, def: 1 },
      { type: 'choice', label: '카날 길이', c: [25, 26, 27], o: ['짧게', '중간', '길게'], single: true },
      { type: 'choice', label: '쉘 색상', c: [28, 29, 30, 31], o: ['살색', '파랑(좌)', '빨강(우)', '방향표시점'] },
      { type: 'choice', label: '코팅 종류', c: [32, 33], o: ['일반 코팅', '무광 코팅'], single: true },
    ] },
    { title: 'BTE용 옵션', hint: 'BTE(귀걸이형)일 때만 채우세요.', items: [
      { type: 'choice', label: '몰드 종류', c: [34, 35], o: ['하드', '소프트'], single: true },
      { type: 'choice', label: '몰드 형태', c: [36, 37, 38, 39, 40], o: ['Canal', 'Half Shell', 'Full shell', 'Canal Lock (하드만)', 'Skeleton (하드만)'], single: true },
      { type: 'choice', label: '튜브 종류', c: [41, 42], o: ['일반 튜브', "엘보우 ('ㄱ'자 튜브, 하드만)"], single: true },
      { type: 'choice', label: '파워슬림튜브', c: [43, 44, 45, 46], o: ['0', '1', '2', '3'], single: true },
    ] },
    { title: '공통 선택', hint: '소프트 몰드는 벤트·손잡이를 넣을 수 없어요.', items: [
      { type: 'choice', label: '벤트 종류', c: [47, 48, 49, 50], o: ['일반형 (스탠다드)', '레귤러', 'IROS', 'Trench (트렌치)'], single: true, tip: 'SlimTip은 일반형을 고르면 Cavity 형태로 만들어요' },
      { type: 'choice', label: '벤트 크기', c: [51, 52, 53, 54], o: ['AOV (오디오그램 필수)', '없음', 'L mm 지정', 'R mm 지정'] },
      { type: 'text', label: 'L 벤트 크기 (mm)', t: 'vL', numeric: true },
      { type: 'text', label: 'R 벤트 크기 (mm)', t: 'vR', numeric: true },
      { type: 'choice', label: '손잡이 길이', c: [55, 56, 57, 58, 59], o: ['U형태', '짧게', '중간', '길게', '없음'], single: true },
      { type: 'text', label: '손잡이 길이 요청 (mm)', t: 'rhLen', numeric: true },
    ] },
    { title: '함께 보내는 물품', items: [
      { type: 'choice', label: '보내는 물품', c: [0, 1, 2, 3], o: ['보청기', '부속품', '귓본', '기타'], tip: '체크 안 한 물품은 분실돼도 책임지지 않는다고 적혀 있어요' },
      { type: 'text', label: '보청기 수량', t: 'qHA', numeric: true },
      { type: 'text', label: '부속품 수량', t: 'qAcc', numeric: true },
      { type: 'text', label: '귓본 수량', t: 'qImp', numeric: true },
      { type: 'text', label: '기타 수량', t: 'qEtc', numeric: true },
    ] },
    { title: '특이사항', items: [
      { type: 'textarea', label: '특이사항', t: 'memo' },
    ] },
  ],
};

FORMS.ph_return = {
  brand: '포낙 / 유니트론', name: '반품 의뢰서', template: 't/ph_return.html', file: '포낙_반품의뢰서',
  note: '반품 사유를 꼭 체크해 주세요. 구성품이 빠지거나 사용한 제품이면 비용이 생길 수 있어요.',
  sections: [
    { title: '고객 정보', items: [
      { type: 'choice', label: '브랜드', c: [0, 1], o: ['포낙', '유니트론'], single: true },
      { type: 'text', label: '고객명', t: 0, key: 'name' },
      { type: 'date', label: '반품일', t: 'rDate', parts: { y: 'rY', m: 'rM', d: 'rD' }, yy: true, today: true },
    ] },
    { title: '제품', items: [
      { type: 'text', label: '제품명', t: 1 },
      { type: 'text', label: '시리얼 넘버', t: 2 },
      { type: 'text', label: '사용 일수', t: 3, numeric: true, suffix: '일' },
    ] },
    { title: '반품 사유', hint: '해당하는 것을 모두 누르세요.', items: [
      { type: 'choice', label: '고객 변심', c: [2, 3, 4, 5, 6, 7, 8, 9, 10], o: ['단순 변심', '구매 취소', '연락두절', '착용 거부', '분실 후 찾음', '편이 사용', '경제적 이유', '보장구관련', '장애 진단 관련'] },
      { type: 'choice', label: '만족도', c: [11, 12, 13], o: ['부적응', '착용/작동 미숙', '효과전무'] },
      { type: 'choice', label: '제품 교환', c: [14, 15, 16, 17], o: ['모델 변경', '등급 변경', '색상 변경', '사이즈 변경'] },
      { type: 'choice', label: '품질 불만족', c: [18, 19, 20, 21, 22, 23], o: ['충전 불량', '배터리 소모', '작동 오류', '피팅 오류', '타사 비교', '음질 불만족'] },
      { type: 'choice', label: '쉘 불만족', c: [24, 25, 26], o: ['사이즈', '통증', '피드백'] },
      { type: 'textarea', label: '기타 사유', t: 'etcR' },
    ] },
    { title: '구성품 반납', hint: '함께 보내는 구성품을 모두 누르세요.', items: [
      { type: 'choice', label: 'BTE/RIC 반품 구성품', c: [27, 28, 29], o: ['ACC, DWA', 'RIC 리시버', 'Mold / cShell / SlimTip'] },
      { type: 'choice', label: '공동 구성품', c: [30, 31, 32], o: ['포장박스 (1EA)', '배터리 (1판)', '하드 케이스 (1EA)'] },
      { type: 'choice', label: 'C&C Line 구성품', c: [33, 34, 35], o: ['방습제 캡슐 (1EA)', '방습제 통 (1EA)', '청소용 Tool (1EA)'] },
      { type: 'textarea', label: '기타 메모', t: 'memo' },
    ] },
  ],
};

FORMS.ph_repair = {
  brand: '포낙 / 유니트론', name: '수리 주문서', template: 't/ph_repair.html', file: '포낙_수리주문서',
  note: '수리면 "수리 의뢰 내용", 쉘을 다시 만들면 "재제작 의뢰 내용"을 채우세요. 특이사항의 기본 문구는 지우거나 고칠 수 있어요.',
  sections: [
    { title: '고객 정보', items: [
      { type: 'choice', label: '브랜드', c: [4, 5], o: ['포낙', '유니트론'], single: true },
      { type: 'text', label: '고객명', t: 'nm', key: 'name' },
      { type: 'text', label: '나이', t: 'age', numeric: true },
      { type: 'text', label: '직업', t: 'job' },
      { type: 'choice', label: '성별', c: [6, 7], o: ['남', '여'], single: true },
      { type: 'date', label: '주문일', t: 'oDate', parts: { y: 'oY', m: 'oM', d: 'oD' }, yy: true, today: true },
      { type: 'choice', label: '유상배송', c: [8, 9, 10], o: ['지하철', '퀵서비스', '고속버스'], single: true, tip: '택배로 받을 거면 비워 두세요' },
      { type: 'choice', label: '상담 요청', c: [11, 12, 13], o: ['CS상담 (배송)', '쉘 재제작 상담', '수리 상담'] },
    ] },
    { title: '청력 (Hearing Level)', hint: 'dB 숫자만 넣으세요. 모르는 칸은 비워도 돼요.', items: [
      { type: 'aud', freqs: ['250', '500', '1000', '1500', '2000', '3000', '4000', '6000', '8000'], L: [1, 2, 3, 4, 5, 6, 7, 8, 9], R: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
    ] },
    { title: '제품', items: [
      { type: 'text', label: '제품명', t: 'pName' },
      { type: 'choice', label: '방향', c: [14, 15], o: ['L (왼쪽)', 'R (오른쪽)'] },
      { type: 'text', label: '시리얼 넘버', t: 19 },
    ] },
    { title: '수리 의뢰 내용', hint: '고장 증상을 모두 누르세요.', items: [
      { type: 'choice', label: '보청기 고장 증상', c: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25], o: ['작동 안됨', '소리 약함', '소리 잡음', '노후 및 부식', '기계 점검 및 청소', '프로그램/옵션 불량', '배터리 사용시간 단축', '간헐적인 중단', '충전 이상', '제품 파손'] },
      { type: 'lrtext', label: '증상 상세 기재', L: 'symL', R: 'symR', same: false },
    ] },
    { title: '재제작 의뢰 내용', hint: '쉘을 다시 만들 때만 채우세요.', items: [
      { type: 'choice', label: '재제작 원인', c: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35], o: ['통증', '크기 문제', '빡빡함', '분실 및 파손', '헐렁함', '방향 교체', '밀려나옴', '사용자 변경', '피드백', '쉘 옵션 변경'] },
      { type: 'lrtext', label: '증상 상세 기재', L: 'remL', R: 'remR', same: false },
      { type: 'choice', label: '쉘 옵션', c: [36, 37], o: ['기존 쉘과 옵션 동일', '쉘 옵션 변경 (아래에서 고르기)'], single: true },
    ] },
    { title: '쉘 옵션 변경', hint: '"쉘 옵션 변경"을 골랐을 때만 채우세요.', items: [
      { type: 'choice', label: '쉘 색상', c: [38, 39, 40, 41, 42], o: ['살색', '파랑(좌)', '빨강(우)', '검정', '방향표시점'] },
      { type: 'choice', label: '쉘 크기', c: [43, 44, 45], o: ['최소', '기본', '크게'], single: true, def: 1 },
      { type: 'choice', label: '귀지 방지 옵션', c: [46, 47, 48], o: ['왁스가드', 'ERT (튜브연장)', '스프링가드'], single: true },
      { type: 'choice', label: '코팅 종류', c: [49, 50], o: ['일반코팅', '무코팅'], single: true },
      { type: 'choice', label: '손잡이 길이', c: [51, 52, 53, 54], o: ['U형태', '길게', '중간', '짧게'], single: true },
      { type: 'text', label: '손잡이 요청길이 (mm)', t: 'rhLen', numeric: true },
      { type: 'choice', label: '외이도 길이', c: [55, 56, 57, 58], o: ['추가 길게', '길게', '중간', '짧게'], single: true },
      { type: 'choice', label: '벤트 종류', c: [59, 60, 61, 62], o: ['일반형 (스탠다드)', '레귤러', 'IROS', 'Trench (트렌치)'], single: true },
      { type: 'choice', label: '벤트 크기 (1.0~5.0mm)', c: [63, 64, 65, 66], o: ['AOV (오디오그램 필수)', '왼쪽 mm 지정', '오른쪽 mm 지정', '벤트 없음'] },
      { type: 'text', label: '왼쪽 벤트 크기 (mm)', t: 'vL', numeric: true },
      { type: 'text', label: '오른쪽 벤트 크기 (mm)', t: 'vR', numeric: true },
    ] },
    { title: '함께 보내는 물품', items: [
      { type: 'choice', label: '보내는 물품', c: [0, 1, 2, 3], o: ['보청기', '부속품', '귓본', '기타'], tip: '체크 안 한 물품은 분실돼도 책임지지 않는다고 적혀 있어요' },
      { type: 'text', label: '보청기 수량', t: 'qHA', numeric: true },
      { type: 'text', label: '부속품 수량', t: 'qAcc', numeric: true },
      { type: 'text', label: '귓본 수량', t: 'qImp', numeric: true },
      { type: 'text', label: '기타 수량', t: 'qEtc', numeric: true },
    ] },
    { title: '특이사항', items: [
      { type: 'textarea', label: '특이사항', t: 'memo', init: REPAIR_NOTE },
    ] },
  ],
};
