# SellerHub Marketplace 需求规格文档 v0.1

## 1. 项目定位

### 1.1 项目名称

SellerHub Marketplace

### 1.2 项目一句话描述

SellerHub Marketplace 是一个面向求职展示的多商家电商管理系统，支持买家浏览商品和下单，卖家管理店铺、商品和订单，管理员管理分类和平台内容状态。

### 1.3 项目目标

本项目不是普通商城页面仿写，而是一个能够体现现代前端和全栈工程能力的求职项目。

项目重点展示：

* React + TypeScript 的组件建模能力
* 真实业务状态流设计能力
* 前后端 API 边界设计能力
* 数据库关系建模能力
* 表单、校验、权限、错误处理能力
* 前端异步数据管理能力
* 可部署、可测试、可解释的工程结构

### 1.4 项目类型

Full-stack web application

### 1.5 目标用户

| 用户类型    | 说明                             |
| ------- | ------------------------------ |
| Buyer   | 普通买家，可以浏览商品、搜索商品、加入购物车、下单、查看订单 |
| Seller  | 商家用户，可以创建店铺、管理商品、查看订单、更新订单状态   |
| Admin   | 平台管理员，可以管理分类、审核商品或店铺状态         |
| Visitor | 未登录访客，可以浏览公开商品和店铺，但不能下单或管理内容   |

---

## 2. 技术栈建议

### 2.1 Frontend

| 技术                         | 用途                   |
| -------------------------- | -------------------- |
| React                      | 构建用户界面               |
| TypeScript                 | 静态类型检查               |
| Vite                       | 前端开发和构建工具            |
| React Router               | 前端路由                 |
| TanStack Query             | 服务端数据请求、缓存、刷新和错误状态管理 |
| React Hook Form            | 表单状态管理               |
| Zod                        | 表单和 API 数据运行时校验      |
| CSS Modules 或 Tailwind CSS | 样式组织                 |
| Vitest                     | 单元测试                 |
| React Testing Library      | 组件行为测试               |
| Playwright                 | 端到端测试，可作为后期增强        |

### 2.2 Backend

| 技术                            | 用途                           |
| ----------------------------- | ---------------------------- |
| Node.js                       | JavaScript server runtime    |
| Express                       | REST API server              |
| TypeScript                    | 后端类型系统                       |
| Prisma                        | ORM 和数据库类型安全访问               |
| PostgreSQL                    | 关系型数据库                       |
| Zod                           | request body、query、params 校验 |
| bcrypt                        | 密码哈希                         |
| JWT 或 httpOnly cookie session | 登录状态                         |
| Supertest                     | API 测试                       |

### 2.3 Deployment

| 部分         | 建议                                    |
| ---------- | ------------------------------------- |
| Frontend   | Vercel / Netlify                      |
| Backend    | Render / Railway / Fly.io             |
| Database   | Supabase PostgreSQL / Neon PostgreSQL |
| Repository | GitHub                                |
| CI         | GitHub Actions，可后期加入                  |

---

## 3. 项目边界

### 3.1 MVP 必须完成

MVP 必须形成完整业务闭环：

```txt
register/login
  -> browse products
  -> add to cart
  -> place order
  -> seller manages products
  -> seller handles orders
  -> admin manages categories
```

### 3.2 MVP 不做

第一版不做以下内容：

* 真实在线支付
* 复杂优惠券系统
* 实时聊天
* 推荐算法
* 多语言系统
* 复杂物流追踪
* 微服务架构
* GraphQL
* Next.js SSR
* 移动端 App
* AI 推荐功能

### 3.3 后期可增强

后期可以添加：

* Stripe sandbox payment
* Product review and rating
* Seller analytics dashboard
* Product image upload
* Order invoice
* Admin audit workflow
* E2E testing
* Docker deployment
* Next.js version

---

## 4. 用户角色与权限

### 4.1 Role 定义

```txt
VISITOR:
  not authenticated

BUYER:
  authenticated user who can buy products

SELLER:
  authenticated user who can manage a shop and products

ADMIN:
  platform manager
```

### 4.2 权限矩阵

| 功能       | Visitor | Buyer | Seller | Admin |
| -------- | ------: | ----: | -----: | ----: |
| 浏览首页     |     Yes |   Yes |    Yes |   Yes |
| 浏览商品列表   |     Yes |   Yes |    Yes |   Yes |
| 搜索商品     |     Yes |   Yes |    Yes |   Yes |
| 查看商品详情   |     Yes |   Yes |    Yes |   Yes |
| 注册账号     |     Yes |    No |     No |    No |
| 登录账号     |     Yes |    No |     No |    No |
| 加入购物车    |      No |   Yes |    Yes |    No |
| 创建订单     |      No |   Yes |    Yes |    No |
| 查看自己的订单  |      No |   Yes |    Yes |    No |
| 创建店铺     |      No |    No |    Yes |    No |
| 编辑自己的店铺  |      No |    No |    Yes |    No |
| 创建商品     |      No |    No |    Yes |    No |
| 编辑自己的商品  |      No |    No |    Yes |    No |
| 删除自己的商品  |      No |    No |    Yes |    No |
| 查看自己店铺订单 |      No |    No |    Yes |    No |
| 更新订单状态   |      No |    No |    Yes |    No |
| 管理分类     |      No |    No |     No |   Yes |
| 审核商品状态   |      No |    No |     No |   Yes |
| 查看平台统计   |      No |    No |     No |   Yes |

