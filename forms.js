// 서식 정의 — 칸 번호(c: 체크박스 순서, t: 빈 칸 순서)는 t/서식.html 안의 순서와 같다.
// type: date | text | textarea | choice | lrtext | lrchoice | aud
// choice: single=true 이면 하나만 고름. def = 서식에 [기본]으로 적힌 값(비우면 기본으로 제작).
const R = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

const BRANDS = [
  { name: '벨톤 (GN)', forms: [
    { id: 'gn_ite', name: '귓속형 주문서' },
    { name: '귀걸이형 주문서' }, { name: '반품사유서' }, { name: '서비스 요청서' } ] },
  { name: '스타키', forms: [{ name: '귓속형 주문서' }, { name: '이어몰드 주문서' }, { name: '반품 요청서' }, { name: '수리 요청서' }] },
  { name: '오티콘 (디만트)', forms: [{ name: '귓속형 주문서' }, { name: '귀걸이형 주문서' }, { name: '정부지원 주문서' }, { name: '반품 의뢰 신청서' }, { name: '수리의뢰서' }] },
  { name: '포낙 / 유니트론', forms: [{ name: '귓속형 주문서' }, { name: 'RIC·BTE 주문서' }, { name: '반품 의뢰서' }, { name: '수리 주문서' }] },
  { name: 'WSA (시그니아·와이덱스)', forms: [{ name: '시그니아 귓속형 주문서' }, { name: '시그니아 오픈형·귀걸이형 주문서' }, { name: '반품 요청서' }, { name: '수리 요청서' }, { name: '와이덱스 수리 의뢰서' }] },
];

const FORMS = {
  gn_ite: {
    brand: '벨톤 (GN)', name: '귓속형 주문서', template: 't/gn_ite.html', file: 'GN_귓속형_주문서',
    note: '비워 둔 칸은 제조사가 [기본]값으로 만들어요.',
    sections: [
      { title: '기본 정보', items: [
        { type: 'date', label: '주문서 작성일', t: 0, today: true },
        { type: 'date', label: '출고요청 일자', t: 1 },
        { type: 'choice', label: '보장구 신청여부', c: [0, 1], o: ['신청', '미신청'], single: true },
        { type: 'text', label: '고객명', t: 2, key: 'name' },
        { type: 'text', label: '나이', t: 3, numeric: true, suffix: '세' },
      ] },
      { title: '쓰던 보청기', hint: '처음 쓰시는 분이면 "아니오"만 누르세요.', items: [
        { type: 'choice', label: '보청기 사용 여부', c: [2, 3], o: ['예', '아니오'], single: true },
        { type: 'choice', label: '쓰던 보청기 형태', c: R(4, 9), o: ['IIC', 'CIC', 'ITC', 'ITE', 'RIE', 'BTE'] },
        { type: 'choice', label: '쓰던 것 카날 길이', c: [10, 11, 12], o: ['짧음', '중간', '김'], single: true },
        { type: 'choice', label: '쓰던 것 쉘 두께', c: [13, 14], o: ['빡빡함', '느슨함'], single: true },
      ] },
      { title: '청력 (피팅요청 값)', hint: 'dB 숫자만 넣으세요. 모르는 칸은 비워도 돼요.', items: [
        { type: 'aud', freqs: ['125', '250', '500', '1K', '1.5K', '2K', '3K', '4K', '6K', '8K'], L: R(4, 13), R: R(14, 23) },
      ] },
      { title: '제품', items: [
        { type: 'lrtext', label: '제품명', L: 24, R: 25 },
        { type: 'lrchoice', label: '배터리', o: ['10', '312', '13'], L: [15, 16, 17], R: [18, 19, 20] },
        { type: 'choice', label: '쉘 형태', c: R(21, 25), o: ['IIC', 'CIC', 'ITC', 'ITE Half', 'ITE Full'], single: true },
        { type: 'choice', label: '출력(이득)', c: R(26, 29), o: ['LP(40)', 'MP(50)', 'HP(60)', 'UP(70)'], single: true },
      ] },
      { title: '쉘 세부', hint: '고르지 않으면 [기본]으로 만들어요.', items: [
        { type: 'choice', label: '색상', c: R(30, 34), o: ['Beige', 'Blue', 'Red', 'Black', '무연탄'], def: 0, single: true, tip: '충전식 귓속형은 무연탄·베이지만 돼요' },
        { type: 'choice', label: '면판', c: [35, 36], o: ['Beige', '무연탄'], def: 0, single: true },
        { type: 'choice', label: '카날 길이', c: R(37, 39), o: ['Short', 'Med', 'Long'], def: 1, single: true },
        { type: 'choice', label: '손잡이', c: R(40, 44), o: ['짧게', '보통', '길게', '고리형', '없음'], def: 1, single: true },
        { type: 'choice', label: '벤트 크기', c: R(45, 51), o: ['제조사 권장', 'No Vent', '1.0mm', '1.2mm', '1.5mm', '1.8mm', '2.1mm'], def: 0, single: true },
        { type: 'choice', label: '벤트 모양', c: R(52, 55), o: ['일반', '아이로스', '사이드', '플레이트'], single: true },
      ] },
      { title: '옵션', items: [
        { type: 'choice', label: '옵션 선택', c: R(56, 59), o: ['V/C (볼륨)', '프로그램 버튼 (P/B)', 'Telecoil (CIC 불가)', 'Canal Lock'] },
        { type: 'choice', label: '왁스가드', c: R(60, 63), o: ['Coil', 'Guard', 'Filter', 'ERT'], def: 1, single: true },
        { type: 'choice', label: '쉘 제작 시 우선 순위', c: R(64, 66), o: ['쉘 사이즈', '리시버 출력', '벤트 사이즈 확보'], single: true },
      ] },
      { title: '액세서리', items: [
        { type: 'choice', label: '함께 주문', c: R(67, 72), o: ['TV 링크 2', '폰 링크 2', '마이팔 프로', '마이팔 마이크로', '리모트 컨트롤 2', '리모트 컨트롤 3'] },
      ] },
      { title: '배송 · 요청', items: [
        { type: 'choice', label: '배송수단', c: R(73, 75), o: ['택배', '퀵서비스', '고속/KTX'], single: true, tip: '택배 말고는 유상 배송이에요' },
        { type: 'textarea', label: '기타 요청사항', t: 26 },
      ] },
    ],
  },
};
