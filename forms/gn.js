// gn 제조사 서식 정의 (FORMS 에 추가)
// 칸 번호: c = 템플릿 .cb 순서, t 숫자 = 빈 <td> 순서, t 글자 = 템플릿 [data-f] 이름

FORMS.gn_bte = {
  brand: '벨톤 (GN)', name: '귀걸이형 주문서', template: 't/gn_bte.html', file: 'GN_귀걸이형_주문서',
  note: '오픈형(RIE)은 출력·길이·커널 길이를, 귀걸이형(BTE)은 재질·튜브·손잡이를 고르세요. 몰드·벤트는 둘 다 해당돼요.',
  sections: [
    { title: '기본 정보', items: [
      { type: 'date', label: '주문서 작성일', t: 0, today: true },
      { type: 'date', label: '출고요청 일자', t: 1 },
      { type: 'choice', label: '보장구 신청여부', c: [0, 1], o: ['신청', '미신청'], single: true },
      { type: 'text', label: '고객명', t: 2, key: 'name' },
      { type: 'text', label: '나이', t: 3, numeric: true, suffix: '세' },
    ] },
    { title: '청력 (피팅요청 값)', hint: 'dB 숫자만 넣으세요. 모르는 칸은 비워도 돼요.', items: [
      { type: 'choice', label: '보청기 사용 여부', c: [2, 3], o: ['유', '무'], single: true },
      { type: 'aud', freqs: ['125', '250', '500', '1K', '1.5K', '2K', '3K', '4K', '6K', '8K'], L: R(4, 13), R: R(14, 23) },
    ] },
    { title: '제품', hint: '색상은 기본색상으로 나와요.', items: [
      { type: 'lrtext', label: '제품명', L: 24, R: 25 },
      { type: 'lrchoice', label: '배터리', o: ['312', '13', '675'], L: [4, 5, 6], R: [7, 8, 9] },
    ] },
    { title: '몰드 (오픈형 & 귀걸이형)', items: [
      { type: 'choice', label: '몰드 모양', c: R(10, 16), o: ['Micro (오픈형 전용)', 'Hollow Cavity (오픈형 전용)', 'Canal', 'Canal Lock (Hard)', 'Half', 'Full', 'Skeleton (Hard)'], single: true, tip: 'Micro 몰드는 실리콘 처리 여부도 골라 주세요' },
      { type: 'choice', label: 'Micro 실리콘', c: [17, 18], o: ['처리', '미처리'], single: true, tip: 'Hollow Cavity는 실리콘 처리 불가' },
    ] },
    { title: '오픈형 (RIE)', items: [
      { type: 'choice', label: '출력', c: R(19, 23), o: ['M&RIE', 'LP', 'MP', 'HP', 'UP (몰드 제작)'], single: true },
      { type: 'choice', label: '길이', c: R(29, 33), o: ['0번', '1번', '2번', '3번', '4번'], single: true },
      { type: 'choice', label: '커널 길이', c: [37, 38, 39], o: ['Short', 'Med', 'Long'], single: true },
    ] },
    { title: '귀걸이형 (BTE)', items: [
      { type: 'choice', label: '재질', c: [24, 25], o: ['Hard', 'Soft'], single: true },
      { type: 'choice', label: 'Tube', c: [26, 27, 28], o: ['Standard', 'Heavy', 'L-tube'], single: true },
      { type: 'choice', label: '손잡이', c: [34, 35, 36], o: ['보통', '고리형', '없음'], single: true },
    ] },
    { title: '벤트', items: [
      { type: 'choice', label: 'Vent', c: R(40, 45), o: ['No vent', '1.0mm', '1.2mm', '1.5mm', '1.8mm', '2.1mm'], single: true, tip: 'Soft 재질 몰드는 손잡이·벤트 불가' },
    ] },
    { title: '액세서리', items: [
      { type: 'choice', label: '함께 주문', c: R(46, 51), o: ['TV 링크 2', '폰 링크 2', '마이팔 프로', '마이팔 마이크로', '리모트 컨트롤 2', '리모트 컨트롤 3'] },
    ] },
    { title: '배송 · 요청', items: [
      { type: 'choice', label: '배송수단', c: [52, 53, 54], o: ['택배', '퀵서비스', '고속/KTX'], single: true, tip: '택배 말고는 유상 배송이에요' },
      { type: 'textarea', label: '기타 요청사항', t: 26 },
    ] },
  ],
};

const GN_REASONS = {
  general: ['가격에 비해 낮은 성능', '경제적 문제', '이전 보청기를 선호', 'GN의 다른 제품을 선호', '경쟁사 제품을 선호'],
  user: ['사용자 부적응', '어떠한 효과도 보지 못함', '건강 악화'],
  product: ['음질 불만족', '잡음', '피드백', '반복적인 수리', '소리 울림', '착용감 (통증, 상처 등)', '사이즈 불만족 (돌출 포함)'],
  other: ['잘못된 주문 입력', '잘못 배송된 제품', '고객의 구매 취소'],
  exch: ['제품 교환으로 인한 반품', '제품 교환 요청'],
};
// 반품 사유 L/R 체크 번호: 10번부터 사유마다 L, R 순서
function gnReason(title, key, start) {
  const o = GN_REASONS[key];
  return { title, items: [
    { type: 'choice', label: '왼쪽 (L)', c: o.map((_, i) => start + i * 2), o },
    { type: 'choice', label: '오른쪽 (R)', c: o.map((_, i) => start + i * 2 + 1), o },
  ] };
}