### 4.3 权限规则

* 未登录用户不能访问购物车、订单、卖家中心、管理后台。
* Buyer 可以购买商品，但不能进入 seller dashboard。
* Seller 可以购买商品，也可以管理自己的店铺。
* Seller 只能管理自己店铺下的商品。
* Seller 只能查看和处理自己店铺产生的订单。
* Admin 可以管理平台分类和内容状态，但不直接修改用户密码。
* 后端必须检查权限，前端隐藏按钮只是用户体验，不是安全边界。

---

## 5. 核心业务模块

## 5.1 Authentication Module

### 5.1.1 功能目标

支持用户注册、登录、退出、获取当前用户。

### 5.1.2 用户故事

```txt
As a visitor,
I want to create an account,
so that I can buy products or become a seller.
```

```txt
As a user,
I want to log in securely,
so that I can access my cart, orders, and dashboard.
```

### 5.1.3 功能需求

| 编号       | 需求                            |
| -------- | ----------------------------- |
| AUTH-001 | 用户可以使用 email、password、name 注册 |
| AUTH-002 | email 必须唯一                    |
| AUTH-003 | password 必须加密存储，不能明文保存        |
| AUTH-004 | 用户可以登录                        |
| AUTH-005 | 用户可以退出                        |
| AUTH-006 | 前端可以获取当前登录用户                  |
| AUTH-007 | 登录失败时显示明确错误                   |
| AUTH-008 | 未登录访问受保护页面时跳转到 login 页面       |

### 5.1.4 表单字段

Register form:

| 字段       | 类型     |  必填 | 校验         |
| -------- | ------ | --: | ---------- |
| name     | string | Yes | 2 到 50 个字符 |
| email    | string | Yes | 合法 email   |
| password | string | Yes | 至少 8 个字符   |

Login form:

| 字段       | 类型     |  必填 | 校验       |
| -------- | ------ | --: | -------- |
| email    | string | Yes | 合法 email |
| password | string | Yes | 非空       |

### 5.1.5 验收标准

* 注册成功后可以登录。
* 重复 email 注册会返回错误。
* 密码不会以明文形式出现在数据库。
* 登录后刷新页面仍能识别当前用户。
* 退出后不能访问受保护页面。
* 后端接口对未登录请求返回 `401 Unauthorized`。

---

## 5.2 Product Browsing Module

### 5.2.1 功能目标

支持用户浏览商品、搜索商品、筛选商品、查看商品详情。

### 5.2.2 用户故事

```txt
As a visitor,
I want to search and browse products,
so that I can decide what to buy.
```

### 5.2.3 功能需求

| 编号          | 需求                                      |
| ----------- | --------------------------------------- |
| PRODUCT-001 | 首页展示推荐商品和最新商品                           |
| PRODUCT-002 | 商品列表支持分页                                |
| PRODUCT-003 | 商品列表支持关键词搜索                             |
| PRODUCT-004 | 商品列表支持分类筛选                              |
| PRODUCT-005 | 商品列表支持价格区间筛选                            |
| PRODUCT-006 | 商品列表支持排序                                |
| PRODUCT-007 | 商品详情页展示商品名称、图片、价格、库存、分类、店铺、描述           |
| PRODUCT-008 | 下架商品不能被普通用户购买                           |
| PRODUCT-009 | 库存为 0 时显示 out of stock                  |
| PRODUCT-010 | 商品列表必须显示 loading、error、empty、success 状态 |

### 5.2.4 排序规则

支持以下排序：

| 排序值        | 说明       |
| ---------- | -------- |
| newest     | 最新       |
| price_asc  | 价格从低到高   |
| price_desc | 价格从高到低   |
| popularity | 热门，可后期实现 |

### 5.2.5 验收标准

* 访客可以查看商品列表和详情。
* 搜索关键词会改变列表结果。
* 分类筛选会改变列表结果。
* 空结果时展示 empty state。
* 请求失败时展示 error state。
* 商品详情页可以从列表进入。
* 没有库存的商品不能加入购物车。

---

## 5.3 Seller Shop Module

### 5.3.1 功能目标

支持卖家创建和管理自己的店铺。

### 5.3.2 用户故事

```txt
As a seller,
I want to create and edit my shop,
so that I can sell products under my own brand.
```

### 5.3.3 功能需求

| 编号       | 需求                         |
| -------- | -------------------------- |
| SHOP-001 | Seller 可以创建一个店铺            |
| SHOP-002 | 一个 Seller MVP 阶段只能拥有一个店铺   |
| SHOP-003 | Seller 可以编辑自己的店铺信息         |
| SHOP-004 | Seller 可以查看自己的店铺 dashboard |
| SHOP-005 | Buyer 和 Visitor 可以查看公开店铺页面 |
| SHOP-006 | Admin 可以设置店铺状态             |
| SHOP-007 | 被 suspended 的店铺不能新增商品      |
| SHOP-008 | 店铺页面展示店铺信息和商品列表            |

