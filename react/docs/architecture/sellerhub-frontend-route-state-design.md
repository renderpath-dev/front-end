# SellerHub Frontend Route and State Design v0.1

## 1. 文档定位

这份文档定义 SellerHub Marketplace 前端的路由结构、页面职责、权限边界、状态归属、请求缓存规则、表单状态规则和 UI 状态规则。

它不是 UI 视觉稿，也不是组件实现文档。它回答的是：

- 每个页面为什么存在。
- 每个 URL 对应哪个业务场景。
- 哪些页面公开，哪些页面需要登录，哪些页面需要特定角色。
- 哪些状态属于 URL，哪些属于 server state，哪些属于 form state，哪些属于 local UI state。
- TanStack Query 的 query key 如何设计。
- mutation 成功后应该让哪些数据失效。
- 页面之间的数据流和跳转流怎么组织。
- 后续 Codex 写 React 代码时必须遵守哪些边界。

本项目的前端目标不是堆页面，而是形成可解释、可测试、可维护的业务前端架构。

---

## 2. 前端架构目标

### 2.1 目标

SellerHub 前端必须做到：

| 目标 | 说明 |
|---|---|
| 页面边界清楚 | 每个 route 对应明确业务场景 |
| 状态归属清楚 | 不把所有数据都塞进 `useState` |
| 权限边界清楚 | 前端做体验保护，后端做安全保护 |
| 请求边界清楚 | API 请求集中在 feature 的 `api/` 目录 |
| 表单边界清楚 | 表单状态交给 React Hook Form，不混入 server state |
| 缓存边界清楚 | TanStack Query 管理 server state 和缓存失效 |
| 类型边界清楚 | 页面、API、form、route params 都有 TypeScript 类型 |
| 求职可解释 | 面试时能解释每个状态为什么放在这里 |

### 2.2 非目标

第一版前端不追求：

- 复杂动画
- 高级设计系统
- SSR
- PWA
- micro frontend
- GraphQL client
- realtime dashboard
- infinite scroll
- virtualized list
- pixel-perfect e-commerce clone

第一版优先完成真实业务闭环和清晰架构。

---

## 3. 前端状态分类模型

### 3.1 结论

SellerHub 前端状态分成六类：

| 状态类型 | 英文 | 管理方式 | 示例 |
|---|---|---|---|
| 服务端状态 | server state | TanStack Query | products、cart、orders、current user |
| URL 状态 | URL state | search params | keyword、category、page、sort |
| 表单状态 | form state | React Hook Form | login form、product form、checkout form |
| 本地 UI 状态 | local UI state | `useState` | modal open、drawer open、selected tab |
| 派生状态 | derived state | render 中计算 | cart total、can checkout、stock label |
| 权限状态 | auth/role state | current user query + route guard | logged in、seller、admin |

### 3.2 为什么不能混在一起

错误做法：

```tsx
const [products, setProducts] = useState<Product[]>([]);
const [keyword, setKeyword] = useState("");
const [cartTotal, setCartTotal] = useState(0);
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

这个写法的问题是：

| 问题 | 原因 |
|---|---|
| `products` 是 server state | 应该由 TanStack Query 缓存和刷新 |
| `keyword` 是 URL state | 刷新、分享链接、浏览器前进后退都需要保留 |
| `cartTotal` 是 derived state | 可以从 cart items 计算，不应该重复存储 |
| `isLoggedIn` 是 auth state | 应该来自 `/api/auth/me`，不能靠前端猜 |

正确模型：

```txt
server state:
  products
  product detail
  cart
  orders
  current user

URL state:
  search
  category
  minPrice
  maxPrice
  sort
  page

form state:
  login values
  register values
  product form values
  checkout shipping values

local UI state:
  modal open
  mobile menu open
  confirm dialog open

derived state:
  cart total
  can checkout
  is product available
```

---

## 4. 路由总览

## 4.1 Public Routes

| Route | Page | 访问权限 | 页面目标 |
|---|---|---|---|
| `/` | HomePage | Public | 展示最新商品、推荐商品、分类入口 |
| `/products` | ProductListPage | Public | 商品搜索、筛选、排序、分页 |
| `/products/:productId` | ProductDetailPage | Public | 商品详情、加入购物车入口 |
| `/shops/:shopId` | ShopDetailPage | Public | 店铺信息和店铺商品 |
| `/login` | LoginPage | Visitor only | 登录 |
| `/register` | RegisterPage | Visitor only | 注册 |

## 4.2 Buyer Routes

| Route | Page | 访问权限 | 页面目标 |
|---|---|---|---|
| `/cart` | CartPage | Authenticated | 查看和修改购物车 |
| `/checkout` | CheckoutPage | Buyer or Seller | 填写收货信息并下单 |
| `/orders` | BuyerOrdersPage | Buyer or Seller | 查看自己的订单 |
| `/orders/:orderId` | BuyerOrderDetailPage | Buyer or Seller | 查看自己的订单详情 |
| `/account` | AccountPage | Authenticated | 查看和编辑基础账号信息 |

## 4.3 Seller Routes

| Route | Page | 访问权限 | 页面目标 |
|---|---|---|---|
| `/seller` | SellerDashboardPage | Seller | 卖家总览 |
| `/seller/shop` | SellerShopPage | Seller | 创建或编辑自己的店铺 |
| `/seller/products` | SellerProductsPage | Seller | 管理自己的商品 |
| `/seller/products/new` | SellerProductCreatePage | Seller | 创建商品 |
| `/seller/products/:productId/edit` | SellerProductEditPage | Seller | 编辑自己的商品 |
| `/seller/orders` | SellerOrdersPage | Seller | 查看店铺相关订单项 |
| `/seller/order-items/:orderItemId` | SellerOrderItemDetailPage | Seller | 查看和处理单个订单项 |

## 4.4 Admin Routes

| Route | Page | 访问权限 | 页面目标 |
|---|---|---|---|
| `/admin` | AdminDashboardPage | Admin | 管理后台总览 |
| `/admin/categories` | AdminCategoriesPage | Admin | 管理分类 |
| `/admin/products` | AdminProductsPage | Admin | 管理商品状态 |
| `/admin/shops` | AdminShopsPage | Admin | 管理店铺状态 |

## 4.5 Fallback Routes

| Route | Page | 访问权限 | 页面目标 |
|---|---|---|---|
| `*` | NotFoundPage | Public | 处理不存在的路由 |
| `/forbidden` | ForbiddenPage | Public | 无权限提示 |
| `/server-error` | ServerErrorPage | Public | 通用服务错误提示，可选 |

---

## 5. 路由守卫设计

## 5.1 Route Guard 类型

| Guard | 用途 |
|---|---|
| `RequireAuth` | 必须登录 |
| `RequireRole` | 必须具备指定角色 |
| `VisitorOnly` | 登录用户不应该访问，例如 login/register |
| `RequireSeller` | 必须是 seller |
| `RequireAdmin` | 必须是 admin |

## 5.2 权限判断来源

权限判断来自 current user query：

```txt
GET /api/auth/me
```

前端不从 localStorage 自己解析 role 作为可信数据。

如果使用 JWT 存储在 httpOnly cookie 中，前端不能直接读取 token。前端只通过 `/api/auth/me` 判断当前用户。

## 5.3 Route Guard 行为

| 当前状态 | 访问页面 | 行为 |
|---|---|---|
| 未登录 | `/cart` | 跳转 `/login` |
| 未登录 | `/seller` | 跳转 `/login` |
| Buyer | `/seller` | 跳转 `/forbidden` |
| Seller | `/seller` | 放行 |
| Seller | `/admin` | 跳转 `/forbidden` |
| Admin | `/admin` | 放行 |
| 已登录 | `/login` | 跳转 `/` |
| 已登录 | `/register` | 跳转 `/` |

## 5.4 Route Guard 组件草案

```tsx
import { Navigate, Outlet, useLocation } from "react-router";