FORMS.gn_return = {
  brand: '벨톤 (GN)', name: '반품사유서', template: 't/gn_return.html', file: 'GN_반품사유서',
  note: '반품하는 쪽(L·R)마다 사유를 골라 주세요. 사유 옆 숫자(코드)는 적지 않아도 돼요.',
  sections: [
    { title: '고객 정보', items: [
      { type: 'text', label: '고객명', t: 'cust', key: 'name' },
      { type: 'text', label: '생년월일', t: 'birth', tip: '예: 1948. 3. 5.' },
    ] },
    { title: '보청기 (반품하는 제품)', hint: 'S/N은 보청기에 적힌 시리얼 번호예요. 한 칸에 한 글자씩 들어가요(10자리까지).', items: [
      { type: 'lrtext', label: '모델명', L: 'mL', R: 'mR' },
      { type: 'text', label: '왼쪽(L) S/N', t: 'snL' },
      { type: 'text', label: '오른쪽(R) S/N', t: 'snR' },
    ] },
    { title: '무선 액세서리 (반품할 때만)', items: [
      { type: 'text', label: '액세서리 1 모델', t: 'mA1' }, { type: 'text', label: '액세서리 1 S/N', t: 'snA1' },
      { type: 'text', label: '액세서리 2 모델', t: 'mA2' }, { type: 'text', label: '액세서리 2 S/N', t: 'snA2' },
      { type: 'text', label: '액세서리 3 모델', t: 'mA3' }, { type: 'text', label: '액세서리 3 S/N', t: 'snA3' },
    ] },
    { title: '함께 보내는 용품', hint: '안 보내면 일정 금액이 청구될 수 있어요.', items: [
      { type: 'choice', label: '보내는 것', c: R(0, 9), o: ['보청기', '청소도구', '외장 케이스', '제습통', '내장 케이스', '제습용 캡슐', '배터리', 'RIE Receiver Tube', '스타터세트', '기타'] },
      { type: 'text', label: '기타 용품 이름', t: 'etcItem' },
    ] },
    gnReason('반품 사유 — 일반적인 사유', 'general', 10),
    gnReason('반품 사유 — 사용자 관련', 'user', 20),
    gnReason('반품 사유 — 제품 관련', 'product', 26),
    gnReason('반품 사유 — 기타', 'other', 40),
    gnReason('반품 사유 — 제품 교환', 'exch', 46),
    { title: '기타 상세 내용', items: [
      { type: 'textarea', label: '자세한 사유', t: 'detail' },
    ] },
  ],
};

FORMS.gn_service = {
  brand: '벨톤 (GN)', name: '서비스(수리) 요청서', template: 't/gn_service.html', file: 'GN_서비스요청서',
  note: '수리면 Repair, 쉘을 다시 만들면 Remake에서 골라요. 수리비가 생기면 GN에서 진행 전에 전화 줘요.',
  sections: [
    { title: '기본 정보', items: [
      { type: 'date', label: '주문서 발송일', t: 0, today: true },
      { type: 'date', label: '출고요청 일자', t: 1 },
      { type: 'text', label: '고객명', t: 2, key: 'name' },
      { type: 'text', label: '고객 연락처 (선택)', t: 3, numeric: true },
      { type: 'text', label: '제품명', t: 4 },
      { type: 'text', label: 'Serial No.', t: 5 },
      { type: 'choice', label: '배송수단', c: [0, 1, 2], o: ['택배', '퀵서비스', '고속/KTX'], single: true, tip: '택배 말고는 유상 배송이에요' },
    ] },
    { title: '수리 (Repair)', items: [
      { type: 'choice', label: '증상', c: R(3, 21), o: ['소리 안남', '소리 왜곡', '간헐적 작동', '소리 약함', '소리 울림', '페어링/연결', '잡음', '내부 피드백', '배터리 소모량 많음', '손잡이', '버핑', '애딩', '배터리 도어 문제', '쉘/플레이트 분리', '프로그램 오류', '쉘 보수', '청소 점검', '충전기 작동 불량', '충전안됨'] },
    ] },
    { title: '재제작 (Remake)', items: [
      { type: 'choice', label: '이유', c: R(22, 34), o: ['피드백 발생', 'Vent 변경', 'Canal 길이 (Long)', 'Canal 길이 (Short)', '파손', '헐거움', '빠짐', '빡빡함', '착용이 힘듦', '보청기 사이즈 문제', '방향 변경', '옵션 추가/제거', '쉘 파손으로 인한 재제작'] },
    ] },
    { title: '상세 기입사항', items: [
      { type: 'choice', label: '귀 안/밖 통증', c: [35], o: ['통증 있음'], tip: '아픈 곳은 아래 칸에 자세히 적어 주세요 (그림 표시는 인쇄해서 쓸 때)' },
      { type: 'textarea', label: '요청 내용', t: 'detail', init: REPAIR_NOTE },
    ] },
  ],
};