### 5.3.4 店铺字段

| 字段          | 类型     |  必填 | 说明                 |
| ----------- | ------ | --: | ------------------ |
| name        | string | Yes | 店铺名称               |
| slug        | string | Yes | URL 友好名称           |
| description | string |  No | 店铺介绍               |
| logoUrl     | string |  No | 店铺 logo            |
| status      | enum   | Yes | active / suspended |

### 5.3.5 验收标准

* Seller 可以创建店铺。
* Seller 只能编辑自己的店铺。
* Seller 不能编辑别人的店铺。
* 未登录用户不能创建店铺。
* 非 Seller 角色不能进入 seller dashboard。
* 店铺详情页可以展示该店铺商品。

---

## 5.4 Seller Product Management Module

### 5.4.1 功能目标

支持卖家创建、编辑、删除、上架、下架商品。

### 5.4.2 用户故事

```txt
As a seller,
I want to manage my products,
so that I can sell items and control inventory.
```

### 5.4.3 功能需求

| 编号                 | 需求                 |
| ------------------ | ------------------ |
| SELLER-PRODUCT-001 | Seller 可以创建商品      |
| SELLER-PRODUCT-002 | Seller 可以编辑自己的商品   |
| SELLER-PRODUCT-003 | Seller 可以删除自己的商品   |
| SELLER-PRODUCT-004 | Seller 可以设置商品库存    |
| SELLER-PRODUCT-005 | Seller 可以设置商品状态    |
| SELLER-PRODUCT-006 | Seller 可以查看自己的商品列表 |
| SELLER-PRODUCT-007 | Seller 不能管理其他店铺商品  |
| SELLER-PRODUCT-008 | 商品创建和编辑表单必须有校验     |
| SELLER-PRODUCT-009 | 商品价格必须大于 0         |
| SELLER-PRODUCT-010 | 商品库存不能小于 0         |

### 5.4.4 商品字段

| 字段          | 类型     |  必填 | 校验                        |
| ----------- | ------ | --: | ------------------------- |
| name        | string | Yes | 2 到 100 个字符               |
| description | string | Yes | 10 到 2000 个字符             |
| price       | number | Yes | 大于 0                      |
| stock       | number | Yes | 大于等于 0                    |
| categoryId  | string | Yes | 必须存在                      |
| imageUrl    | string |  No | 合法 URL                    |
| status      | enum   | Yes | draft / active / archived |

### 5.4.5 验收标准

* Seller 可以创建合法商品。
* 表单非法时不能提交。
* Seller 只能看到自己的商品管理列表。
* Seller 不能通过 URL 修改别人的商品。
* 商品库存修改后，商品详情页同步显示新库存。
* archived 商品不在公开列表中出现。

---

## 5.5 Cart Module

### 5.5.1 功能目标

支持买家把商品加入购物车、修改数量、移除商品、查看总价。

### 5.5.2 用户故事

```txt
As a buyer,
I want to add products to my cart,
so that I can review them before checkout.
```

### 5.5.3 功能需求

| 编号       | 需求                        |
| -------- | ------------------------- |
| CART-001 | 登录用户可以把商品加入购物车            |
| CART-002 | 未登录用户点击加入购物车时跳转到 login 页面 |
| CART-003 | 用户可以修改购物车商品数量             |
| CART-004 | 用户可以移除购物车商品               |
| CART-005 | 购物车显示单项小计                 |
| CART-006 | 购物车显示总价                   |
| CART-007 | 加入购物车时不能超过库存              |
| CART-008 | 库存为 0 的商品不能加入购物车          |
| CART-009 | 相同商品重复加入时增加数量，而不是创建重复行    |
| CART-010 | 购物车数据可以在刷新后保留             |

### 5.5.4 验收标准

* 登录用户可以添加商品到购物车。
* 购物车数量变化后总价正确更新。
* 删除购物车项后总价正确更新。
* 超过库存时显示错误。
* 刷新页面后购物车内容仍然存在。
* 商品下架后购物车中应显示不可购买状态。

---

## 5.6 Checkout and Order Module

### 5.6.1 功能目标

支持买家从购物车创建订单，卖家可以处理订单。

### 5.6.2 用户故事

```txt
As a buyer,
I want to place an order from my cart,
so that I can buy selected products.
```

```txt
As a seller,
I want to view and update orders for my shop,
so that I can manage fulfillment.
```

### 5.6.3 功能需求

| 编号        | 需求                         |
| --------- | -------------------------- |
| ORDER-001 | Buyer 可以从购物车创建订单           |
| ORDER-002 | Checkout 页面需要填写收货信息        |
| ORDER-003 | 创建订单前后端必须再次校验库存            |
| ORDER-004 | 创建订单后生成 order items        |
| ORDER-005 | 创建订单后减少商品库存                |
| ORDER-006 | 创建订单后清空购物车                 |
| ORDER-007 | Buyer 可以查看自己的订单列表          |
| ORDER-008 | Buyer 可以查看订单详情             |
| ORDER-009 | Seller 可以查看自己店铺相关订单        |
| ORDER-010 | Seller 可以更新订单状态            |
| ORDER-011 | Seller 不能查看其他店铺订单          |
| ORDER-012 | MVP 使用 mock payment，不接真实支付 |