type UserRole = "BUYER" | "SELLER" | "ADMIN";

type RequireRoleProps = {
  allowedRoles: UserRole[];
};

export function RequireRole({ allowedRoles }: RequireRoleProps) {
  const location = useLocation();
  const currentUserQuery = useCurrentUserQuery();

  if (currentUserQuery.isLoading) {
    return <PageLoading />;
  }

  if (currentUserQuery.isError || !currentUserQuery.data) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(currentUserQuery.data.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
```

### 5.5 重要规则

Route guard 只负责前端体验，不负责真实安全。

真实安全必须在后端完成：

```txt
frontend:
  hides links
  redirects users
  improves UX

backend:
  validates auth
  validates role
  validates resource ownership
  returns 401 or 403
```

---

## 6. App Router 结构

## 6.1 建议文件位置

```txt
apps/web/src/app/
  router.tsx
  providers.tsx
  query-client.ts
```

## 6.2 Router 层级草案

```tsx
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductListPage /> },
      { path: "/products/:productId", element: <ProductDetailPage /> },
      { path: "/shops/:shopId", element: <ShopDetailPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forbidden", element: <ForbiddenPage /> },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/orders", element: <BuyerOrdersPage /> },
      { path: "/orders/:orderId", element: <BuyerOrderDetailPage /> },
      { path: "/account", element: <AccountPage /> },
    ],
  },
  {
    element: <RequireRole allowedRoles={["SELLER"]} />,
    children: [
      { path: "/seller", element: <SellerDashboardPage /> },
      { path: "/seller/shop", element: <SellerShopPage /> },
      { path: "/seller/products", element: <SellerProductsPage /> },
      { path: "/seller/products/new", element: <SellerProductCreatePage /> },
      { path: "/seller/products/:productId/edit", element: <SellerProductEditPage /> },
      { path: "/seller/orders", element: <SellerOrdersPage /> },
      { path: "/seller/order-items/:orderItemId", element: <SellerOrderItemDetailPage /> },
    ],
  },
  {
    element: <RequireRole allowedRoles={["ADMIN"]} />,
    children: [
      { path: "/admin", element: <AdminDashboardPage /> },
      { path: "/admin/categories", element: <AdminCategoriesPage /> },
      { path: "/admin/products", element: <AdminProductsPage /> },
      { path: "/admin/shops", element: <AdminShopsPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
```

### 6.3 Router 设计规则

- 路由定义集中放在 `app/router.tsx`。
- 页面组件放在各 feature 的 `pages/` 目录。
- Layout 组件可以放在 `shared/components/layout/`。
- Guard 组件可以放在 `features/auth/components/` 或 `app/guards/`。
- 不在 route config 里写复杂业务逻辑。
- 不在 route guard 里直接发 mutation。
- route params 必须在页面中解析并校验。

---

## 7. Layout 设计

## 7.1 PublicLayout

用于公开页面和普通买家页面的基础外壳。

包含：

- top navigation
- search entry
- cart link
- auth menu
- main content
- footer

## 7.2 SellerLayout

用于 seller dashboard。

包含：

- seller sidebar
- seller top bar
- shop status indicator
- dashboard content

## 7.3 AdminLayout

用于 admin dashboard。

包含：

- admin sidebar
- admin top bar
- management navigation
- dashboard content

## 7.4 Layout 与权限的关系

Layout 不负责权限判断。

正确顺序：

```txt
route guard
  -> layout
  -> page
```

错误顺序：

```txt
layout
  -> page checks permission manually
```

---

## 8. Public Page State Design

## 8.1 HomePage

### 页面目标

首页展示平台入口，而不是承载全部业务逻辑。

### 数据需求

| 数据 | 来源 |
|---|---|
| latest products | `GET /api/products?sort=newest&page=1&pageSize=8` |
| featured categories | `GET /api/categories` 或 admin categories API 的 public variant |
| current user | `GET /api/auth/me` |

### 状态归属

| 状态 | 类型 | 管理方式 |
|---|---|---|
| latest products | server state | TanStack Query |
| categories | server state | TanStack Query |
| search input | local UI state 或 URL navigation | `useState` |
| current user | server state | TanStack Query |

### 交互

| 用户行为 | 结果 |
|---|---|
| 点击商品 | 跳转 `/products/:productId` |
| 点击分类 | 跳转 `/products?category=categoryId` |
| 搜索 | 跳转 `/products?keyword=value` |
| 点击 cart | 未登录跳转 login，已登录跳转 cart |

### Query Keys

```ts
export const homeQueryKeys = {
  latestProducts: ["products", "latest"],
  categories: ["categories", "public"],
} as const;
```

---

## 8.2 ProductListPage

### 页面目标

商品发现页面，支持搜索、筛选、排序和分页。

### URL State

| Query param | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `keyword` | string | empty | 搜索关键词 |
| `categoryId` | string | empty | 分类 |
| `minPrice` | number | empty | 最低价格 |
| `maxPrice` | number | empty | 最高价格 |
| `sort` | enum | `newest` | 排序 |
| `page` | number | `1` | 当前页 |
| `pageSize` | number | `12` | 每页数量 |

### 为什么这些状态属于 URL

这些状态会影响页面数据结果，并且需要支持：

- 刷新页面后保留筛选结果。
- 复制链接给别人后看到相同结果。
- 浏览器前进后退恢复列表状态。
- TanStack Query 根据 query params 缓存不同查询结果。

### 数据请求

```txt
GET /api/products
```

### Query Key

```ts
export const productQueryKeys = {
  list: (params: ProductListParams) => ["products", "list", params] as const,
  detail: (productId: string) => ["products", "detail", productId] as const,
};
```

### 页面状态

| 状态 | 类型 | 管理方式 |
|---|---|---|
| product list | server state | TanStack Query |
| filters | URL state | `useSearchParams` |
| filter panel open | local UI state | `useState` |
| selected sort | URL state | `useSearchParams` |
| page | URL state | `useSearchParams` |

### 页面必须处理的 UI 状态

| 状态 | UI |
|---|---|
| loading | skeleton list |
| error | retry card |
| empty | empty result message |
| success | product grid |
| fetching next params | subtle loading indicator |

### 交互

| 用户行为 | 结果 |
|---|---|
| 输入关键词并提交 | 更新 URL query，page 回到 1 |
| 选择分类 | 更新 URL query，page 回到 1 |
| 修改价格范围 | 更新 URL query，page 回到 1 |
| 修改排序 | 更新 URL query，page 回到 1 |
| 点击分页 | 更新 page query |
| 点击商品卡片 | 跳转详情页 |

### 常见错误

| 错误 | 原因 |
|---|---|
| 把 filters 放进普通 `useState` | 刷新页面会丢失，链接不可分享 |
| 每次输入字符都立即请求 | 容易造成请求过多，需要 submit 或 debounce |
| 前端筛选全部商品 | 真实项目数据量大，筛选应交给后端 |
| product list 没有 empty state | 用户无法区分没数据还是加载失败 |

---

## 8.3 ProductDetailPage

### 页面目标

展示单个商品详情，并提供加入购物车入口。

### Route Param

| Param | 类型 | 说明 |
|---|---|---|
| `productId` | string | 商品 ID |

### 数据请求

| 数据 | API |
|---|---|
| product detail | `GET /api/products/:productId` |
| current user | `GET /api/auth/me` |
| cart | 加入购物车成功后失效 |

### 页面状态

| 状态 | 类型 | 管理方式 |
|---|---|---|
| product detail | server state | TanStack Query |
| quantity | local UI state | `useState` |
| add to cart pending | mutation state | TanStack Query mutation |
| current user | server state | TanStack Query |

### 按钮规则

| 条件 | Add to Cart 行为 |
|---|---|
| 未登录 | 跳转 `/login` |
| 商品 archived | disabled |
| 商品 draft | 不应该公开显示 |
| stock 为 0 | disabled |
| quantity 大于 stock | 显示错误 |
| 已登录且库存足够 | 调用 add cart API |

### Mutation

```txt
POST /api/cart/items
```

### Mutation 成功后失效

```ts
export const cartQueryKeys = {
  detail: ["cart"] as const,
};
```

需要 invalidate：

```txt
["cart"]
```

### 常见错误

| 错误 | 原因 |
|---|---|
| 只在前端判断库存 | 后端必须再次判断，否则用户可以绕过 |
| 加入购物车后手动修改多个组件 state | 应该 invalidate cart query |
| 用商品当前价格作为购物车最终价格 | 下单时价格由后端重新计算 |

---

## 8.4 ShopDetailPage

### 页面目标

展示店铺信息和该店铺公开商品。

### Route Param

| Param | 类型 | 说明 |
|---|---|---|
| `shopId` | string | 店铺 ID |

### URL State

| Query param | 类型 | 默认值 |
|---|---|---|
| `page` | number | `1` |
| `sort` | enum | `newest` |

### 数据请求

| 数据 | API |
|---|---|
| shop detail | `GET /api/shops/:shopId` |
| shop products | `GET /api/products?shopId=:shopId` |

### 页面状态

| 状态 | 类型 | 管理方式 |
|---|---|---|
| shop detail | server state | TanStack Query |
| shop products | server state | TanStack Query |
| page and sort | URL state | `useSearchParams` |

### UI 状态

| 店铺状态 | UI |
|---|---|
| active | 正常展示 |
| suspended | 显示店铺暂停提示，商品不可购买 |
| not found | 404 |

---

## 9. Auth Page State Design

## 9.1 LoginPage

### 页面目标

完成登录，并把用户送回原本想访问的页面。

### Form State

| 字段 | 类型 | 校验 |
|---|---|---|
| email | string | required email |
| password | string | required |

### 状态归属

| 状态 | 类型 | 管理方式 |
|---|---|---|
| input values | form state | React Hook Form |
| validation errors | form state | React Hook Form + Zod |
| submit pending | mutation state | TanStack Query mutation |
| server error | mutation state | TanStack Query mutation |
| redirect target | router state | `location.state.from` |

### Mutation

```txt
POST /api/auth/login
```

### 成功后行为

- invalidate current user query
- redirect to previous protected route if it exists
- otherwise redirect to `/`

### Query Keys

```ts
export const authQueryKeys = {
  me: ["auth", "me"] as const,
};
```

### 常见错误

| 错误 | 原因 |
|---|---|
| 登录成功后只设置 local state | 刷新页面会丢失 |
| 登录后不 invalidate `/me` | 导航栏不会更新 |
| 登录失败用 alert | 不利于测试和用户体验 |
| 忘记 redirect back | 用户访问购物车被打断后体验差 |

---

## 9.2 RegisterPage

### 页面目标

完成注册。注册后可以选择自动登录或跳转登录页。

### Form State

| 字段 | 类型 | 校验 |
|---|---|---|
| name | string | 2 到 50 个字符 |
| email | string | required email |
| password | string | 至少 8 个字符 |

### Mutation

```txt
POST /api/auth/register
```

### 成功后行为

MVP 推荐：

```txt
register success
  -> redirect to login
  -> show success message
```

原因：实现更简单，认证流程更清楚。

---

## 10. Buyer Page State Design

## 10.1 CartPage

### 页面目标

展示购物车，允许修改数量、删除商品、进入 checkout。

### 数据请求

```txt
GET /api/cart
```

### 状态归属

| 状态 | 类型 | 管理方式 |
|---|---|---|
| cart items | server state | TanStack Query |
| item quantity while editing | local UI state 或 controlled input | `useState` |
| cart total | derived state | render 中计算 |
| remove dialog open | local UI state | `useState` |
| update pending | mutation state | TanStack Query mutation |

### Derived State

```ts
export function calculateCartTotal(cartItems: CartItemView[]) {
  return cartItems.reduce((total, item) => {
    return total + item.product.priceCents * item.quantity;
  }, 0);
}
```

### 重要边界

前端可以显示 cart total，但 checkout 时不能把这个 total 当成可信金额传给后端。

后端必须重新读取商品价格和库存。

### Mutations

| 行为 | API |
|---|---|
| 修改数量 | `PATCH /api/cart/items/:cartItemId` |
| 删除 item | `DELETE /api/cart/items/:cartItemId` |
| 清空购物车 | `DELETE /api/cart` |

### Mutation 成功后失效

```txt
["cart"]
```

### Checkout 按钮规则

| 条件 | 行为 |
|---|---|
| cart empty | disabled |
| any item unavailable | disabled |
| any item quantity exceeds stock | disabled |
| valid cart | navigate `/checkout` |

### 常见错误

| 错误 | 原因 |
|---|---|
| `cartTotal` 单独存进 state | 容易和 cart items 不一致 |
| 修改数量后手动 patch 本地所有状态 | 应优先 invalidate 或 optimistic update |
| 不处理商品下架 | 下单时会失败，购物车要提前提示 |
| 允许空购物车 checkout | 业务状态不合法 |

---

## 10.2 CheckoutPage

### 页面目标

提交收货信息并创建订单。

### 数据请求

| 数据 | API |
|---|---|
| cart | `GET /api/cart` |
| current user | `GET /api/auth/me` |

### Form State

| 字段 | 类型 | 校验 |
|---|---|---|
| shippingName | string | required |
| shippingPhone | string | required |
| shippingAddress | string | required |

### Mutation

```txt
POST /api/orders
```

### Request Body

前端只提交收货信息：

```json
{
  "shippingName": "Ada Lovelace",
  "shippingPhone": "555-0100",
  "shippingAddress": "123 Market Street"
}
```

前端不提交：

- `totalCents`
- `unitPriceCents`
- `subtotalCents`
- `stock`
- `paymentStatus`
- `buyerId`

这些必须由后端计算或从 auth context 得到。

### 成功后行为

```txt
create order success
  -> invalidate cart
  -> invalidate buyer orders
  -> invalidate product list/detail if stock changed
  -> navigate /orders/:orderId
```

### 页面状态

| 状态 | 类型 | 管理方式 |
|---|---|---|
| checkout form | form state | React Hook Form |
| cart | server state | TanStack Query |
| order submit pending | mutation state | TanStack Query mutation |
| cart total preview | derived state | render 中计算 |
| submit error | mutation state | inline error |

### 常见错误

| 错误 | 原因 |
|---|---|
| 前端把总价提交给后端 | 用户可以篡改 |
| 创建订单成功后不清 cart query | UI 显示旧购物车 |
| 不处理库存不足错误 | checkout 体验会断 |
| checkout 页面自己维护一份 cart copy | 容易和 server state 不一致 |

---

## 10.3 BuyerOrdersPage

### 页面目标

展示当前用户的订单历史。

### 数据请求

```txt
GET /api/orders
```

### URL State

| Query param | 类型 | 默认值 |
|---|---|---|
| `status` | enum | empty |
| `page` | number | `1` |

### Query Key

```ts
export const orderQueryKeys = {
  buyerList: (params: BuyerOrderListParams) => ["orders", "buyer", params] as const,
  buyerDetail: (orderId: string) => ["orders", "buyer", orderId] as const,
};
```

### UI 状态

| 状态 | UI |
|---|---|
| loading | order skeleton |
| empty | no orders message |
| error | retry |
| success | order list |

---

## 10.4 BuyerOrderDetailPage

### 页面目标

展示单个订单详情，包括多个 order items。

### Route Param

| Param | 类型 |
|---|---|
| `orderId` | string |

### 数据请求

```txt
GET /api/orders/:orderId
```

### 权限

Buyer 只能查看自己的订单。

前端进入该页面前只检查登录，真实 ownership 检查由后端完成。

---

## 11. Seller Page State Design

## 11.1 SellerDashboardPage

### 页面目标

卖家中心首页，提供概览和快速入口。

### 数据需求

| 数据 | API |
|---|---|
| seller shop | `GET /api/shops/me` 或 `GET /api/shops?owner=me` |
| seller products summary | `GET /api/products?owner=me` |
| seller order items summary | `GET /api/seller/orders` |

### Dashboard Cards

| 卡片 | 计算来源 |
|---|---|
| Total products | seller products |
| Active products | seller products filtered by status |
| Pending order items | seller order items filtered by status |
| Low stock products | seller products filtered by stock |

### 状态归属

| 状态 | 类型 | 管理方式 |
|---|---|---|
| dashboard data | server state | TanStack Query |
| selected date range | local UI state or URL state | v0.1 use local |
| quick action menu | local UI state | `useState` |

---

## 11.2 SellerShopPage

### 页面目标

Seller 创建或编辑自己的店铺。

### 页面模式

这个页面有两种模式：

| 条件 | 模式 |
|---|---|
| Seller 没有 shop | create mode |
| Seller 已有 shop | edit mode |

### 数据请求

```txt
GET /api/shops/me
```

如果 API contract 没有 `/api/shops/me`，可以使用后端提供的 seller shop endpoint。这个 endpoint 应该由 auth user 推导 owner，不应该让前端传 `ownerId` 作为可信数据。

### Form State

| 字段 | 类型 |
|---|---|
| name | string |
| slug | string |
| description | string |
| logoUrl | string |

### Mutations

| 模式 | API |
|---|---|
| create | `POST /api/shops` |
| edit | `PATCH /api/shops/:shopId` |

### 成功后失效

```txt
["shops", "me"]
["shops", "detail", shopId]
```

### 常见错误

| 错误 | 原因 |
|---|---|
| 前端传 `ownerId` | owner 必须来自后端 auth context |
| 创建多个 shop | MVP 规定 seller 只能一个 shop |
| shop form 和 product form 混在一起 | 业务边界不同 |

---

## 11.3 SellerProductsPage

### 页面目标

Seller 管理自己的商品。

### URL State

| Query param | 类型 | 默认值 |
|---|---|---|
| `status` | enum | empty |
| `keyword` | string | empty |
| `page` | number | `1` |

### 数据请求

```txt
GET /api/seller/products
```

如果暂时没有 seller-specific endpoint，也可以由 `GET /api/products?owner=me` 表达，但后端仍然必须从 auth context 判断 owner。

### 页面状态

| 状态 | 类型 | 管理方式 |
|---|---|---|
| seller products | server state | TanStack Query |
| filters | URL state | `useSearchParams` |
| delete confirm open | local UI state | `useState` |
| selected product id | local UI state | `useState` |

### Mutations

| 行为 | API |
|---|---|
| archive product | `PATCH /api/products/:productId` |
| delete product | `DELETE /api/products/:productId` |

### 成功后失效

```txt
["products", "seller"]
["products", "list"]
["products", "detail", productId]
```

---

## 11.4 SellerProductCreatePage

### 页面目标

创建新商品。

### Form State

| 字段 | 类型 | 校验 |
|---|---|---|
| name | string | required |
| description | string | required |
| priceCents | number | greater than 0 |
| stock | number | greater than or equal to 0 |
| categoryId | string | required |
| imageUrl | string | optional URL |
| status | enum | draft or active |

### 数据请求

| 数据 | API |
|---|---|
| categories | `GET /api/categories` |
| seller shop | `GET /api/shops/me` |

### Mutation

```txt
POST /api/products
```

### 成功后行为

```txt
create product success
  -> invalidate seller products
  -> invalidate public product list if status is active
  -> navigate /seller/products
```

### 重要规则

前端不传：

- `shopId`
- `ownerId`
- `createdAt`
- `updatedAt`

后端根据当前 seller 的 shop 创建商品。

---

## 11.5 SellerProductEditPage

### 页面目标

编辑自己的商品。

### Route Param

| Param | 类型 |
|---|---|
| `productId` | string |

### 数据请求

```txt
GET /api/products/:productId
```

### Mutation

```txt
PATCH /api/products/:productId
```

### 成功后失效

```txt
["products", "seller"]
["products", "list"]
["products", "detail", productId]
```

### 权限

前端只能通过 UI 入口进入自己的商品编辑页面，但后端必须检查商品是否属于当前 seller 的 shop。

---

## 11.6 SellerOrdersPage

### 页面目标

Seller 查看自己店铺产生的 order items。

### 为什么是 order items，不是 orders

SellerHub 是 multi-vendor marketplace。一个 buyer order 可以包含多个 seller 的商品。

因此 Seller 处理的是：

```txt
OrderItem
```

不是整个：

```txt
Order
```

### URL State

| Query param | 类型 | 默认值 |
|---|---|---|
| `status` | enum | empty |
| `page` | number | `1` |

### 数据请求

```txt
GET /api/seller/orders
```

返回结果应该以 order item 为核心。

### 页面状态

| 状态 | 类型 | 管理方式 |
|---|---|---|
| seller order items | server state | TanStack Query |
| status filter | URL state | `useSearchParams` |
| update status pending | mutation state | TanStack Query mutation |

### Mutation

```txt
PATCH /api/seller/order-items/:orderItemId/status
```

### 成功后失效

```txt
["orders", "seller"]
["orders", "buyer"]
["orders", "buyer", orderId]
```

如果更新会影响 dashboard summary，也需要失效：

```txt
["seller", "dashboard"]
```

---

## 11.7 SellerOrderItemDetailPage

### 页面目标

Seller 查看单个 order item 的详细信息，并更新 fulfillment status。

### Route Param

| Param | 类型 |
|---|---|
| `orderItemId` | string |

### 数据请求

```txt
GET /api/seller/order-items/:orderItemId
```

如果 MVP 不单独提供 detail endpoint，可以从 seller order list 进入时携带列表数据，但刷新页面会丢失，所以推荐后端提供 detail endpoint。

---

## 12. Admin Page State Design

## 12.1 AdminDashboardPage

### 页面目标

提供平台管理入口和统计概览。

### 数据需求

| 数据 | API |
|---|---|
| category count | admin categories |
| shop status summary | admin shops |
| product status summary | admin products |

### 状态归属

| 状态 | 类型 | 管理方式 |
|---|---|---|
| dashboard summary | server state | TanStack Query |
| selected dashboard tab | local UI state | `useState` |

---

## 12.2 AdminCategoriesPage

### 页面目标

管理商品分类。

### 数据请求

```txt
GET /api/admin/categories
```

### Mutations

| 行为 | API |
|---|---|
| create category | `POST /api/admin/categories` |
| update category | `PATCH /api/admin/categories/:categoryId` |
| delete category | `DELETE /api/admin/categories/:categoryId` |

### 状态归属

| 状态 | 类型 | 管理方式 |
|---|---|---|
| categories | server state | TanStack Query |
| category form | form state | React Hook Form |
| edit modal open | local UI state | `useState` |
| selected category | local UI state | `useState` |

### 成功后失效

```txt
["categories"]
["categories", "admin"]
["products", "list"]
```

如果分类影响商品筛选 UI，public categories 也要失效。

### 常见错误

| 错误 | 原因 |
|---|---|
| 删除已被商品使用的分类 | 后端应返回 conflict |
| 分类管理只做前端数组操作 | 刷新后丢失 |
| public category query 和 admin category query 混用 | 权限和字段可能不同 |

---

## 12.3 AdminProductsPage

### 页面目标

Admin 管理商品状态。

### URL State

| Query param | 类型 |
|---|---|
| `status` | enum |
| `keyword` | string |
| `page` | number |

### 数据请求

```txt
GET /api/admin/products
```

### Mutation

```txt
PATCH /api/admin/products/:productId/status
```

### 成功后失效

```txt
["products", "admin"]
["products", "list"]
["products", "detail", productId]
```

---

## 12.4 AdminShopsPage

### 页面目标

Admin 管理店铺状态。

### URL State

| Query param | 类型 |
|---|---|
| `status` | enum |
| `keyword` | string |
| `page` | number |

### 数据请求

```txt
GET /api/admin/shops
```

### Mutation

```txt
PATCH /api/admin/shops/:shopId/status
```

### 成功后失效

```txt
["shops", "admin"]
["shops", "detail", shopId]
["products", "list"]
```

如果 suspended shop 影响商品可购买状态，需要让相关 product list/detail 失效。

---

## 13. Query Key 设计总表

## 13.1 Auth

```ts
export const authQueryKeys = {
  me: ["auth", "me"] as const,
};
```

## 13.2 Products

```ts
export const productQueryKeys = {
  all: ["products"] as const,
  list: (params: ProductListParams) => ["products", "list", params] as const,
  detail: (productId: string) => ["products", "detail", productId] as const,
  sellerList: (params: SellerProductListParams) => ["products", "seller", params] as const,
  adminList: (params: AdminProductListParams) => ["products", "admin", params] as const,
};
```

## 13.3 Shops

```ts
export const shopQueryKeys = {
  all: ["shops"] as const,
  list: (params: ShopListParams) => ["shops", "list", params] as const,
  detail: (shopId: string) => ["shops", "detail", shopId] as const,
  mine: ["shops", "me"] as const,
  adminList: (params: AdminShopListParams) => ["shops", "admin", params] as const,
};
```

## 13.4 Cart

```ts
export const cartQueryKeys = {
  detail: ["cart"] as const,
};
```

## 13.5 Orders

```ts
export const orderQueryKeys = {
  all: ["orders"] as const,
  buyerList: (params: BuyerOrderListParams) => ["orders", "buyer", params] as const,
  buyerDetail: (orderId: string) => ["orders", "buyer", orderId] as const,
  sellerList: (params: SellerOrderItemListParams) => ["orders", "seller", params] as const,
  sellerItemDetail: (orderItemId: string) => ["orders", "seller-item", orderItemId] as const,
};
```

## 13.6 Categories

```ts
export const categoryQueryKeys = {
  publicList: ["categories", "public"] as const,
  adminList: ["categories", "admin"] as const,
};
```

---

## 14. Mutation Invalidation Rules

## 14.1 Auth Mutations

| Mutation | Invalidate |
|---|---|
| login | `["auth", "me"]` |
| logout | `["auth", "me"]`, `["cart"]`, `["orders"]` |
| register | none or `["auth", "me"]` if auto login |

## 14.2 Product Mutations

| Mutation | Invalidate |
|---|---|
| create product | seller products, public product list |
| update product | seller products, public product list, product detail |
| delete/archive product | seller products, public product list, product detail |
| admin update product status | admin products, public products, product detail |

## 14.3 Cart Mutations

| Mutation | Invalidate |
|---|---|
| add cart item | cart |
| update cart item | cart |
| remove cart item | cart |
| clear cart | cart |

## 14.4 Order Mutations

| Mutation | Invalidate |
|---|---|
| create order | cart, buyer orders, products |
| seller update order item status | seller orders, buyer orders, dashboard |
| cancel order item | seller orders, buyer orders, products |

## 14.5 Shop Mutations

| Mutation | Invalidate |
|---|---|
| create shop | my shop, shop list |
| update shop | my shop, shop detail, shop list |
| admin update shop status | admin shops, shop detail, public products |

---

## 15. URL State 解析规则

## 15.1 ProductList Search Params Type

```ts
export type ProductSort = "newest" | "price_asc" | "price_desc" | "popularity";

export type ProductListSearchParams = {
  keyword: string;
  categoryId?: string;
  minPriceCents?: number;
  maxPriceCents?: number;
  sort: ProductSort;
  page: number;
  pageSize: number;
};
```

## 15.2 Parse Function

```ts
export function parseProductListSearchParams(searchParams: URLSearchParams): ProductListSearchParams {
  const pageValue = Number(searchParams.get("page") ?? "1");
  const pageSizeValue = Number(searchParams.get("pageSize") ?? "12");

  return {
    keyword: searchParams.get("keyword") ?? "",
    categoryId: searchParams.get("categoryId") ?? undefined,
    minPriceCents: parseOptionalNumber(searchParams.get("minPriceCents")),
    maxPriceCents: parseOptionalNumber(searchParams.get("maxPriceCents")),
    sort: parseProductSort(searchParams.get("sort")),
    page: Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1,
    pageSize: Number.isFinite(pageSizeValue) && pageSizeValue > 0 ? pageSizeValue : 12,
  };
}
```

## 15.3 URL State 规则

- 任何影响 list data 的筛选条件都放 URL。
- 任何只影响当前组件显示的状态不放 URL。
- URL 参数解析后必须有默认值。
- URL 参数不能直接信任，要 parse。
- 非法 URL 参数应该 fallback 到默认值。

---

## 16. Feature 目录和状态边界

## 16.1 推荐 Frontend 结构

```txt
apps/web/src/
  app/
    router.tsx
    providers.tsx
    query-client.ts

  features/
    auth/
      api/
      components/
      hooks/
      pages/
      types.ts

    products/
      api/
      components/
      hooks/
      pages/
      product-query-keys.ts
      types.ts

    shops/
      api/
      components/
      hooks/
      pages/
      shop-query-keys.ts
      types.ts

    cart/
      api/
      components/
      hooks/
      pages/
      cart-query-keys.ts
      types.ts

    orders/
      api/
      components/
      hooks/
      pages/
      order-query-keys.ts
      types.ts

    seller/
      components/
      pages/

    admin/
      components/
      pages/

  shared/
    api/
      http-client.ts
      api-error.ts

    components/
      PageLoading.tsx
      EmptyState.tsx
      ErrorState.tsx
      ConfirmDialog.tsx

    hooks/
      useParsedSearchParams.ts

    types/
      api-response.ts

    utils/
      money.ts
```

## 16.2 Feature Boundary Rules

| 规则 | 说明 |
|---|---|
| feature 内部组件优先放在本 feature | 避免 shared 膨胀 |
| 只有跨多个 feature 复用的组件才进入 shared | 例如 `EmptyState`、`PageLoading` |
| API 请求函数放在 feature `api/` | 页面不直接写 fetch |
| query key 放在 feature 内部 | 避免散落 |
| types 可以来自 shared contract | 但 UI-specific type 可放本 feature |
| seller 页面可复用 products/orders API | seller 是业务入口，不一定要复制 API |

---

## 17. API Client 边界

## 17.1 HTTP Client 目标

所有请求经过统一 client：

```txt
api function
  -> http client
  -> fetch
  -> response envelope parsing
  -> error normalization
```

## 17.2 HTTP Client 草案

```ts
type ApiSuccess<TData> = {
  success: true;
  data: TData;
};

type ApiFailure = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

type ApiResponse<TData> = ApiSuccess<TData> | ApiFailure;

export async function requestJson<TData>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<TData> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    credentials: "include",
  });

  const body = (await response.json()) as ApiResponse<TData>;

  if (!body.success) {
    throw new ApiClientError(body.error.code, body.error.message, response.status, body.error.details);
  }

  return body.data;
}
```

## 17.3 API Function 示例

```ts
export type ProductListParams = {
  keyword?: string;
  categoryId?: string;
  minPriceCents?: number;
  maxPriceCents?: number;
  sort?: "newest" | "price_asc" | "price_desc" | "popularity";
  page?: number;
  pageSize?: number;
};

