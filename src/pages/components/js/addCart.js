import pb from '/src/api/pocketbase';
import {
    insertFirst,
    getNode,
    comma,
    clearContents,
    getStorage,
    setStorage,
    getPbImageURL,
    getNodes,
} from '/src/lib';
import {updateCartBadge} from '/src/lib';
import '/src/styles/tailwind.css';

// 장바구니 팝업 그리기
export async function drawCartPopup(productId) {
    try {
        const data = await pb.collection('products').getOne(productId);
        getNode('.product__info--template').replaceChildren();
        getNode('.price__total--template').replaceChildren();

        insertFirst('.product__info--template', drawTemplateInfo(data));
        insertFirst('.price__total--template', drawTemplatePrice(data));

        getNode('.product__amount').textContent = 1;
    } catch (error) {
        alert('데이터 조회에 실패했습니다.');
    }
}

const getCurrentCount = (isMinusButton) => {
    const productAmount = getNode('.product__amount');
    if (isMinusButton) {
        return Number(productAmount.textContent) - 1
    }

    return Number(productAmount.textContent) + 1;
}

// 상품 수량 추가
export function changeAmount(e) {
    const minusButton = getNode('.button__minus');
    const productAmount = getNode('.product__amount');
    const button = e.target.closest('button');
    e.preventDefault();
    const discountPrice = Number(getNode('#discountPrice').dataset.discountprice);
    const isMinusButton = button === minusButton;
    const currentCount = getCurrentCount(isMinusButton);

    minusButton.disabled = currentCount === 1;
    productAmount.textContent = currentCount;

    updateTemplate(discountPrice, currentCount);
}

function get상품정보템플릿(data) {
  const {id, name, price, discount} = data;
  const discountPrice = Math.floor((price - price * (discount * 0.01)) / 10) * 10;


  return /* html */ `
    <p class="mb-3 text-l-base text-content" data-id=${id}>
      ${name}
    </p>
    <span class="mt-4 text-l-base leading-[30px]" data-discountPrice="${discountPrice}" id="discountPrice" data-img=${getPbImageURL(
        data,
        'thumbImg'
    )}>${comma(discountPrice)}원</span>
  `
}

function get디스카운트템플릿(data) {
    return /* html */ `<del class="ml-1 text-p-sm text-gray-300">${comma(data.price)}원</del>`;
}

function drawTemplateInfo(data) {
    if (data.discount === 0) {
      return get상품정보템플릿(data);
    }

    return `${get상품정보템플릿(data)}${get디스카운트템플릿(data)}`
}

function drawTemplatePrice(data) {
    const {price, discount} = data;
    const discountPrice =
        Math.floor((price - price * (discount * 0.01)) / 10) * 10;
    const reward = Math.round(discountPrice * 0.0005);
    // 상품 합계 템플릿
    const templatePrice = /* html */ `
  <span class="mt-3.5 align-bottom text-l-base">합계</span>
  <span class="text-right text-h-xl"
    >${comma(discountPrice)}원</span
  >
  <div class="col-span-2 justify-self-end">
    <span
      class="rounded-sm bg-accent-yellow px-2 py-[3px] text-l-sm text-white"
      >적립</span
    >
    <span class="inline-block w-32 text-right align-middle text-l-base leading-none"
      >구매 시 ${comma(reward)}원 적립</span
    >
  </div>
`;
    return templatePrice;
}

// 상품 수에 따라 합계를 누적
function updateAcc(target, currentCount) {
    return target * currentCount;
}

// 상품 합계 업데이트
function updateTemplate(discountPrice) {
    const productAmount = getNode('.product__amount');
    const totalPrice = updateAcc(
        Number(discountPrice),
        Number(productAmount.textContent)
    );

    const reward = updateAcc(
        Number(Math.round(discountPrice * 0.0005)),
        Number(productAmount.textContent)
    );

    clearContents('.price__total--template');
    const templatePrice = /* html */ `
    <span class="mt-3.5 align-bottom text-l-base">합계</span>
    <span class="text-right text-h-xl"
      >${comma(totalPrice)}원</span
    >
    <div class="col-span-2 justify-self-end">
      <span
        class="rounded-sm bg-accent-yellow px-2 py-[3px] text-l-sm text-white"
        >적립</span
      >
      <span class="inline-block w-32 text-right align-middle text-l-base leading-none"
        >구매 시 ${comma(reward)}원 적립</span
      >
    </div>
  `;
    insertFirst('.price__total--template', templatePrice);
}