### 5.6.4 订单状态

| 状态         | 说明              |
| ---------- | --------------- |
| pending    | 订单已创建，等待处理      |
| paid       | mock payment 成功 |
| processing | 卖家处理中           |
| shipped    | 已发货             |
| completed  | 已完成             |
| cancelled  | 已取消             |

### 5.6.5 订单创建流程

```txt
Buyer clicks Place Order
  -> frontend validates checkout form
  -> frontend sends checkout request
  -> backend checks authentication
  -> backend reads cart items
  -> backend checks product status and stock
  -> backend creates order
  -> backend creates order items
  -> backend decreases stock
  -> backend clears cart
  -> backend returns order detail
  -> frontend redirects to order detail page
```

### 5.6.6 验收标准

* 空购物车不能 checkout。
* 未登录用户不能 checkout。
* 库存不足时订单创建失败。
* 商品下架时订单创建失败。
* 订单创建成功后购物车清空。
* 订单创建成功后库存减少。
* Buyer 只能查看自己的订单。
* Seller 只能查看自己店铺相关订单。
* Seller 可以更新订单状态。
* 非 Seller 不能更新订单状态。

---

## 5.7 Admin Category and Audit Module

### 5.7.1 功能目标

支持管理员管理商品分类，并对商品或店铺状态进行基础控制。

### 5.7.2 用户故事

```txt
As an admin,
I want to manage categories,
so that products can be organized consistently.
```

### 5.7.3 功能需求

| 编号        | 需求                        |
| --------- | ------------------------- |
| ADMIN-001 | Admin 可以创建分类              |
| ADMIN-002 | Admin 可以编辑分类              |
| ADMIN-003 | Admin 可以删除未被使用的分类         |
| ADMIN-004 | Admin 可以查看所有店铺            |
| ADMIN-005 | Admin 可以 suspend 店铺       |
| ADMIN-006 | Admin 可以查看所有商品            |
| ADMIN-007 | Admin 可以 archive 商品       |
| ADMIN-008 | 非 Admin 不能访问 admin routes |

### 5.7.4 验收标准

* Admin 可以创建分类。
* 分类名称不能为空。
* 已被商品使用的分类不能直接删除。
* Admin 可以 suspend 店铺。
* suspended 店铺不能新增商品。
* 非 Admin 访问 admin 页面会被拒绝。
* 后端必须返回 `403 Forbidden`，不能只靠前端隐藏入口。

---

## 6. 页面需求

## 6.1 Public Pages

| 页面             | 路径                     | 说明                  |
| -------------- | ---------------------- | ------------------- |
| Home           | `/`                    | 首页，展示推荐商品、最新商品、分类入口 |
| Product List   | `/products`            | 商品列表，支持搜索、筛选、排序、分页  |
| Product Detail | `/products/:productId` | 商品详情                |
| Shop Detail    | `/shops/:shopId`       | 店铺详情和店铺商品           |
| Login          | `/login`               | 登录                  |
| Register       | `/register`            | 注册                  |

## 6.2 Buyer Pages

| 页面               | 路径                 | 说明     |
| ---------------- | ------------------ | ------ |
| Cart             | `/cart`            | 购物车    |
| Checkout         | `/checkout`        | 结账     |
| My Orders        | `/orders`          | 买家订单列表 |
| Order Detail     | `/orders/:orderId` | 买家订单详情 |
| Account Settings | `/account`         | 账号信息   |

## 6.3 Seller Pages

| 页面                  | 路径                                 | 说明     |
| ------------------- | ---------------------------------- | ------ |
| Seller Dashboard    | `/seller`                          | 卖家总览   |
| Shop Settings       | `/seller/shop`                     | 店铺设置   |
| Seller Products     | `/seller/products`                 | 商品管理列表 |
| New Product         | `/seller/products/new`             | 新建商品   |
| Edit Product        | `/seller/products/:productId/edit` | 编辑商品   |
| Seller Orders       | `/seller/orders`                   | 店铺订单列表 |
| Seller Order Detail | `/seller/orders/:orderId`          | 店铺订单详情 |

## 6.4 Admin Pages

| 页面                  | 路径                  | 说明     |
| ------------------- | ------------------- | ------ |
| Admin Dashboard     | `/admin`            | 管理后台总览 |
| Category Management | `/admin/categories` | 分类管理   |
| Product Audit       | `/admin/products`   | 商品状态管理 |
| Shop Audit          | `/admin/shops`      | 店铺状态管理 |

---

## 7. 数据模型需求

## 7.1 User

| 字段           | 类型     | 说明                     |
| ------------ | ------ | ---------------------- |
| id           | string | 用户 ID                  |
| name         | string | 用户名                    |
| email        | string | 唯一 email               |
| passwordHash | string | 哈希后的密码                 |
| role         | enum   | BUYER / SELLER / ADMIN |
| createdAt    | Date   | 创建时间                   |
| updatedAt    | Date   | 更新时间                   |