export async function getProducts(params: ProductListParams) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return requestJson<ProductListResponse>(`/api/products?${searchParams.toString()}`);
}
```

## 17.4 规则

- 页面组件不直接调用 `fetch`。
- API function 返回业务数据，不返回 raw response。
- HTTP client 负责 envelope 解析。
- React Query hook 负责缓存和请求状态。
- 运行时 validation 可以放在 API client 或后端响应边界，MVP 至少保证后端校验 request。

---

## 18. Component Design by Page

## 18.1 Product List Components

```txt
features/products/
  pages/
    ProductListPage.tsx

  components/
    ProductSearchBar.tsx
    ProductFilterPanel.tsx
    ProductSortSelect.tsx
    ProductGrid.tsx
    ProductCard.tsx
    ProductPagination.tsx
```

### Props 边界

| Component | Props |
|---|---|
| `ProductSearchBar` | current keyword、onSubmit |
| `ProductFilterPanel` | current filters、onChange |
| `ProductSortSelect` | current sort、onChange |
| `ProductGrid` | products |
| `ProductCard` | product |
| `ProductPagination` | page、totalPages、onPageChange |

### 规则

- `ProductCard` 不发请求。
- `ProductGrid` 不知道 URL search params。
- `ProductListPage` 负责把 URL state 和 query hook 接起来。
- 筛选组件只通过 callback 通知页面更新 URL。

---

## 18.2 Cart Components

```txt
features/cart/
  pages/
    CartPage.tsx

  components/
    CartItemRow.tsx
    CartSummary.tsx
    CartEmptyState.tsx
