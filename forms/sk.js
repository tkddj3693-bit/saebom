// sk 제조사 서식 정의 (FORMS 에 추가) — 스타키
(function () {
  const R = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const ODD = a => a.filter((_, i) => i % 2 === 0), EVEN = a => a.filter((_, i) => i % 2 === 1);

  /* ---------- 스타키 귓속형 주문서 ---------- */
  const FR = ['125', '250', '500', '750', '1000', '1500', '2000', '3000', '4000', '6000', '8000'];
  const vent = R(31, 42), opt = R(43, 56);
  FORMS.sk_ite = {
    brand: '스타키', name: '귓속형 주문서', template: 't/sk_ite.html', file: '스타키_귓속형_주문서',
    note: '귀(R·L)를 고르는 칸은 오른쪽(R)·왼쪽(L)을 따로 눌러요. 양쪽이면 둘 다 누르세요.',
    sections: [
      { title: '기본 정보', items: [
        { type: 'text', label: '고객명', t: 0, key: 'name' },
        { type: 'choice', label: '성별', c: [0, 1], o: ['남', '여'], single: true },
        { type: 'text', label: '연령', t: 'age', numeric: true, tip: '숫자만 (서식에 "세"가 인쇄돼 있어요)' },
        { type: 'date', label: '주문일', parts: { y: 'oY', m: 'oM', d: 'oD' }, yy: true, t: 'oDate', today: true },
        { type: 'date', label: '출고요청일', parts: { y: 'rY', m: 'rM', d: 'rD' }, yy: true, t: 'rDate' },
      ] },
      { title: '제품 선택', hint: '주문하는 제품 한 가지만 채우세요. 등급(24·20·16)과 모양을 고르고, 착용 귀를 누르세요.', items: [
        { type: 'choice', label: 'Edge AI — 착용 귀', c: [2, 3], o: ['R (오른쪽)', 'L (왼쪽)'] },
        { type: 'choice', label: 'Edge AI — 등급', c: R(4, 6), o: ['24', '20', '16'], single: true },
        { type: 'choice', label: 'Edge AI — 모양', c: R(7, 9), o: ['CIC(312A)', 'ITC R', 'ITE R'], single: true },
        { type: 'choice', label: 'Signature — 착용 귀', c: [10, 11], o: ['R (오른쪽)', 'L (왼쪽)'] },
        { type: 'choice', label: 'Signature — 등급', c: R(12, 14), o: ['24', '20', '16'], single: true, tip: 'IIC는 24만 가능해요' },
        { type: 'choice', label: 'Signature — 모양', c: R(15, 17), o: ['IIC', 'CIC R', 'CIC(10A)'], single: true },
        { type: 'choice', label: '정부지원 Genesis AI — 착용 귀', c: [57, 58], o: ['R (오른쪽)', 'L (왼쪽)'] },
        { type: 'choice', label: 'Genesis AI — 등급', c: R(59, 61), o: ['24', '20', '16'], single: true },
        { type: 'choice', label: 'Genesis AI — 모양', c: R(62, 64), o: ['IIC', 'CIC(10A)', 'ITC R'], single: true },
        { type: 'choice', label: '보장구용 바코드', c: [65], o: ['바코드 발행'], tip: '공단 청구할 정부지원 제품이면 누르세요' },
      ] },
      { title: '청력 (청력도)', hint: 'dB 숫자만 넣으면 그래프에 R은 빨간 O, L은 파란 X로 찍혀요. 모르는 칸은 비워도 돼요.', items: [
        { type: 'aud', freqs: FR, L: FR.map(f => 'aL' + f), R: FR.map(f => 'aR' + f) },
      ] },
      { title: '쉘 색상', hint: '보통은 비워 둬요. 좌우 구분 색이 필요할 때만 고르세요.', items: [
        { type: 'lrchoice', label: '쉘 색상', o: ['Red', 'Blue', 'Pink', 'Black'], L: R(22, 25), R: R(18, 21), same: false },
      ] },
      { title: '손잡이 (RH 직선형 · RL 고리형)', tip: 'CIC 무선 및 충전식 제품은 선택·변경이 안 돼요', items: [
        { type: 'choice', label: '손잡이', c: [26], o: ['제조사 권장'], tip: 'CIC 무선 및 충전식 제품은 선택·변경이 안 돼요' },
        { type: 'choice', label: 'RH (직선형) — 귀', c: [27, 28], o: ['R (오른쪽)', 'L (왼쪽)'] },
        { type: 'text', label: 'RH 길이 (mm)', t: 'rhmm', numeric: true },
        { type: 'choice', label: 'RL (고리형) — 귀', c: [29, 30], o: ['R (오른쪽)', 'L (왼쪽)'] },
        { type: 'text', label: 'RL 길이 (mm)', t: 'rlmm', numeric: true },
      ] },
      { title: '벤트 (VENT)', hint: '모르면 "제조사 권장"을 누르세요.', items: [
        { type: 'lrchoice', label: '벤트', o: ['No Vent (벤트없음)', 'Pressure Vent', 'Small Vent', 'Medium Vent', 'Large Vent', '제조사 권장'], L: EVEN(vent), R: ODD(vent) },
      ] },
      { title: '옵션 (MISC·OPTION)', hint: '필요한 것만 귀별로 누르세요.', items: [
        { type: 'choice', label: 'R (오른쪽) 옵션', c: ODD(opt), o: ['BWG (귀지방지 스프링)', 'MMB (멀티메모리)', 'HCK (귀지 방지망)', 'VC (충전형 DC)', 'EXR (튜브 길게)', 'NVC (MMB·VC 없이)', 'MMB + VC'] },
        { type: 'choice', label: 'L (왼쪽) 옵션', c: EVEN(opt), o: ['BWG (귀지방지 스프링)', 'MMB (멀티메모리)', 'HCK (귀지 방지망)', 'VC (충전형 DC)', 'EXR (튜브 길게)', 'NVC (MMB·VC 없이)', 'MMB + VC'] },
      ] },
      { title: '보청기 사용기록', items: [
        { type: 'lrchoice', label: '보청기 사용여부 (좌·우)', o: ['Yes', 'No'], L: [66, 67], R: [68, 69] },
        { type: 'text', label: '사용기간 — 년', t: 'useY', numeric: true },
        { type: 'text', label: '사용기간 — 개월', t: 'useM', numeric: true },
        { type: 'text', label: '쓰던 제조사 / 모델명', t: 2 },
      ] },
      { title: '기타 모델 및 추가 의뢰내역', items: [
        { type: 'textarea', label: '추가 의뢰내역', t: 'memo' },
      ] },
    ],
  };
  /* ---------- 스타키 이어몰드 주문서 ---------- */
  FORMS.sk_mold = {
    brand: '스타키', name: '이어몰드 주문서', template: 't/sk_mold.html', file: '스타키_이어몰드_주문서',
    note: '몰드 종류(RIC·BTE·Ear Keeper) 중 주문하는 것만 채우세요.',
    sections: [
      { title: '기본 정보', items: [
        { type: 'date', label: '주문일', t: 0, today: true },
        { type: 'text', label: '고객명', t: 'nm', key: 'name' },
        { type: 'choice', label: '성별', c: [1, 2], o: ['남', '여'], single: true },
        { type: 'text', label: '나이', t: 'age', numeric: true, tip: '숫자만 (서식에 "세"가 인쇄돼 있어요)' },
        { type: 'choice', label: '착용방향', c: [3, 4], o: ['Right (오른쪽)', 'Left (왼쪽)'] },
        { type: 'choice', label: '난청정도', c: [5, 6, 7], o: ['경도', '중도', '고도'], single: true },
        { type: 'text', label: '착용 보청기 모델명', t: 1 },
        { type: 'text', label: '할인 쿠폰 (장)', t: 'coupon', numeric: true },
        { type: 'choice', label: '상담요청', c: [0], o: ['상담 요청'], tip: '제조사와 통화가 필요하면 누르세요' },
      ] },
      { title: 'RIC 몰드', hint: 'RIC(오픈형) 보청기용 몰드일 때만 채우세요.', items: [
        { type: 'choice', label: '국내제작 (일체형)', c: [8, 9, 10], o: ['Canal', 'Half Shell', 'Full Shell'], single: true },
        { type: 'choice', label: '중국제작 (탈부착)', c: R(22, 26), o: ['Canal', 'Half Shell', 'Full Shell', 'Skeleton (70G 불가)', 'Helix (70G 불가)'], single: true, tip: 'RIC 70G 몰드는 일체형으로만 제작돼요 (중국제작)' },
        { type: 'choice', label: 'RIC 리시버 — 길이', c: R(11, 15), o: ['1', '2', '3', '4', '5'], single: true, tip: '1 = 짧게 → 5 = 길게' },
        { type: 'choice', label: 'RIC 리시버 — 출력', c: R(16, 19), o: ['40G', '50G', '60G', '70G'], single: true },
        { type: 'choice', label: 'RIC 리시버 — 동봉여부', c: [20, 21], o: ['○ (함께 보냄)', '✕ (안 보냄)'], single: true },
      ] },
      { title: 'BTE 몰드', hint: 'BTE(귀걸이형) 보청기용 몰드일 때만 채우세요.', items: [
        { type: 'choice', label: '몰드 모양', c: R(27, 31), o: ['Canal', 'Canal Lock (Hard만)', 'Half Shell', 'Full Shell', 'Skeleton'], single: true },
        { type: 'choice', label: '튜브 형태', c: [32, 33], o: ['U자 튜브', 'ㄱ자 튜브'], single: true },
        { type: 'choice', label: '튜브 두께', c: [34, 35], o: ['Standard #313', 'Heavy Walled'], single: true },
      ] },
      { title: 'Ear Keeper (귀마개 몰드)', hint: '소음방지·음악가·수면·수영용 귀마개를 주문할 때만 채우세요.', items: [
        { type: 'choice', label: '종류', c: [36, 40, 46, 50], o: ['Noise Protection (소음방지용·국내)', 'Musician (음악가용·중국)', 'Sleeping (수면·독서용)', 'Swimming Mold (수영용)'], single: true },
        { type: 'choice', label: '소음방지용 모양', c: [37, 38, 39], o: ['Canal', 'Half Shell', 'Full Shell'], single: true },
        { type: 'choice', label: '음악가용 모양', c: [41, 42], o: ['Canal', 'Full Shell'], single: true },
        { type: 'choice', label: '음악가용 필터', c: [43, 44, 45], o: ['dB 10', 'dB 17', 'dB 26'], single: true },
        { type: 'choice', label: '수면·독서용 모양', c: [47, 48, 49], o: ['Canal', 'Half Shell', 'Full Shell'], single: true },
        { type: 'choice', label: '수영용 모양', c: [51], o: ['Full Shell'] },
      ] },
      { title: '재질 · 벤트 · 손잡이', items: [
        { type: 'choice', label: '재질', c: [52, 53], o: ['Hard', 'Soft'], single: true },
        { type: 'choice', label: 'Vent 크기', c: R(54, 57), o: ['No vent', 'Small', 'Medium', 'Large'], single: true },
        { type: 'choice', label: '손잡이', c: [58, 59], o: ['RH (일자형)', 'RL (고리형)'], single: true },
      ] },
    ],
  };
  /* ---------- 스타키 반품 요청서 ---------- */
  FORMS.sk_return = {
    brand: '스타키', name: '반품 요청서', template: 't/sk_return.html', file: '스타키_반품요청서',
    note: '출고일로부터 60일 이내만 반품돼요. 오픈형·귀걸이형은 UDI 바코드 라벨이 훼손·분실되면 반품이 안 돼요. 반품 사유를 안 쓰면 반품이 안 돼요.',
    sections: [
      { title: '제품 · 고객', items: [
        { type: 'text', label: '고객성명', t: 2, key: 'name' },
        { type: 'text', label: '모델명', t: 0 },
        { type: 'text', label: '일련번호 (시리얼)', t: 1 },
      ] },
      { title: '반품 사유', hint: '해당하는 것을 모두 누르세요.', items: [
        { type: 'choice', label: '쉘', c: R(0, 8), o: ['헐거움', '타이트함', '밀려 나옴', '통증', '피드백', '파손', '소리 울림', '착용 어려움', '튀어나옴'] },
        { type: 'choice', label: '제품', c: R(9, 17), o: ['초기 불량', '작동 불능', '음 끊김', '잡음', '어음 분별 어려움', '충전 불량', '음질 불만족', '반복적인 고장', '연결 불량 (핸드폰·노트북·피팅 프로그램)'] },
        { type: 'choice', label: '기타', c: R(18, 21), o: ['주문 오류', '경제적인 이유', '사용자 건강 악화', '기타 사유'] },
        { type: 'textarea', label: '기타 사유 내용', t: 'etc', tip: '기타 사유를 골랐으면 구체적으로 적어 주세요' },
      ] },
      { title: '함께 보내는 구성품', hint: '반납하는 구성품을 누르세요. 빠진 구성품은 금액만큼 빼고 환불돼요.', items: [
        { type: 'choice', label: '공통', c: R(22, 26), o: ['보청기 포장 케이스', '보청기 휴대용 케이스', '청소 솔', '습기 제거제', '귀지방지 툴(HCK)'] },
        { type: 'choice', label: '귓속형', c: [27], o: ['보청기 닦이 (파란색 천)'] },
        { type: 'choice', label: '오픈형', c: R(28, 30), o: ['몰드 쿠폰', '리시버', '이어버드'] },
        { type: 'choice', label: '귀걸이형', c: [31, 32], o: ['몰드 쿠폰', '이어팁 / 이어ㄱ자홀더'] },
        { type: 'choice', label: '충전기', c: R(33, 37), o: ['충전기 포장 케이스', '충전기용 습기 제거제', '충전기', '어댑터', '전원 케이블'] },
      ] },
    ],
  };
  /* ---------- 스타키 수리 요청서 ---------- */
  FORMS.sk_repair = {
    brand: '스타키', name: '수리 요청서', template: 't/sk_repair.html', file: '스타키_수리요청서',
    note: '"수리비 발생시 전화 요망"은 처음부터 체크돼 있어요. 이게 빠지면 전화 없이 수리를 진행해요.',
    initC: [5],
    sections: [
      { title: '기본 정보', items: [
        { type: 'date', label: '주문일', parts: { y: 'oY', m: 'oM', d: 'oD' }, yy: true, t: 'oDate', today: true },
        { type: 'date', label: '출고요청일', parts: { y: 'rY', m: 'rM', d: 'rD' }, yy: true, t: 'rDate' },
        { type: 'text', label: '고객명', t: 1, key: 'name' },
        { type: 'choice', label: '성별', c: [0, 1], o: ['남', '여'], single: true },
        { type: 'text', label: '연령', t: 'age', numeric: true, tip: '숫자만 (서식에 "세"가 인쇄돼 있어요)' },
        { type: 'text', label: '모델명', t: 2 },
        { type: 'lrtext', label: '일련번호 (시리얼)', L: 'snL', R: 'snR', same: false },
      ] },
      { title: '전화 상담', items: [
        { type: 'choice', label: '전화 상담 받을 곳', c: [2, 3, 4], o: ['고객관리팀', '제작', '수리'] },
        { type: 'choice', label: '수리비', c: [5], o: ['수리비 발생시 전화 요망'], tip: '체크를 빼면 전화 없이 수리를 진행해요' },
      ] },
      { title: '보청기 상태 (고장내역)', hint: '해당하는 것을 모두 누르세요.', items: [
        { type: 'choice', label: '보청기의 증상', c: R(6, 16), o: ['작동이 안됨', '잡음 심함', '배터리 소모가 많음', '소리가 울림', '내부 피드백 발생', '프로그램 연결 불량', '충전 불량', '음질상태 불량', '간헐적 작동', '청소/점검', '출력 약함'] },
        { type: 'choice', label: '플레이트·하우징(겉) 상태', c: R(17, 25), o: ['볼륨조절기 불량', '배터리 도어핀 불량', '하우징 불량', '배터리 도어 불량', '손잡이 파손', '쉘·플레이트 분리', 'Hook(후크) 불량', 'MMB, 스위치 불량', '마이크 커버 파손'] },
        { type: 'choice', label: 'Shell의 상태', c: R(26, 35), o: ['Canal 부분 김', 'Canal 부분 짧음', '튀어나옴', '헐거움', '쉘 타이트함', '쉘 통증', '깨지거나 금이 감', '쉘 코팅요망', '외부 피드백 발생', '색상 교체'], tip: '아픈 곳·헐거운 곳은 아래 요청 사항에 귀 부위 이름(헬릭스·트라거스 등)으로 적어 주세요' },
      ] },
      { title: '옵션 추가·변경', hint: '바꿀 것만 누르세요.', items: [
        { type: 'choice', label: '벤트 작업', c: R(36, 40), o: ['No Vent', 'Pressure Vent', 'Small Vent', 'Medium Vent', 'Large Vent'], single: true },
        { type: 'choice', label: '손잡이 (플레이트 옵션)', c: [41, 42], o: ['RH 직선형 손잡이', 'RL 고리형 손잡이'], single: true },
        { type: 'text', label: 'RH 희망길이 (mm)', t: 'rhmm', numeric: true },
        { type: 'text', label: 'RL 희망길이 (mm)', t: 'rlmm', numeric: true },
        { type: 'choice', label: '각종 옵션', c: R(43, 46), o: ['EXR (튜브를 길게)', 'BWG (귀지방지 스프링)', 'WH (마이크 바람막이)', 'HCK (귀지방지망)'] },
        { type: 'choice', label: '볼륨 옵션', c: R(47, 52), o: ['NVC (볼륨 제거)', '2W (2단 볼륨)', 'OW (스크류 볼륨)', 'VC (손 볼륨)', 'DC (디지털 볼륨)', 'MMB (멀티메모리, 추가비용)'], single: true },
      ] },
      { title: '요청 사항', items: [
        { type: 'textarea', label: '요청 사항 및 기타 증상', t: 'memo', init: REPAIR_NOTE, tip: '기본 문구 두 줄이 들어가 있어요. 필요 없으면 지워도 돼요' },
      ] },
    ],
  };
})();