## 7.2 Shop

| 字段          | 类型     | 说明                 |
| ----------- | ------ | ------------------ |
| id          | string | 店铺 ID              |
| ownerId     | string | Seller user ID     |
| name        | string | 店铺名称               |
| slug        | string | URL slug           |
| description | string | 店铺描述               |
| logoUrl     | string | 店铺 logo            |
| status      | enum   | active / suspended |
| createdAt   | Date   | 创建时间               |
| updatedAt   | Date   | 更新时间               |

## 7.3 Category

| 字段        | 类型     | 说明       |
| --------- | ------ | -------- |
| id        | string | 分类 ID    |
| name      | string | 分类名称     |
| slug      | string | URL slug |
| createdAt | Date   | 创建时间     |
| updatedAt | Date   | 更新时间     |

## 7.4 Product

| 字段          | 类型     | 说明                        |
| ----------- | ------ | ------------------------- |
| id          | string | 商品 ID                     |
| shopId      | string | 所属店铺                      |
| categoryId  | string | 所属分类                      |
| name        | string | 商品名称                      |
| description | string | 商品描述                      |
| price       | number | 商品价格                      |
| stock       | number | 库存                        |
| imageUrl    | string | 商品图片                      |
| status      | enum   | draft / active / archived |
| createdAt   | Date   | 创建时间                      |
| updatedAt   | Date   | 更新时间                      |

## 7.5 CartItem

| 字段        | 类型     | 说明      |
| --------- | ------ | ------- |
| id        | string | 购物车项 ID |
| userId    | string | 用户 ID   |
| productId | string | 商品 ID   |
| quantity  | number | 数量      |
| createdAt | Date   | 创建时间    |
| updatedAt | Date   | 更新时间    |

## 7.6 Order

| 字段              | 类型     | 说明                                                            |
| --------------- | ------ | ------------------------------------------------------------- |
| id              | string | 订单 ID                                                         |
| buyerId         | string | 买家 ID                                                         |
| status          | enum   | pending / paid / processing / shipped / completed / cancelled |
| paymentStatus   | enum   | pending / paid / failed                                       |
| totalAmount     | number | 订单总金额                                                         |
| shippingName    | string | 收货人                                                           |
| shippingPhone   | string | 收货电话                                                          |
| shippingAddress | string | 收货地址                                                          |
| createdAt       | Date   | 创建时间                                                          |
| updatedAt       | Date   | 更新时间                                                          |

## 7.7 OrderItem

| 字段        | 类型     | 说明     |
| --------- | ------ | ------ |
| id        | string | 订单项 ID |
| orderId   | string | 订单 ID  |
| productId | string | 商品 ID  |
| shopId    | string | 店铺 ID  |
| quantity  | number | 购买数量   |
| unitPrice | number | 下单时单价  |
| subtotal  | number | 小计     |

## 7.8 Review

MVP 可选。

| 字段        | 类型     | 说明    |
| --------- | ------ | ----- |
| id        | string | 评论 ID |
| userId    | string | 用户 ID |
| productId | string | 商品 ID |
| rating    | number | 1 到 5 |
| comment   | string | 评论内容  |
| createdAt | Date   | 创建时间  |
| updatedAt | Date   | 更新时间  |

---

## 8. API 需求

## 8.1 API Response 统一格式

成功响应：

```json
{
  "success": true,
  "data": {}
}
```