```

### Props 边界

| Component | Props |
|---|---|
| `CartItemRow` | cart item、onQuantityChange、onRemove |
| `CartSummary` | subtotal、canCheckout |
| `CartEmptyState` | no complex props |

### 规则

- `CartSummary` 只显示计算结果，不自己算请求。
- `CartItemRow` 不直接 invalidate query，由 page 或 hook 管理 mutation。
- `CartPage` 负责组合 query、mutation、derived total。

---

## 18.3 Seller Product Components

```txt
features/products/
  pages/
    SellerProductsPage.tsx
    SellerProductCreatePage.tsx
    SellerProductEditPage.tsx

  components/
    ProductForm.tsx
    SellerProductTable.tsx
    ProductStatusBadge.tsx
```

### ProductForm 规则

`ProductForm` 应该同时支持 create 和 edit：

```ts
type ProductFormMode = "create" | "edit";

type ProductFormProps = {
  mode: ProductFormMode;
  defaultValues?: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void;
  isSubmitting: boolean;
};
```

### 规则

- `ProductForm` 不知道 API endpoint。
- create/edit 页面决定调用哪个 mutation。
- `ProductForm` 只管理字段和校验。
- `SellerProductTable` 只展示和触发 action callback。

---

## 19. Loading, Error, Empty, Success 统一规则

## 19.1 页面状态优先级

页面渲染顺序：

```txt
loading
  -> error
  -> empty
  -> success