// 취소 버튼 클릭
export function cancelAddCart(addCartPopup) {
    addCartPopup.close();
}

// 장바구니 담기 버튼 클릭
export async function addCart(addCartPopup) {
    const auth = await getStorage('auth');
    const data = {
        productId: getNode('.product__info--template p').dataset.id,
        imgSrc: getNode('.product__info--template span').dataset.img,
        amount: Number(getNode('.product__amount').innerText),
        name: getNode('.product__info--template p').innerText,
        auth,
    };

    // local storage에 auth가 있다면 로그인 된 상태기 때문에 DB에 장바구니 상품 추가해줌
    if (auth) {
        await addCartDB(data, addCartPopup);
    } else {
        // local storage에 auth가 있다면 로그인 안 된 상태기 때문 local storage에 상품 추가해줌
        await addCartLocalStorage(data, addCartPopup);
    }
    updateCartBadge();
    showBubble(data);
}

async function addCartDB(data, addCartPopup) {
    const {productId, amount, auth} = data;
    const userId = auth.user.id;

    const carts = await pb.collection('carts').getFullList({
        filter: `users_record= "${userId}" && products_record= "${productId}"`,
        requestKey: null,
    });

    if (!carts.length) {
        // 기존에 장바구니에 없던 상품. 따라서 DB에 새로 데이터 넣어줌
        const data = {
            users_record: userId,
            products_record: productId,
            amount,
        };
        await pb.collection('carts').create(data);
    } else {
        // 기존에 장바구니에 있던 상품. 따라서 기존 데이터의 amount 값을 바꿔줌
        const beforeAmount = carts[0].amount;
        const data = {
            amount: beforeAmount + amount,
        };

        await pb.collection('carts').update(carts[0].id, data);
    }
    addCartPopup.close();
}

async function addCartLocalStorage(data, addCartPopup) {
    const {productId} = data;
    let {amount} = data;
    let isExist = false;

    // local storage에 저장되어 있는 cart 값 가져옴
    // cart id, amout를 갖는 객체로 이루어진 배열임
    let cart = await getStorage('cart');
    const product = {products_record: productId, amount};

    // 만약 아무것도 저장되어 있지 않다면 배열 만들어 cart에 저장
    if (!cart) {
        cart = [];
        cart.push(product);
        setStorage('cart', cart);
        addCartPopup.close();
        return;
    }

    // 이미 저장되어 있는 product라면 amount를 더해줌
    cart.forEach((item, i) => {
        if (item.products_record === productId) {
            amount += item.amount;
            cart[i] = {products_record: productId, amount};
            isExist = true;
            return;
        }
    });

    // 이미 local storage에 저장되어 있던 product가 아니라면 cart에 push 해줌
    if (!isExist) {
        cart.push(product);
    }

    // loacl storage에 cart 배열 저장
    await setStorage('cart', cart);
    addCartPopup.close();
}

async function showBubble(data) {
    const {name, imgSrc} = data;
    // 헤더 두 가지 버전이기 때문에 bubble도 두 가지 헤더에 모두 달려있음. 따라서 getNodes로 가져옴
    const bubble = getNodes('.header__bubble');
    bubble.forEach((element) => {
        const bubbleImg = element.querySelector('.header__bubble-img');
        const bubbleFigcaption = element.querySelector(
            '.header__bubble-figcaption'
        );
        // 말풍선에 이미지 넣기
        bubbleImg.src = imgSrc;
        // 말풍선에 물품명 넣기
        bubbleFigcaption.innerText = name;
        // 말풍선 띄우기
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    });
}