失败响应：

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": {}
  }
}
```

## 8.2 Auth API

| Method | Endpoint             | 说明   |
| ------ | -------------------- | ---- |
| POST   | `/api/auth/register` | 注册   |
| POST   | `/api/auth/login`    | 登录   |
| POST   | `/api/auth/logout`   | 退出   |
| GET    | `/api/auth/me`       | 当前用户 |

## 8.3 Product API

| Method | Endpoint                   | 说明          |
| ------ | -------------------------- | ----------- |
| GET    | `/api/products`            | 商品列表        |
| GET    | `/api/products/:productId` | 商品详情        |
| POST   | `/api/products`            | Seller 创建商品 |
| PATCH  | `/api/products/:productId` | Seller 更新商品 |
| DELETE | `/api/products/:productId` | Seller 删除商品 |

## 8.4 Shop API

| Method | Endpoint             | 说明          |
| ------ | -------------------- | ----------- |
| GET    | `/api/shops`         | 店铺列表        |
| GET    | `/api/shops/:shopId` | 店铺详情        |
| POST   | `/api/shops`         | Seller 创建店铺 |
| PATCH  | `/api/shops/:shopId` | Seller 更新店铺 |

## 8.5 Cart API

| Method | Endpoint                      | 说明    |
| ------ | ----------------------------- | ----- |
| GET    | `/api/cart`                   | 获取购物车 |
| POST   | `/api/cart/items`             | 添加商品  |
| PATCH  | `/api/cart/items/:cartItemId` | 修改数量  |
| DELETE | `/api/cart/items/:cartItemId` | 移除商品  |
| DELETE | `/api/cart`                   | 清空购物车 |

## 8.6 Order API

| Method | Endpoint                             | 说明            |
| ------ | ------------------------------------ | ------------- |
| POST   | `/api/orders`                        | 创建订单          |
| GET    | `/api/orders`                        | Buyer 查看自己的订单 |
| GET    | `/api/orders/:orderId`               | Buyer 查看订单详情  |
| GET    | `/api/seller/orders`                 | Seller 查看店铺订单 |
| PATCH  | `/api/seller/orders/:orderId/status` | Seller 更新订单状态 |

## 8.7 Admin API

| Method | Endpoint                                | 说明     |
| ------ | --------------------------------------- | ------ |
| GET    | `/api/admin/categories`                 | 分类列表   |
| POST   | `/api/admin/categories`                 | 创建分类   |
| PATCH  | `/api/admin/categories/:categoryId`     | 更新分类   |
| DELETE | `/api/admin/categories/:categoryId`     | 删除分类   |
| GET    | `/api/admin/products`                   | 管理商品   |
| PATCH  | `/api/admin/products/:productId/status` | 更新商品状态 |
| GET    | `/api/admin/shops`                      | 管理店铺   |
| PATCH  | `/api/admin/shops/:shopId/status`       | 更新店铺状态 |

---

## 9. 前端状态需求

### 9.1 必须区分的状态类型

| 状态类型           | 示例                                        | 存放位置             |
| -------------- | ----------------------------------------- | ---------------- |
| Server state   | product list、order list、current user      | TanStack Query   |
| Local UI state | modal open、selected tab、filter panel open | useState         |
| Form state     | login form、product form、checkout form     | React Hook Form  |
| Derived state  | cart total、filtered label、stock message   | render 中计算       |
| Auth state     | current user、role、logged-in status        | query + provider |
| URL state      | search keyword、category、page、sort         | URL query params |

### 9.2 状态建模规则

* 不把可以计算出来的数据重复存进 state。
* 表单输入和服务端数据分开管理。
* 商品列表筛选条件尽量放在 URL query params。
* 购物车总价由 cart items 计算，不单独存一个 total state。
* loading、error、empty、success 必须明确区分。
* 不用一个 boolean 表示复杂请求状态。

---

## 10. 表单需求

### 10.1 必须实现的表单

| 表单                       | 校验方式                  |
| ------------------------ | --------------------- |
| Register form            | React Hook Form + Zod |
| Login form               | React Hook Form + Zod |
| Product create/edit form | React Hook Form + Zod |
| Shop create/edit form    | React Hook Form + Zod |
| Checkout form            | React Hook Form + Zod |
| Category form            | React Hook Form + Zod |

### 10.2 表单验收标准

* 必填字段为空时显示错误。
* 错误信息显示在字段附近。
* 提交中按钮显示 loading 状态。
* 提交失败显示后端错误。
* 提交成功后跳转或刷新相关数据。
* 不允许非法数据绕过前端直接污染后端。
* 后端必须再次校验 request body。

---

## 11. 错误处理需求

### 11.1 前端错误类型

| 错误               | 处理方式                |
| ---------------- | ------------------- |
| Validation error | 显示字段错误              |
| Unauthorized     | 跳转 login            |
| Forbidden        | 显示 no permission 页面 |
| Not found        | 显示 404 页面           |
| Network error    | 显示 retry UI         |
| Server error     | 显示通用错误提示            |

### 11.2 后端错误类型

| code                  | HTTP status | 说明     |
| --------------------- | ----------: | ------ |
| VALIDATION_ERROR      |         400 | 请求参数错误 |
| UNAUTHORIZED          |         401 | 未登录    |
| FORBIDDEN             |         403 | 无权限    |
| NOT_FOUND             |         404 | 资源不存在  |
| CONFLICT              |         409 | 数据冲突   |
| INTERNAL_SERVER_ERROR |         500 | 服务端错误  |

### 11.3 验收标准

* API 不返回未结构化错误。
* 前端不直接显示原始 stack trace。
* 受保护接口必须返回正确 HTTP status。
* 表单校验错误必须能定位到具体字段。
* 权限错误和登录错误必须区分。

---

## 12. 测试需求

### 12.1 Frontend Tests

MVP 至少覆盖：

| 测试对象           | 测试内容                           |
| -------------- | ------------------------------ |
| ProductCard    | 正确显示商品信息                       |
| ProductList    | loading、empty、error、success 状态 |
| CartSummary    | 总价计算                           |
| LoginForm      | 表单校验和提交                        |
| ProductForm    | 创建商品字段校验                       |
| ProtectedRoute | 未登录时跳转                         |

### 12.2 Backend Tests

MVP 至少覆盖：

| 测试对象                  | 测试内容                          |
| --------------------- | ----------------------------- |
| Auth API              | register、login、me             |
| Product API           | list、create、update、delete     |
| Cart API              | add、update quantity、remove    |
| Order API             | create order、stock validation |
| Permission middleware | buyer/seller/admin 权限         |

### 12.3 E2E Tests

后期至少覆盖：

```txt
user registers
  -> logs in
  -> browses product
  -> adds product to cart
  -> places order
  -> views order detail