```

### 示例

```tsx
if (productsQuery.isLoading) {
  return <ProductListSkeleton />;
}

if (productsQuery.isError) {
  return <ErrorState onRetry={() => productsQuery.refetch()} />;
}

if (productsQuery.data.items.length === 0) {
  return <EmptyState title="No products found" />;
}

return <ProductGrid products={productsQuery.data.items} />;
```

## 19.2 规则

- 不用一个巨大 ternary 写复杂页面。
- loading、error、empty、success 必须能被测试。
- mutation pending 要体现在按钮或局部区域，不一定阻塞整页。
- list refetch 可以保留旧数据，避免页面闪烁。

---

## 20. Money Display Rules

## 20.1 金额存储

数据库和 API 使用 cents：

```txt
priceCents
totalCents
unitPriceCents
subtotalCents
```

前端显示时格式化：

```ts
export function formatMoney(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
```

## 20.2 规则

- 不在前端用 float 保存可信金额。
- 不把 `$19.99` 字符串传给后端。
- 表单里可以输入 dollars，但提交前转换成 cents。
- 显示逻辑集中在 `formatMoney`。

---

## 21. Form Design Rules

## 21.1 表单边界

| 表单 | 位置 | 状态管理 |
|---|---|---|
| LoginForm | `features/auth/components` | React Hook Form |
| RegisterForm | `features/auth/components` | React Hook Form |
| ProductForm | `features/products/components` | React Hook Form |
| ShopForm | `features/shops/components` | React Hook Form |
| CheckoutForm | `features/orders/components` | React Hook Form |
| CategoryForm | `features/admin/components` | React Hook Form |

## 21.2 Form 规则

- form component 不直接知道导航逻辑。
- form component 通过 `onSubmit` 把 values 交给 page。
- page 负责调用 mutation。
- page 负责 mutation 成功后的跳转。
- Zod schema 可以和后端 schema 分开，但字段语义必须一致。
- 后端 validation 是最终边界。

## 21.3 ProductForm Values

```ts
export type ProductFormValues = {
  name: string;
  description: string;
  priceDollars: string;
  stock: number;
  categoryId: string;
  imageUrl?: string;
  status: "draft" | "active";
};
```

提交给 API 前转换：

```ts
export function toCreateProductRequest(values: ProductFormValues): CreateProductRequest {
  return {
    name: values.name,
    description: values.description,
    priceCents: Math.round(Number(values.priceDollars) * 100),
    stock: values.stock,
    categoryId: values.categoryId,
    imageUrl: values.imageUrl,
    status: values.status,
  };
}
```

---

## 22. Navigation Design

## 22.1 Header Navigation

| 用户状态 | 显示 |
|---|---|
| Visitor | Home、Products、Login、Register |
| Buyer | Home、Products、Cart、Orders、Account、Logout |
| Seller | Home、Products、Cart、Orders、Seller Dashboard、Account、Logout |
| Admin | Home、Products、Admin Dashboard、Account、Logout |

## 22.2 Seller Sidebar

| Link | Route |
|---|---|
| Overview | `/seller` |
| Shop | `/seller/shop` |
| Products | `/seller/products` |
| Orders | `/seller/orders` |

## 22.3 Admin Sidebar

| Link | Route |
|---|---|
| Overview | `/admin` |
| Categories | `/admin/categories` |
| Products | `/admin/products` |
| Shops | `/admin/shops` |

## 22.4 Navigation 规则

- 导航显示基于 current user。
- 访问权限不能只靠隐藏导航。
- logout mutation 成功后跳转首页。
- cart link 可以显示 cart item count。
- cart item count 来自 cart query，不单独维护。

---

## 23. Page-level Acceptance Criteria

## 23.1 ProductListPage

- 访问 `/products` 可以看到商品列表。
- URL query 改变时请求参数同步改变。
- 搜索后 URL 包含 keyword。
- 分类筛选后 URL 包含 categoryId。
- 没有结果时展示 empty state。
- 请求失败时展示 error state。
- 点击商品进入详情页。

## 23.2 ProductDetailPage

- 可以展示商品详情。
- 未登录点击 add to cart 会跳转 login。
- 库存为 0 时按钮 disabled。
- 加入购物车成功后 cart query 更新。
- 请求不存在商品时展示 not found。

## 23.3 CartPage

- 可以展示购物车项。
- 可以修改数量。
- 可以删除商品。
- 总价由 cart items 计算。
- 空购物车不能 checkout。
- 库存不足时显示错误状态。

## 23.4 CheckoutPage

- 可以显示 cart summary。
- 可以填写收货信息。
- 空购物车不能提交。
- 创建订单成功后跳转订单详情。
- 创建订单成功后 cart 被清空。
- 库存不足错误能显示给用户。

## 23.5 SellerProductsPage

- Seller 可以看到自己的商品。
- 可以按 status 过滤。
- 可以进入创建商品页面。
- 可以进入编辑商品页面。
- Seller 不能编辑别人的商品，后端返回 forbidden。

## 23.6 SellerOrdersPage

- Seller 可以看到自己店铺相关 order items。
- Seller 可以按 status 过滤。
- Seller 可以更新 order item status。
- Seller 不能更新其他 seller 的 order item。

## 23.7 AdminCategoriesPage

- Admin 可以查看分类。
- Admin 可以创建分类。
- Admin 可以编辑分类。
- 删除被使用分类时显示 conflict error。
- 非 Admin 不能访问。

---

## 24. Testing Plan

## 24.1 Component Tests

| Component | 测试内容 |
|---|---|
| `ProductCard` | 显示商品名称、价格、库存状态 |
| `ProductGrid` | 正确渲染多个商品 |
| `CartSummary` | 正确显示 subtotal |
| `LoginForm` | 必填和 email 校验 |
| `ProductForm` | price 和 stock 校验 |
| `ProtectedRoute` | 未登录跳转 login |

## 24.2 Page Tests

| Page | 测试内容 |
|---|---|
| `ProductListPage` | loading、empty、error、success |
| `CartPage` | 修改数量和删除行为 |
| `CheckoutPage` | submit 成功后跳转 |
| `SellerProductsPage` | seller products table |
| `AdminCategoriesPage` | create category flow |

## 24.3 E2E Tests

```txt
buyer-flow:
  register
  login
  search product
  add to cart
  checkout
  view order
```

```txt
seller-flow:
  login as seller
  create product
  view product in dashboard
  update product
  view order item
  update order item status
```

---

## 25. Common Frontend Design Mistakes

| 错误 | 为什么错 | 正确做法 |
|---|---|---|
| 所有数据都用 `useState` | server state 缺少缓存、刷新、错误状态 | 用 TanStack Query |
| 搜索条件只存在组件 state | 刷新和分享链接会丢失 | 放 URL query params |
| 把 cart total 存进 state | 派生数据可能和 cart items 不一致 | render 中计算 |
| form component 直接调用 API | 表单和业务副作用耦合 | page 调用 mutation |
| ProductCard 直接 fetch | 展示组件变成数据组件 | page 或 hook 获取数据 |
| seller 直接更新 order status | 多商家订单边界错误 | seller 更新 order item status |
| 前端传 totalCents | 用户可以篡改金额 | 后端重新计算 |
| 只隐藏按钮做权限 | 用户可直接请求 API | 后端校验权限 |
| 没有 empty state | 用户无法判断没数据还是卡住 | 明确 empty UI |
| query key 不稳定 | 缓存命中混乱 | query key 包含语义和 params |

---

## 26. Interview Explanation Checklist

项目完成后，必须能解释以下问题：

1. 为什么商品筛选条件应该放在 URL，而不是普通 state？
2. 为什么 product list 属于 server state？
3. 为什么 cart total 不应该单独存在 state？
4. 为什么 checkout 不能把前端 total 传给后端作为可信金额？
5. 为什么 seller 更新的是 order item，而不是整个 order？
6. 为什么 route guard 不是安全边界？
7. 为什么 form component 不直接发请求？
8. 为什么 mutation 成功后要 invalidate query？
9. 为什么 ProductCard 不应该自己 fetch 数据？
10. 为什么金额用 cents 而不是 floating number？
11. 为什么 login 成功后要 invalidate current user query？
12. 为什么 Admin 和 Seller layout 不负责权限判断？
13. 为什么 URL search params 需要 parse 和 fallback？
14. 为什么 loading、error、empty、success 要明确拆开？
15. 为什么后端 validation 不能被前端 validation 替代？

---

## 27. Implementation Order

前端实现推荐顺序：

```txt
1. app providers
2. router skeleton
3. shared HTTP client
4. auth query and auth guards
5. public layout and navigation
6. login/register pages
7. product list page
8. product detail page
9. cart page
10. checkout page
11. buyer orders pages
12. seller layout
13. seller shop page
14. seller product pages
15. seller order item pages
16. admin layout
17. admin category page
18. admin product/shop management
19. tests
20. polish and deployment
```

原因：

- Auth guard 是所有 protected pages 的基础。
- Product browsing 是 buyer flow 的入口。
- Cart 和 checkout 建立核心商业闭环。
- Seller dashboard 依赖 product 和 order 数据。
- Admin 是后期增强，不应该阻塞 MVP 业务闭环。

---

## 28. Codex Implementation Prompt Boundary

后续让 Codex 实现前端时，每次只给一个阶段，不要一次要求生成所有页面。

推荐阶段：

```txt
Phase Web 0:
  app providers, router skeleton, layouts, route guards

Phase Web 1:
  auth pages and current user flow

Phase Web 2:
  product list and product detail

Phase Web 3:
  cart and checkout

Phase Web 4:
  buyer order pages

Phase Web 5:
  seller shop and seller products

Phase Web 6:
  seller order item management

Phase Web 7:
  admin categories, products, shops

Phase Web 8:
  tests, polish, README
```

每个 Codex prompt 必须指定：

- target files
- allowed scope
- API contract source
- route list
- state ownership rules
- query keys
- mutation invalidation
- testing requirement
- do not modify unrelated files

---

## 29. 最终记忆模型

SellerHub 前端不是页面集合，而是状态边界系统：

```txt
route:
  decides page identity

route guard:
  decides frontend access experience

URL state:
  controls shareable list conditions

server state:
  comes from API and belongs to TanStack Query

form state:
  belongs to React Hook Form

local UI state:
  belongs to the current component

derived state:
  is calculated during render

mutation:
  changes server data and invalidates related queries
```

只要这几个边界清楚，项目后期规模变大也不会变成一团乱。