```

```txt
seller logs in
  -> creates product
  -> sees product in dashboard
  -> receives order
  -> updates order status
```

---

## 13. 性能和用户体验需求

### 13.1 基础体验

* 页面切换不能白屏。
* 列表请求必须有 loading state。
* 空数据必须有 empty state。
* 错误请求必须有 retry action。
* 表单提交过程中按钮不能重复提交。
* 删除操作需要确认。
* 关键操作成功后需要 toast 或 inline feedback。

### 13.2 列表体验

商品列表必须支持：

* search
* category filter
* price filter
* sort
* pagination
* URL query sync

### 13.3 Dashboard 体验

Seller dashboard 必须显示：

* product count
* active product count
* pending order count
* recent orders
* quick actions

Admin dashboard 必须显示：

* total categories
* total shops
* suspended shops
* archived products

---

## 14. 安全需求

### 14.1 Authentication

* 密码必须 hash。
* token 或 session 不能暴露敏感信息。
* logout 后 protected API 不能继续访问。
* current user API 不返回 passwordHash。

### 14.2 Authorization

* Seller 不能操作其他 seller 的 shop、product、order。
* Buyer 不能访问 seller dashboard。
* Admin API 必须检查 admin role。
* 前端隐藏按钮不是权限控制，后端必须强制校验。

### 14.3 Input Validation

* 所有 request body 必须后端校验。
* 所有 route params 必须后端校验。
* 所有 query params 必须后端校验。
* price、stock、quantity 必须是有效数字。
* order creation 必须重新校验库存。

### 14.4 Data Safety

* 删除商品 MVP 可以使用 soft delete 或 archived status。
* 创建订单和减少库存需要保持一致性。
* 订单中的 unitPrice 必须保存下单时价格，不能依赖商品当前价格。

---

## 15. 项目目录建议

### 15.1 Monorepo 结构

```txt
sellerhub-marketplace/
  README.md
  package.json

  apps/
    web/
      src/
        app/
        features/
        shared/

    api/
      src/
        modules/
        middleware/
        db/
        shared/

  packages/
    shared/
      src/
        api-types/
        schemas/
        constants/

  docs/
    requirements/
    architecture/
    api/
    database/
```

### 15.2 Frontend 结构

```txt
apps/web/src/
  app/
    router.tsx
    providers.tsx

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
      types.ts

    shops/
      api/
      components/
      hooks/
      pages/
      types.ts

    cart/
      api/
      components/
      hooks/
      pages/
      types.ts

    orders/
      api/
      components/
      hooks/
      pages/
      types.ts

    seller/
      api/
      components/
      hooks/
      pages/
      types.ts

    admin/
      api/
      components/
      hooks/
      pages/
      types.ts

  shared/
    api/
    components/
    hooks/
    types/
    utils/
```

### 15.3 Backend 结构

```txt
apps/api/src/
  app.ts
  server.ts

  config/
    env.ts

  db/
    prisma.ts

  middleware/
    require-auth.ts
    require-role.ts
    validate-request.ts
    error-handler.ts

  modules/
    auth/
      auth.routes.ts
      auth.controller.ts
      auth.service.ts
      auth.schema.ts

    products/
      product.routes.ts
      product.controller.ts
      product.service.ts
      product.schema.ts

    shops/
    cart/
    orders/
    admin/

  shared/
    api-response.ts
    app-error.ts
    async-handler.ts
```

---

## 16. MVP 开发阶段

## 16.1 Phase 0: Project Setup

目标：建立可运行的 full-stack 项目骨架。

任务：

* 初始化 monorepo
* 初始化 React + Vite frontend
* 初始化 Express + TypeScript backend
* 配置 ESLint
* 配置 Prettier
* 配置 Prisma
* 连接 PostgreSQL
* 添加基础 README
* 添加 `.env.example`

验收：

* frontend 可以启动
* backend 可以启动
* database 可以连接
* `npm run build` 成功
* `npm run lint` 成功

## 16.2 Phase 1: Auth and Layout

目标：完成登录注册和基础页面框架。

任务：

* register API
* login API
* logout API
* current user API
* auth provider
* protected route
* app layout
* navigation
* login/register pages

验收：

* 用户可以注册和登录
* 登录后导航显示当前用户
* 未登录不能访问受保护页面
* role 可以影响导航菜单

## 16.3 Phase 2: Products and Shops

目标：完成商品和店铺核心浏览与管理。

任务：

* category model
* shop model
* product model
* public product list
* product detail
* shop detail
* seller shop creation
* seller product CRUD
* search/filter/sort/pagination

验收：

* 访客可以浏览商品
* Seller 可以创建店铺
* Seller 可以管理自己的商品
* 商品列表支持搜索和筛选
* Seller 不能管理别人商品

## 16.4 Phase 3: Cart and Checkout

目标：完成购物车和下单闭环。

任务：

* cart model
* cart APIs
* cart page
* checkout form
* order model
* order item model
* create order API
* stock validation
* stock decrease
* clear cart after order

验收：

* 买家可以加入购物车
* 买家可以修改购物车数量
* 买家可以创建订单
* 库存不足时无法下单
* 下单后库存减少
* 下单后购物车清空

## 16.5 Phase 4: Seller Orders and Admin

目标：完成卖家订单管理和后台基础能力。

任务：

* seller order list
* seller order detail
* update order status
* admin category management
* admin shop management
* admin product status management

验收：

* Seller 可以查看自己店铺订单
* Seller 可以更新订单状态
* Admin 可以管理分类
* Admin 可以 suspend 店铺
* Admin 可以 archive 商品

## 16.6 Phase 5: Testing, Polish, Deployment

目标：让项目达到求职展示标准。

任务：

* frontend tests
* backend tests
* seed data
* demo account
* production build
* deployment
* README
* architecture docs
* API docs
* demo screenshots
* resume bullet points

验收：

* 项目可在线访问
* README 可以让别人本地跑起来
* 有测试命令
* 有 demo accounts
* 有架构说明
* 简历可以清楚描述项目亮点

---

## 17. Demo Account 需求

部署后至少提供：

```txt
Buyer:
  email: buyer@sellerhub.dev
  password: Password123

Seller:
  email: seller@sellerhub.dev
  password: Password123

Admin:
  email: admin@sellerhub.dev
  password: Password123
```

Demo 数据至少包括：

* 3 categories
* 2 sellers
* 2 shops
* 12 products
* 1 buyer
* 1 cart with items
* 3 orders with different statuses

---

## 18. README 需求

项目最终 README 必须包含：

* 项目介绍
* 在线 demo link
* 测试账号
* 技术栈
* 核心功能
* 架构图
* 数据模型说明
* API 说明
* 本地运行步骤
* 环境变量说明
* 测试命令
* 部署说明
* 项目截图
* 求职亮点
* 后续优化计划

---

## 19. 求职展示重点

### 19.1 简历关键词

可以用于简历的关键词：

```txt
React
TypeScript
Vite
Node.js
Express
Prisma
PostgreSQL
REST API
Role-Based Access Control
Form Validation
Runtime Validation
TanStack Query
React Hook Form
Zod
Unit Testing
API Testing
Deployment
```

### 19.2 项目亮点表达

推荐表达：

```txt
Built a full-stack multi-vendor marketplace with React, TypeScript, Express, Prisma, and PostgreSQL, supporting buyer, seller, and admin workflows.
```

```txt
Designed relational data models for users, shops, products, carts, orders, and order items, using Prisma migrations and type-safe database access.
```

```txt
Implemented role-based access control for buyer, seller, and admin routes, including protected seller product management and order status updates.
```

```txt
Built reusable React feature modules with typed API clients, form validation, async loading/error states, and component-level tests.
```

```txt
Implemented an order placement flow with stock validation, cart clearing, order item creation, and seller-facing order management.
```

---

## 20. 完成标准

本项目完成不是指页面都能打开，而是必须满足以下标准：

### 20.1 Functional Completion

* Buyer 可以完成从浏览商品到下单的完整流程。
* Seller 可以完成从创建店铺到处理订单的完整流程。
* Admin 可以完成分类和内容状态管理。
* 权限规则在前端和后端都正确执行。

### 20.2 Engineering Completion

* 前端和后端都使用 TypeScript。
* 关键 API 有 request validation。
* 关键页面有 loading、error、empty、success 状态。
* 关键流程有测试。
* 数据库 schema 有清晰关系。
* 项目可以部署。
* README 完整。
* 本地运行步骤清楚。

### 20.3 Interview Readiness

项目完成后，开发者必须能解释：

* 为什么选择这个技术栈。
* 前端目录为什么这样组织。
* 后端 route、controller、service 如何分工。
* auth 和 role permission 如何实现。
* 下单流程如何保证库存正确。
* cart total 为什么不单独存 state。
* TypeScript 类型和 Zod runtime validation 的区别。
* Prisma schema 如何表达业务关系。
* 如何处理 loading、error、empty、success 状态。
* 项目还有哪些可以优化的地方。

---

## 21. 非目标

为了控制项目范围，以下内容不作为 MVP 要求：

* 不要求像 Amazon 一样复杂的 UI。
* 不要求真实支付上线。
* 不要求真实物流。
* 不要求复杂 BI dashboard。
* 不要求 WebSocket。
* 不要求 SSR。
* 不要求 PWA。
* 不要求 microservices。
* 不要求 Kubernetes。
* 不要求 AI 推荐。
* 不要求移动端适配到极致。

MVP 的目标是清晰、完整、可解释，而不是功能堆砌。

---

## 22. 最终判断

SellerHub Marketplace 的核心价值不是“做一个商城”，而是通过 marketplace 业务证明开发者能处理真实项目中的核心工程问题：

```txt
role permission
  -> typed API
  -> runtime validation
  -> relational data modeling
  -> async frontend state
  -> forms
  -> orders
  -> inventory
  -> tests
  -> deployment
```

只要这些部分做扎实，它就可以作为一个有竞争力的求职项目。
